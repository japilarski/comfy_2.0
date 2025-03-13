terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.89"
    }
  }

  required_version = ">= 1.2.0"
}

# Provider
provider "aws" {
  region  = "eu-central-1"
  profile = "comfy"
}

# Network module
module "network" {
  source = "./modules/network"

  environment = var.environment
  vpc_cidr    = "10.0.0.0/16"
}

# Database module
module "database" {
  source = "./modules/database"

  environment          = var.environment
  vpc_id               = module.network.vpc_id
  db_subnet_group_name = module.network.db_subnet_group_name
  db_security_group_id = module.network.db_security_group_id
  db_username          = var.db_username
  db_password          = var.db_password
}

# Lambda module
module "lambda" {
  source = "./modules/lambdas"

  environment       = var.environment
  vpc_id            = module.network.vpc_id
  subnet_id         = module.network.lambda_subnet_id
  security_group_id = module.network.lambda_security_group_id
  db_host           = module.database.db_endpoint
  db_name           = module.database.db_name
  db_username       = var.db_username
  db_password       = var.db_password
  db_port           = var.db_port
}

# API Gateway module
module "api_gateway" {
  source = "./modules/api_gateway"

  environment          = var.environment
  lambda_function_name = module.lambda.function_name
  lambda_function_arn  = module.lambda.function_arn
  lambda_invoke_arn    = module.lambda.invoke_arn
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# Front-end S3 module
module "s3_bucket" {
  source = "./modules/s3"

  bucket_name = "${var.environment}-${random_string.suffix.result}"
}

# CloudFront module
module "cloud_front" {
  source = "./modules/cloud_front"

  bucket_name               = module.s3_bucket.bucket_name
  bucket_regional_domain_name = module.s3_bucket.bucket_regional_domain_name
  bucket_arn                = module.s3_bucket.bucket_arn
}
