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

# Create newt user and set up home directory
RUN adduser -D -h /home/newt -s /bin/sh newt

# Create startup script
RUN cat > /usr/local/bin/start-newt.sh << 'EOF'
#!/bin/sh
set -e

CONFIG_FILE="/home/newt/config.json"

echo "Starting Newt..."

# Check if config file exists and is readable
if [ ! -f "$CONFIG_FILE" ]; then
    echo "ERROR: Configuration file not found at $CONFIG_FILE"
    echo "Please use the 'Configure Pangolin Connection' action to set up your credentials."
    echo "Service will exit and retry until configured."
    exit 1
fi

# Read configuration from JSON file
CLIENT_ID=$(jq -r '.clientId // empty' "$CONFIG_FILE")
CLIENT_SECRET=$(jq -r '.clientSecret // empty' "$CONFIG_FILE")
ENDPOINT=$(jq -r '.endpoint // empty' "$CONFIG_FILE")

# Validate configuration
if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ] || [ -z "$ENDPOINT" ]; then
    echo "ERROR: Incomplete configuration in $CONFIG_FILE"
    echo "Required fields: clientId, clientSecret, endpoint"
    echo "Please use the 'Configure Pangolin Connection' action to set up your credentials."
    exit 1
fi

echo "Configuration loaded successfully"
echo "Connecting to Pangolin at $ENDPOINT with client ID: ${CLIENT_ID:0:10}..."

# Start Newt with configuration from file
exec newt -id "$CLIENT_ID" -secret "$CLIENT_SECRET" -endpoint "$ENDPOINT" -metrics-admin-addr ":${METRICS_PORT:-2112}" -log-level "info"
EOF

RUN chmod +x /usr/local/bin/start-newt.sh

# Admin/metrics endpoint (Prometheus scrape)
# Port value is set via METRICS_PORT env var (defined in startos/utils.ts)
EXPOSE 2112

# Use tini as init system
ENTRYPOINT ["/sbin/tini", "--"]

# Set working directory to newt's home
WORKDIR /home/newt

# Switch to newt user
USER newt

# Run startup script
CMD ["/usr/local/bin/start-newt.sh"]
