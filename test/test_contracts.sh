#!/usr/bin/env bash
echo "Hello! I'm the marmot that tests the contracts."

CONTRACTS_DIRECTORY=${CONTRACTS_DIRECTORY:-"./contracts"}
cd "$CONTRACTS_DIRECTORY/src"

contracts_log="./test-contracts.log"
jobs_log="./test-contracts-jobs.log"
if [[ ${1+x} ]]; then
    # commandline parameter provided; test identified bundles
    IFS=',' read -r -a testBundles <<<"$1"

    echo "Running ${#testBundles[@]} tests..."
    set -e
    for bundle in "${testBundles[@]}"
    do
        ./test/test_bundle.sh $bundle.yaml
    done
else
    # test all bundles
    testBundles=( $(ls test-*.yaml) )

    num_tests=${#testBundles[@]}
    echo "Running $num_tests tests..."
    parallel -k -j 15 --joblog ./test-contracts-jobs.log --no-notice ./test/test_bundle.sh ::: "${testBundles[@]}" &> ${contracts_log}
    failures=( $(awk 'NR==1{for(i=1;i<=NF;i++){if($i=="Exitval"){c=i;break}}} ($c=="1"&& NR>1){print $NF}' ${jobs_log}) )

    test_exit=${#failures[@]}

    if [[ "$test_exit" == "0" ]]; then
        echo "Tests completed successfully"
    else
        echo "Tests failed ($test_exit / $num_tests failed)"
        cat ${contracts_log}
        cat ${jobs_log}
    fi
    exit ${test_exit}

fi
