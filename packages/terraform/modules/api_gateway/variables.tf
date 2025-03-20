variable "environment" {
  description = "Deployment environment"
}

variable "lambda_function_name" {
  description = "Name of the Lambda function to invoke"
}

variable "lambda_function_arn" {
  description = "ARN of the Lambda function to invoke"
}

variable "lambda_invoke_arn" {
  description = "Invoke ARN of the Lambda function"
}

variable "project_tag" {
  description = "Project tag for maintaining resources"
}
