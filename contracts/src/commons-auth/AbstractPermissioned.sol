pragma solidity ^0.4.25;

import "commons-base/ErrorsLib.sol";
import "commons-utils/ArrayUtilsLib.sol";
import "commons-auth/Permissioned.sol";

/**
 * @title AbstractPermissioned
 * @dev Abstract implementation of the Permissioned interface
 */
contract AbstractPermissioned is Permissioned {

    using ArrayUtilsLib for address[];

    string public constant ROLE_ID_PERMISSION_ADMIN = "permission.admin";

    struct Permission {
        address[] holders;
        bool multiHolder;
        bool revocable;
        bool transferable;
        bool exists;
    }

    mapping(string => Permission) permissions;

    modifier pre_requiresPermission(string _permission) {
        ErrorsLib.revertIf(!hasPermission(_permission, msg.sender),
            ErrorsLib.UNAUTHORIZED(), "AbstractPermissioned.pre_requiresPermission", "The msg.sender does not have the required permission");
        _;
    }

    // this will allow the agreement to set the creator as admin without having the registry have to transfer it afterwards!
    constructor(address _admin) internal {
        permissions[ROLE_ID_PERMISSION_ADMIN].holders.push(_admin == address(0) ? msg.sender : _admin);
        permissions[ROLE_ID_PERMISSION_ADMIN].multiHolder = true;
        permissions[ROLE_ID_PERMISSION_ADMIN].revocable = false;
        permissions[ROLE_ID_PERMISSION_ADMIN].transferable = true;
        permissions[ROLE_ID_PERMISSION_ADMIN].exists = true;
    }

    function grantPermission(string _permission, address _newHolder)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(!permissions[_permission].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.grantPermission", "The specified permission does not exist. Create it first.");
        if (permissions[_permission].multiHolder) {
            // look for empty slots from previous deletions and if the new holder is already registered
            bool alreadyHasPermission;
            uint emptySlotIndex = uint(-1); //NOTE: using uint(-1) to signal "no empty slots" would not work if an array of holders were ever be filled to the max.
            for (uint i=0; i<permissions[_permission].holders.length; i++) {
                if (permissions[_permission].holders[i] == _newHolder) {
                    alreadyHasPermission = true;
                }
                if (permissions[_permission].holders[i] == address(0) && emptySlotIndex == uint(-1)) {
                    emptySlotIndex = i;
                }
            }
            if (!alreadyHasPermission) {
                if (emptySlotIndex == uint(-1))
                    permissions[_permission].holders.push(_newHolder);
                else
                    permissions[_permission].holders[emptySlotIndex] = _newHolder;
            }
        }
        // a single-held permission that has already been granted cannot be overwritten here. Use transferPermission.
        else if (permissions[_permission].holders[0] == address(0)) {
            permissions[_permission].holders[0] = _newHolder;
        }
    }

    function createPermission(string _permission, bool _multiHolder, bool _revocable, bool _transferable)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(permissions[_permission].exists,
            ErrorsLib.RESOURCE_ALREADY_EXISTS(), "AbstractPermissioned.createPermission", "A permission with the identifier name already exists");
        permissions[_permission].multiHolder = _multiHolder;
        permissions[_permission].revocable = _revocable;
        permissions[_permission].transferable = _transferable;
        permissions[_permission].exists = true;
    }

    function transferPermission(string _permission, address _newHolder)
        external
    {
		// TODO, if perm is multiholder, then transferPermission needs to check if the new holder is already a holder!

        ErrorsLib.revertIf(!permissions[_permission].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.transferPermission", "The specified permission does not exist. Create it first.");
        ErrorsLib.revertIf(!permissions[_permission].transferable,
            ErrorsLib.INVALID_STATE(), "AbstractPermissioned.transferPermission", "The specified permission is not transferable");
        // to transfer a permission, it does not matter whether it's multi-holder or not.
        for (uint i=0; i<permissions[_permission].holders.length; i++) {
            if (permissions[_permission].holders[i] == msg.sender) {
                // we don't shift an entries in the array to fill the empty slot here, but instead try to re-use empty slots when permissions are granted
                permissions[_permission].holders[i] = _newHolder;
                return;
            }
        }
        revert(ErrorsLib.format(ErrorsLib.UNAUTHORIZED(), "AbstractPermissioned.transferPermission", "The msg.sender does not hold the specified permission"));
    }

    function revokePermission(string _permission, address _holder)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(!permissions[_permission].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.revokePermission", "The specified permission does not exist. Create it first.");
        ErrorsLib.revertIf(!permissions[_permission].revocable,
            ErrorsLib.INVALID_STATE(), "AbstractPermissioned.revokePermission", "The specified permission is not revocable");
        if (permissions[_permission].multiHolder) {
            for (uint i=0; i<permissions[_permission].holders.length; i++) {
                if (permissions[_permission].holders[i] == _holder) {
                    delete permissions[_permission].holders[i];
                    return;
                }
            }
        }
        else {
            delete permissions[_permission].holders[0];
        }
        // for multiholder ??? leave slot empty and fill it on the next grantPermission? or shift all array entries?
    }

    function hasPermission(string _permission, address _holder) public view returns (bool result) {
        if (permissions[_permission].exists) {
            result = permissions[_permission].multiHolder ?
                permissions[_permission].holders.contains(_holder) :
                (permissions[_permission].holders.length > 0 &&
                 permissions[_permission].holders[0] == _holder);
        }
    }

}