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
  profile = "priv"
}

module "dynamodb" {
  source = "./modules/dynamodb"

  environment = var.environment
  table_name = var.dynamodb_table_name
}

module "lambda" {
  source = "./modules/lambdas"

  environment = var.environment
  dynamodb_table_arn = module.dynamodb.dynamodb_table_arn
  dynamodb_table_name = module.dynamodb.dynamodb_table_name
}

module "api_gateway" {
  source = "./modules/api_gateway"

  environment = var.environment
  get_products_lambda_name = module.lambda.function_name
  get_products_lambda_arn = module.lambda.function_arn
  get_products_lambda_invoke_arn = module.lambda.invoke_arn
}
