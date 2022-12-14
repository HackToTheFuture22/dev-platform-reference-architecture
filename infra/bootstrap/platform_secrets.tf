resource "vault_kv_secret_v2" "digitalocean_token" {
  mount     = vault_mount.kvv2_platform.path
  name      = "digitalocean_token"
  data_json = jsonencode({ token = var.do_token })
}

resource "vault_kv_secret_v2" "traefik_ee_license" {
  mount     = vault_mount.kvv2_platform.path
  name      = "traefik_ee_license"
  data_json = jsonencode({ license = var.traefik_ee_license })
}

resource "vault_policy" "read" {
  name   = "read-traefik"
  policy = <<EOT
  path "secret/traefik_ee_license" {
    capabilities = ["read"]
  }
  EOT
}
