output "api_url" {
  value = "${aws_api_gateway_deployment.products_deployment.invoke_url}/products"
}
