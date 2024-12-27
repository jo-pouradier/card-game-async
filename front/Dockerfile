#Use the official Node.js image as the base image
FROM node:22.11.0 AS build-stage

#Set the working directory inside the container
WORKDIR /app

#Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the application files
COPY . .

#Build the Vue.js application
RUN npm run build

#Production stage
FROM nginx:mainline-alpine-perl AS production-stage

#Copy the build output to Nginx's default HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html
#Expose port 80 for the server for nginx
ENV PORT=80
EXPOSE ${PORT}

#Start Nginx server
CMD ["nginx", "-g", "daemon off;"]