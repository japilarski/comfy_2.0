variable "environment" {
  description = "Deployment environment"
}

variable "vpc_id" {
  description = "ID of the VPC"
}

variable "subnet_id" {
  description = "ID of the subnet for Lambda"
}

variable "security_group_id" {
  description = "ID of the security group for Lambda"
}


variable "db_host" {
  description = "Database host endpoint"
}

variable "db_name" {
  description = "Database name"
}

variable "db_username" {
  description = "Database username"
}

variable "db_password" {
  description = "Database password"
}

variable "db_port" {
  description = "Database port"
}
