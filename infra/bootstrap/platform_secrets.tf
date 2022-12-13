resource "vault_kv_secret_v2" "digitalocean_token" {
  mount     = vault_mount.kvv2_platform.path
  name      = "digitalocean_token"
  data_json = jsonencode({ token = var.do_token })
}
