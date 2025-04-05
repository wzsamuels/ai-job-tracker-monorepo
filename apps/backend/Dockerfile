# Start with Node base image
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy full monorepo into container
COPY . .

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.1 --activate

# Install deps and generate Prisma client *before* build
RUN pnpm install --frozen-lockfile \
  && pnpm --filter @ai-job-tracker/db exec prisma generate

# 🔥 Copy generated Prisma client to ensure it's available at runtime
# This must match where the compiled `dist/index.js` will import from
RUN mkdir -p packages/db/dist/prisma/generated \
  && cp -r packages/db/prisma/generated/* packages/db/dist/prisma/generated/

# Build backend (and deps via turbo pipeline)
RUN pnpm turbo run build --filter=backend...

# Set working directory to backend
WORKDIR /app/apps/backend

# Expose backend port
EXPOSE 3001

# Run compiled backend entrypoint
CMD ["node", "dist/index.js"]
