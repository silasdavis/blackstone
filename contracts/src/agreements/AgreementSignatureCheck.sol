pragma solidity ^0.4.23;

import "commons-base/ErrorsLib.sol";
import "commons-management/ContractLocator.sol";
import "commons-management/ContractLocatorEnabled.sol";
import "bpm-runtime/Application.sol";
import "bpm-runtime/BpmService.sol";

import "agreements/ActiveAgreement.sol";

contract AgreementSignatureCheck is ContractLocatorEnabled, Application {
    
    string constant serviceIdBpmService = "BpmService";
    BpmService bpmService;

    /**
     * @dev Treats the provided DataStorage as the agreement and checks if the TX performer has applied a signature.
     * The function will REVERT if the presence of the signature could not be established.
     * param _processInstance the address of the ProcessInstance
     * @param _activityInstanceId the ID of an ActivityInstance
     * param _activityId the ID of the activity definition
     * @param _txPerformer the address which started the process transaction
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
        bpmService = BpmService(ContractLocator(_locator).getContract(serviceIdBpmService));
        ErrorsLib.revertIf(address(bpmService) == 0x0,
			ErrorsLib.DEPENDENCY_NOT_FOUND(), "AgreementSignatureCheck.setContractLocator", "BpmService not found");
        ContractLocator(_locator).addContractChangeListener(serviceIdBpmService);
    }

    /**
     * @dev Implements ContractLocatorEnabled.setContractLocator(address)
     */
    function contractChanged(string _name, address, address _newAddress) external pre_onlyByLocator {
        if (keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked(serviceIdBpmService))) {
            bpmService = BpmService(_newAddress);
        }
    }

}