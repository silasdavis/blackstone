#!/usr/bin/env sh
export CI_PROJECT_DIR=`pwd`
export BURROW_VERSION="0.23.1"
export SOLC_VERSION="0.4.25"

# Prerequisites
apk add --no-cache --update curl openssh git
curl -L https://github.com/hyperledger/burrow/releases/download/v${BURROW_VERSION}/burrow_${BURROW_VERSION}_Linux_x86_64.tar.gz > /tmp/burrow.tar.gz
tar -xzf /tmp/burrow.tar.gz -C /usr/local/bin/
curl -L https://github.com/ethereum/solidity/releases/download/v${SOLC_VERSION}/solc-static-linux > /usr/local/bin/solc
chmod +x /usr/local/bin/solc
npm config set unsafe-perm true # https://github.com/npm/uid-number/issues/3
npm install -g apidoc apidocjs-markdown json2md

# Setup Git
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > $HOME/.ssh/config
git config --global user.name "Billings, a Bot"
git config --global user.email "billings@monax.io"
git clone git@github.com:agreements-network/docs ../docs.agreements.network
cd ../docs.agreements.network
git checkout staging
cd $CI_PROJECT_DIR

# Create Blackstone Contracts Docs
mkdir docs/docdev
mkdir contracts/src/bin #TMP - needed because of bug in burrow/deploy
cd contracts/src
burrow deploy --file=generate-devdocs.yaml
cd $CI_PROJECT_DIR
# node docs/generator/docgen-contract.js docs/docdev > ../docs.agreements.network/content/smart_contracts.md
node docs/generator/docgen-contract.js contracts/src/bin > ../docs.agreements.network/content/smart_contracts.md # TMP - needed because of bug in burrow deploy

# Create Blackstone API Docs
apidoc \
  --config docs/generator \
  --input api/routes/ \
  --output docs/apidoc
apidocjs-markdown \
  --path docs/apidoc \
  --output ../docs.agreements.network/content/rest_api.md \
  --template docs/generator/apiDocTemplate.md

# Push to docs repo
cd ../docs.agreements.network
git add -A :/
git commit -m "Automatic docs generation from AN build $CIRCLE_SHA1" || true
git push
