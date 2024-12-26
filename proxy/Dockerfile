FROM node:22.11.0 as builder

# Set the working directory to /app
WORKDIR /app

# Copy the front directory into the container at /app
COPY ../front /app

# Install the dependencies
RUN npm install

# Build the front-end
RUN npm run build

# Start with the Nginx base image
FROM nginx:stable-alpine-perl

COPY nginx.conf /etc/nginx/nginx.conf
# Copy the front-end build files into the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8085 for the service
EXPOSE 8085
