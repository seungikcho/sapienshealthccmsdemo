#!/bin/bash
set -e

# Install pnpm
npm install -g pnpm@10.4.1

# Install dependencies
pnpm install --frozen-lockfile

# Build frontend + server
pnpm run build
