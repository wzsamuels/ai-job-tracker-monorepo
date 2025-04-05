FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json + lockfile for faster caching
COPY apps/backend/package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

# Install only production deps
RUN corepack enable && corepack prepare pnpm@8.15.1 --activate && pnpm install --prod

# Copy built backend output
COPY apps/backend/dist ./dist

# Expose the port your app listens on
EXPOSE 3001

# Run the app
CMD ["node", "dist/index.js"]
