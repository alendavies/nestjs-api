# NestJS API (Prisma + PostgreSQL)

Backend API built with NestJS 11 and TypeScript. The project currently includes a `users` module with DTO validation and a Prisma setup targeting PostgreSQL.

## Tech Stack

- Node.js 20+
- NestJS 11
- TypeScript 5
- Prisma 7
- PostgreSQL
- Jest + Supertest
- ESLint + Prettier

## Project Structure

```
.
|- prisma/
|  |- migrations/
|  `- schema.prisma
|- src/
|  |- app.*
|  |- database/
|  |- generated/prisma/
|  `- users/
|- test/
|  |- app.e2e-spec.ts
|  `- jest-e2e.json
|- prisma.config.ts
`- package.json
```

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

## Troubleshooting

If Prisma IntelliSense/hover docs do not show in VS Code:

1. Install/enable the official `Prisma` extension.
2. Confirm file language mode is `Prisma`.
3. Run `Prisma: Restart Language Server`.
4. Reload VS Code window.
5. Validate schema with `pnpm prisma validate`.
