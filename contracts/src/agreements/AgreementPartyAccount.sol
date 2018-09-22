pragma solidity ^0.4.23;

import "bpm-runtime/WorkflowUserAccount.sol";

import "agreements/ActiveAgreement.sol";
import "agreements/AgreementPartyProxy.sol";

/**
 * @title AgreementPartyAccount
 * @dev Agreement-focused implementation of a UserAccount
 */
contract AgreementPartyAccount is WorkflowUserAccount, AgreementPartyProxy {
	
	/**
	 * @dev Creates a new AgreementPartyAccount
	 * @param _id an identifier for the user
	 * @param _owner the owner of the user account
	 * @param _ecosystem the address of an Ecosystem to which the user account is connected
	 */
	constructor(bytes32 _id, address _owner, address _ecosystem) WorkflowUserAccount(_id, _owner, _ecosystem) public {}

    /**
	 * @dev Signs the provided ActiveAgreement contract in the name of this user
	 * @param _agreement the address of an ActiveAgreement
	 * REVERTS if:
	 * - the caller could not be authorized
	 */
    function signAgreement(address _agreement) external pre_onlyAuthorizedCallers {
        ActiveAgreement(_agreement).sign();
    }

    /**
	 * @dev Cancels the provided ActiveAgreement contract in the name of this user
	 * @param _agreement the address of an ActiveAgreement
	 * REVERTS if:
	 * - the caller could not be authorized (see AgreementsAPI.authorizePartyActor())
	 */
    function cancelAgreement(address _agreement) external pre_onlyAuthorizedCallers {
        ActiveAgreement(_agreement).cancel();
    }

}