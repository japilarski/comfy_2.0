# Local development

Local development is based on docker compose - tool for defining and running multi-container applications. 
It consists of four containers - PostgreSQL database, dev express server and database seeder frontend.  

```bash
npm run copy:env
```

You might need to adjust `.env` file to your needs.

Then run:

```bash
docker compose up
```

To rebuild the containers (e.g. to apply changes in infrastructure) run:

```bash
npm run recreate:dev
```
