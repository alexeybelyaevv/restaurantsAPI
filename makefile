composedev:
	docker compose --env-file .development.env up --build

composeprod:
	docker compose --env-file .production.env up --build

down:
	docker compose down

logs:
	docker compose logs -f

restart-dev:
	docker compose --env-file .development.env down
	docker compose --env-file .development.env up --build

restart-prod:
	docker compose --env-file .production.env down
	docker compose --env-file .production.env up --build