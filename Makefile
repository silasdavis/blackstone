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
build_contracts:
	contracts/build_contracts $(tgt)

.PHONY: deploy_contracts
deploy_contracts:
	contracts/deploy_contracts $(tgt)

.PHONY: test_contracts
test_contracts:
	contracts/test_contracts $(tgt)

.PHONY: copy_abis
copy_abis:
	contracts/copy_abis

### Node API

.PHONY: install_api
install_api:
	cd api && npm install

.PHONY: test_api
test_api: copy_abis
	cd api && npm test

### Run and test

.PHONY: all
all: | build_contracts deploy_contracts copy_abis install_api

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
# Build the container (copying in working dir)
.PHONY: docker_build
docker_build:
	docker-compose build

# Make sure we have fresh service images
.PHONY: docker_rebuild
docker_rebuild: clean
	docker-compose pull
	docker-compose build --no-cache

# To catch DCB args above so we build with CI user
.PHONY: docker_test
docker_test: docker_run_deps
	docker-compose logs -f chain > test/chain/burrow.log &
	docker-compose run api make test

# Just run the dependency services in docker compose (you can build and deploy contracts and the run the API locally)
.PHONY: docker_run_deps
docker_run_deps:
	docker-compose up -d chain vent postgres hoard

# Build all the contracts and run the API its dependencies
.PHONY: docker_run_all
docker_run_all: docker_build
	docker-compose run api make all
	docker-compose up -d
	docker-compose logs --follow api &

# Build, deploy, and test contracts from within container (using packaged verison of solc - useful on mac)
.PHONY: docker_contracts
docker_contracts:
	docker-compose run api make build_contracts deploy_contracts test_contracts

# Just run the API and its dependencies
.PHONY: docker_run
docker_run: docker_build
	docker-compose up -d
	docker-compose logs --follow api &

.PHONY: docker_down
docker_down:
	pkill docker-compose || true
	docker-compose down
	docker-compose rm --force --stop
