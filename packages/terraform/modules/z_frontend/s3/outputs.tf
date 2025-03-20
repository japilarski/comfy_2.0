output "bucket_name" {
  value = aws_s3_bucket.react_app.id
}

output "bucket_regional_domain_name" {
  value = aws_s3_bucket.react_app.bucket_regional_domain_name
}

output "bucket_arn" {
  value = aws_s3_bucket.react_app.arn
}
