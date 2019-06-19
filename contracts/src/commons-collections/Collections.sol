pragma solidity ^0.4.25;

/**
 * @title Collections library
 * @dev Data structures and internal functions supporting address scopes
 */

library Collections {
    function ERC165_ID_Address_Scopes() internal pure returns (bytes4) {
        return bytes4(keccak256(abi.encodePacked("setAddressScope(address _address, bytes32 _context, bytes32 _fixedScope, bytes32 _dataPath, bytes32 _dataStorageId, address _dataStorage)"))) ^
               bytes4(keccak256(abi.encodePacked("resolveAddressScope(address _address, bytes32 _context, DataStorage _dataStorage)"))) ^
               bytes4(keccak256(abi.encodePacked("getAddressScopeDetails(address _address, bytes32 _context)"))) ^
               bytes4(keccak256(abi.encodePacked("getAddressScopeDetailsForKey(bytes32 _key)"))) ^
               bytes4(keccak256(abi.encodePacked("getAddressScopeKeys()")));
    }
}
