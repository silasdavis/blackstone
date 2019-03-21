pragma solidity ^0.4.25;

import "commons-auth/Permissioned.sol";
import "commons-auth/AbstractPermissioned.sol";

contract PermissionedTest {
	
	string constant SUCCESS = "success";

	bytes32 constant permission1 = "test.permission1";
	bytes32 constant permission2 = "test.permission2";
	bytes32 constant permission3 = "test.permission3";
	bytes32 constant permission4 = "test.permission4";

	string constant functionSigCreatePermission = "createPermission(bytes32,bool,bool,bool)";
	string constant functionSigGrantPermission = "grantPermission(bytes32,address)";
	string constant functionSigRevokePermission = "revokePermission(bytes32,address)";
	string constant functionSigTransferPermission = "transferPermission(bytes32,address)";

	/**
	 * @dev Tests the functions of a Permissioned contract
	 */
	function testPermissions() external returns (string) {

		// Make a permissioned object with no pre-determined admin
		PermissionedObject object1 = new PermissionedObject(address(0));
		if (!object1.hasPermission(object1.ROLE_ID_PERMISSION_ADMIN(), address(this))) return "The test contract should be the admin";

		// verify function signatures are all working before testing revert scenarios!
		if (!address(object1).call(abi.encodeWithSignature(functionSigCreatePermission,
			permission1, true, true, true))) return "functionSigCreatePermission should work in call()";
		if (!address(object1).call(abi.encodeWithSignature(functionSigGrantPermission,
			permission1, address(this)))) return "functionSigGrantPermission should work in call()";
		if (!address(object1).call(abi.encodeWithSignature(functionSigTransferPermission,
			permission1, msg.sender))) return "functionSigTransferPermission should work in call()";
		if (!address(object1).call(abi.encodeWithSignature(functionSigRevokePermission,
			permission1, msg.sender))) return "functionSigRevokePermission should work in call()";

		if (address(object1).call(abi.encodeWithSignature(functionSigCreatePermission,
			permission1, true, false, false))) return "Creating a permission that already exists should revert";
		if (address(object1).call(abi.encodeWithSignature(functionSigGrantPermission,
			"fakePermission", msg.sender))) return "Granting a non-existent permission should revert";

		// Create various multi-holder permissions and test
		object1.createPermission(permission2, true, false, true);
		object1.createPermission(permission3, true, false, false);

		if (object1.hasPermission(permission1, msg.sender)) return "msg.sender should not have permission1 on object1";
		object1.grantPermission(permission1, msg.sender);
		if (!object1.hasPermission(permission1, msg.sender)) return "msg.sender should have permission1 on object1";



		// Test transfer of permission admin role
		object1.transferPermission(object1.ROLE_ID_PERMISSION_ADMIN(), msg.sender);
		if (!object1.hasPermission(object1.ROLE_ID_PERMISSION_ADMIN(), msg.sender)) return "The msg.sender should be the admin after transfer from test contract";

		// Make a permissioned object with pre-determined admin
		PermissionedObject object2 = new PermissionedObject(msg.sender);
		if (!object2.hasPermission(object2.ROLE_ID_PERMISSION_ADMIN(), msg.sender)) return "The test msg.sender should be the admin";
		// test function accessibility (modifier) only by admin
		if (address(object2).call(abi.encodeWithSignature(functionSigCreatePermission,
			permission1, true, true, true))) return "Creating a permission without the admin role should revert";

		return SUCCESS;
	}

}

contract PermissionedObject is AbstractPermissioned {

	address creator;

	constructor(address _creator) AbstractPermissioned() public {
		initializeAdministrator(_creator);
		creator = _creator;
	}

}