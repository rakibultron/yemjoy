FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/yemjoy/eventbus


COPY ./package.json ./

RUN pnpm install
COPY ./ ./

EXPOSE 6000
CMD [ "pnpm","run","start" ]
