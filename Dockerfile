# 1. Собираем приложение (Vite + React)
FROM node:alpine as builder

WORKDIR /app
# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json vite.config.ts tsconfig.json ./

RUN npm ci

COPY . .
RUN npm run build

# 2. Развертываем приложение на nginx
FROM nginx:alpine

# Заменяем дефолтную страницу nginx соответствующей веб-приложению
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./images /usr/share/nginx/html/images
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.pid /etc/nginx/logs/nginx.pid

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]