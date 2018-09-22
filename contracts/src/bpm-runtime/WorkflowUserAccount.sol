pragma solidity ^0.4.23;

import "commons-auth/DefaultUserAccount.sol";

import "bpm-runtime/WorkflowProxy.sol";
import "bpm-runtime/ProcessInstance.sol";
import "bpm-runtime/BpmService.sol";

/**
 * @title WorkflowUserAccount
 * @dev Workflow-aware implementation of a UserAccount to interact with a ProcessInstance, e.g. to complete activities assigned to this proxy contract.
 */
contract WorkflowUserAccount is DefaultUserAccount, WorkflowProxy {
	
	/**
	 * @dev Creates a new WorkflowUserAccount
	 * @param _id an identifier for the user
	 * @param _owner the owner of the user account
	 * @param _ecosystem the address of an Ecosystem to which the user account is connected
	 */
    constructor(bytes32 _id, address _owner, address _ecosystem) DefaultUserAccount(_id, _owner, _ecosystem) public {}

	/**
	 * @dev Completes the specified activity using the given BpmService to locate the relevant ProcessInstance.
	 * This sets the msg.sender of the call to the address of this proxy contract, so that it can be used to authorize the task completion.
	 * @param _activityInstanceId the task ID
	 * @param _service the BpmService required for lookup and access to the BpmServiceDb
	 * @return error code if the completion failed
	 */
    function completeActivity(bytes32 _activityInstanceId, BpmService _service)
        public
        pre_onlyAuthorizedCallers
        returns (uint error)
    {
        // find the process instance in the DB
        address piAddress = _service.getProcessInstanceForActivity(_activityInstanceId);
        if (piAddress == 0x0)
            return BaseErrors.RESOURCE_NOT_FOUND();
        return ProcessInstance(piAddress).completeActivity(_activityInstanceId, _service);
    }

    /**
	 * @dev Writes data via BpmService and then completes the specified activity.
	 * @param _activityInstanceId the task ID
	 * @param _service the BpmService required for lookup and access to the BpmServiceDb
	 * @param _dataMappingId the id of the dataMapping that points to data storage slot
	 * @param _value the bool value of the data
	 * @return error code if the completion failed
	 */
    function completeActivityWithBoolData(bytes32 _activityInstanceId, BpmService _service, bytes32 _dataMappingId, bool _value)
        external
        pre_onlyAuthorizedCallers
        returns (uint error)
    {
        _service.setActivityOutDataAsBool(_activityInstanceId, _dataMappingId, _value);
        return completeActivity(_activityInstanceId, _service);
    }

    /**
	 * @dev Writes data via BpmService and then completes the specified activity.
	 * @param _activityInstanceId the task ID
	 * @param _service the BpmService required for lookup and access to the BpmServiceDb
	 * @param _dataMappingId the id of the dataMapping that points to data storage slot
	 * @param _value the string value of the data
	 * @return error code if the completion failed
	 */
    function completeActivityWithStringData(bytes32 _activityInstanceId, BpmService _service, bytes32 _dataMappingId, string _value)
        external
        pre_onlyAuthorizedCallers
        returns (uint error)
    {
        _service.setActivityOutDataAsString(_activityInstanceId, _dataMappingId, _value);
        return completeActivity(_activityInstanceId, _service);
    }

    /**
	 * @dev Writes data via BpmService and then completes the specified activity.
	 * @param _activityInstanceId the task ID
	 * @param _service the BpmService required for lookup and access to the BpmServiceDb
	 * @param _dataMappingId the id of the dataMapping that points to data storage slot
	 * @param _value the bytes32 value of the data
	 * @return error code if the completion failed
	 */
    function completeActivityWithBytes32Data(bytes32 _activityInstanceId, BpmService _service, bytes32 _dataMappingId, bytes32 _value)
        external
        pre_onlyAuthorizedCallers
        returns (uint error)
    {
        _service.setActivityOutDataAsBytes32(_activityInstanceId, _dataMappingId, _value);
        return completeActivity(_activityInstanceId, _service);
    }

    /**
	 * @dev Writes data via BpmService and then completes the specified activity.
	 * @param _activityInstanceId the task ID
	 * @param _service the BpmService required for lookup and access to the BpmServiceDb
	 * @param _dataMappingId the id of the dataMapping that points to data storage slot
	 * @param _value the uint value of the data
	 * @return error code if the completion failed
	 */
    function completeActivityWithUintData(bytes32 _activityInstanceId, BpmService _service, bytes32 _dataMappingId, uint _value)
        external
        pre_onlyAuthorizedCallers
        returns (uint error)
    {
        _service.setActivityOutDataAsUint(_activityInstanceId, _dataMappingId, _value);
        return completeActivity(_activityInstanceId, _service);
    }

    /**
	 * @dev Writes data via BpmService and then completes the specified activity.
	 * @param _activityInstanceId the task ID
	 * @param _service the BpmService required for lookup and access to the BpmServiceDb
	 * @param _dataMappingId the id of the dataMapping that points to data storage slot
	 * @param _value the int value of the data
	 * @return error code if the completion failed
	 */
    function completeActivityWithIntData(bytes32 _activityInstanceId, BpmService _service, bytes32 _dataMappingId, int _value)
        external
        pre_onlyAuthorizedCallers
        returns (uint error)
    {
        _service.setActivityOutDataAsInt(_activityInstanceId, _dataMappingId, _value);
        return completeActivity(_activityInstanceId, _service);
    }

    /**
	 * @dev Writes data via BpmService and then completes the specified activity.
	 * @param _activityInstanceId the task ID
	 * @param _service the BpmService required for lookup and access to the BpmServiceDb
	 * @param _dataMappingId the id of the dataMapping that points to data storage slot
	 * @param _value the address value of the data
	 * @return error code if the completion failed
	 */
    function completeActivityWithAddressData(bytes32 _activityInstanceId, BpmService _service, bytes32 _dataMappingId, address _value)
        external
        pre_onlyAuthorizedCallers
        returns (uint error)
    {
        _service.setActivityOutDataAsAddress(_activityInstanceId, _dataMappingId, _value);
        return completeActivity(_activityInstanceId, _service);
    }

    function getActivityInDataAsBool(bytes32 _activityInstanceId, bytes32 _dataMappingId, BpmService _service) external view returns (bool) {
        return _service.getActivityInDataAsBool(_activityInstanceId, _dataMappingId);
    }
    function getActivityInDataAsString(bytes32 _activityInstanceId, bytes32 _dataMappingId, BpmService _service) external view returns (string) {
        return _service.getActivityInDataAsString(_activityInstanceId, _dataMappingId);
    }
    function getActivityInDataAsBytes32(bytes32 _activityInstanceId, bytes32 _dataMappingId, BpmService _service) external view returns (bytes32) {
        return _service.getActivityInDataAsBytes32(_activityInstanceId, _dataMappingId);
    }
    function getActivityInDataAsUint(bytes32 _activityInstanceId, bytes32 _dataMappingId, BpmService _service) external view returns (uint) {
        return _service.getActivityInDataAsUint(_activityInstanceId, _dataMappingId);
    }
    function getActivityInDataAsInt(bytes32 _activityInstanceId, bytes32 _dataMappingId, BpmService _service) external view returns (int) {
        return _service.getActivityInDataAsInt(_activityInstanceId, _dataMappingId);
    }
    function getActivityInDataAsAddress(bytes32 _activityInstanceId, bytes32 _dataMappingId, BpmService _service) external view returns (address) {
        return _service.getActivityInDataAsAddress(_activityInstanceId, _dataMappingId);
    }

    function setActivityOutDataAsBool(bytes32 _activityInstanceId, bytes32 _dataMappingId, bool _value, BpmService _service) external pre_onlyAuthorizedCallers {
        _service.setActivityOutDataAsBool(_activityInstanceId, _dataMappingId, _value);
    }
    function setActivityOutDataAsString(bytes32 _activityInstanceId, bytes32 _dataMappingId, string _value, BpmService _service) external pre_onlyAuthorizedCallers {
        _service.setActivityOutDataAsString(_activityInstanceId, _dataMappingId, _value);
    }
    function setActivityOutDataAsBytes32(bytes32 _activityInstanceId, bytes32 _dataMappingId, bytes32 _value, BpmService _service) external pre_onlyAuthorizedCallers {
        _service.setActivityOutDataAsBytes32(_activityInstanceId, _dataMappingId, _value);
    }
    function setActivityOutDataAsUint(bytes32 _activityInstanceId, bytes32 _dataMappingId, uint _value, BpmService _service) external pre_onlyAuthorizedCallers {
        _service.setActivityOutDataAsUint(_activityInstanceId, _dataMappingId, _value);
    }
    function setActivityOutDataAsInt(bytes32 _activityInstanceId, bytes32 _dataMappingId, int _value, BpmService _service) external pre_onlyAuthorizedCallers {
        _service.setActivityOutDataAsInt(_activityInstanceId, _dataMappingId, _value);
    }
    function setActivityOutDataAsAddress(bytes32 _activityInstanceId, bytes32 _dataMappingId, address _value, BpmService _service) external pre_onlyAuthorizedCallers {
        _service.setActivityOutDataAsAddress(_activityInstanceId, _dataMappingId, _value);
    }
}
