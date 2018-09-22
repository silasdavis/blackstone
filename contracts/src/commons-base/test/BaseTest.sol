pragma solidity ^0.4.23;

import "commons-base/NamedElement.sol";
import "commons-base/AbstractNamedElement.sol";

/**
 * @dev Auxiliary contract to implement AbstractNamedElement
 */
contract TestElement is AbstractNamedElement {
	
	constructor(bytes32 _id, bytes32 _name) AbstractNamedElement(_id, _name) public {}
}

contract BaseTest {
	
	function testNamedElement() external returns (string) {
		
		NamedElement element = new TestElement("MyId", "MyName");
		if (element.getId() != "MyId") return "ID not set correctly.";
		if (element.getName() != "MyName") return "Name not set correctly.";
		
		return "success";
	}
	
}