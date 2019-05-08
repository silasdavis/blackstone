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
		if (!object1.hasPermission(object1.ROLE_ID_OBJECT_ADMIN(), address(this))) return "The test contract should be the admin for object1";

		// Make a permissioned object with pre-determined admin
		PermissionedObject object2 = new PermissionedObject(msg.sender);
		if (!object2.hasPermission(object2.ROLE_ID_OBJECT_ADMIN(), msg.sender)) return "The test msg.sender should be the admin for object2";

		// verify function signatures are all working before testing revert scenarios!
		if (!address(object1).call(abi.encodeWithSignature(functionSigCreatePermission,
			permission1, true, true, true))) return "functionSigCreatePermission should work in call()";
		if (!address(object1).call(abi.encodeWithSignature(functionSigGrantPermission,
			permission1, address(this)))) return "functionSigGrantPermission should work in call()";
		if (!address(object1).call(abi.encodeWithSignature(functionSigTransferPermission,
			permission1, msg.sender))) return "functionSigTransferPermission should work in call()";
		if (!address(object1).call(abi.encodeWithSignature(functionSigRevokePermission,
			permission1, msg.sender))) return "functionSigRevokePermission should work in call()";

    // Create and set up more permissions with different attributes
		object1.createPermission(permission2, true, false, false);
		object1.grantPermission(permission2, address(this));
		object1.createPermission(permission3, false, false, false);
		object1.grantPermission(permission3, address(this));

    // Make another permissioned object and permissions for testing pre_requiresPermission
		PermissionedObject object3 = new PermissionedObject(address(this));
		object3.createPermission(permission1, true, true, true);
		object3.createPermission(permission2, true, true, true);
		object3.grantPermission(permission2, msg.sender);
		object3.transferPermission(object3.ROLE_ID_OBJECT_ADMIN(), msg.sender);

    // Revert Scenarios:

    /* createPermission
      1. Fails pre_requiresPermission(ROLE_ID_OBJECT_ADMIN)
      2. Permission already exists
    */
    if (address(object3).call(abi.encodeWithSignature(functionSigCreatePermission,
			permission1, true, true, true))) return "Creating a permission without the admin role should revert";
    if (address(object1).call(abi.encodeWithSignature(functionSigCreatePermission,
			permission1, true, false, false))) return "Creating a permission that already exists should revert";

    /* grantPermission
      1. Fails pre_requiresPermission(ROLE_ID_OBJECT_ADMIN)
      2. Permission does not exist
      3. Overwritting an already-granted single-holder permission
    */
    if (address(object3).call(abi.encodeWithSignature(functionSigGrantPermission,
			permission1, msg.sender))) return "Granting a permission without the admin role should revert";
    if (address(object1).call(abi.encodeWithSignature(functionSigGrantPermission,
			"fakePermission", msg.sender))) return "Granting a non-existent permission should revert";
    if (address(object1).call(abi.encodeWithSignature(functionSigGrantPermission,
			permission3, msg.sender))) return "Re-granting a single-holder permission should revert";

    /* transferPermission
      1. Permission does not exist
      2. Permission is not transferable
      3. msg.sender does not hold the specified permission
      4. Permission is already held by specified account
    */
		if (address(object1).call(abi.encodeWithSignature(functionSigTransferPermission,
			"fakePermission", msg.sender))) return "Transfering a non-existant permission should revert";
		if (address(object1).call(abi.encodeWithSignature(functionSigTransferPermission,
			permission2, msg.sender))) return "Transfering a non-transferable permission should revert";
    object1.grantPermission(permission1, msg.sender);
		if (address(object1).call(abi.encodeWithSignature(functionSigTransferPermission,
			permission1, address(this)))) return "Transfering a permission from an account that does not hold the permission should revert";
    object1.revokePermission(permission1, msg.sender);
    object1.grantPermission(permission1, address(this));
		if (address(object1).call(abi.encodeWithSignature(functionSigTransferPermission,
			permission1, address(this)))) return "Transfering a permission to an account already holding the permission should revert";

    /* revokePermission
      1. Fails pre_requiresPermission(ROLE_ID_OBJECT_ADMIN)
      2. Permission does not exist
      3. Permission is not revocable
      4. Permission is not held by specified account
    */
    if (address(object3).call(abi.encodeWithSignature(functionSigRevokePermission,
			permission2, msg.sender))) return "Revoking another account's permission without the admin role should revert";
  	if (address(object1).call(abi.encodeWithSignature(functionSigRevokePermission,
			"fakePermission", msg.sender))) return "Revoking a non-existent permission should revert";
		if (address(object1).call(abi.encodeWithSignature(functionSigRevokePermission,
			permission2, address(this)))) return "Revoking a non-revocable permission should revert";
		if (address(object1).call(abi.encodeWithSignature(functionSigRevokePermission,
			object1.ROLE_ID_OBJECT_ADMIN(), address(this)))) return "Revoking the admin permission from the only holder should revert";
		if (address(object1).call(abi.encodeWithSignature(functionSigRevokePermission,
			permission1, msg.sender))) return "Revoking a permission from an account that doesn't hold the permission should revert";

		// Test various multi-holder permissions
		if (!object1.hasPermission(permission1, address(this))) return "Test contract should have permission1 on object1";
		if (object1.hasPermission(permission1, msg.sender)) return "msg.sender should not have permission1 on object1";
		object1.grantPermission(permission1, msg.sender);
		if (!object1.hasPermission(permission1, msg.sender)) return "msg.sender should have permission1 on object1";
		object1.revokePermission(permission1, msg.sender);
		if (object1.hasPermission(permission1, msg.sender)) return "msg.sender should have had permission1 on object1 revoked from them";
		object1.transferPermission(permission1, msg.sender);
		if (!object1.hasPermission(permission1, msg.sender)) return "msg.sender should have had permission1 on object1 transfered to them";
		if (object1.hasPermission(permission1, address(this))) return "Test contract should have had permission1 on object1 transfered from them";

		// Test transfer of object admin role
		object1.transferPermission(object1.ROLE_ID_OBJECT_ADMIN(), msg.sender);
		if (!object1.hasPermission(object1.ROLE_ID_OBJECT_ADMIN(), msg.sender)) return "The msg.sender should be the admin after transfer from test contract";

		return SUCCESS;
	}

}

contract PermissionedObject is AbstractPermissioned {

	address creator;

	constructor(address _creator) AbstractPermissioned() public {
		initializeObjectAdministrator(_creator);
		creator = _creator;
	}

}