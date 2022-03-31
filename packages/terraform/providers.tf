terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}
