### Multi-stage Dockerfile
# 1) Build frontend (Vite)
# 2) Copy built files into backend `server/public`
# 3) Install backend deps and run server

FROM node:18 AS frontend-build
WORKDIR /app
COPY package.json package-lock.json* ./
# copy everything (including src/components/services used by the frontend)
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine AS backend
WORKDIR /app

# Copy backend package spec and install production deps
COPY server/package.json ./server/package.json
WORKDIR /app/server
RUN npm install --production

# Copy backend source files
COPY server ./server

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/dist ./server/public

ENV PORT=5000
EXPOSE 5000
WORKDIR /app/server
CMD ["node", "server.js"]
