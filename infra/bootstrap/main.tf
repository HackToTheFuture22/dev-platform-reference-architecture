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
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
} 

variable "do_token" {
}

provider "digitalocean" {
  token = var.do_token
}

provider "hcp" {
}
