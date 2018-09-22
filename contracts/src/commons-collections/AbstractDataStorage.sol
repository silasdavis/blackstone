pragma solidity ^0.4.23;

import "commons-utils/DataTypes.sol";

import "commons-collections/DataStorage.sol";
import "commons-collections/DataStorageUtils.sol";

/**
 * @title AbstractDataStorage
 * @dev DataStorage contract covering the main 6 primitive types and their arrays: address, bytes32, string, bool, uint, int
 */
contract AbstractDataStorage is DataStorage {

  using DataStorageUtils for DataStorageUtils.Data;
  using DataStorageUtils for DataStorageUtils.DataMap;

  DataStorageUtils.DataMap dataStorageMap;

  // abstract constructor
  constructor() internal {

  }

  function getDataType(bytes32 _id) external view returns (uint8) {
    return dataStorageMap.getDataType(_id);
  }
  
  function getSize() external view returns (uint) { return dataStorageMap.keys.length; }

  function getDataIdAtIndex(uint _index) external view returns (uint error, bytes32 id) {
    (error, id) = dataStorageMap.keyAtIndex(_index);
  }
  
  /**
   * @dev Removes the Data identified by the id from the DataMap, if it exists.
   * @param _id the id of the data
   */
  function removeData(bytes32 _id) external {
    dataStorageMap.remove(_id);
  }

  /**
   * @dev Returns the number of non-default entries in the specified array-type DataStorage field
   * @param _id the key under which to find the array-type value
   * @param _fullscan if false the function will return as soon as a default value (0 for int/uint, 0x0 for address, "" for bytes32, etc.) is encountered, if true the array will be scanned to its end
   * @return the number of non-default entries in the array
   */
  function getNumberOfArrayEntries(bytes32 _id, bool _fullscan) public view returns (uint) {
    return dataStorageMap.getNumberOfArrayEntries(_id, _fullscan);
  }

  function setDataValueAsBool (bytes32 _id, bool _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.dataType = DataTypes.BOOL();
    data.boolValue = _value;
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsBool (bytes32 _id) external view returns (bool) {
    return dataStorageMap.get(_id).boolValue;
  }

  function setDataValueAsString (bytes32 _id, string _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.dataType = DataTypes.STRING();
    data.stringValue = _value;
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsString (bytes32 _id) external view returns (string) {
    return dataStorageMap.get(_id).stringValue;
  }

  function setDataValueAsUint (bytes32 _id, uint _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.dataType = DataTypes.UINT();
    data.uintValue = _value;
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsUint (bytes32 _id) external view returns (uint) {
    return dataStorageMap.get(_id).uintValue;
  }
  
  function setDataValueAsInt (bytes32 _id, int _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.dataType = DataTypes.INT();
    data.intValue = _value;
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsInt (bytes32 _id) external view returns (int) {
    return dataStorageMap.get(_id).intValue;
  }
 
  function setDataValueAsAddress (bytes32 _id, address _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.dataType = DataTypes.ADDRESS();
    data.addressValue = _value;
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsAddress (bytes32 _id) external view returns (address) {
    return dataStorageMap.get(_id).addressValue;
  }

  function setDataValueAsBytes32 (bytes32 _id, bytes32 _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.dataType = DataTypes.BYTES32();
    data.bytes32Value = _value;
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsBytes32 (bytes32 _id) external view returns (bytes32) {
    return dataStorageMap.get(_id).bytes32Value;
  }

  function setDataValueAsAddressArray (bytes32 _id, address[100] _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.addressArrayValue = _value;
    data.dataType = DataTypes.ADDRESSARRAY();
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsAddressArray (bytes32 _id) external view returns (address[100]) {
    return dataStorageMap.get(_id).addressArrayValue;
  }

 function setDataValueAsUintArray (bytes32 _id, uint[100] _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.uint256ArrayValue = _value;
    data.dataType = DataTypes.UINT256ARRAY();
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsUintArray (bytes32 _id) external view returns (uint[100]) {
    return dataStorageMap.get(_id).uint256ArrayValue;
  }

  function setDataValueAsIntArray (bytes32 _id, int[100] _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.int256ArrayValue = _value;
    data.dataType = DataTypes.INT256ARRAY();
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsIntArray (bytes32 _id) external view returns (int[100]) {
    return dataStorageMap.get(_id).int256ArrayValue;
  }

  function setDataValueAsBytes32Array (bytes32 _id, bytes32[100] _value) external {
    DataStorageUtils.Data memory data;
    data.id = _id;
    data.bytes32ArrayValue = _value;
    data.dataType = DataTypes.BYTES32ARRAY();
    dataStorageMap.insertOrUpdate(data);
  }

  function getDataValueAsBytes32Array (bytes32 _id) external view returns (bytes32[100]) { return dataStorageMap.get(_id).bytes32ArrayValue; }
  
}