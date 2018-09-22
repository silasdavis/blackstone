pragma solidity ^0.4.23;

import "commons-base/Versioned.sol";

import "agreements/Agreements.sol";

/**
 * @title ParameterTypesAccess
 * @dev Provides read access to the different parameter types in the Agreements library in order to facilitate extraction of these values for an external system.
 * This contract also manages labels for all types.
 * This contract currently is used to provide read access to the ParameterType enum. It implements Upgradeable in order to be added to DOUG, but does
 * otherwise not require it.
 */
contract ParameterTypesAccess is Versioned(1,0,0) {

    mapping(uint => bytes32) labels;

    constructor() public {
        labels[uint(Agreements.ParameterType.BOOLEAN)] = "Boolean";
        labels[uint(Agreements.ParameterType.STRING)] = "String";
        labels[uint(Agreements.ParameterType.NUMBER)] = "Number";
        labels[uint(Agreements.ParameterType.DATE)] = "Date";
        labels[uint(Agreements.ParameterType.DATETIME)] = "Datetime";
        labels[uint(Agreements.ParameterType.MONETARY_AMOUNT)] = "Monetary Amount";
        labels[uint(Agreements.ParameterType.USER_ORGANIZATION)] = "User/Organization";
        labels[uint(Agreements.ParameterType.CONTRACT_ADDRESS)] = "Contract Address";
        labels[uint(Agreements.ParameterType.SIGNING_PARTY)] = "Signing Party";
    }

    function getNumberOfParameterTypes() external pure returns (uint size) {
        size = 9;
    }

    function getParameterTypeAtIndex(uint _index) external pure returns (uint) {
        if (_index < 9)
            return uint(Agreements.ParameterType(_index));
    }

    function getParameterTypeDetails(uint _type) external view returns (bytes32 label) {
        label = labels[_type];
    }
}