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

deploy_local() {
  echo "Hello! I'm the marmot who tests the Monax Agreements Network API."

  export CHAIN_URL_INFO="localhost:26658"
  export CHAIN_URL_GRPC="localhost:10997"
  test_setup
  sleep 3
  $CI_PROJECT_DIR/contracts/deploy_contracts

  echo
  echo "#### Copying public ABIs to $API_ABI_DIRECTORY_LOCAL"
  configApp

  echo
  echo "#### Agreements Network contracts successfully deployed"
}

configApp() {
  set +e
  mkdir -p $API_ABI_DIRECTORY_LOCAL
  while read -r abi; do
    cp $CONTRACTS_DIRECTORY/bin/$abi.bin $API_ABI_DIRECTORY_LOCAL/$abi.bin
  done < $CI_PROJECT_DIR/contracts/abi.csv
  set -e
}

set -e
main $@
