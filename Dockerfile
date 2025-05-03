FROM node:20.12.2-slim AS builder

WORKDIR /app

# Copy package manifests and install deps
COPY package*.json ./
RUN npm ci

# Copy your prisma schema and ensure OpenSSL 3 is available
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl libssl3 && \
    rm -rf /var/lib/apt/lists/*

COPY prisma ./prisma/
RUN npx prisma generate

# Copy TS configs and source, then build
COPY tsconfig.json tsconfig-build.json ./
COPY src ./src/
RUN npm run build

FROM node:20.12.2-slim

WORKDIR /home/node/app

# Create non-root user
RUN mkdir -p /home/node/app \
    && chown -R node:node /home/node/app

# Copy over only what's needed
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/prisma      ./prisma

USER node

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

# Install curl (for healthcheck) and the OpenSSL runtime
USER root
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl libssl3 && \
    rm -rf /var/lib/apt/lists/*
USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Finally start the server
CMD ["sh", "-c", "npm run start"]
