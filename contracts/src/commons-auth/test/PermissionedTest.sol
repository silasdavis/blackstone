pragma solidity ^0.4.25;

import "commons-auth/Permissioned.sol";
import "commons-auth/AbstractPermissioned.sol";

contract PermissionedTest {
	
	string constant SUCCESS = "success";

	/**
	 * @dev Tests the functions of a Permissioned contract
	 */
	function testPermissions() external returns (string) {

		PermissionedObject object = new PermissionedObject(msg.sender);
		if (!object.hasPermission(object.ROLE_ID_PERMISSION_ADMIN(), address(this))) return "The test contract should be the permission admin first";
		object.transferPermission(object.ROLE_ID_PERMISSION_ADMIN(), msg.sender);
		if (!object.hasPermission(object.ROLE_ID_PERMISSION_ADMIN(), msg.sender)) return "The msg.sender should be the permission admin after transfer";

		return SUCCESS;
	}

}

contract PermissionedObject is AbstractPermissioned {

	address creator;

	constructor(address _creator) public {
		creator = _creator;
	}
}