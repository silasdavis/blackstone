pragma solidity ^0.4.23;

import "commons-management/StorageDefProxied.sol";

/**
 * @title DelegateProxy
 * @dev Basic implementation of a proxy contract that delegates all calls to a "proxied" contract and returns the results to the caller.
 */
contract DelegateProxy is StorageDefProxied {

    /**
     * @dev Creates a new DelegateProxy with the given address as the proxied contract
     * @param _proxied the address of the proxied contract
     */
    constructor(address _proxied) public {
        proxied = _proxied;
    }

    /**
     * @dev Dispatcher function. Forwards any function invocation via delegatecall to the proxied contract.
     * Based on ZeppelinOS DelegateProxy implementation
     */
    function() public {
        address target = proxied;
        assembly {
            let freeMemSlot := mload(0x40)
            calldatacopy(freeMemSlot, 0, calldatasize)
            let result := delegatecall(gas, target, freeMemSlot, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(freeMemSlot, 0, size)

            switch result
            case 0 { revert(freeMemSlot, size) }
            default { return(freeMemSlot, size) }
        }
    }

    /**
     * @dev Returns the proxied contract
     * @return the address of the proxied contract
     */
    function getProxied() public view returns (address) {
        return proxied;
    }
}