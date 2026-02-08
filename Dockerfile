FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx playwright install --with-deps chromium

ENV BASE_URL=https://www.automationexercise.com
ENV CI=true

CMD ["npm", "test"]
