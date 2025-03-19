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
  region  = var.region
  profile = "priv"
}

# Network module
module "network" {
  source = "./modules/network"

  region = var.region
  environment = var.environment
}

# Database module
module "database" {
  source = "./modules/database"

  environment          = var.environment
  vpc_id               = module.network.vpc_id
  db_subnet_group_name = module.network.db_subnet_group_name
  db_security_group_id = module.network.main_security_group_id
  db_username          = var.db_username
  db_password          = var.db_password
}

# Lambda module
module "lambda" {
  source = "./modules/lambdas"

  environment       = var.environment
  db_host           = module.database.db_host
  db_port           = var.db_port
  db_name           = module.database.db_name
  db_username       = var.db_username
  db_password       = var.db_password
  vpc_id            = module.network.vpc_id
  main_sg_id        = module.network.main_security_group_id
  private_subnet_av_zone_a_id = module.network.private_subnet_av_zone_a_id
  # private_subnet_av_zone_b_id = module.network.private_subnet_av_zone_b_id
}

# API Gateway module
module "api_gateway" {
  source = "./modules/api_gateway"

  environment          = var.environment
  lambda_function_name = module.lambda.function_name
  lambda_function_arn  = module.lambda.function_arn
  lambda_invoke_arn    = module.lambda.invoke_arn
}

# resource "random_string" "suffix" {
#   length  = 8
#   special = false
#   upper   = false
# }
#
# # Front-end S3 module
# module "s3_bucket" {
#   source = "./modules/s3"
#
#   bucket_name = "${var.environment}-${random_string.suffix.result}"
# }
#
# # CloudFront module
# module "cloud_front" {
#   source = "./modules/cloud_front"
#
#   bucket_name               = module.s3_bucket.bucket_name
#   bucket_regional_domain_name = module.s3_bucket.bucket_regional_domain_name
#   bucket_arn                = module.s3_bucket.bucket_arn
# }
