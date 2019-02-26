pragma solidity ^0.4.25;

import "commons-auth/Permissioned.sol";
import "commons-auth/AbstractPermissioned.sol";

contract PermissionedTest {
	
	string constant SUCCESS = "success";

	/**
	 * @dev Tests the functions of a Permissioned contract
	 */
	function testPermissions() external returns (string) {


		return SUCCESS;
	}

}

contract PermissionedObject is AbstractPermissioned {

	constructor() public {
		
	}
}