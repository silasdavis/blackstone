pragma solidity ^0.4.23;

import "bpm-runtime/WorkflowProxy.sol";

/**
 * @title AgreementPartyProxy
 * @dev Proxies the call to the Agreement functions to sign and cancel
 */
contract AgreementPartyProxy is WorkflowProxy {

    /**
	 * @dev Signs the provided ActiveAgreement contract
	 * @param _agreement the address of a ActiveAgreement
	 */
    function signAgreement(address _agreement) external;

    /**
	 * @dev Signs the provided ActiveAgreement contract
	 * @param _agreement the address of a ActiveAgreement
	 */
    function cancelAgreement(address _agreement) external;

}