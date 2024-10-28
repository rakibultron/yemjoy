FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/yemjoy/comments


COPY ./package.json ./

RUN pnpm install
COPY ./ ./

EXPOSE 4000
CMD [ "pnpm","run","start" ]
