output "distribution_id" {
  value = aws_cloudfront_distribution.react_app.id
}

output "domain_name" {
  value = aws_cloudfront_distribution.react_app.domain_name
}
