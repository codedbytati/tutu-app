FROM node:22-alpine AS base

WORKDIR /app/microfrontends/apps/extract

COPY microfrontends/apps/extract/package.json microfrontends/apps/extract/package-lock.json ./
RUN npm install

COPY microfrontends/apps/extract ./
COPY microfrontends/shared /app/microfrontends/shared

EXPOSE 5001

CMD ["npm", "run", "dev"]