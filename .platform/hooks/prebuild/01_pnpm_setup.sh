#!/bin/bash
echo "Enabling Corepack and configuring pnpm for Sapiens Health Monolith..."
corepack enable
corepack prepare pnpm@10.4.1 --activate

echo "Running pnpm frozen lockfile clean install..."
pnpm install --frozen-lockfile

echo "Compiling client production assets and Express production build..."
pnpm build
