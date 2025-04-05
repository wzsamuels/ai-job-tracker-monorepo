# apps/backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy only what's needed to install deps
COPY apps/backend/package.json ./
COPY pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@8.15.1 --activate \
  && pnpm install --prod

# Copy the compiled output
COPY apps/backend/dist ./dist

EXPOSE 3001
CMD ["node", "dist/index.js"]
