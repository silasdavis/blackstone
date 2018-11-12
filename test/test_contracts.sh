#!/usr/bin/env bash
source "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/preflight"

main() {
  echo "Hello! I'm the marmot that tests the contracts."

  cd $CI_PROJECT_DIR
  sleep 3
  cd $CONTRACTS_DIRECTORY

  if [[ ${1+x} ]]; then
    # commandline parameter provided; test identified bundles
    IFS=',' read -r -a testBundles <<< "$1"

    echo "Running ${#testBundles[@]} tests..."
    set -e
    for bundle in "${testBundles[@]}"
    do
      $CI_PROJECT_DIR/test/test_bundle.sh $bundle
    done
  else
    # test all bundles
    testBundles=($(ls test-*.yaml))

    echo "Running ${#testBundles[@]} tests..."
    parallel -k -j 15 --joblog $CI_PROJECT_DIR/test-contracts-jobs.log --no-notice $CI_PROJECT_DIR/test/test_bundle.sh ::: "${testBundles[@]}" &> $CI_PROJECT_DIR/test-contracts.log
    failures=($(awk 'NR==1{for(i=1;i<=NF;i++){if($i=="Exitval"){c=i;break}}} ($c=="1"&& NR>1){print $NF}' $CI_PROJECT_DIR/test-contracts-jobs.log))
    echo "Tests complete"

  fi
}

main $@
