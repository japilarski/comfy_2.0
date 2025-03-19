# archive lambda
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.root}/../handlers/dist/getProductsHandler.js"
  output_path = "${path.root}/../handlers/dist/getProductsHandler.zip"
}

# IAM role for Lambda function
resource "aws_iam_role" "lambda_role" {
  name = "${var.environment}_lambda_role"

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

# Attach necessary policies to Lambda Role
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_vpc_access" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# Lambda function (minimal example)
resource "aws_lambda_function" "products_lambda" {
  function_name = "${var.environment}_products_lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "getProductsHandler.handler"
  runtime       = "nodejs18.x"

  # Use inline code for example (use S3 for real code)
  filename      = "${path.root}/../handlers/dist/getProductsHandler.zip"

  # VPC configuration to access the private RDS instance
  vpc_config {
    subnet_ids         = [var.private_subnet_av_zone_a_id] //, var.private_subnet_av_zone_b_id]
    security_group_ids = [var.main_sg_id]
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
