pragma solidity ^0.4.23;

import "commons-base/Owned.sol";

/**
 * @title Ecosystem Interface
 * @dev The interface describing interaction with an Ecosystem
 */
contract Ecosystem is Owned {

    function addExternalAddress(address _address) external;

    function removeExternalAddress(address _address) external;

    function isKnownExternalAddress(address _address) external view returns (bool);

}