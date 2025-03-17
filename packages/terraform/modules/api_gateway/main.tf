# API Gateway REST API
resource "aws_api_gateway_rest_api" "products_api" {
  name        = "products-api"
  description = "API for products"
}

# API Gateway resource for /products
resource "aws_api_gateway_resource" "products" {
  rest_api_id = aws_api_gateway_rest_api.products_api.id
  parent_id   = aws_api_gateway_rest_api.products_api.root_resource_id
  path_part   = "products"
}

# API Gateway resource for /products/{productId}
resource "aws_api_gateway_resource" "product" {
  rest_api_id = aws_api_gateway_rest_api.products_api.id
  parent_id   = aws_api_gateway_resource.products.id
  path_part   = "{productId}"
}

# API Gateway method for GET /products
resource "aws_api_gateway_method" "get_products" {
  rest_api_id   = aws_api_gateway_rest_api.products_api.id
  resource_id   = aws_api_gateway_resource.products.id
  http_method   = "GET"
  authorization = "NONE"
}

# API Gateway method for GET /products/{productId}
resource "aws_api_gateway_method" "get_product" {
  rest_api_id   = aws_api_gateway_rest_api.products_api.id
  resource_id   = aws_api_gateway_resource.product.id
  http_method   = "GET"
  authorization = "NONE"
}

# API Gateway integration for GET /products
resource "aws_api_gateway_integration" "get_products_integration" {
  rest_api_id             = aws_api_gateway_rest_api.products_api.id
  resource_id             = aws_api_gateway_resource.products.id
  http_method             = aws_api_gateway_method.get_products.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.get_products_lambda_invoke_arn
}

# API Gateway integration for GET /products/{productId}
resource "aws_api_gateway_integration" "get_product_integration" {
  rest_api_id             = aws_api_gateway_rest_api.products_api.id
  resource_id             = aws_api_gateway_resource.product.id
  http_method             = aws_api_gateway_method.get_product.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.get_products_lambda_invoke_arn
}

# Lambda permission for API Gateway
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.get_products_lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.products_api.execution_arn}/*/*"
}

# API Gateway deployment
resource "aws_api_gateway_deployment" "products_deployment" {
  depends_on = [
    aws_api_gateway_integration.get_products_integration,
    aws_api_gateway_integration.get_product_integration
  ]

  rest_api_id = aws_api_gateway_rest_api.products_api.id
  stage_name = var.environment
}
