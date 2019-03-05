# /$$       /$$                     /$$                   /$$
# | $$      | $$                    | $$                  | $$
# | $$$$$$$ | $$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$$   /$$$$$$
# | $$__  $$| $$ |____  $$ /$$_____/| $$  /$$/ /$$_____/|_  $$_/   /$$__  $$| $$__  $$ /$$__  $$
# | $$  \ $$| $$  /$$$$$$$| $$      | $$$$$$/ |  $$$$$$   | $$    | $$  \ $$| $$  \ $$| $$$$$$$$
# | $$  | $$| $$ /$$__  $$| $$      | $$_  $$  \____  $$  | $$ /$$| $$  | $$| $$  | $$| $$_____/
# | $$$$$$$/| $$|  $$$$$$$|  $$$$$$$| $$ \  $$ /$$$$$$$/  |  $$$$/|  $$$$$$/| $$  | $$|  $$$$$$$
# |_______/ |__/ \_______/ \_______/|__/  \__/|_______/    \___/   \______/ |__/  |__/ \_______/
#
DCB_ARGS := --build-arg UID=$(shell id -u) --build-arg GID=$(shell id -g)

.PHONY: build_contracts
build_contracts:
	docker-compose run api contracts/build_contracts $(tgt)
	docker-compose rm -f

.PHONY: deploy_contracts
deploy_contracts:
	docker-compose run api contracts/deploy_contracts $(tgt)

.PHONY: test_contracts
test_contracts:
	docker-compose run api test/test_contracts.sh $(tgt)

.PHONY: install_api
install_api: build_docker
	docker-compose run --workdir /app/api api npm install

.PHONY: test_api
test_api:
	docker-compose run api test/test_api.sh

.PHONY: deploy_test_api
deploy_test_api: | build_contracts deploy_contracts test_api

.PHONY: run
run: | clean
	docker-compose up -d
	docker-compose logs --follow api &

.PHONY: run_all
run_all: | clean build_docker build_contracts deploy_contracts install_api run

.PHONY: restart_api
restart_api:
	pkill docker-compose || true
	docker-compose exec api test/restart_api.sh

# Full test (run by CI)
.PHONY: test
# Ordered execution
test: | build_docker install_api build_contracts deploy_contracts test_contracts deploy_test_api

.PHONY: down
down:
	pkill docker-compose || true
	docker-compose down
	docker-compose rm --force --stop

.PHONY: clean
clean: down
	docker-compose run --no-deps api test/clean

.PHONY: clean_all
clean_all: down
	docker-compose run --no-deps api test/clean all


.PHONY: build_docker
build_docker:
	docker-compose build ${DCB_ARGS}

# Make sure we have fresh service images
.PHONY: rebuild_docker
rebuild_docker: clean
	docker-compose pull
	docker-compose build ${DCB_ARGS} --no-cache
