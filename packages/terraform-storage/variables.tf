variable "profile" {
  description = "AWS profile name"
}
variable "region" {
  description = "AWS region"
  type = string
}
variable "environment" {
  type = string
}
variable "project_tag" {
  type = string
}
variable "bucket_name" {
  type = string
}