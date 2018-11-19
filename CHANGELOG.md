# Changelog - Blackstone Smart Contract Framework

## Release History

- Version [0.5.0](#v0.5.0)

## <a name="v0.5.0">Release v0.5.0</a>

### Compatibility

This release was tested with the following software and versions:

|                    |        |
| :----------------- | :----- |
| Hyperledger Burrow | 0.23.1 |
| Solc               | 0.4.25 |

### Breaking Changes

- The `UserAccount` contract has been turned into a DelegateProxy capable of forwarding calls. No longer needed specialized contracts `WorkflowUserAccount` and `AgreementPartyAccount` have been removed.
- Several functions (`getInData...`, `setOutData...`, `completeActivityWith...`) have been moved from BpmService (and former `WorkflowUserAccount`) to the `ProcessInstance`. This greatly improves application building since it's no longer required to wire the BpmService into an application and deploy it in DOUG like a service. 
-  The function signature of the complete function of an `Application` has been changed to include the address of the `ProcessInstance`: `function complete(address _processInstance, bytes32 _activityInstanceId, bytes32 _activityId, address _txPerformer)`.
-  The use of fixed-size arrays has been replaced with dynamic arrays in contracts `DataStorage` and `Organization`.

### Features

- Removed SQLsol mechanism using a memory database (SQLite) as object cache and replaced it with a Postgres DB that is populated via Vent, a query/filter mechanism reading events directly from blocks retrieved from Burrow.
- The Blackstone Node app now provides a way to pass an existing HTTP server upon startup to which all routes and endpoints are added. This allows to use Blackstone embedded in other applications.
- The BPM model now supports process diagrams with two gateways connected directly to each other with the explicit addition of an empty activity between them.
- The JSON response of the API endpoint `GET /agreements/:address` has been enhanced to resemble more closely the data of an archetype by adding documents, parameter type, and process definitions.


### Bug Fixes

- Fixed bug in API layer where transition conditions in the BPM Model based on uint values were skewed due to passing the value to burrow.js as string.
- Fixed problem in `BpmRuntimeLib` contract regarding the treatment a process graph with a loop where an already traversed node was not reset to be used again.
- Fixed a bug in the API when parsing and deploying a process model and the placeholder `PROCESS_INSTANCE` in the model was not removed as a dataStorageId prior to setting transition conditions in the smart contracts leading transition conditions relying on the ProcessInstance's data storage to revert.
