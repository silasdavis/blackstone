pragma solidity ^0.4.23;

import "commons-base/ErrorsLib.sol";
import "commons-collections/Mappings.sol";
import "commons-collections/MappingsLib.sol";

import "commons-auth/UserAccount.sol";
import "commons-auth/Ecosystem.sol";
import "commons-auth/Governance.sol";

/**
 * @title DefaultUserAccount
 * @dev The default implementation of a UserAccount
 */
contract DefaultUserAccount is UserAccount {

    using MappingsLib for Mappings.AddressBoolMap;

    Governance.UserAccount account;

    /**
     * @dev Modifier that restricts the function access to the owner address or one of the address known to belong to an ecosystem that this account is connected to.
     * REVERTS if:
     * - the msg.sender is not the owner and not one of the addresses associated with one of the account's ecosystems
     */
    modifier pre_onlyAuthorizedCallers() {
        bool authorized = msg.sender == owner;
        if (!authorized) {
            for (uint i=0; i<account.ecosystems.keys.length; i++) {
                if (Ecosystem(account.ecosystems.keys[i]).isKnownExternalAddress(msg.sender)) {
                    authorized = true;
                    break;
                }
            }
        }
        ErrorsLib.revertIf(!authorized, ErrorsLib.UNAUTHORIZED(), "DefaultUserAccount.pre_onlyAuthorizedCallers", "Caller is neither owner nor known ecosystem");
        _;
    }

    /**
     * @dev Creates a new UserAccount with the given ID and belonging to the specified owner and/or ecosystem.
     * One or both owner/ecosystem are required to be set to guarantee another entity has control over this UserAccount
     * REVERTS if:
     * - both owner and ecosystem are empty.
     * @param _id id (required)
     * @param _owner public external address of individual owner (optional)
     * @param _ecosystem address of an ecosystem (optional)
     */
    constructor(bytes32 _id, address _owner, address _ecosystem) public {
        ErrorsLib.revertIf(_id == "",
            ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DefaultUserAccount.constructor", "ID must not be NULL");
        ErrorsLib.revertIf(_owner == address(0) && _ecosystem == address(0),
            ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DefaultUserAccount.constructor", "One of owner or ecosystem must be provided");
        account.id = keccak256(abi.encodePacked(_id)); // Hashing userId before storing //TODO the ID should be hashed before passing it in a transaction. check in API
        owner = _owner;
        if (_ecosystem != address(0)) {
            account.ecosystems.insertOrUpdate(_ecosystem, true);
        }
        account.exists = true;
    }
    /**
     * @dev Forwards a call to the specified target using the given bytes message.
     * @param _target the address to call
     * @param _payload the function payload consisting of the 4-bytes function hash and the abi-encoded function parameters which is typically created by
     * calling abi.encodeWithSelector(bytes4, args...) or abi.encodeWithSignature(signatureString, args...) 
     * @return the bytes returned from calling the target function, if successful (NOTE: this is currently not supported, yet, and the returnData will always be empty)
     * REVERTS if:
     * - the target address is empty (0x0)
     * - any problem occurs when calling the target function, e.g. the function does not exist or the called function throws/reverts
     */
    function forwardCall(address _target, bytes _payload)
        external
        pre_onlyAuthorizedCallers
        returns (bytes returnData)
    {
        ErrorsLib.revertIf(_target == address(0), 
            ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DefaultUserAccount.forwardCall", "Target address must not be empty");
        ErrorsLib.revertIf(!_target.call(_payload), 
            ErrorsLib.RUNTIME_ERROR(), "DefaultUserAccount.forwardCall", "Unhandled exception in forward call with payload");
        // TODO: the following section should store the bytes returned from the call into the returnData, but the returndatasize is always 0
        uint returnSize;
        assembly {
            returnSize := returndatasize
        }
        returnData = new bytes(returnSize);
        assembly {
            returndatacopy(add(returnData, 0x20), 0, returnSize)
        }
    }

	/**
	 * @dev Returns this account's ID
     * @return the account ID
	 */
    function getId() public view returns (bytes32) {
        return account.id;
    }
    
}
