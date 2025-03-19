variable "environment" {
  description = "Deployment environment"
}

variable "vpc_id" {
  description = "ID of the VPC"
}

variable "private_subnet_av_zone_a_id" {
  description = "ID of the availability zone A private subnet"
}

# variable "private_subnet_av_zone_b_id" {
#   description = "ID of the availability zone B private subnet"
# }

variable "main_sg_id" {
  description = "ID of the main security group"
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
