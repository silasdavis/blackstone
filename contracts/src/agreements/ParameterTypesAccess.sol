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

    event LogParameterTypeRegistry(
        bytes32 indexed eventId,
        uint parameter_type,
        bytes32 label
    );

    bytes32 public constant EVENT_ID_PARAMETER_TYPES = "AN://agreements/parameter-types";

    constructor() public {
        registerParameterType(Agreements.ParameterType.BOOLEAN, "Boolean");
        registerParameterType(Agreements.ParameterType.STRING, "String");
        registerParameterType(Agreements.ParameterType.NUMBER, "Number");
        registerParameterType(Agreements.ParameterType.DATE, "Date");
        registerParameterType(Agreements.ParameterType.DATETIME, "Datetime");
        registerParameterType(Agreements.ParameterType.MONETARY_AMOUNT, "Monetary Amount");
        registerParameterType(Agreements.ParameterType.USER_ORGANIZATION, "User/Organization");
        registerParameterType(Agreements.ParameterType.CONTRACT_ADDRESS, "Contract Address");
        registerParameterType(Agreements.ParameterType.SIGNING_PARTY, "Signing Party");
    }

    function registerParameterType(Agreements.ParameterType _parameterType, bytes32 _label) internal {
        labels[uint(_parameterType)] = _label;
        emit LogParameterTypeRegistry(
            EVENT_ID_PARAMETER_TYPES,
            uint(_parameterType),
            _label
        );
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