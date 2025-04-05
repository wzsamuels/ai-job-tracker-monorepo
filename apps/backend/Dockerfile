# apps/backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy only what's needed for install
COPY apps/backend/package.json ./package.json
COPY pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate && pnpm install --prod

# Copy the built output (this now works because context is root)
COPY apps/backend/dist ./dist

# PORT for backend
EXPOSE 3001

CMD ["node", "dist/index.js"]
