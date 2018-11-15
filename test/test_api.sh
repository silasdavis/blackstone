#!/usr/bin/env bash
source "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/preflight"

main() {
  deploy_local

  if [[ $1 == "deploy" ]]; then
    exit 0
  fi

  cd $CI_PROJECT_DIR/api
  export NODE_ENV=testing

  if [[ $runAPI == "true" ]]; then
    echo "#### Starting API"
    npm run-script start:dev &
    while true; do sleep 10; done
  else
    echo "#### Starting API Tests"
    echo
    npm test
  fi
  cd $CI_PROJECT_DIR

}

set -e
main $@
