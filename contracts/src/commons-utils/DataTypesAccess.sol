pragma solidity ^0.4.23;

import "commons-utils/DataTypes.sol";

/**
 * @title DataTypesAccess
 * @dev Provides read access to the different types in the DataTypes library in order to facilitate extraction of these values for an external system.
 * This contract also manages labels for all types.
 */
contract DataTypesAccess {

    mapping(uint8 => string) labels;
    uint8[58] typeEnum = [DataTypes.BOOL(),
        DataTypes.STRING(),
        DataTypes.UINT(),
        DataTypes.UINT8(),
        DataTypes.UINT16(),
        DataTypes.UINT32(),
        DataTypes.UINT64(),
        DataTypes.UINT128(),
        DataTypes.UINT256(),
        DataTypes.INT(),
        DataTypes.INT8(),
        DataTypes.INT16(),
        DataTypes.INT32(),
        DataTypes.INT64(),
        DataTypes.INT128(),
        DataTypes.INT256(),
        DataTypes.ADDRESS(),
        DataTypes.BYTE(),
        DataTypes.BYTES1(),
        DataTypes.BYTES2(),
        DataTypes.BYTES3(),
        DataTypes.BYTES4(),
        DataTypes.BYTES8(),
        DataTypes.BYTES16(),
        DataTypes.BYTES20(),
        DataTypes.BYTES24(),
        DataTypes.BYTES28(),
        DataTypes.BYTES32(),
        DataTypes.BYTES(),
        DataTypes.BOOLARRAY(),
        DataTypes.STRINGARRAY(),
        DataTypes.UINTARRAY(),
        DataTypes.UINT8ARRAY(),
        DataTypes.UINT16ARRAY(),
        DataTypes.UINT32ARRAY(),
        DataTypes.UINT64ARRAY(),
        DataTypes.UINT128ARRAY(),
        DataTypes.UINT256ARRAY(),
        DataTypes.INTARRAY(),
        DataTypes.INT8ARRAY(),
        DataTypes.INT16ARRAY(),
        DataTypes.INT32ARRAY(),
        DataTypes.INT64ARRAY(),
        DataTypes.INT128ARRAY(),
        DataTypes.INT256ARRAY(),
        DataTypes.ADDRESSARRAY(),
        DataTypes.BYTEARRAY(),
        DataTypes.BYTES1ARRAY(),
        DataTypes.BYTES2ARRAY(),
        DataTypes.BYTES3ARRAY(),
        DataTypes.BYTES4ARRAY(),
        DataTypes.BYTES8ARRAY(),
        DataTypes.BYTES16ARRAY(),
        DataTypes.BYTES20ARRAY(),
        DataTypes.BYTES24ARRAY(),
        DataTypes.BYTES28ARRAY(),
        DataTypes.BYTES32ARRAY(),
        DataTypes.BYTESARRAY()];

    constructor() public {
        labels[DataTypes.BOOL()] = "Boolean";
        labels[DataTypes.STRING()] = "String";
        labels[DataTypes.UINT()] = "Unsigned Integer";
        labels[DataTypes.UINT8()] = "8-bit Unsigned Integer";
        labels[DataTypes.UINT16()] = "16-bit Unsigned Integer";
        labels[DataTypes.UINT32()] = "32-bit Unsigned Integer";
        labels[DataTypes.UINT64()] = "64-bit Unsigned Integer";
        labels[DataTypes.UINT128()] = "128-bit Unsigned Integer";
        labels[DataTypes.UINT256()] = "256-bit Unsigned Integer";
        labels[DataTypes.INT()] = "Signed Integer";
        labels[DataTypes.INT8()] = "8-bit Signed Integer";
        labels[DataTypes.INT16()] = "16-bit Signed Integer";
        labels[DataTypes.INT32()] = "32-bit Signed Integer";
        labels[DataTypes.INT64()] = "64-bit Signed Integer";
        labels[DataTypes.INT128()] = "128-bit Signed Integer";
        labels[DataTypes.INT256()] = "256-bit Signed Integer";
        labels[DataTypes.ADDRESS()] = "Address";
        labels[DataTypes.BYTE()] = "Byte";
        labels[DataTypes.BYTES1()] = "1 Byte";
        labels[DataTypes.BYTES2()] = "2 Bytes";
        labels[DataTypes.BYTES3()] = "3 Bytes";
        labels[DataTypes.BYTES4()] = "4 Bytes";
        labels[DataTypes.BYTES8()] = "8 Bytes";
        labels[DataTypes.BYTES16()] = "16 Bytes";
        labels[DataTypes.BYTES20()] = "20 Bytes";
        labels[DataTypes.BYTES24()] = "24 Bytes";
        labels[DataTypes.BYTES28()] = "28 Bytes";
        labels[DataTypes.BYTES32()] = "32 Bytes";
        labels[DataTypes.BYTES()] = "Bytes";
        labels[DataTypes.BOOLARRAY()] = "Array of Booleans";
        labels[DataTypes.STRINGARRAY()] = "Array of Strings";
        labels[DataTypes.UINTARRAY()] = "Array of Unsigned Integers";
        labels[DataTypes.UINT8ARRAY()] = "Array of 8-bit Unsigned Integers";
        labels[DataTypes.UINT16ARRAY()] = "Array of 16-bit Unsigned Integers";
        labels[DataTypes.UINT32ARRAY()] = "Array of 32-bit Unsigned Integers";
        labels[DataTypes.UINT64ARRAY()] = "Array of 64-bit Unsigned Integers";
        labels[DataTypes.UINT128ARRAY()] = "Array of 128-bit Unsigned Integers";
        labels[DataTypes.UINT256ARRAY()] = "Array of 256-bit Unsigned Integers";
        labels[DataTypes.INTARRAY()] = "Array of Signed Integers";
        labels[DataTypes.INT8ARRAY()] = "Array of 8-bit Signed Integers";
        labels[DataTypes.INT16ARRAY()] = "Array of 16-bit Signed Integers";
        labels[DataTypes.INT32ARRAY()] = "Array of 32-bit Signed Integers";
        labels[DataTypes.INT64ARRAY()] = "Array of 64-bit Signed Integers";
        labels[DataTypes.INT128ARRAY()] = "Array of 128-bit Signed Integers";
        labels[DataTypes.INT256ARRAY()] = "Array of 256-bit Signed Integers";
        labels[DataTypes.ADDRESSARRAY()] = "Array of Addresses";
        labels[DataTypes.BYTEARRAY()] = "Array of single Bytes";
        labels[DataTypes.BYTES1ARRAY()] = "Array of 1 Bytes";
        labels[DataTypes.BYTES2ARRAY()] = "Array of 2 Bytes";
        labels[DataTypes.BYTES3ARRAY()] = "Array of 3 Bytes";
        labels[DataTypes.BYTES4ARRAY()] = "Array of 4 Bytes";
        labels[DataTypes.BYTES8ARRAY()] = "Array of 8 Bytes";
        labels[DataTypes.BYTES16ARRAY()] = "Array of 16 Bytes";
        labels[DataTypes.BYTES20ARRAY()] = "Array of 20 Bytes";
        labels[DataTypes.BYTES24ARRAY()] = "Array of 24 Bytes";
        labels[DataTypes.BYTES28ARRAY()] = "Array of 28 Bytes";
        labels[DataTypes.BYTES32ARRAY()] = "Array of 32 Bytes";
        labels[DataTypes.BYTESARRAY()] = "Array of Bytes";
    }

    function getNumberOfDataTypes() external view returns (uint size) {
        size = typeEnum.length;
    }

    function getDataTypeAtIndex(uint _index) external view returns (uint8) {
        return typeEnum[_index];
    }

    function getDataTypeDetails(uint8 _type) external view returns (string label) {
        label = labels[_type];
    }
}