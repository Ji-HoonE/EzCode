# 1단계: 빌드 단계
FROM node:18-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 종속성 파일 복사 후 설치
COPY pnpm-lock.yaml package.json ./
RUN pnpm install

# 앱 전체 복사 후 빌드
COPY . .
RUN pnpm run build

# 2단계: 실행 단계
FROM node:18-alpine AS runner

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 의존성과 빌드 결과물 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start"]
