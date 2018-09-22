pragma solidity ^0.4.23;

import "commons-base/BaseErrors.sol";
import "commons-base/SystemOwned.sol";
import "commons-utils/ArrayUtilsAPI.sol";
import "commons-collections/Mappings.sol";
import "commons-collections/MappingsLib.sol";

/**
 * @title ParticipantsManagerDb
 * @dev Stores and manages UserAccount and Organization entities.
 */
contract ParticipantsManagerDb is SystemOwned {
  
  using MappingsLib for Mappings.Bytes32AddressMap;
  using MappingsLib for Mappings.AddressBoolMap;

  Mappings.Bytes32AddressMap userAccounts;
  Mappings.AddressBoolMap organizations;

  /**
   * @dev Creates a new ParticipantsManagerDb and registers the msg.sender as the systemOwner.
   */
  constructor() public {
    systemOwner = msg.sender;
  }
 
  function addUserAccount(bytes32 _id, address _account) external pre_onlyBySystemOwner returns (uint error) {
    error = userAccounts.insert(_id, _account);
  }

  function userAccountExists(bytes32 _id) external view returns (bool) {
    return userAccounts.exists(_id);
  }

  function getNumberOfUserAccounts() external view returns (uint) {
    return userAccounts.keys.length;
  }

  function getUserAccount(bytes32 _id) external view returns (uint, address) {
    if (!userAccounts.exists(_id)) return (BaseErrors.RESOURCE_NOT_FOUND(), 0x0);
    return (BaseErrors.NO_ERROR(), userAccounts.get(_id));
  }

  function getUserAccountAtIndex(uint _index) external view returns (address userAccount) {
    uint error;
    uint next;
    (error, userAccount, next) = userAccounts.valueAtIndexHasNext(_index);
  }

  function addOrganization(address _address) external pre_onlyBySystemOwner returns (uint error) {
    error = organizations.insert(_address, true);
  }

  function organizationExists(address _address) external view returns (bool) {
    return organizations.exists(_address);
  }

  function getNumberOfOrganizations() external view returns (uint) {
    return organizations.keys.length;
  }

  function getOrganization(address _address) external view returns (bool) {
    return organizations.get(_address);
  }

  function getOrganizationAtIndex(uint _index) external view returns (address) {
    ( , address key) = organizations.keyAtIndex(_index);
    return key;
  } 
  
}
