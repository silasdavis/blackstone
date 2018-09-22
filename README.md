```
/$$       /$$                     /$$                   /$$
| $$      | $$                    | $$                  | $$
| $$$$$$$ | $$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$$   /$$$$$$
| $$__  $$| $$ |____  $$ /$$_____/| $$  /$$/ /$$_____/|_  $$_/   /$$__  $$| $$__  $$ /$$__  $$
| $$  \ $$| $$  /$$$$$$$| $$      | $$$$$$/ |  $$$$$$   | $$    | $$  \ $$| $$  \ $$| $$$$$$$$
| $$  | $$| $$ /$$__  $$| $$      | $$_  $$  \____  $$  | $$ /$$| $$  | $$| $$  | $$| $$_____/
| $$$$$$$/| $$|  $$$$$$$|  $$$$$$$| $$ \  $$ /$$$$$$$/  |  $$$$/|  $$$$$$/| $$  | $$|  $$$$$$$
|_______/ |__/ \_______/ \_______/|__/  \__/|_______/    \___/   \______/ |__/  |__/ \_______/
```

This is the codebase for the Agreements Network.

## Run everything from within `docker-compose`

It's highly recommended to use `docker-compose` as described below to run all of the commands. This saves installation problems and environment problems between developers. (All commands should be run from the root of this repo.)

### Prerequisites

Install `make`, `docker`, and `docker-compose`. Now you're ready to go.

### Go VROOM!

To start the API from a completely clean repo:

```bash
make run_all
```

To start the API from a repo that has `node_modules` and `bundle_cache`:

```bash
make run
```

Now, the API is available at `http://localhost:3080`.

To run the **entire** test suite run the following. **N.B.** -- this will take forever.

```bash
make test
```

### Test Bundles

To run the test step for a single bundle of contracts run the following. **N.B.** in the following command no spaces are entered between the target bundles. To only run one bundle do not enter a comma.

```bash
make test_contracts tgt=agreements,bpm-runtime
```

To run the test step for all the bundles of contracts run the following:

```bash
make test_all_contracts
```

### Work with the API

To run the npm install for the API run the following:

```bash
make install_api
```

To run the API test suite (without installing NPM or the bundles) run the following:

```bash
make test_api
```

To run the full API test suite (including running NPM install and installing the bundles) run the following:

```bash
make test_all_api
```

To restart the API but leave the chain running follow this sequence:

1. `make run` -> this operation is non-blocking and will return you to your terminal. It will background processes that will follow the logs.
2a. To turn everything off (including the chain) from here run `make clean`.
2b. To only reboot the API but leave the chain running from here run `make restart_api`. This is a *blocking* call and will not return you to your terminal.
3a. To reboot the API (again): `ctrl+c` then `make restart_api`. Rinse and repeat as needed.
3b. To turn everything off or reset the chain or whatever: `ctrl+c` then `make clean`.

### Cleanup

To run the clean step in docker (useful for clearing caches and reseting defaults) run the following:

```bash
make clean
```

To clean the **entire** system (including node_modules and bundle_cache) run the following:

```bash
make clean_all
```

### Work Manually

Finally, if you'd like to run the commands one by one to debug you can go into bash with the following command and then run the commands individually as if you were in the linux local console.

Create a new docker container and open bash

```bash
docker-compose run --service-ports chain bash
```

Prerequisites, if running for the first time:

```bash
cd api
npm install
```

Run pending migrations

```bash
npm run db:migrate:up:dev
```

The node application is now ready to run

```bash
npm run start
```

When you're finished working, then run the clean functions (note, this should be done rarely when in active development):

```bash
docker-compose rm --force --stop
```

From the project root directory, you can also run the tests, e.g.

```
./test/test_api.sh deploy
```

deploys the AN contracts, and leaves the contracts and chain intact. Afterwards:

```
cd api
npm run test
```

