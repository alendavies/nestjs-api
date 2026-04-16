# NestJS API (Prisma + PostgreSQL)

Backend API built with NestJS 11, TypeScript and Prisma with PostgreSQL.

## Tech Stack

- Node.js 20+
- NestJS 11
- TypeScript 5
- Prisma 7
- PostgreSQL
- ESLint + Prettier

## Requirements

- `pnpm` installed
- PostgreSQL database available
- `.env` file with `DATABASE_URL`

Example `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
PORT=3000
```

## Install

```bash
pnpm install
```

## Prisma Workflow

This project uses Prisma 7 with config in `prisma.config.ts` and generated client output in `src/generated/prisma`.

```bash
# validate schema
pnpm prisma validate

# run migrations in development
pnpm prisma migrate dev

# regenerate Prisma client
pnpm prisma generate
```

## Run the API

```bash
# development
pnpm run start:dev

# production build + start
pnpm run build
pnpm run start:prod
```

Server default URL: `http://localhost:3000`

## Available Scripts

- `pnpm run start` - Start app
- `pnpm run start:dev` - Start in watch mode
- `pnpm run start:prod` - Run built app
- `pnpm run build` - Build to `dist/`
- `pnpm run lint` - Lint with ESLint
- `pnpm run format` - Format with Prettier
- `pnpm run test` - Unit tests
- `pnpm run test:e2e` - End-to-end tests
- `pnpm run test:cov` - Coverage report

## API Endpoints (Current)

Users module currently runs with in-memory data (not yet persisted through Prisma service):

- `GET /users`
- `GET /users?role=INTERN|ENGINEER|ADMIN`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

Payload fields for create/update:

- `name` (string, required on create)
- `email` (valid email, required on create)
- `role` (`INTERN` | `ENGINEER` | `ADMIN`, required on create)

## Notes

- Prisma schema: `prisma/schema.prisma`
- Prisma config: `prisma.config.ts`
- Generated Prisma client: `src/generated/prisma`
- Main bootstrap: `src/main.ts`

## Logging

- By default the application writes log files to a `logs/` folder located at the project root.
- The code uses `process.cwd()` to locate the project root so the log folder is created where the process is started.
