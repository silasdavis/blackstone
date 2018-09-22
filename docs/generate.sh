#!/usr/bin/env bash

eval $(ssh-agent -s)
echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null
mkdir -p $HOME/.ssh && chmod 700 $HOME/.ssh
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
git config --global user.name "Billings, a Bot"
git config --global user.email "billings@monax.io"

git clone git@github.com:agreements-network/docs ../docs.agreements.network
cd ../docs.agreements.network
git checkout staging
cd $CI_PROJECT_DIR
mkdir docs/docdev
cd contracts/src
burrow deploy --file=generate-devdocs.yaml
cd $CI_PROJECT_DIR/docs/generator
npm install
cd $CI_PROJECT_DIR
node docs/generator/docgen-contract.js docs/docdev > ../docs.agreements.network/content/smart_contracts.md

npm install -g apidoc apidocjs-markdown
apidoc \
  --config docs/generator \
  --input api/routes/ \
  --output docs/apidoc
apidocjs-markdown \
  --path docs/apidoc \
  --output ../docs.agreements.network/content/rest_api.md \
  --template docs/generator/apiDocTemplate.md

cd ../docs.agreements.network
git add -A :/
git commit -m "Automatic docs generation from AN build $CI_COMMIT_SHA" || true
git push
