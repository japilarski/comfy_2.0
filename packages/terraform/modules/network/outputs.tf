output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "db_subnet_group_name" {
  value = aws_db_subnet_group.db_subnet_group.name
}

output "db_security_group_id" {
  value = aws_security_group.db_sg.id
}

output "lambda_subnet_id" {
  value = aws_subnet.lambda_subnet.id
}

output "lambda_security_group_id" {
  value = aws_security_group.lambda_sg.id
}
