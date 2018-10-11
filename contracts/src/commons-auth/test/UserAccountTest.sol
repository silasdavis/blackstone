pragma solidity ^0.4.23;

import "commons-utils/TypeUtilsAPI.sol";

import "commons-auth/UserAccount.sol";
import "commons-auth/DefaultUserAccount.sol";

contract UserAccountTest {
	
	string constant SUCCESS = "success";

	string testServiceFunctionSig = "serviceInvocation(address,uint256,bytes32)";

	/**
	 * @dev Tests the UserAccount call forwarding logic
	 */
	function testCallForwarding() external returns (string) {

		uint testState = 42;
		bytes32 testKey = "myKey";
		TestService testService = new TestService();

		UserAccount account = new DefaultUserAccount("userId77", this, 0x0);
		UserAccount externalAccount = new DefaultUserAccount("userId14", msg.sender, 0x0);

		bytes memory payload = abi.encodeWithSignature(testServiceFunctionSig, address(this), testState, testKey);
		// test failures
		// *IMPORTANT*: the use of the abi.encode function for this call is extremely important since sending the parameters individually via call(bytes4, args...)
		// has known problems encoding the dynamic-size parameters correctly, see https://github.com/ethereum/solidity/issues/2884
		if (address(account).call(bytes4(keccak256("forwardCall(address,bytes)")), abi.encode(address(0), payload))) 
			return "Forwarding a call to an empty address should fail";
		if (address(account).call(bytes4(keccak256("forwardCall(address,bytes)")), abi.encode(address(testService), abi.encodeWithSignature("fakeFunction(bytes32)", testState))))
			return "Forwarding a call to a non-existent function should fail";		
		// unauthorized accounts (not owner)
		if (address(externalAccount).call(bytes4(keccak256(abi.encodePacked("forwardCall(address,bytes)"))), abi.encode(address(testService), payload)))
			return "Forwarding a call from an unauthorized address should fail";

		// test successful invocation
		bytes memory returnData = account.forwardCall(address(testService), payload);
		if (testService.currentEntity() != address(this)) return "The testService should show this address as the current entity";
		if (testService.currentState() != testState) return "The testService should have the testState set";
		if (testService.currentKey() != testKey) return "The testService should have the testKey set";
		if (testService.lastCaller() != address(account)) return "The testService should show the UserAccount as the last caller";
		// TODO the returnData is always empty and cannot be tested. See TODO in DefaultUserAccount.forwardCall
		// TODO ability to decode return data via abi requires 0.5.0.
		// (bytes32 message) = abi.decode(returnData,(bytes32));
		// if (message != testService.getSuccessMessage()) return "The function return data should match the service success message";

		return SUCCESS;
	}

}

/**
 * @dev Contract providing a typical service function to use as target for call forwarding.
 */
contract TestService {

	address public currentEntity;
	uint public currentState;
	bytes32 public currentKey;
	address public lastCaller;

	function serviceInvocation(address _entity, uint _newState, bytes32 _key) public returns (bytes32) {

		currentEntity = _entity;
		currentState = _newState;
		currentKey = _key;
		lastCaller = msg.sender;
		return "congrats";
	}

	function getSuccessMessage() public pure returns (bytes32) {
		return "congrats";	
	}
}