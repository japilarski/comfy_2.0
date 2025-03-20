output "vpc_id" {
  value = aws_vpc.main_vpc.id
}

output "db_subnet_group_name" {
  value = aws_db_subnet_group.db_subnet_group.name
}

output "main_security_group_id" {
  value = aws_security_group.main_sg.id
}

output "private_subnet_av_zone_a_id" {
  value = aws_subnet.private_subnet_av_zone_a.id
}

output "private_subnet_av_zone_b_id" {
  value = aws_subnet.private_subnet_av_zone_b.id
}
