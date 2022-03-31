variable "gke_username" {
  default     = ""
  description = "gke username"
}

variable "gke_password" {
  default     = ""
  description = "gke password"
}

# GKE clusters
resource "google_container_cluster" "primary" {
  name     = "${var.project_slug}-gke"
  location = var.region

  initial_node_count = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  cluster_autoscaling {
    enabled = true

    resource_limits {
      resource_type = "cpu"
      minimum       = "1"
      maximum       = "2"
    }

    resource_limits {
      resource_type = "memory"
      minimum       = "1"
      maximum       = "2"
    }
  }
}

resource "google_container_cluster" "secondary" {
  name     = "${var.project_slug}-gke-staging"
  location = var.region

  initial_node_count = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  cluster_autoscaling {
    enabled = true

    resource_limits {
      resource_type = "cpu"
      minimum       = "1"
      maximum       = "2"
    }

    resource_limits {
      resource_type = "memory"
      minimum       = "1"
      maximum       = "2"
    }
  }

}


