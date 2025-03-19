# Create a VPC
resource "aws_vpc" "main_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

# Create private subnets for the database
resource "aws_subnet" "private_subnet_av_zone_a" {
  vpc_id            = aws_vpc.main_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.region}a"

  tags = {
    Name        = "${var.environment}-private-subnet-a"
    Environment = var.environment
  }
}

# resource "aws_subnet" "private_subnet_av_zone_b" {
#   vpc_id            = aws_vpc.main_vpc.id
#   cidr_block        = "10.0.2.0/24"
#   availability_zone = "${var.region}b"
#
#   tags = {
#     Name        = "${var.environment}-private-subnet-b"
#     Environment = var.environment
#   }
# }

# Internet Gateway for the VPC
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main_vpc.id

  tags = {
    Name = "main-igw"
  }
}

# Route Table for the VPC
resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "main-route-table"
  }
}

# Associate the route table with both subnets
resource "aws_route_table_association" "route_table_private_subnet_av_zone_a" {
  subnet_id      = aws_subnet.private_subnet_av_zone_a.id
  route_table_id = aws_route_table.main.id
}

# resource "aws_route_table_association" "route_table_private_subnet_av_zone_b" {
#   subnet_id      = aws_subnet.private_subnet_av_zone_b.id
#   route_table_id = aws_route_table.main.id
# }

# Create security group for the database
resource "aws_security_group" "main_sg" {
  name        = "${var.environment}-main-security-group"
  description = "Security group for RDS and Lambda"
  vpc_id      = aws_vpc.main_vpc.id

  ingress {
    description = "PostgreSQL"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    self        = true
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.environment}-main-security-group"
    Environment = var.environment
  }
}

# DB Subnet Group
resource "aws_db_subnet_group" "db_subnet_group" {
  name       = "main"
  subnet_ids = [aws_subnet.private_subnet_av_zone_a.id] //, aws_subnet.private_subnet_av_zone_b.id]

  tags = {
    Name = "My DB subnet group"
  }
}
