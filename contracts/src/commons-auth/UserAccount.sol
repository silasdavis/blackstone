pragma solidity ^0.4.23;

import "commons-base/Owned.sol";
import "commons-base/Bytes32Identifiable.sol";

/**
 * @title UserAccount Interface
 * @dev API for interacting with a user account
 */
contract UserAccount is Owned, Bytes32Identifiable {

    /**
     * @dev Forwards a call to the specified target using the given bytes message.
     * @param _target the address to call
     * @param _payload the function payload consisting of the 4-bytes function hash and the abi-encoded function parameters
     * @return the bytes returned from calling the target function
     */
    function forwardCall(address _target, bytes _payload) external returns (bytes returnData);

}
