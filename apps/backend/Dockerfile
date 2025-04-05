# apps/backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# No longer need to install anything inside Docker
COPY apps/backend/node_modules ./node_modules
COPY apps/backend/dist ./dist

# SERVER PORT 3001
EXPOSE 3001
CMD ["node", "dist/index.js"]
