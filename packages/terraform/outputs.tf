output "region" {
  value       = var.region
  description = "GCloud Region"
}

output "project_id" {
  value       = var.project_id
  description = "GCloud Project ID"
}

output "kubernetes_cluster_name_prod" {
  value       = google_container_cluster.primary.name
  description = "GKE Cluster Name"
}

output "kubernetes_cluster_host_prod" {
  value       = google_container_cluster.primary.endpoint
  description = "GKE Cluster Host"
}

output "kubernetes_cluster_name_staging" {
  value       = google_container_cluster.secondary.name
  description = "GKE Cluster Name"
}

output "kubernetes_cluster_host_staging" {
  value       = google_container_cluster.secondary.endpoint
  description = "GKE Cluster Host"
}


output "production_ip" {
  value = google_compute_global_address.production.address
}

output "production_ip_name" {
  value = google_compute_global_address.production.name
}

output "staging_ip" {
  value = google_compute_global_address.staging.address
}

output "staging_ip_name" {
  value = google_compute_global_address.staging.name
}

output "production_url" {
  value = "https://${var.project_slug}.labrys.group"
}

output "staging_url" {
  value = "https://${var.project_slug}-staging.labrys.group"
}

# Use terraform output to display connection strings.
output "connection_strings" {
  value = mongodbatlas_cluster.my_cluster.connection_strings.0.standard_srv
}

output "login_password" {
  value     = random_password.mongodb_atlas_database_user_password.result
  sensitive = true
}
