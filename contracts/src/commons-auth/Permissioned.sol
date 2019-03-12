pragma solidity ^0.4.25;

/**
 * @title Permissioned Interface
 * A contract with permissioning capabilities.
 */
contract Permissioned {

    //TODO events?

    function grantPermission(bytes32 _permission, address _holder) external;

    function createPermission(bytes32 _permission, bool _multiHolder, bool _revocable, bool _transferable) external;

    function transferPermission(bytes32 _permission, address _newHolder) external;

    function revokePermission(bytes32 _permission, address _holder) external;

    function hasPermission(bytes32 _permission, address _holder) public view returns (bool);

}