output "function_name" {
  value = aws_lambda_function.get_products.function_name
}

output "function_arn" {
  value = aws_lambda_function.get_products.arn
}

output "invoke_arn" {
  value = aws_lambda_function.get_products.invoke_arn
}
