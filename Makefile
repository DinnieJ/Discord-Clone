build:
	cp ./discord-server/.env.example ./discord-server/.env
	docker-compose build
	docker-compose exec api npm install
	docker-compose exec api generate:key
	docker-compose exec client npm install

up:
	docker-compose up -d

up-log:
	docker-compose up

status:
	docker-compose ps

migrate:
	docker-compose exec api node ace migration:run

bash-server:
	docker-compose exec api bash

redis:
	docker-compose exec redis redis-cli

