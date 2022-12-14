# integrate with terraform cloud
# - get hcp credentials
# - create bootstrap workspace
# provision vault with infrastructure secrets
# - grafana
# -  
#

terraform {
  cloud {
    organization = "AnyVibesOnly"

    workspaces {
      name = "bootstrap"
    }
  }
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "do_token" {
  default     = ""
  description = "Access token for Digital Ocean"
}

variable "hcp_client_id" {
  description = "Service Principal client id"
}

variable "hcp_client_secret" {

  description = "Service Principal client id"
}

provider "digitalocean" {
  token = var.do_token
}

provider "hcp" {
  client_id     = var.hcp_client_id
  client_secret = var.hcp_client_secret
}

variable "vault_addr" {
  description = "Vault address"
}

variable "vault_token" {
  description = "Vault token"
}

provider "vault" {
  address = var.vault_addr
  token   = var.vault_token
}

variable "traefik_ee_license" {
  description = "Traefik Enterprise Edition license key"
}
