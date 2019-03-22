#!/usr/bin/env bash

set -e

DOCS_REPO=git@github.com:agreements-network/docs
DOCS_CHECKOUT=docs.agreements.network

# Setup Git
[[ -d ${DOCS_CHECKOUT} ]] || git clone ${DOCS_REPO} ${DOCS_CHECKOUT}
pushd ${DOCS_CHECKOUT}
git checkout staging
popd

# Copy docs generated by generate.sh
cp docs/smart_contracts.md docs/rest_api.md "$DOCS_CHECKOUT/api/content/"

pushd ${DOCS_CHECKOUT}
# Push to docs repo
git add -A :/
git config user.name "Billings, a Bot"
git config user.email "billings@monax.io"
git commit -m "Automatic docs generation from AN build $CIRCLE_SHA1" || true
git push
popd
