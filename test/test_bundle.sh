#!/usr/bin/env bash

deploy_cmd="burrow deploy --chain-url=$CHAIN_URL_GRPC --mempool-signing --address $CONTRACTS_DEPLOYMENT_ADDRESS --file $1"
echo
echo -e "Testing bundle:\t\t\t\t\t\t\t\t=> $1"
echo -e "executing:\t$deploy_cmd"
echo
eval "${deploy_cmd}"