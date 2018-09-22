pragma solidity ^0.4.23;

import "commons-base/ErrorsLib.sol";
import "commons-base/BaseErrors.sol";
import "commons-utils/DataTypes.sol";
import "commons-utils/TypeUtilsAPI.sol";

import "commons-collections/DataStorage.sol";
import "commons-collections/Mappings.sol";
import "commons-collections/MappingsLib.sol";

/**
 * @title DataStorageUtils Library
 * @dev A library containing storage utility structs functions
 */
library DataStorageUtils {

  enum COMPARISON_OPERATOR {EQ, LT, GT, LTE, GTE, NEQ}

  struct DataMap {
    mapping(bytes32 => DataElement) rows;
    bytes32[] keys;
  }

  struct DataElement {
    bool exists;
    uint keyIdx;
    Data value;
  }

  /**
   * a struct to describe the scope of an element in the form of two bytes32 values: context and scope.
   * The context gives an optional 2nd dimension to the scope.
   * The actual scope can either be a fixed value or something that resolves to bytes32 at via a ConditionalData.
   */
  struct DataScope {
    bytes32 context;
    bytes32 fixedScope;
    ConditionalData conditionalScope;
  }

  struct Data {
    bytes32 id;
    uint8 dataType;

    bool boolValue;
    string stringValue;
    uint uintValue;
    int intValue;
    address addressValue;
    bytes32 bytes32Value;
    
    // string[] stringArrayValue;

    address[100] addressArrayValue;

    uint8[100] uint8ArrayValue;
    uint16[100] uint16ArrayValue;
    uint32[100] uint32ArrayValue;
    uint64[100] uint64ArrayValue;
    uint128[100] uint128ArrayValue;
    uint256[100] uint256ArrayValue;

    int8[100] int8ArrayValue;
    int16[100] int16ArrayValue;
    int32[100] int32ArrayValue;
    int64[100] int64ArrayValue;
    int128[100] int128ArrayValue;
    int256[100] int256ArrayValue;

    // bytes bytesArrayValue;
    bytes1[100] bytes1ArrayValue;
    bytes2[100] bytes2ArrayValue;
    bytes3[100] bytes3ArrayValue;
    bytes4[100] bytes4ArrayValue;
    bytes8[100] bytes8ArrayValue;
    bytes16[100] bytes16ArrayValue;
    bytes20[100] bytes20ArrayValue;
    bytes24[100] bytes24ArrayValue;
    bytes28[100] bytes28ArrayValue;
    bytes32[100] bytes32ArrayValue;
  }

  /**
    * @dev Struct to store information about how to access a data field from a DataStorage contract.
    * Fields:
    * dataStorage: the address of a DataStorage contract
    * dataStorageId: a field key in a known DataStorage that resolves to an address of another DataStorage
    * dataPath: the field key in the target DataStorage with which the value can be extracted
    */
  struct ConditionalData {
      bytes32 dataPath;
      bytes32 dataStorageId;
      address dataStorage;
      bool exists;
  }

  modifier pre_onlySupportsEqualityOperations(COMPARISON_OPERATOR _current) {
    ErrorsLib.revertIf(_current != COMPARISON_OPERATOR.EQ && _current != COMPARISON_OPERATOR.NEQ,
      ErrorsLib.INVALID_INPUT(), "DataStorageUtils.pre_onlySupportsEqualityOperations", "Operator must be EQ or NEQ");
    _;
  }

  modifier pre_verifyExpressionParametersExist(address _dataStorage, bytes32 _dataPath) {
    ErrorsLib.revertIf(_dataStorage == 0x0,
      ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DataStorageUtils.pre_verifyExpressionParametersExist", "dataStorage is NULL");
    ErrorsLib.revertIf(_dataPath == "",
      ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DataStorageUtils.pre_verifyExpressionParametersExist", "dataPath is NULL");
    _;
  }

  /**
    * @dev Inserts the given Data structure under its data ID in the provided map. 
    * If the ID already exists, an update is performed.
    * //TODO because this is an internal function, it gets inlined and due to its heavy usage in AbstractDataStorage it blows up the binary footprint of that contract. Better: Provide insertOrUpdate(DataMap storage _map, bytes32 _key, <valuetype> _value) functions here
    *
    * @param _map the map
    * @param _value the value
    * @return the number of data objects in the map after the operation
    */
  function insertOrUpdate(DataMap storage _map, Data _value) internal returns (uint) {
    if (_map.rows[_value.id].exists) {
        _map.rows[_value.id].value = _value;
    } else {
        _map.rows[_value.id].keyIdx = (_map.keys.push(_value.id)-1);
        _map.rows[_value.id].value = _value;
        _map.rows[_value.id].exists = true;
    }
    return _map.keys.length;
  }

  /**
    * @dev Returns the Data registered at the specified ID in the given map.
    */
  function get(DataMap storage _map, bytes32 _id) internal view returns (Data) {
    return _map.rows[_id].value;
  }

  /**
    * @dev Removes the Data registered at the specified key in the provided map.
    * The _map.keys array may get re-ordered by this operation: unless the removed entry was
    * the last element in the map's keys, the last key will be moved into the void position created
    * by the removal.
    *
    * @param _map the map
    * @param _key the key
    * @return BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
    */
  function remove(DataMap storage _map, bytes32 _key) public returns (uint) {
    
    if (!_map.rows[_key].exists) { return BaseErrors.RESOURCE_NOT_FOUND(); }
    DataElement memory elem = _map.rows[_key];
    
    bytes32 swapKey = Mappings.deleteInKeys(_map.keys, _map.rows[_key].keyIdx);
    if (TypeUtilsAPI.contentLength(swapKey) > 0) {
      _map.rows[swapKey].keyIdx = elem.keyIdx;
    }
    
    delete _map.rows[_key];
    return BaseErrors.NO_ERROR();
  }

  /**
   * @dev Returns the DataTypes value for the specified field key from the given map.
   * @param _map a DataMap
   * @param _key the field key
   * @return the uint8 value of the data type
   */
  function getDataType(DataMap storage _map, bytes32 _key) public view returns (uint8) {
    return get(_map, _key).dataType;
  }

  /**
   * @dev Returns the number of non-default entries in the array-type field specified in the given DataMap.
   * Empty values are: 0 for int/uint, 0x0 for address, "" for bytes32, etc.)
   * Currently only DataTypes.ADDRESSARRAY() and DataTypes.BYTES32ARRAY() are supported by this function
   * @param _map the DataMap
   * @param _key a key pointing to a supported array-type field
   * @param _fullscan if true the array will be scanned to its end, otherwise the function returns on the first encountered default value
   * @return the number of non-default entries
   */
  function getNumberOfArrayEntries(DataMap storage _map, bytes32 _key, bool _fullscan) public view returns (uint) {
    if (getDataType(_map, _key) == DataTypes.ADDRESSARRAY()) {
      return getNumberOfEntries(_map.rows[_key].value.addressArrayValue, _fullscan);
    }
    else if (getDataType(_map, _key) == DataTypes.BYTES32ARRAY()) {
      return getNumberOfEntries(_map.rows[_key].value.bytes32ArrayValue, _fullscan);
    }
  }

	/**
	 * @dev Returns the number of non-default entries in the given array.
	 * @param _array the array to scan
   * @param _fullscan whether to keep scanning to the end even if default values are encountered
   * @return the number of non-empty entries in the array
	 */
	function getNumberOfEntries(bytes32[100] _array, bool _fullscan) public pure returns (uint size) {
    for (uint i=0; i<100; i++) {
      if (_array[i] != "")
        size++;
      else if (!_fullscan)
        return;
    }
	}

	/**
	 * @dev Returns the number of non-default entries in the given array.
	 * @param _array the array to scan
   * @param _fullscan whether to keep scanning to the end even if default values are encountered
   * @return the number of non-empty entries in the array
	 */
	function getNumberOfEntries(address[100] _array, bool _fullscan) public pure returns (uint size) {
    for (uint i=0; i<100; i++) {
      if (_array[i] != 0x0)
        size++;
      else if (!_fullscan)
        return;
    }
	}

  /**
    * @dev Returns the ID of the Data at the specified index in the given map
    */
  function keyAtIndex(DataMap storage _map, uint _index) public view returns (uint, bytes32) {
    return Mappings.keyAtIndex(_map.keys, _index);
  }

  /**
   * @dev Resolves the location of a ConditionalData against the provided DataStorage.
   * @param _conditionalData a ConditionalData with instructions how to find the desired data
   * @param _dataStorage a DataStorage contract to use as a basis for the resolution
   * @return the address of a DataStorage and a dataPath are returned that pinpoint the resolved data location
   */
  function resolveDataLocation(ConditionalData storage _conditionalData, DataStorage _dataStorage)
    public view
    returns (address dataStorage, bytes32 dataPath)
  {
    dataPath = _conditionalData.dataPath;
    dataStorage = resolveDataStorageAddress(_conditionalData.dataStorageId, _conditionalData.dataStorage, _dataStorage);
  }

  /**
   * @dev Returns the address location of a DataStorage contract using the provided information.
   * This is the most basic routine to determine from where to retrieve a data value and uses the same attributes
   * that are encoded in a ConditionalData struct, therefore supporting the handling of ConditionalData structs.
   * The rules of resolving the location are as follows:
   * 1. If an absolute location in the form of a dataStorage address is available, this address is returned
   * 2. If a dataStorageId is provided, it's used as a dataPath to retrieve and return an address from the optional DataStorage parameter.
   * 3. In all other cases, the optional DataStorage parameter is returned.
   * REVERTS if:
   * - for steps 2 and 3 the DataStorage parameter is empty
   * @param _dataStorageId a path by which an address can be retrieved from a DataStorage
   * @param _dataStorage the absolute address of a DataStorage
   * @param _refDataStorage an optional DataStorge required to determine an address, if no absolute address was provided
   * @return the address of a DataStorage
   */
  function resolveDataStorageAddress(bytes32 _dataStorageId, address _dataStorage, DataStorage _refDataStorage)
    public view
    returns (address)
  {
    if (_dataStorage != address(0)) {
      return _dataStorage;
    }
    else {
      // All resolutions henceforth require the DataStorage parameter
      ErrorsLib.revertIf(address(_refDataStorage) == address(0),
        ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DataStorageUtils.resolveDataStorageAddress", "The DataStorage parameter is required for resolving the address.");
      if (_dataStorageId != "") {
        return DataStorage(_refDataStorage).getDataValueAsAddress(_dataStorageId);
      }
        return _refDataStorage;
    }
  }

  /**
   * @dev Resolves an expression where all the relevant parts of the expression are provided as parameters.
   * @param _dataStorage a DataStorage contract where the target data is located
   * @param _dataId an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
   * @param _dataPath a dataPath where the target data is located
   * @param _op a valid comparison operator 
   * @param _value a string value to use as right-hand value to compare against the target data
   * @return boolean result of the comparison
   */
  function resolveExpression(DataStorage _dataStorage, bytes32 _dataId, bytes32 _dataPath, COMPARISON_OPERATOR _op, string _value)
    external view
    pre_onlySupportsEqualityOperations(_op)
    pre_verifyExpressionParametersExist(_dataStorage, _dataPath)
    returns (bool)
  {
    string memory target;
    if (_dataId == "") {
      target = _dataStorage.getDataValueAsString(_dataPath);
    } else {
      address subDataStorage = _dataStorage.getDataValueAsAddress(_dataId);
      ErrorsLib.revertIf(subDataStorage == 0x0,
        ErrorsLib.INVALID_STATE(), "DataStorageUtils.resolveExpression", "Unable to locate DataStorage based on dataId parameter");
      target = DataStorage(subDataStorage).getDataValueAsString(_dataPath);
    }
    if (_op == COMPARISON_OPERATOR.EQ) {
      return keccak256(abi.encodePacked(_value)) == keccak256(abi.encodePacked(target));
    } else if (_op == COMPARISON_OPERATOR.NEQ) {
      return keccak256(abi.encodePacked(_value)) != keccak256(abi.encodePacked(target));
    }
  }

  /**
   * @dev Resolves an expression where all the relevant parts of the expression are provided as parameters.
   * @param _dataStorage a DataStorage contract where the target data is located
   * @param _dataId an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
   * @param _dataPath a dataPath where the target data is located
   * @param _op a valid comparison operator 
   * @param _value a bytes32 value to use as right-hand value to compare against the target data
   * @return boolean result of the comparison
   */
  function resolveExpression(DataStorage _dataStorage, bytes32 _dataId, bytes32 _dataPath, COMPARISON_OPERATOR _op, bytes32 _value)
    external view
    pre_onlySupportsEqualityOperations(_op)
    pre_verifyExpressionParametersExist(_dataStorage, _dataPath)
    returns (bool)
  {
    bytes32 target;
    if (_dataId == "") {
      target = _dataStorage.getDataValueAsBytes32(_dataPath);
    } else {
      address subDataStorage = _dataStorage.getDataValueAsAddress(_dataId);
      ErrorsLib.revertIf(subDataStorage == 0x0,
        ErrorsLib.INVALID_STATE(), "DataStorageUtils.resolveExpression", "Unable to locate DataStorage based on dataId parameter");
      target = DataStorage(subDataStorage).getDataValueAsBytes32(_dataPath);
    }
    if (_op == COMPARISON_OPERATOR.EQ) {
      return _value == target;
    } else if (_op == COMPARISON_OPERATOR.NEQ) {
      return _value != target;
    }
  }

  /**
   * @dev Resolves an expression where all the relevant parts of the expression are provided as parameters.
   * @param _dataStorage a DataStorage contract where the target data is located
   * @param _dataId an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
   * @param _dataPath a dataPath where the target data is located
   * @param _op a valid comparison operator 
   * @param _value a address value to use as right-hand value to compare against the target data
   * @return boolean result of the comparison
   */
  function resolveExpression(DataStorage _dataStorage, bytes32 _dataId, bytes32 _dataPath, COMPARISON_OPERATOR _op, address _value)
    external view
    pre_onlySupportsEqualityOperations(_op)
    pre_verifyExpressionParametersExist(_dataStorage, _dataPath)
    returns (bool)
  {
    address target;
    if (_dataId == "") {
      target = _dataStorage.getDataValueAsAddress(_dataPath);
    } else {
      address subDataStorage = _dataStorage.getDataValueAsAddress(_dataId);
      ErrorsLib.revertIf(subDataStorage == 0x0,
        ErrorsLib.INVALID_STATE(), "DataStorageUtils.resolveExpression", "Unable to locate DataStorage based on dataId parameter");
      target = DataStorage(subDataStorage).getDataValueAsAddress(_dataPath);
    }
    if (_op == COMPARISON_OPERATOR.EQ) {
      return _value == target;
    } else if (_op == COMPARISON_OPERATOR.NEQ) {
      return _value != target;
    }
  }

  /**
   * @dev Resolves an expression where all the relevant parts of the expression are provided as parameters.
   * @param _dataStorage a DataStorage contract where the target data is located
   * @param _dataId an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
   * @param _dataPath a dataPath where the target data is located
   * @param _op a valid comparison operator 
   * @param _value a uint value to use as right-hand value to compare against the target data
   * @return boolean result of the comparison
   */
  function resolveExpression(DataStorage _dataStorage, bytes32 _dataId, bytes32 _dataPath, COMPARISON_OPERATOR _op, uint _value)
    external view
    pre_verifyExpressionParametersExist(_dataStorage, _dataPath)
    returns (bool)
  {
    uint target;
    if (_dataId == "") {
      target = _dataStorage.getDataValueAsUint(_dataPath);
    } else {
      address subDataStorage = _dataStorage.getDataValueAsAddress(_dataId);
      ErrorsLib.revertIf(subDataStorage == 0x0,
        ErrorsLib.INVALID_STATE(), "DataStorageUtils.resolveExpression", "Unable to locate DataStorage based on dataId parameter");
      target = DataStorage(subDataStorage).getDataValueAsUint(_dataPath);
    }
    if (_op == COMPARISON_OPERATOR.EQ) {
      return target == _value;
    } else if (_op == COMPARISON_OPERATOR.LT) {
      return target < _value;
    } else if (_op == COMPARISON_OPERATOR.GT) {
      return target > _value;
    } else if (_op == COMPARISON_OPERATOR.LTE) {
      return target <= _value;
    } else if (_op == COMPARISON_OPERATOR.GTE) {
      return target >= _value;
    } else if (_op == COMPARISON_OPERATOR.NEQ) {
      return target != _value;
    }
  }

  /**
   * @dev Resolves an expression where all the relevant parts of the expression are provided as parameters.
   * @param _dataStorage a DataStorage contract where the target data is located
   * @param _dataId an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
   * @param _dataPath a dataPath where the target data is located
   * @param _op a valid comparison operator 
   * @param _value a uint value to use as right-hand value to compare against the target data
   * @return boolean result of the comparison
   */
  function resolveExpression(DataStorage _dataStorage, bytes32 _dataId, bytes32 _dataPath, COMPARISON_OPERATOR _op, int _value)
    external view
    pre_verifyExpressionParametersExist(_dataStorage, _dataPath)
    returns (bool)
  {
    int target;
    if (_dataId == "") {
      target = _dataStorage.getDataValueAsInt(_dataPath);
    } else {
      address subDataStorage = _dataStorage.getDataValueAsAddress(_dataId);
      ErrorsLib.revertIf(subDataStorage == 0x0,
        ErrorsLib.INVALID_STATE(), "DataStorageUtils.resolveExpression", "Unable to locate DataStorage based on dataId parameter");
      target = DataStorage(subDataStorage).getDataValueAsInt(_dataPath);
    }
    if (_op == COMPARISON_OPERATOR.EQ) {
      return target == _value;
    } else if (_op == COMPARISON_OPERATOR.LT) {
      return target < _value;
    } else if (_op == COMPARISON_OPERATOR.GT) {
      return target > _value;
    } else if (_op == COMPARISON_OPERATOR.LTE) {
      return target <= _value;
    } else if (_op == COMPARISON_OPERATOR.GTE) {
      return target >= _value;
    } else if (_op == COMPARISON_OPERATOR.NEQ) {
      return target != _value;
    }
  }

  /**
   * @dev Resolves an expression where all the relevant parts of the expression are provided as parameters.
   * @param _dataStorage a DataStorage contract where the target data is located
   * @param _dataId an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
   * @param _dataPath a dataPath where the target data is located
   * @param _op a valid comparison operator 
   * @param _value a bool value to use as right-hand value to compare against the target data
   * @return boolean result of the comparison
   */
  function resolveExpression(DataStorage _dataStorage, bytes32 _dataId, bytes32 _dataPath, COMPARISON_OPERATOR _op, bool _value)
    external view
    pre_onlySupportsEqualityOperations(_op)
    pre_verifyExpressionParametersExist(_dataStorage, _dataPath)
    returns (bool)
  {
    bool target;
    if (_dataId == "") {
      target = _dataStorage.getDataValueAsBool(_dataPath);
    } else {
      address subDataStorage = _dataStorage.getDataValueAsAddress(_dataId);
      ErrorsLib.revertIf(subDataStorage == 0x0,
        ErrorsLib.INVALID_STATE(), "DataStorageUtils.resolveExpression", "Unable to locate DataStorage based on dataId parameter");
      target = DataStorage(subDataStorage).getDataValueAsBool(_dataPath);
    }
    if (_op == COMPARISON_OPERATOR.EQ) {
      return _value == target;
    } else if (_op == COMPARISON_OPERATOR.NEQ) {
      return _value != target;
    }
  }

}
