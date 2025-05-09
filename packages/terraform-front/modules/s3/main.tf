resource "aws_s3_bucket" "react_app" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_policy" "private_with_cloudfront" {
  bucket = aws_s3_bucket.react_app.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid: "AllowCloudFrontServicePrincipalReadOnly"
        Effect: "Allow"
        Principal: {
          Service: "cloudfront.amazonaws.com"
        }
        Action: "s3:GetObject"
        Resource: "${aws_s3_bucket.react_app.arn}/*"
        Condition: {
          StringEquals: {
            "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
          }
        }
      }
    ]
  })
}


resource "aws_s3_bucket_ownership_controls" "react_app" {
  bucket = aws_s3_bucket.react_app.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "react_app" {
  bucket                  = aws_s3_bucket.react_app.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_website_configuration" "react_app" {
  bucket = aws_s3_bucket.react_app.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}
