# Comfy 2.0

This is monorepo with Comfy application.

## Local development

To run application locally run:

```bash
npm run copy:env
```

You might need to adjust `.env` file to your needs.

Next step it to generate prisma dev migrations.
Those are required for database creation and can be run inside docker container.

```bash
npm run db:migrate
```

Then run:

```bash
docker compose up
```
