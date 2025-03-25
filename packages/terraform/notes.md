# Development stage
Make all public to simplify the process of development.
1. RDS and Lambda in publicly available subnet callable from any IP address.

# Production plans:
### VPC Setup
1. Create a VPC with at least two private subnets across different availability zones
2. Include a NAT Gateway in a public subnet to allow your Lambda functions to access the internet if needed
3. Don't place your RDS or Lambda functions in public subnets

### Security Groups
1. **RDS Security Group**:
    - Allow inbound access on your database port (e.g., 3306 for MySQL) only from your Lambda security group
    - Block all other inbound traffic

2. **Lambda Security Group**:
    - Allow outbound access to your RDS security group on the database port
    - Allow outbound internet access if your functions need it
    - No inbound rules needed as Lambda is invoked by the service

3. **API Gateway**:
    - API Gateway itself sits outside your VPC
    - Use a resource policy to control who can access your API

### Lambda VPC Configuration
- Place Lambda functions that need database access in the same VPC as your RDS instance
- Put them in the private subnets
- Attach the Lambda security group

### Advanced Considerations
- Use VPC endpoints for AWS services to improve security and latency
- Consider using AWS Secrets Manager for database credentials
- Implement least privilege IAM roles for your Lambda functions

### API Gateway
- Limit CORS to front-end domain.
- Restrict access to CloudFront-distributed frontend.

### Cloud Front
- review cashing possibilities

This setup maintains security by isolating database in a private network while allowing only necessary communication between components.
