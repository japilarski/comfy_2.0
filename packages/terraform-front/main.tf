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

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# Front-end S3 module
module "s3_bucket" {
  source = "./modules/s3"

  bucket_name = "${var.environment}-${var.bucket_name}-${random_string.suffix.result}"
}

# CloudFront module
module "cloud_front" {
  source = "./modules/cloud_front"

  bucket_name                 = module.s3_bucket.bucket_name
  bucket_regional_domain_name = module.s3_bucket.bucket_regional_domain_name
  bucket_arn                  = module.s3_bucket.bucket_arn
}
