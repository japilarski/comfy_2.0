variable "environment" {
  description = "Deployment environment"
}

variable "vpc_id" {
  description = "ID of the VPC"
}

variable "db_subnet_group_name" {
  description = "Name of the DB subnet group"
}

variable "db_security_group_id" {
  description = "ID of the DB security group"
}

variable "db_username" {
  description = "Username for the database"
}

variable "db_password" {
  description = "Password for the database"
  sensitive   = true
}

variable "db_instance_class" {
  description = "RDS instance class"
  default     = "db.t4g.micro"
}

variable "db_allocated_storage" {
  description = "Allocated storage in GB"
  default     = 20
}

variable "db_engine_version" {
  description = "PostgreSQL engine version"
  default     = "17.4"
}
