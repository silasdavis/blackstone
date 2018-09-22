pragma solidity ^0.4.23;

import "commons-base/StorageDefOwner.sol";

import "commons-management/DelegateProxy.sol";

/**
 * @title OwnedDelegateProxy
 * @dev A DelegateProxy implementation with an owner.
 */
contract OwnedDelegateProxy is DelegateProxy, StorageDefOwner {

    /**
     * @dev Creates a new OwnedDelegateProxy with the given proxied contract and sets the msg.sender as the owner
     * @param _proxied an address of a proxied contract
     */
    constructor(address _proxied) public DelegateProxy(_proxied) {
        owner = msg.sender;
    }
}