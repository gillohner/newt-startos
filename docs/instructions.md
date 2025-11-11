# Instructions for Newt

## About

Newt is a fully userspace WireGuard tunnel client that connects to [Pangolin](https://pangolin.net/), enabling secure access to your services through encrypted WireGuard tunnels without managing complex networking configurations.

## Prerequisites

Before using Newt, you must:

1. Have a [Pangolin](https://pangolin.net/) account
2. Access to the Pangolin dashboard
3. Create a Newt client in your Pangolin dashboard

Visit the [Pangolin Documentation](https://docs.pangolin.net/) for account setup and detailed information.

## Initial Setup

When you first install Newt, it will **not** connect automatically. Follow these steps to configure and connect:

### Step 1: Prepare Pangolin Credentials

1. Log in to your [Pangolin dashboard](https://pangolin.net/)
2. Create a new Newt client or select an existing one
3. **Enable/activate the Newt client** in the dashboard
4. Copy the following credentials:
   - **Client ID** - Unique identifier for this client
   - **Client Secret** - Authentication secret (keep private!)
   - **Endpoint URL** - Your Pangolin server URL (e.g., `https://pangolin.riginode.xyz`)

### Step 2: Configure Newt on StartOS

1. Open the Newt service in your StartOS dashboard
2. Navigate to **Actions**
3. Select **"Configure Pangolin Connection"**
4. Enter your Pangolin credentials:
   - **Client ID**: Paste from Pangolin dashboard
   - **Client Secret**: Paste from Pangolin dashboard
   - **Pangolin Endpoint**: Your Pangolin server URL
5. Click **Execute**
6. The service will automatically restart to apply changes

### Step 3: Verify Connection

After the service restarts, verify the connection was successful:

1. **Check Health Indicators** in the StartOS dashboard:
   - **Newt Service**: Should show "Newt is running"
   - **Pangolin Connection**: Shows connection attempt status

2. **Check Service Logs** for detailed connection status:
   - **Success**: Look for `Tunnel connection to server established successfully!`
   - **Failure**: Look for error messages like:
     - `No newt found with that newtId` - Client not enabled in Pangolin dashboard
     - `Failed to get token` - Check credentials are correct

> **Note:** Newt continues running even if connection fails (it retries automatically). Always check logs for actual connection status.

## Configuration Management

### Viewing Current Configuration

To see your current settings:
1. Go to **Actions** → **Configure Pangolin Connection**
2. The form will be pre-filled with existing values
3. Client Secret will be masked for security

### Updating Credentials

To change your Pangolin credentials:
1. Go to **Actions** → **Configure Pangolin Connection**
2. Modify the desired fields (Client ID, Secret, or Endpoint)
3. Click **Execute**
4. Service automatically restarts with new configuration
5. Check logs to verify new connection

### Configuration Storage

- Credentials are stored in `config.json` within the service volume
- Configuration persists across service restarts
- Included in service backups

## Monitoring

Newt exposes Prometheus metrics on port 2112 for monitoring systems. These metrics include:
- Connection status
- Data transfer statistics
- Active tunnels
- Performance metrics

Metrics are not intended for direct user access but can be scraped by monitoring tools.

## Troubleshooting

### Service Won't Start

**Symptom**: Service immediately stops after starting

**Solutions**:
- Check if you've run the "Configure Pangolin Connection" action
- Verify `config.json` exists in the service volume
- Review service logs for specific error messages

### Connection Failures

**Error**: `No newt found with that newtId`
- **Cause**: Client not registered or not enabled in Pangolin
- **Solution**: 
  1. Log in to your Pangolin dashboard
  2. Find your Newt client
  3. Ensure it's enabled/activated
  4. Verify the Client ID matches exactly

**Error**: `Failed to get token`
- **Cause**: Invalid credentials or endpoint unreachable
- **Solution**:
  1. Verify Client Secret is correct
  2. Check Pangolin endpoint URL is accessible
  3. Ensure client is active in Pangolin dashboard
  4. Reconfigure using "Configure Pangolin Connection" action

### Health Check Shows "Running" but No Connection

**Symptom**: Newt Service shows as running, but tunnels don't work

**Explanation**: Newt continues running even when connection fails (it retries automatically)

**Solution**:
1. Open service logs
2. Look for connection error messages
3. Address specific errors (see Connection Failures above)
4. If needed, reconfigure credentials

### Updating After Pangolin Changes

If you regenerate credentials in Pangolin:
1. Use "Configure Pangolin Connection" action
2. Enter new credentials
3. Service restarts automatically
4. Verify connection in logs

## Security Best Practices

- **Client Secret**: Never share your Client Secret. It's equivalent to a password.
- **Credential Storage**: Secrets are stored encrypted within the service volume
- **UI Masking**: Client Secret is always masked in the UI
- **Log Security**: Only first 10 characters of Client ID appear in logs
- **Backups**: Credentials are included in service backups - keep backups secure

## Additional Resources

- [Pangolin Website](https://pangolin.net/)
- [Pangolin Documentation](https://docs.pangolin.net/)
- [Newt GitHub Repository](https://github.com/fosrl/newt)
- [StartOS Documentation](https://docs.start9.com/)

## Support

For issues specific to:
- **Newt functionality**: [Newt GitHub Issues](https://github.com/fosrl/newt/issues)
- **Pangolin service**: [Pangolin Support](https://docs.pangolin.net/)
- **StartOS packaging**: [newt-startos Issues](https://github.com/gillohner/newt-startos/issues)

2. **Verify Pangolin Server**: Make sure your Pangolin server is running and
   accessible
3. **Check Logs**: View Newt service logs in StartOS for detailed error messages
4. **Network**: Ensure StartOS can reach your Pangolin endpoint (check
   firewall/network settings)

### Service Won't Start

1. Check the service logs in StartOS interface
2. Verify configuration file format is valid JSON
3. Ensure all required fields are populated
4. Try restarting the service

### No Metrics Available

1. Verify port 2112 is accessible
2. Check if the service is running
3. Look for firewall blocking the metrics port

## Support

- **Newt Documentation**: [docs.pangolin.net](https://docs.pangolin.net/)
- **Pangolin Support**: [pangolin.net](https://pangolin.net/)
- **Newt GitHub**: [github.com/fosrl/newt](https://github.com/fosrl/newt)
- **StartOS Community**: [start9.com/support](https://start9.com/support)
