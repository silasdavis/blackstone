pragma solidity ^0.4.25;

import "commons-auth/Permissioned.sol";

/**
 * @title Permissioned Interface
 * A contract with string-based permissioning capabilities.
 */
contract Permissioned {

    //TODO events?

    function grantPermission(string _permission, address _holder) external;

    function createPermission(string _permission, bool _multiHolder, bool _revocable, bool _transferable) external;

    function transferPermission(string _permission, address _newHolder) external;

    function revokePermission(string _permission, address _holder) external;

}