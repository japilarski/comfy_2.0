# Create the PostgreSQL RDS instance
resource "aws_db_instance" "postgres" {
  identifier             = "${var.environment}-postgres-db"
  engine                 = var.db_engine
  engine_version         = var.db_engine_version
  instance_class         = var.db_instance_class
  allocated_storage      = var.db_allocated_storage
  max_allocated_storage  = 0   # Disable storage autoscaling
  storage_type           = var.storage_type

  # Database credentials
  db_name                = "${var.environment}db"
  username               = var.db_username
  password               = var.db_password

  # Network & security
  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = [var.db_security_group_id]
  publicly_accessible    = true

  # Backup and maintenance
  backup_retention_period = 0
  skip_final_snapshot     = true
  deletion_protection     = false

  # Performance Insights
  performance_insights_enabled = false

  # Additional settings
  multi_az                = false
  storage_encrypted       = false

  tags = {
    Project     = var.project_tag
    Name        = "${var.environment}-postgres-db"
    Environment = var.environment
  }
}
