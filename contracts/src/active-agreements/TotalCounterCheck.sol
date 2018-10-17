pragma solidity ^0.4.24;

import "commons-base/ErrorsLib.sol";
import "commons-management/ContractLocator.sol";
import "commons-management/ContractLocatorEnabled.sol";
import "bpm-runtime/Application.sol";
import "bpm-runtime/BpmService.sol";

contract TotalCounterCheck is ContractLocatorEnabled, Application {

    string constant SERVICE_ID_BPM_SERVICE = "BpmService";
    BpmService bpmService;

    /**
     * @dev Increases a counter and writes result back. Also compares counter to total and set boolean output if total reached.
     * @param _activityInstanceId the ID of an ActivityInstance
     * param _activityId the ID of the activity definition
     * @param _txPerformer the address which started the process transaction
     */
    function complete(address, bytes32 _activityInstanceId, bytes32, address _txPerformer) public {
        uint current = bpmService.getActivityInDataAsUint(_activityInstanceId, "numberIn");
        uint total = bpmService.getActivityInDataAsUint(_activityInstanceId, "totalIn");
        current++;
        bpmService.setActivityOutDataAsUint(_activityInstanceId, "numberOut", current);
        if (current >= total)
            bpmService.setActivityOutDataAsBool(_activityInstanceId, "completedOut", true);
    }

    /**
     * @dev Overrides ContractLocatorEnabled.setContractLocator(address)
     */
    function setContractLocator(address _locator) public {
        super.setContractLocator(_locator);
        bpmService = BpmService(ContractLocator(_locator).getContract(SERVICE_ID_BPM_SERVICE));
        ErrorsLib.revertIf(address(bpmService) == address(0),
			ErrorsLib.DEPENDENCY_NOT_FOUND(), "NumberIncrementor.setContractLocator", "BpmService not found");
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
