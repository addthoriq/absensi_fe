FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
RUN bun install
COPY . ./
EXPOSE 4173
RUN bun run build
ENTRYPOINT [ "bun", "run", "preview" ]