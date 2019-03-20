# /$$       /$$                     /$$                   /$$
# | $$      | $$                    | $$                  | $$
# | $$$$$$$ | $$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$$   /$$$$$$
# | $$__  $$| $$ |____  $$ /$$_____/| $$  /$$/ /$$_____/|_  $$_/   /$$__  $$| $$__  $$ /$$__  $$
# | $$  \ $$| $$  /$$$$$$$| $$      | $$$$$$/ |  $$$$$$   | $$    | $$  \ $$| $$  \ $$| $$$$$$$$
# | $$  | $$| $$ /$$__  $$| $$      | $$_  $$  \____  $$  | $$ /$$| $$  | $$| $$  | $$| $$_____/
# | $$$$$$$/| $$|  $$$$$$$|  $$$$$$$| $$ \  $$ /$$$$$$$/  |  $$$$/|  $$$$$$/| $$  | $$|  $$$$$$$
# |_______/ |__/ \_______/ \_______/|__/  \__/|_______/    \___/   \______/ |__/  |__/ \_______/
#

### Contracts

.PHONY: build_contracts
build_contracts: export CONTRACTS_DIRECTORY=./contracts/src
build_contracts:
	contracts/build_contracts $(tgt)

.PHONY: deploy_contracts
deploy_contracts: export CONTRACTS_DIRECTORY=./contracts/src
deploy_contracts:
	contracts/deploy_contracts $(tgt)

.PHONY: test_contracts
test_contracts: export CONTRACTS_DIRECTORY=./contracts/src
test_contracts:
	test/test_contracts.sh $(tgt)

.PHONY: copy_abis
copy_abis:
	contracts/copy_abis

### Node API

.PHONY: install_api
install_api: copy_abis
	cd api && npm install

.PHONY: test_api
test_api:
	cd api && npm test

### Run and test

.PHONY: all
all: | build_contracts deploy_contracts install_api

# Full test (run by CI)
.PHONY: test
# Ordered execution
test: | all test_contracts test_api

.PHONY: clean
clean:
	test/clean.sh

.PHONY: clean_all
clean_all:
	test/clean.sh all

### Docker Compose

DCB_ARGS := --build-arg UID=$(shell id -u) --build-arg GID=$(shell id -g)

# To catch DCB args above so we build with CI user
.PHONY: test_ci
test_ci: build_docker
	docker-compose run api make test

# Just run the dependency services in docker compose (you can build and deploy contracts and the run the API locally)
.PHONY: run_deps
run_deps:
	docker-compose up -d chain vent postgres hoard

# Build all the contracts and run the API its dependencies
.PHONY: run_all
run_all:
	docker-compose run api make all
	docker-compose up -d
	docker-compose logs --follow api &

# Just run the API and its dependencies
.PHONY: run
run:
	docker-compose up -d
	docker-compose logs --follow api &

.PHONY: down
down:
	pkill docker-compose || true
	docker-compose down
	docker-compose rm --force --stop

.PHONY: restart_api
restart_api:
	pkill docker-compose || true
	docker-compose exec api test/restart_api.sh

.PHONY: build_docker
build_docker:
	docker-compose build ${DCB_ARGS}

# Make sure we have fresh service images
.PHONY: rebuild_docker
rebuild_docker: clean
	docker-compose pull
	docker-compose build ${DCB_ARGS} --no-cache
