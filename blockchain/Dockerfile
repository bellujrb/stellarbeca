FROM node:18-slim AS builder

WORKDIR /usr/src/app

COPY api/package.json api/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY api/ ./

RUN yarn build

FROM node:18-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]