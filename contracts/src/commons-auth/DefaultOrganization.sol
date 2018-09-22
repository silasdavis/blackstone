pragma solidity ^0.4.23;

import "commons-base/BaseErrors.sol";
import "commons-standards/AbstractERC165.sol";
import "commons-events/DefaultEventEmitter.sol";

import "commons-auth/Governance.sol";
import "commons-auth/Organization.sol";
import "commons-auth/UserAccount.sol";

/**
 * @title DefaultOrganization
 * @dev the default implementation of the Organization interface.
 */
contract DefaultOrganization is Organization, DefaultEventEmitter, AbstractERC165 {
	
    bytes32 constant EVENT_UPDATE_ORGANIZATION_USER = "UpdateOrganizationUser";
    bytes32 constant EVENT_REMOVE_ORGANIZATION_USER = "RemoveOrganizationUser";
    bytes32 constant EVENT_UPDATE_ORGANIZATION_DEPARTMENT = "UpdateOrganizationDepartment";
    bytes32 constant EVENT_REMOVE_ORGANIZATION_DEPARTMENT = "RemoveOrganizationDepartment";
    bytes32 constant EVENT_UPDATE_DEPARTMENT_USER = "UpdateDepartmentUser";
    bytes32 constant EVENT_REMOVE_DEPARTMENT_USER = "RemoveDepartmentUser";

	using MappingsLib for Mappings.AddressBoolMap;

	Governance.Organization self;

	// The approvers list is intended to be used as a "board" or admin permission list to make changes to this organization
	address[] approvers;
	Mappings.AddressBoolMap users;

	/**
	 *
	 */
	constructor(address[10] _approvers) public {
		for (uint i=0; i<_approvers.length; i++) {
			if (_approvers[i] != 0x0) {
				approvers.push(_approvers[i]);
			}
		}
		// if no _approvers were passed, register msg.sender as an approver
		if (approvers.length == 0) {
			approvers.push(msg.sender);
		}
		addInterfaceSupport(ERC165_ID_Organization);
	}

	function addDepartment(bytes32 _id, string _name) external returns (uint error) {
		if (self.departments[_id].exists) {
			return BaseErrors.RESOURCE_ALREADY_EXISTS();
		}
		self.departments[_id].keyIdx = self.departmentKeys.push(_id)-1;
		self.departments[_id].id = _id;
		self.departments[_id].name = _name;
		self.departments[_id].exists = true;
		emitEvent(EVENT_UPDATE_ORGANIZATION_DEPARTMENT, this, _id);
		return BaseErrors.NO_ERROR();
	}

	function getNumberOfDepartments() external view returns (uint size) {
		return self.departmentKeys.length;
	}

	function getDepartmentAtIndex(uint _index) external view returns (bytes32 id) {
		return self.departmentKeys[_index];
	}

	function getDepartmentData(bytes32 _id) external view returns (uint userCount, string name) {
		userCount = self.departments[_id].users.keys.length;
		name = self.departments[_id].name;
	}

	function departmentExists(bytes32 _id) external view returns (bool) {
		return self.departments[_id].exists;
	}

	/**
	 * @dev Returns the number of registered approvers.
	 * @return the number of approvers
	 */
	function getNumberOfApprovers() external view returns (uint) {
		return approvers.length;
	}
	
	/**
	 * @dev Returns the approver's address at the given index position.
	 * @param _pos the index position
	 * @return the address or 0x0 if the position does not exist
	 */
	function getApproverAtIndex(uint _pos) external view returns (address) {
		if (_pos < approvers.length) {
			return approvers[_pos];
		}
		return 0x0;
	}

	/**
	 * @dev returns the number of users associated with this organization
	 * @return the number of users
	 */
	function getNumberOfUsers() external view returns (uint) {
		return users.keys.length;
	}

	/**
	 * @dev Returns the user's address at the given index position.
	 * @param _pos the index position
	 * @return the address or 0x0 if the position does not exist
	 */
	function getUserAtIndex(uint _pos) external view returns (address) {
		if (_pos < users.keys.length) {
			(, address userAccount) = users.keyAtIndex(_pos);
			return userAccount;
		}
		return 0x0;
	}

	function getNumberOfDepartmentUsers(bytes32 _depId) external view returns (uint size) {
		size = self.departments[_depId].users.keys.length;
	}

	function getDepartmentUserAtIndex(bytes32 _depId, uint _index) external view returns (address userAccount) {
		if (_index < self.departments[_depId].users.keys.length) {
		 	userAccount = self.departments[_depId].users.keys[_index];
		} else {
			userAccount = 0x0;
		}
	}

	/**
	 * @dev Adds the specified user to this organization if they do not already exist within it.
	 * @param _userAccount the user to add
	 * @return bool true if successful
	 */
    function addUser(address _userAccount) public returns (bool) {
		if (!users.exists(_userAccount)) {
			users.insert(_userAccount, true);
			emitEvent(EVENT_UPDATE_ORGANIZATION_USER, this, _userAccount);
		}
		return true;
	}

	/**
	 * @dev Adds the specified user to the organization if they aren't already registered, then adds the user to the department if they aren't already in it.
	 * @param _userAccount the user to add
	 * @param _department department id to which the user should be added
	 * @return bool true if successful
	 */
	function addUserToDepartment(address _userAccount, bytes32 _department) external returns (bool) {
		if (_department == "") return false;
		addUser(_userAccount);
		if (!self.departments[_department].exists) {
			return false;
		} else if (self.departments[_department].users.exists(_userAccount)) {
			return false;
		}
		self.departments[_department].users.insert(_userAccount, true);
		emitEvent(EVENT_UPDATE_DEPARTMENT_USER, this, _department, _userAccount);
		return true;
	}

	/**
	 * @dev Removes the user in this organization and all departments they were in.
	 * @param _userAccount the account to remove
	 * @return bool true if user is removed successfully
	 */
	function removeUser(address _userAccount) external returns (bool) {
		for (uint i = 0; i < self.departmentKeys.length; i++) {
			bytes32 depId = self.departmentKeys[i];
			removeUserFromDepartment(_userAccount, depId);
		}
		if (users.exists(_userAccount)) {
			users.remove(_userAccount);
			emitEvent(EVENT_REMOVE_ORGANIZATION_USER, this, _userAccount);
			return true;
		}
		return false;
	}

	function removeDepartment(bytes32 _depId) external returns (bool) {
		if (self.departments[_depId].exists) {
			uint256 depKeyIdx = self.departments[_depId].keyIdx;
			bytes32 swapKey = Mappings.deleteInKeys(self.departmentKeys, depKeyIdx);
			if (swapKey != "") {
				self.departments[swapKey].keyIdx = self.departments[_depId].keyIdx;
			}
			delete self.departments[_depId];
			emitEvent(EVENT_REMOVE_ORGANIZATION_DEPARTMENT, this, _depId);
			return true;
		}
		return false;
	}

	function removeUserFromDepartment(address _userAccount, bytes32 _depId) public returns (bool) {
		if (self.departments[_depId].users.exists(_userAccount)) {
			self.departments[_depId].users.remove(_userAccount);
			emitEvent(EVENT_REMOVE_DEPARTMENT_USER, this, _depId, _userAccount);
			return true;
		}
		return false;
	}

	/**
	 * @dev Returns whether the given user account is active in this organization and is authorized.
	 * The optional department/role identifier can be used to provide an additional authorization scope
	 * against which to authorize the user.
	 * @param _userAccount the user account
	 * @param _department an optional department/role context
	 * @return true if authorized, false otherwise
	 */
	function authorizeUser(address _userAccount, bytes32 _department) external view returns (bool) {
		if (_department == "") {
			return users.exists(_userAccount);
		}
		return (self.departments[_department].exists &&
				self.departments[_department].users.exists(_userAccount));
	}

}