# archive lambda
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.root}/../handlers/dist/getProductsHandler.js"
  output_path = "${path.root}/../handlers/dist/getProductsHandler.zip"
}

# Lambda function (minimal example)
resource "aws_lambda_function" "products_lambda" {
  function_name = "${var.environment}-products_lambda"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "getProductsHandler.handler"
  runtime       = "nodejs18.x"

  # Use inline code for example (use S3 for real code)
  filename      = "${path.root}/../handlers/dist/getProductsHandler.zip"

  # VPC configuration to access the private RDS instance
  vpc_config {
    subnet_ids         = [var.subnet_id]
    security_group_ids = [var.security_group_id]
  }

  environment {
    variables = {
      DB_USER=var.db_username
      DB_HOST=var.db_host
      DB_NAME=var.db_name
      DB_PASSWORD=var.db_password
      DB_PORT=var.db_port
    }
  }

  tags = {
    Environment = var.environment
  }
}

# IAM role for Lambda function
resource "aws_iam_role" "lambda_exec_role" {
  name = "${var.environment}_lambda_exec_role"

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

  tags = {
    Environment = var.environment
  }
}

# Attach VPC access policy to Lambda role
resource "aws_iam_role_policy_attachment" "lambda_vpc_access" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

