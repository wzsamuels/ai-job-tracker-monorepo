# Start with Node
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy entire monorepo into container
COPY . .

# Set up pnpm and install dependencies
RUN corepack enable && corepack prepare pnpm@8.15.1 --activate \
  && pnpm install --frozen-lockfile \
  && pnpm --filter @ai-job-tracker/db exec prisma generate \
  && pnpm turbo run build --filter=backend...

# Set working dir to the backend
WORKDIR /app/apps/backend

# Expose the backend port
EXPOSE 3001

# Run the server
CMD ["node", "dist/index.js"]
