# apps/backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# No longer need to install anything inside Docker
COPY apps/backend/dist ./dist

EXPOSE 3001
CMD ["node", "dist/index.js"]
