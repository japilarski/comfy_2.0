variable "region" {
  description = "AWS region"
}

variable "environment" {
  description = "Deployment environment"
}

variable "db_username" {
  description = "Username for PostgreSQL database"
}

variable "db_password" {
  description = "Password for PostgreSQL database"
  sensitive   = true
}

variable "db_port" {
  description = "Port for PostgreSQL database"
  default     = 5432
}
