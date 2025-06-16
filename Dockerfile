# 1단계: 빌드 단계
FROM node:18-alpine AS builder

WORKDIR /app

# 패키지 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# 빌드
RUN npm run build

# 2단계: 실행 단계
FROM node:18-alpine AS runner

WORKDIR /app

# 의존성만 복사
COPY --from=builder /app/node_modules ./node_modules

# 빌드 결과물 및 필요한 파일 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Next.js 포트
EXPOSE 3000

# 실행
CMD ["npm", "start"]
