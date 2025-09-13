#!/bin/bash

mkdir -p .cursor

pnpm install

# Create mcp.json with the current directory path
echo "{
  \"mcpServers\": {
    \"TalkToFigma\": {
      \"command\": \"bunx\",
      \"args\": [
        \"cursor-talk-to-figma-mcp@latest\"
      ]
    }
  }
}" >.cursor/mcp.json
