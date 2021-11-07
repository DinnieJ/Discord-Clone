build:
	docker-compose build
	docker-compose up -d
	docker-compose exec api composer install
	docker-compose exec api composer update
	docker-compose exec api php artisan key:generate
	docker-compose exec api composer dump-autoload
migrate:
	docker-compose exec api php artisan migrate

cache:
	docker-compose exec api php artisan cache:clear
	docker-compose exec api php artisan config:clear
	docker-compose exec api php artisan route:clear
	docker-compose exec api php artisan optimize
	docker-compose exec api composer dump-autoload
