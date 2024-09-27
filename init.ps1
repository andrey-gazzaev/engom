# Stop and remove the Docker containers
docker-compose down

# Remove the Docker volume
docker volume rm engom_db

# Remove the Docker image
docker rmi engom-db

# Start the Docker containers
docker-compose up -d
