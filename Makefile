start:
	docker-compose up -d

stop:
	docker-compose down

ssh:
	docker exec -it $(shell docker ps -aqf "name=nest") /bin/bash

docker-init-test:
	docker exec -it $(shell docker ps -aqf "name=nest") make init-test

docker-test:
	docker exec -it $(shell docker ps -aqf "name=nest") npm test

init-test:
	npm run console:dev drop-test-db && npm run console:dev init-test-db && NODE_ENV=test npm run typeorm:migrate && npm run console:test create-groups

docker-init-db:
	docker exec -it $(shell docker ps -aqf "name=cockroachdb") cockroach sql --insecure -e "CREATE DATABASE nest ENCODING 'UTF8';"

setup:
	make init-test && npm run typeorm:migrate && npm run console:dev create-groups
