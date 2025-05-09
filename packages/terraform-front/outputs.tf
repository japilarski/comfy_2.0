output "bucket_name" {
  value = module.s3_bucket.bucket_name
}

output "bucket_regional_domain_name" {
  value = module.s3_bucket.bucket_regional_domain_name
}

output "bucket_arn" {
  value = module.s3_bucket.bucket_arn
}

output "distribution_id" {
  value = module.cloud_front.distribution_id
}

output "domain_name" {
  value = module.cloud_front.domain_name
}
