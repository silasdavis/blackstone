#!/bin/sh

set -e

if [[ "$CIRCLE_BRANCH" != "master" ]]; then
    CHAIN_INFO="${CHAIN_INFO}-dev";
fi

CHAIN_OUT_DIR="${CHAIN_INFO_HOST}/${CHAIN_INFO}"
CHAIN_INFO_URL="https://${CHAIN_INFO_HOST}/${CHAIN_INFO}"
git config --global user.name "Billings, a Bot"
git config --global user.email "billings@monax.io"
git clone git@github.com:agreements-network/info $CHAIN_INFO_HOST
mkdir -p ${CHAIN_OUT_DIR}/abi
mkdir -p ${CHAIN_OUT_DIR}/specs

while read -r abi; do
    echo "${CHAIN_INFO_URL}/abi/${abi}.bin" >> ${CHAIN_OUT_DIR}/abi-new.csv
    cp /tmp/bin/${abi}.bin ${CHAIN_OUT_DIR}/abi/.
done < ./contracts/abi.csv

mv ${CHAIN_OUT_DIR}/abi-new.csv ${CHAIN_OUT_DIR}/abi.csv

for spec in ./api/sqlsol/*; do
    echo "${CHAIN_INFO_URL}/specs/$(basename ${spec})" >> ${CHAIN_OUT_DIR}/spec-new.csv
    cp $spec ${CHAIN_OUT_DIR}/specs/.
done

mv ${CHAIN_OUT_DIR}/spec-new.csv ${CHAIN_OUT_DIR}/spec.csv
cd ${CHAIN_INFO_HOST}
git add -A :/
git commit -m "Automatic info generation from AN build on `date`" || true
git push
