resource "hcp_hvn" "hvn" {
  hvn_id         = "hvn"
  cloud_provider = "aws"
  region         = "us-west-2"
  cidr_block     = "172.25.16.0/20"
}

resource "hcp_vault_cluster" "vault_cluster" {
  cluster_id      = "vault-cluster"
  hvn_id          = hcp_hvn.hvn.hvn_id
  tier            = "starter_small"
  public_endpoint = true
  lifecycle {
    prevent_destroy = true
  }
}

resource "vault_mount" "kvv2" {
  path        = "kvv2"
  type        = "kv"
  options     = { version = "2" }
  description = "KV Version 2 secret engine mount"
}

resource "vault_kv_secret_backend_v2" "config" {
  mount        = vault_mount.kvv2.path
  max_versions = 5
  cas_required = false
}

resource "vault_namespace" "apps" {
  path = "apps"
}
