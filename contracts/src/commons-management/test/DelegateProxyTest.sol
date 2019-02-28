pragma solidity ^0.4.25;

import "commons-utils/TypeUtilsLib.sol";
import "commons-management/AbstractDelegateProxy.sol";

contract DelegateProxyTest {

    using TypeUtilsLib for uint;
    using TypeUtilsLib for bytes32;

    string constant SUCCESS = "success";

    function testDelegateCallReturns() external returns (string) {

        TestDelegate delegate = new TestDelegate();
        TestProxy proxy = new TestProxy(address(delegate));
        
        if (proxy.getDelegate() != address(delegate)) return "The delegate should be set in the proxy";
        string memory result = TestDelegate(proxy).regularFunction();
        if (keccak256(abi.encodePacked(result)) != keccak256(abi.encodePacked("message"))) return "Proxy invocation of regularFunction should have returned the message";
        
        // check that the revert reason from the inner delegate function is returned as the proxy's revert reason
        bytes memory data = abi.encodeWithSignature("revertFunction()");
        address target = address(proxy);
        bytes memory returnData;
        bool success;
        uint returnSize;
        assembly {
            let freeMemSlot := mload(0x40)
            success := call(gas, target, 0, add(data, 0x20), mload(data), data, 0)
            returnSize := returndatasize
        }
        returnData = new bytes(returnSize);
        assembly {
            returndatacopy(add(returnData, 0x20), 0, returnSize)
        }
        // TODO the bytes returned here are longer than the bytes representing the revert reason. It looks like the function signature as well as 0-padding precedes the revert reason
        // This resembles the example of how a revert is encoded here: https://github.com/ethereum/EIPs/issues/838#issuecomment-458919375
        // However, a way to reliably extract the revert reason string from the bytes is currently not known, so we can't test for the reason being correctly transmitted
        // Not catching the revert in assembly above shows, though, that the inner revert reason from TestDelegate is re-thrown

        return SUCCESS;
    }

}

contract TestProxy is AbstractDelegateProxy {

    address delegate;

    constructor(address _delegate) public {
        delegate = _delegate;
    }

    function getDelegate() public view returns (address) {
        return delegate;
    }
}

contract TestDelegate {

    function regularFunction() public returns (string) {
        return "message";
    }

    function revertFunction() public {
        revert("TestDelegate::error");
    }
}


