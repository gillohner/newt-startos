FROM golang:1.25.0-alpine AS builder

# Install git and ca-certificates
RUN apk --no-cache add ca-certificates git tzdata

# Set the working directory inside the container
WORKDIR /app

# Clone the newt repository
RUN git clone https://github.com/fosrl/newt.git .

# Download all dependencies
RUN go mod download

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /newt

FROM alpine:3.22 AS runner

RUN apk --no-cache add ca-certificates tzdata tini jq

COPY --from=builder /newt /usr/local/bin/newt

# Create newt user
RUN adduser -D -s /bin/sh newt

# Create startup script
RUN cat > /usr/local/bin/start-newt.sh << 'EOF'
#!/bin/sh
set -e

echo "Starting Newt..."
echo "Connecting to Pangolin at $PANGOLIN_ENDPOINT with client ID: ${NEWT_ID:0:8}..."

# Start Newt using environment variables
exec newt --metrics :2112 --log-level "$LOG_LEVEL"
EOF

RUN chmod +x /usr/local/bin/start-newt.sh

# Admin/metrics endpoint (Prometheus scrape)
EXPOSE 2112

# Use tini as init system
ENTRYPOINT ["/sbin/tini", "--"]

# Switch to newt user
USER newt

# Run startup script
CMD ["/usr/local/bin/start-newt.sh"]
