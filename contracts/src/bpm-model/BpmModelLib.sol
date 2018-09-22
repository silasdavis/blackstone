pragma solidity ^0.4.23;

import "commons-base/ErrorsLib.sol";
import "commons-collections/DataStorageUtils.sol";
import "commons-collections/DataStorage.sol";
import "commons-utils/DataTypes.sol";

import "bpm-model/BpmModel.sol";

/**
 * @title BpmModelLib API Library
 * @dev Public API to deal with data structures of the BpmModel library
 */
library BpmModelLib {

    /**
     * @dev Ensures that either an rhPrimitive or an rhData exists in the condition.
     * This modifier prevents accidentally working with a default return value for comparisons.
     */
    modifier pre_rightHandConditionExists(BpmModel.TransitionCondition storage _condition) {
        ErrorsLib.revertIf(!_condition.rhPrimitive.exists && !_condition.rhData.exists,
            ErrorsLib.INVALID_PARAMETER_STATE(), "BpmModelLib.pre_rightHandConditionExists", "Right-hand condition (primitive or ConditionalData) missing from provided TransitionCondition");
        _;
    }

    /**
     * @dev Resolves the given TransitionCondition agaist the provided DataStorage.
     * @param _condition the transition condition
     * @param _dataStorage a DataStorage contract address to use for data lookup for BOTH left- and right-hand side conditions (unless they point to an explicit DataStorage address that may differ from the provided one).
     * @return true if the condition evaluated to true, false otherwise
     */
    function resolve(BpmModel.TransitionCondition storage _condition, address _dataStorage) public view returns (bool) {
        (address dataStorage, bytes32 dataPath) = resolveConditionalDataLocation(_condition.lhData, _dataStorage);
        // the left-hand side of the expression determines the data type being used to compare
        uint8 dataType = DataStorage(dataStorage).getDataType(dataPath);
        if (dataType == DataTypes.BOOL()) {
            return DataStorageUtils.resolveExpression(DataStorage(dataStorage), bytes32(""), dataPath, _condition.operator, resolveRightHandValueAsBool(_condition, _dataStorage));
        }
        else if (dataType == DataTypes.ADDRESS()) {
            return DataStorageUtils.resolveExpression(DataStorage(dataStorage), bytes32(""), dataPath, _condition.operator, resolveRightHandValueAsAddress(_condition, _dataStorage));
        }
        else if (dataType == DataTypes.STRING()) {
            return DataStorageUtils.resolveExpression(DataStorage(dataStorage), bytes32(""), dataPath, _condition.operator, resolveRightHandValueAsString(_condition, _dataStorage));
        }
        else if (dataType == DataTypes.BYTES32()) {
            return DataStorageUtils.resolveExpression(DataStorage(dataStorage), bytes32(""), dataPath, _condition.operator, resolveRightHandValueAsBytes32(_condition, _dataStorage));
        }
        else if (dataType == DataTypes.UINT()) {
            return DataStorageUtils.resolveExpression(DataStorage(dataStorage), bytes32(""), dataPath, _condition.operator, resolveRightHandValueAsUint(_condition, _dataStorage));
        }
        else if (dataType == DataTypes.INT()) {
            return DataStorageUtils.resolveExpression(DataStorage(dataStorage), bytes32(""), dataPath, _condition.operator, resolveRightHandValueAsInt(_condition, _dataStorage));
        }
    }

    /**
     * @dev Returns the resolved location of the data specified by the data mapping for the specified ActivityInstance.
     * REVERTS if:
     * - the provided ConditionalData cannot be resolved to a DataStorage address
     * @param _conditionalData the DataStorageUtils.ConditionalData to resolve
     * @param _dataStorage a DataStorage address to use for resolving any ID references
     * @return dataStorage - the address of a DataStorage that contains the requested data. Default is the ProcessInstance itself, if none other specified
     * @return dataPath - the ID with which the data can be retrieved
     */
    function resolveConditionalDataLocation(DataStorageUtils.ConditionalData storage _conditionalData, address _dataStorage) public view returns (address dataStorage, bytes32 dataPath) {
        dataPath = _conditionalData.dataPath;
        if (_conditionalData.dataStorage != 0x0) {
            dataStorage = _conditionalData.dataStorage;
            return;
        }
        // at this point we need to rely on the second parameter _dataStorage
        ErrorsLib.revertIf(_dataStorage == 0x0,
            ErrorsLib.INVALID_STATE(), "BpmModelLib.resolveConditionalDataLocation", "Unable to determine a DataStorage address based on the provided parameters");
        if (_conditionalData.dataStorageId != "") {
            // retrieve the target by looking for the dataStorageId in the context of the provided dataStorage
            dataStorage = DataStorage(_dataStorage).getDataValueAsAddress(_conditionalData.dataStorageId);
        }
        else {
            // if no dataStorage location is configured, the provided dataStorage is used
            dataStorage = _dataStorage;
        }
    }

    /**
     * @dev Resolves the given TransitionCondition value as a bool using the provided DataStorage.
     * REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)
     * @param _condition a BpmModel.TransitionCondition
     * @param _dataStorage the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 
     * @return the result of resolving the TransitionCondition as bool value
     */
    function resolveRightHandValueAsBool(BpmModel.TransitionCondition storage _condition, address _dataStorage)
        public view
        pre_rightHandConditionExists(_condition)
        returns (bool)
    {
        if (_condition.rhPrimitive.exists) {
            return _condition.rhPrimitive.boolValue;
        }
        else {
            (address dataStorage, bytes32 dataPath) = resolveConditionalDataLocation(_condition.rhData, _dataStorage);
            return DataStorage(dataStorage).getDataValueAsBool(dataPath);
        }
    }

    /**
     * @dev Resolves the given TransitionCondition value as an address using the provided DataStorage.
     * REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)
     * @param _condition a BpmModel.TransitionCondition
     * @param _dataStorage the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 
     * @return the result of resolving the TransitionCondition asn address value
     */
    function resolveRightHandValueAsAddress(BpmModel.TransitionCondition storage _condition, address _dataStorage)
        public view
        pre_rightHandConditionExists(_condition)
        returns (address)
    {
        if (_condition.rhPrimitive.exists) {
            return _condition.rhPrimitive.addressValue;
        }
        else {
            (address dataStorage, bytes32 dataPath) = resolveConditionalDataLocation(_condition.rhData, _dataStorage);
            return DataStorage(dataStorage).getDataValueAsAddress(dataPath);
        }
    }

    /**
     * @dev Resolves the given TransitionCondition value as a bytes32 using the provided DataStorage.
     * REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)
     * @param _condition a BpmModel.TransitionCondition
     * @param _dataStorage the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 
     * @return the result of resolving the TransitionCondition as bytes32 value
     */
    function resolveRightHandValueAsBytes32(BpmModel.TransitionCondition storage _condition, address _dataStorage)
        public view
        pre_rightHandConditionExists(_condition)
        returns (bytes32)
    {
        if (_condition.rhPrimitive.exists) {
            return _condition.rhPrimitive.bytes32Value;
        }
        else {
            (address dataStorage, bytes32 dataPath) = resolveConditionalDataLocation(_condition.rhData, _dataStorage);
            return DataStorage(dataStorage).getDataValueAsBytes32(dataPath);
        }
    }

    /**
     * @dev Resolves the given TransitionCondition value as a string using the provided DataStorage.
     * REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)
     * @param _condition a BpmModel.TransitionCondition
     * @param _dataStorage the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 
     * @return the result of resolving the TransitionCondition as string value
     */
    function resolveRightHandValueAsString(BpmModel.TransitionCondition storage _condition, address _dataStorage)
        public view
        pre_rightHandConditionExists(_condition)
        returns (string)
    {
        if (_condition.rhPrimitive.exists) {
            return _condition.rhPrimitive.stringValue;
        }
        else {
            (address dataStorage, bytes32 dataPath) = resolveConditionalDataLocation(_condition.rhData, _dataStorage);
            return DataStorage(dataStorage).getDataValueAsString(dataPath);
        }
    }

    /**
     * @dev Resolves the given TransitionCondition value as a uint using the provided DataStorage.
     * REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)
     * @param _condition a BpmModel.TransitionCondition
     * @param _dataStorage the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 
     * @return the result of resolving the TransitionCondition as uint value
     */
    function resolveRightHandValueAsUint(BpmModel.TransitionCondition storage _condition, address _dataStorage)
        public view
        pre_rightHandConditionExists(_condition)
        returns (uint)
    {
        if (_condition.rhPrimitive.exists) {
            return _condition.rhPrimitive.uintValue;
        }
        else {
            (address dataStorage, bytes32 dataPath) = resolveConditionalDataLocation(_condition.rhData, _dataStorage);
            return DataStorage(dataStorage).getDataValueAsUint(dataPath);
        }
    }

    /**
     * @dev Resolves the given TransitionCondition value as a int using the provided DataStorage.
     * REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)
     * @param _condition a BpmModel.TransitionCondition
     * @param _dataStorage the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 
     * @return the result of resolving the TransitionCondition as int value
     */
    function resolveRightHandValueAsInt(BpmModel.TransitionCondition storage _condition, address _dataStorage)
        public view
        pre_rightHandConditionExists(_condition)
        returns (int)
    {
        if (_condition.rhPrimitive.exists) {
            return _condition.rhPrimitive.intValue;
        }
        else {
            (address dataStorage, bytes32 dataPath) = resolveConditionalDataLocation(_condition.rhData, _dataStorage);
            return DataStorage(dataStorage).getDataValueAsInt(dataPath);
        }
    }

}