pragma solidity ^0.4.25;

import "commons-base/ErrorsLib.sol";
import "commons-utils/ArrayUtilsAPI.sol";
import "commons-auth/Permissioned.sol";

/**
 *
 */
contract AbstractPermissioned is Permissioned {

    using ArrayUtilsAPI for address[];

    string public constant ROLE_ID_PERMISSION_ADMIN = "permission.admin";

    constructor() internal {
        permissions[ROLE_ID_PERMISSION_ADMIN].holders[0] = msg.sender;
        permissions[ROLE_ID_PERMISSION_ADMIN].multiHolder = true;
        permissions[ROLE_ID_PERMISSION_ADMIN].revocable = false;
        permissions[ROLE_ID_PERMISSION_ADMIN].transferable = true;
        permissions[ROLE_ID_PERMISSION_ADMIN].exists = true;
    }

    modifier pre_requiresPermission(string _permission) {
        bool accessGranted;
        if (permissions[_permission].exists) {
            accessGranted = permissions[_permission].multiHolder ?
                permissions[_permission].holders.contains(msg.sender) :
                (permissions[_permission].holders.length > 0 &&
                 permissions[_permission].holders[0] == msg.sender);
        }
        ErrorsLib.revertIf(!accessGranted,
            ErrorsLib.UNAUTHORIZED(), "AbstractPermissioned.pre_requiresPermission", "The msg.sender does not have the required permission");
        _;
    }

    struct Permission {
        address[] holders;
        bool multiHolder;
        bool revocable;
        bool transferable;
        bool exists;
    }

    mapping(string => Permission) permissions;

    function grantPermission(string _permission, address _holder)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(!permissions[_permission].exists,
            ErrorsLib.RESOURCE_NOT_FOUND(), "AbstractPermissioned.grantPermission", "Specified permission does not exist");

    }

    function createPermission(string _permission, bool _multiHolder, bool _revocable, bool _transferable)
        external
        pre_requiresPermission(ROLE_ID_PERMISSION_ADMIN)
    {
        ErrorsLib.revertIf(permissions[_permission].exists,
            ErrorsLib.RESOURCE_ALREADY_EXISTS(), "AbstractPermissioned.createPermission", "A permissions with the same name already exists");
        permissions[_permission].multiHolder = _multiHolder;
        permissions[_permission].revocable = _revocable;
        permissions[_permission].transferable = _transferable;
        permissions[_permission].exists = true;
    }

    function transferPermission(string _permission, address _newHolder)
        external
    {

    }

    function revokePermission(string _permission, address _holder)
        external
    {

    }

}