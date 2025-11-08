# Build stage only
FROM node:20-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
COPY .env.production .env
RUN npm run build

# Just copy the build artifacts to a volume
FROM alpine as final
COPY --from=builder /app/dist /app/dist