# /$$       /$$                     /$$                   /$$
# | $$      | $$                    | $$                  | $$
# | $$$$$$$ | $$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$$   /$$$$$$
# | $$__  $$| $$ |____  $$ /$$_____/| $$  /$$/ /$$_____/|_  $$_/   /$$__  $$| $$__  $$ /$$__  $$
# | $$  \ $$| $$  /$$$$$$$| $$      | $$$$$$/ |  $$$$$$   | $$    | $$  \ $$| $$  \ $$| $$$$$$$$
# | $$  | $$| $$ /$$__  $$| $$      | $$_  $$  \____  $$  | $$ /$$| $$  | $$| $$  | $$| $$_____/
# | $$$$$$$/| $$|  $$$$$$$|  $$$$$$$| $$ \  $$ /$$$$$$$/  |  $$$$/|  $$$$$$/| $$  | $$|  $$$$$$$
# |_______/ |__/ \_______/ \_______/|__/  \__/|_______/    \___/   \______/ |__/  |__/ \_______/
#
.PHONY: build_contracts
build_contracts:
	docker-compose run --workdir=/app/contracts/src chain burrow deploy -f $(if $(tgt),build-$(tgt),build.yaml)

.PHONY: test_contracts
test_contracts: build_contracts
	docker-compose run chain test/test_contracts.sh $(tgt)

.PHONY: install_api
install_api:
	docker-compose run --workdir=/app/api chain npm install

.PHONY: test_api
test_api: clean
	docker-compose run chain test/test_api.sh

.PHONY: run
run: clean
	docker-compose up -d
	docker-compose logs --follow chain &

.PHONY: run_all
run_all: install_api run

.PHONY: restart_api
restart_api:
	pkill docker-compose || true
	docker-compose exec chain test/restart_api.sh

.PHONY: test
test: test_contracts test_api clean

.PHONY: clean
clean:
	pkill docker-compose || true
	docker-compose run --no-deps chain test/clean
	docker-compose rm --force --stop

.PHONY: clean_all
clean_all:
	pkill docker-compose || true
	docker-compose run --no-deps chain test/clean all
	docker-compose rm --force --stop
