variable "app_name" {
    type = string
    default = "frontapp"
}

variable "port" {
  type = number
  default = 80
}

variable "frontapp_version" {
  type = string
  default = "latest"
}
