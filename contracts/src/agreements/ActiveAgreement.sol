pragma solidity ^0.4.25;

import "commons-collections/DataStorage.sol";
import "commons-collections/AddressScopes.sol";
import "commons-events/EventEmitter.sol";
import "documents-commons/Signable.sol";
import "commons-management/VersionedArtifact.sol";
import "commons-auth/Permissioned.sol";

import "agreements/Agreements.sol";

/**
 * @title ActiveAgreement Interface
 * @dev API for interaction with an Active Agreement
 */
contract ActiveAgreement is VersionedArtifact, Permissioned, DataStorage, AddressScopes, Signable, EventEmitter {

	// original event definition
	event LogAgreementCreation(
		bytes32 indexed eventId,
		address	agreementAddress,
		address	archetypeAddress,
		address	creator,
		bool isPrivate,
		uint8 legalState,
		uint32 maxEventCount,
		string privateParametersFileReference,
		string eventLogFileReference
	);

	// v1.1.0 LogAgreementCreation event with added field 'owner' and modified parameters ordering
	event LogAgreementCreation_v1_1_0(
		bytes32 indexed eventId,
		address	agreementAddress,
		address	archetypeAddress,
		address	creator,
		address	owner,
		string privateParametersFileReference,
		string eventLogFileReference,
		bool isPrivate,
		uint8 legalState,
		uint32 maxEventCount
	);

	event LogAgreementLegalStateUpdate(
		bytes32 indexed eventId,
		address agreementAddress,
		uint8 legalState
	);

	event LogAgreementMaxEventCountUpdate(
		bytes32 indexed eventId,
		address agreementAddress,
		uint32 maxEventCount
	);

	event LogAgreementEventLogReference(
		bytes32 indexed eventId,
		address agreementAddress,
		string eventLogFileReference
	);

	event LogAgreementSignatureLogReference(
		bytes32 indexed eventId,
		address agreementAddress,
		string signatureLogFileReference
	);

	event LogActiveAgreementToPartySignaturesUpdate(
		bytes32 indexed eventId,
		address agreementAddress,
		address party,
		address signedBy,
		uint signatureTimestamp
	);

	event LogActiveAgreementToPartyCancelationsUpdate(
		bytes32 indexed eventId,
		address agreementAddress,
		address party,
		address canceledBy,
		uint cancelationTimestamp
	);

	event LogGoverningAgreementUpdate(
		bytes32 indexed eventId,
		address agreementAddress,
		address governingAgreementAddress
	);

	// LogAgreementOwnerUpdate is used when retrofitting Agreement contracts < v1.1.0 with an owner value
	// see also #upgradeOwnerPermission(address)
	event LogAgreementOwnerUpdate(
		bytes32 indexed eventId,
		address agreementAddress,
		address owner
	);

	bytes32 public constant EVENT_ID_AGREEMENTS = "AN://agreements";
	bytes32 public constant EVENT_ID_AGREEMENT_PARTY_MAP = "AN://agreement-to-party";
	bytes32 public constant EVENT_ID_GOVERNING_AGREEMENT = "AN://governing-agreements";

	bytes32 public constant DATA_FIELD_AGREEMENT_PARTIES = "AGREEMENT_PARTIES";

	// Internal EventListener event
	bytes32 public constant EVENT_ID_STATE_CHANGED = "AGREEMENT_STATE_CHANGED";

 	bytes32 public constant ROLE_ID_OWNER = keccak256(abi.encodePacked("agreement.owner"));

	/**
	 * @dev Initializes this ActiveAgreement with the provided parameters. This function replaces the
	 * contract constructor, so it can be used as the delegate target for an ObjectProxy.
	 * @param _archetype archetype address
	 * @param _creator the account that created this agreement
	 * @param _owner the account that owns this agreement
	 * @param _privateParametersFileReference the file reference to the private parameters
	 * @param _isPrivate if agreement is private
	 * @param _parties the signing parties to the agreement
	 * @param _governingAgreements array of agreement addresses which govern this agreement
	 */
	function initialize(
		address _archetype, 
		address _creator, 
		address _owner, 
		string _privateParametersFileReference, 
		bool _isPrivate, 
		address[] _parties, 
		address[] _governingAgreements)
		external;
		
	/**
	 * @dev Returns the number governing agreements for this agreement
	 * @return the number of governing agreements
	 */
	function getNumberOfGoverningAgreements() external view returns (uint size);

	/**
	 * @dev Retrieves the address for the governing agreement at the specified index
	 * @param _index the index position
	 * @return the address for the governing agreement
	 */
	function getGoverningAgreementAtIndex(uint _index) external view returns (address agreementAddress);

	/**
	 * @dev Gets number of parties
	 * @return size number of parties
	 */
	function getNumberOfParties() external view returns (uint size);

	/**
	 * @dev Returns the party at the given index
	 * @param _index the index position
	 * @return the party's address
	 */
	function getPartyAtIndex(uint _index) external view returns (address party);

	/**
	 * @dev Returns the archetype
	 * @return the archetype address
	 */
	function getArchetype() external view returns (address);

	/**
	 * @dev Sets the max number of events for this agreement
	 */
	function setMaxNumberOfEvents(uint32 _maxNumberOfEvents) external;

	/**
	 * @dev Returns the reference to the private parameters of this ActiveAgreement
	 * @return the reference to an external document containing private parameters
	 */
	function getPrivateParametersReference() external view returns (string);

	/**
	 * @dev Updates the file reference for the event log of this agreement
	 * @param _eventLogFileReference the file reference to the event log
	 */
	function setEventLogReference(string _eventLogFileReference) external;

	/**
	 * @dev Returns the reference for the event log of this ActiveAgreement
	 * @return the file reference for the event log of this agreement
	 */
	function getEventLogReference() external view returns (string);

	/**
	 * @dev Updates the file reference for the signature log of this agreement
	 * @param _signatureLogFileReference the file reference to the signature log
	 */
	function setSignatureLogReference(string _signatureLogFileReference) external;

	/**
	 * @dev Returns the reference for the signature log of this ActiveAgreement
	 * @return the reference to an external document containing the signature log
	 */
	function getSignatureLogReference() external view returns (string);

	/**
	 * @dev Returns the max number of events for the event log
	 * @return the max number of events for the event log
	 */
	function getMaxNumberOfEvents() external view returns (uint32);

	/**
	 * @dev Returns the creator
	 * @return the creator	 
	 */
	function getCreator() external view returns (address);

	/**
	 * @dev Returns the owner
	 * @return the owner
	 */
	function getOwner() external view returns (address);

	/**
	 * @dev Returns the private state
	 * @return the private flag 
	 */
	function isPrivate() external view returns (bool);

	/**
	 * @dev Applies the msg.sender signature
	 * This function should REVERT if the cancel operation could not be carried out successfully.
	 */
	function sign() external;

	/**
	 * @dev Returns the signee of the signature of the given party.
	 * @param _party the signing party
	 * @return the address of the signee (if the party authorized a signee other than itself)
	 */
	function getSignee(address _party) external view returns (address signee);

	/**
	 * @dev Returns the timestamp of the signature of the given party.
	 * @param _party the signing party
	 * @return the time of signing or 0 if the address is not a party to this agreement or has not signed yet
	 */
	function getSignatureTimestamp(address _party) external view returns (uint signatureTimestamp);

	/**
	 * @dev Returns the timestamp of the signature of the given party.
	 * @param _party the signing party
	 * @return the address of the signee (if the party authorized a signee other than itself)
	 * @return the time of signing or 0 if the address is not a party to this agreement or has not signed yet
	 */
	function getSignatureDetails(address _party) external view returns (address, uint);

	/**
	 * @dev Returns whether the given account's signature is on the agreement.
	 * @param _signee The account to check
	 * @return true if the provided address is a recorded signature on the agreement, false otherwise
	 */
	function isSignedBy(address _signee) external view returns (bool);

	/**
	 * @dev Returns the legal state of this agreement
	 * @return the Agreements.LegalState as a uint
	 */
	function getLegalState() external view returns (uint8);

	/**
	 * @dev Sets the legal state of this agreement to Agreements.LegalState.FULFILLED.
	 * Note: All other legal states are set by internal logic.
	 */
	function setFulfilled() external;

	/**
	 * @dev Registers the msg.sender as having cancelled the agreement.
	 * During formation (legal states DRAFT and FORMULATED), the agreement can cancelled unilaterally by one of the parties to the agreement.
	 * During execution (legal state EXECUTED), the agreement can only be canceled if all parties agree to do so by invoking this function.
	 * This function should REVERT if the cancel operation could not be carried out successfully.
	 */ 
	function cancel() external;

	/**
	 * @dev Creates the "owner" permission and sets the owner of the ActiveAgreement to the specified address.
	 * This function is used to retrofit older (< v1.1.0) contracts that did not get the owner field set in their initialize() function
	 * and emit an appropriate event that can be used to update external data systems
	 * @param _owner the owner of this ActiveAgreement
	 */
	function upgradeOwnerPermission(address _owner) external;

}
