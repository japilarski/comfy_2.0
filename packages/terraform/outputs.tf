output "db_endpoint" {
  value = module.database.db_endpoint
}

output "lambda_function_name" {
  value = module.lambda.function_name
}

output "api_url" {
  value = module.api_gateway.api_url
}

# output "s3_bucket_name" {
#   value = module.s3_bucket.bucket_name
# }

# output "cloudfront_distribution_id" {
#   value = module.cloud_front.distribution_id
# }

# output "cloudfront_domain_name" {
#   value = module.cloud_front.domain_name
# }
