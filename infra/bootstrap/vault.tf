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
