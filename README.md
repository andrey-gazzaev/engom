# Engom

## Install

### Step 0

- You need node (see the `engines` section in `package.json`);
- You need installed docker.

### Step 1

run
`	docker-compose up -d`

After this you should have two images `engom-db` and `engom-be`

You can also script using `PowerShell` and `Bash`:

- init-be.ps1;
- init.ps1.

### Step 2

run next commands

```bash
	npm ci
	npm start
```

After this, FE is deployed to http://localhost:4200/

BE:

- graphql editor - http://localhost:5433/graphiql
- API - http://localhost:5433/graphql

### P. S.

To modify database and server settings, see the `.env.*` files

## Environment

We stick to the default Angular-provided way to pass variables within the application, but, to keep the single source of truth and be able to pass bash/environment-provided variables, we also use `@ngx-env/builder`.

## For development and testing only

| Role    | Email                     | Password |
| ------- | ------------------------- | -------- |
| Student | Omari_Johns17@hotmail.com | student  |
| Teacher | Arlie_Gerlach@gmail.com   | teacher  |
| Admin   | admin@engom.com           | admin    |
