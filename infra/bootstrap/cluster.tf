resource "digitalocean_kubernetes_cluster" "anyvibes_kube" {
  name    = "anyvibes-kube"
  region  = "nyc1"
  version = "1.25.4-do.0"

  node_pool {
    name       = "worker-pool"
    size       = "s-2vcpu-2gb"
    node_count = 3
  }
}
