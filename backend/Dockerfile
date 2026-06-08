FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Render injects PORT at runtime (often 10000). EXPOSE is metadata only.
EXPOSE 10000

# Run node directly so SIGTERM from Render reaches the process (npm wrapper can swallow signals).
CMD ["node", "dist/index.js"]
