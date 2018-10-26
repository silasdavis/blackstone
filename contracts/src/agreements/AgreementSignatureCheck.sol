pragma solidity ^0.4.23;

import "commons-base/ErrorsLib.sol";
import "commons-management/ContractLocator.sol";
import "commons-management/ContractLocatorEnabled.sol";
import "bpm-runtime/Application.sol";
import "bpm-runtime/BpmService.sol";

import "agreements/ActiveAgreement.sol";

contract AgreementSignatureCheck is ContractLocatorEnabled, Application {
    
    string constant SERVICE_ID_BPM_SERVICE = "BpmService";
    BpmService bpmService;

    /**
     * @dev Accesses the "agreement" IN data mapping to retrieve the address of an ActiveAgreement and verifies that the TX performer has applied a signature.
     * REVERTS if:
     * - the IN data mapping "agreement" cannot be accessed or results in an empty address
     * - the presence of the signature on the agreement cannot be established.
     * param _processInstance the address of the ProcessInstance in which context the application is invoked
     * @param _activityInstanceId the globally unique ID of the ActivityInstance invoking this contract
     * param _activityId the ID of the activity definition
     * @param _txPerformer the address performing the transaction
     */
    function complete(address, bytes32 _activityInstanceId, bytes32, address _txPerformer) public {
        address agreement = bpmService.getActivityInDataAsAddress(_activityInstanceId, "agreement");
        require(agreement != 0x0);
        require(ActiveAgreement(agreement).isSignedBy(_txPerformer));
    }

    /**
     * @dev Overrides ContractLocatorEnabled.setContractLocator(address)
     */
    function setContractLocator(address _locator) public {
        super.setContractLocator(_locator);
        bpmService = BpmService(ContractLocator(_locator).getContract(SERVICE_ID_BPM_SERVICE));
        ErrorsLib.revertIf(address(bpmService) == address(0),
			ErrorsLib.DEPENDENCY_NOT_FOUND(), "AgreementSignatureCheck.setContractLocator", "BpmService not found");
        ContractLocator(_locator).addContractChangeListener(SERVICE_ID_BPM_SERVICE);
    }

    /**
     * @dev Implements ContractLocatorEnabled.contractChanged(string,address,address)
     */
    function contractChanged(string _name, address, address _newAddress) external pre_onlyByLocator {
        if (keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(SERVICE_ID_BPM_SERVICE))) {
            bpmService = BpmService(_newAddress);
        }
    }

}