#!/usr/bin/env bash

set -e
# Prerequisites
#npm config set unsafe-perm true # https://github.com/npm/uid-number/issues/3
pushd ./docs/generator
npm install
export PATH=$(npm bin):$PATH
popd

# Create Blackstone Contracts Docs
mkdir -p docs/docdev
pushd contracts/src
# Workaround for broken burrow
mkdir -p $(awk '/binpath/ { print $2 }' < generate-devdocs.yaml)
burrow deploy generate-devdocs.yaml
popd

node docs/generator/docgen-contract.js contracts/src/bin > docs/smart_contracts.md

# Create Blackstone API Docs
apidoc \
  --config docs/generator \
  --input api/routes/ \
  --output docs/apidoc

apidocjs-markdown \
  --path docs/apidoc \
  --output docs/rest_api.md \
  --template docs/generator/apiDocTemplate.md
