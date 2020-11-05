# Service
resource "kubernetes_service" "frontapp" {
  metadata {
    name = var.app_name
  }
  spec {
    selector = {
      app = var.app_name
    }

    port {
      port        = var.port
      target_port = var.port
      protocol    = "TCP"
      name        = "http"
    }

    type = "NodePort"
  }
}

# Ingress
resource "kubernetes_ingress" "frontapp" {
  metadata {
    name = var.app_name
  }

  spec {
    backend {
      service_name = var.app_name
      service_port = var.port
    }

    rule {
      host = "${var.app_name}${data.terraform_remote_state.kube_cluster.outputs.cluster_wildcard_dns}"
      http {
        path {
          backend {
            service_name = var.app_name
            service_port = var.port
          }

          path = "/*"
        }
      }
    }
  }
}

# Deployment
resource "kubernetes_deployment" "frontapp" {
  metadata {
    name = var.app_name
    labels = {
      app = var.app_name
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = var.app_name
      }
    }

    template {
      metadata {
        labels = {
          app = var.app_name
        }
      }

      spec {
        image_pull_secrets {
          name = "docker-cfg"
        }

        container {
          image             = "docker.pkg.github.com/mycarbonfootprint/frontapp/frontapp:${var.frontapp_version}"
          name              = var.app_name
          image_pull_policy = "Always"

          port {
            container_port = var.port
          }
        }
      }
    }
  }
}
