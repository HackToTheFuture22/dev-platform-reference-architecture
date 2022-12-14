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

resource "vault_policy" "read_platform" {
  name = "read-platform"

  policy = <<EOT
  path "/kvv2/data/*" {
    capabilities = ["read"]
  }

  path "sys/mounts" {
    capabilities = ["read"]
  }

  path "sys/mounts/kvv2" {
    capabilities = ["read"]
  }
EOT
}
