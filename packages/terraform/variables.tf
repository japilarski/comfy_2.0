provider "aws" {
  region = "us-east-1"  # Or use a variable
}

# Variables for the root module
variable "environment" {
  description = "Deployment environment (e.g., dev, staging, prod)"
  default     = "dev"
}

variable "db_username" {
  description = "Username for PostgreSQL database"
  default     = "dbuser"
}

variable "db_password" {
  description = "Password for PostgreSQL database"
  sensitive   = true
}
