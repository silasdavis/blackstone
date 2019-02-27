pragma solidity ^0.4.25;

import "commons-auth/Permissioned.sol";
import "commons-auth/AbstractPermissioned.sol";

contract PermissionedTest {
	
	string constant SUCCESS = "success";

	string constant permission1 = "test.permission1";
	string constant permission2 = "test.permission2";
	string constant permission3 = "test.permission3";

	string constant functionSigCreatePermission = "createPermission(string,bool,bool,bool)";
	string constant functionSigGrantPermission = "grantPermission(string,address)";
	string constant functionSigRevokePermission = "revokePermission(string,address)";
	string constant functionSigTransferPermission = "transferPermission(string,address)";

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



		object1.transferPermission(object1.ROLE_ID_PERMISSION_ADMIN(), msg.sender);
		if (!object1.hasPermission(object1.ROLE_ID_PERMISSION_ADMIN(), msg.sender)) return "The msg.sender should be the admin after transfer from test contract";

		// Make a permissioned object with pre-determined admin
		PermissionedObject object2 = new PermissionedObject(msg.sender);
		if (!object2.hasPermission(object2.ROLE_ID_PERMISSION_ADMIN(), msg.sender)) return "The test msg.sender should be the admin";
		// test function accessibility only by admin
		if (address(object2).call(abi.encodeWithSignature(functionSigCreatePermission,
			permission1, true, true, true))) return "Creating a permission without the admin role should revert";

		return SUCCESS;
	}

}

contract PermissionedObject is AbstractPermissioned {

	address creator;

	constructor(address _creator) AbstractPermissioned(_creator) public {
		creator = _creator;
	}
}