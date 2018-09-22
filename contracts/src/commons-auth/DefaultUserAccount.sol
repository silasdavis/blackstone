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
        require(authorized, ErrorsLib.format(ErrorsLib.UNAUTHORIZED(), "DefaultUserAccount.pre_onlyAuthorizedCallers", "Caller is neither owner nor known ecosystem"));
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
        ErrorsLib.revertIf(_id == "" && _ecosystem == address(0),
            ErrorsLib.NULL_PARAMETER_NOT_ALLOWED(), "DefaultUserAccount.constructor", "ID must not be NULL");
        account.id = keccak256(abi.encodePacked(_id)); // Hashing userId before storing //TODO the ID should be hashed before passing it in a transaction. check in API
        account.exists = true;
        owner = _owner;
        account.ecosystems.insertOrUpdate(_ecosystem, true);
    }

	/**
	 * @dev Returns this account's ID
	 */
    function getId() public view returns (bytes32) {
        return account.id;
    }
    
}
