#!/usr/bin/env bash

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/preflight"

main() {
    config_app

    export NODE_ENV=testing

    cd "$API_DIRECTORY"

    if [[ $runAPI == "true" ]]; then
        echo "#### Starting API"
        npm run-script start:dev &
        while true; do
            sleep 10;
        done
    else
        echo "#### Starting API Tests"
        echo
        npm test
    fi

}

set -e
main $@
