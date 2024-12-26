# Start with the Nginx base image
FROM nginx:stable-alpine-perl

# Copy your custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the front-end build files into the Nginx HTML directory
COPY ../front/dist /usr/share/nginx/html

# Expose port 8085 for the service
EXPOSE 8085
