# Comfy 2.0

This is monorepo with Comfy application.

## Local development

### Backend 

Local development backend is build based on docker compose - tool for defining and running multi-container applications. It consists of two containers - PostgreSQL database and express server. Before express server is run, database is seeded. 

```bash
npm run copy:env
```

You might need to adjust `.env` file to your needs.

Next step it to generate prisma dev migrations. Those are required for database creation and can be run inside docker container.

```bash
npm run db:migrate
```

Then run:

```bash
docker compose up
```

### Frontend

Fronted uses React and Vite. To start development server run:

```bash
 npm run frontend:dev
```
