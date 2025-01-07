FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
RUN bun install
COPY . ./
EXPOSE 4173
RUN BUN_JSC_forceRAMSize=134217728 bun run build
ENTRYPOINT [ "bun", "run", "preview" ]