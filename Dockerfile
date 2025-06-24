# 1단계: 빌드 단계
FROM node:18-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 종속성 파일 복사 후 설치
COPY pnpm-lock.yaml package.json ./
RUN pnpm install

# 앱 전체 복사
COPY . .

#  build-time 환경변수 받을 ARG 정의
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL
ARG NEXT_PUBLIC_WS_URL

#  환경변수 주입하여 빌드 실행
RUN NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_WEBSOCKET_URL=$NEXT_PUBLIC_WEBSOCKET_URL \
    NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL \
    pnpm run build

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
