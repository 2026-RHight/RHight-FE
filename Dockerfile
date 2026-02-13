# 1. Build Stage (Node 24 적용)
FROM node:24-alpine as builder
WORKDIR /app
COPY package*.json ./
# CI 환경에서는 npm ci가 더 빠르고 안정적입니다
RUN npm ci
COPY . .
RUN npm run build

# 2. Production Stage
FROM nginx:alpine
# 빌드된 결과물 복사 (Vite/Vue 기본 빌드 경로인 dist 기준)
COPY --from=builder /app/dist /usr/share/nginx/html
# Nginx 설정 (SPA 라우팅용, 아래 설정파일 필요)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]