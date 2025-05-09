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
  profile = var.profile
}

# Network module
module "network" {
  source = "./modules/network"

  region      = var.region
  environment = var.environment
  project_tag = var.project_tag
}

# Database module
module "database" {
  source = "./modules/database"

  environment          = var.environment
  project_tag          = var.project_tag
  vpc_id               = module.network.vpc_id
  db_subnet_group_name = module.network.db_subnet_group_name
  db_security_group_id = module.network.main_security_group_id
  db_username          = var.db_username
  db_password          = var.db_password
}

# Lambda module
module "lambda" {
  source = "./modules/lambdas"

  environment                 = var.environment
  project_tag                 = var.project_tag
  db_host                     = module.database.db_host
  db_port                     = var.db_port
  db_name                     = module.database.db_name
  db_username                 = var.db_username
  db_password                 = var.db_password
  vpc_id                      = module.network.vpc_id
  main_sg_id                  = module.network.main_security_group_id
  private_subnet_av_zone_a_id = module.network.private_subnet_av_zone_a_id
  private_subnet_av_zone_b_id = module.network.private_subnet_av_zone_b_id
}

# API Gateway module
module "api_gateway" {
  source = "./modules/api_gateway"

  environment          = var.environment
  project_tag          = var.project_tag
  lambda_function_name = module.lambda.function_name
  lambda_function_arn  = module.lambda.function_arn
  lambda_invoke_arn    = module.lambda.invoke_arn
}

