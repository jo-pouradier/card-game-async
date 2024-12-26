# Stage 1: Build the application
FROM golang:1.20 AS builder

# Set the working directory
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the application as a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -o myapp .

# Stage 2: Create the minimal runtime image
FROM scratch

# Copy the built binary from the builder stage
COPY --from=builder /app/myapp /myapp

# Set default environment variable for the app port
ENV APP_PORT=8080

# Expose the port dynamically (not enforced, but useful as documentation)
EXPOSE ${APP_PORT}

# Command to run the application
ENTRYPOINT ["/myapp"]

