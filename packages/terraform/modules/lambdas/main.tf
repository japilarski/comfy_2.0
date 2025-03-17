# archive lambda
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.root}/../handlers/dist/getProductsHandler.js"
  output_path = "${path.root}/../handlers/dist/getProductsHandler.zip"
}

# IAM role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "get_products_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for Lambda to access DynamoDB
resource "aws_iam_policy" "lambda_dynamodb_policy" {
  name        = "lambda_dynamodb_policy"
  description = "IAM policy for Lambda to access DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]
        Effect   = "Allow"
        Resource = var.dynamodb_table_arn
      }
    ]
  })
}

# Attach policy to role
resource "aws_iam_role_policy_attachment" "lambda_dynamodb" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_dynamodb_policy.arn
}

# Basic logging permissions for Lambda
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda function
resource "aws_lambda_function" "get_products" {
  filename      = "${path.root}/../handlers/dist/getProductsHandler.zip"
  function_name = "get_products"
  role          = aws_iam_role.lambda_role.arn
  handler       = "getProductsHandler.handler"
  runtime       = "nodejs18.x"

  environment {
    variables = {
      TABLE_NAME = var.dynamodb_table_name
    }
  }

  tags = {
    Environment = var.environment
  }
}
