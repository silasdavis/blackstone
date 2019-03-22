## Agreements Network Contracts


The Agreements Network suite of smart contracts are solidity based and provide a near no-code solution for most of the users of the Network.


Below you will find the specifics on how to interact with the smart contracts via solidity based CALLS. These calls can be managed in a variety of ways, from other smart contracts or from various non-blockchain clients.

## bin

### AbstractAddressScopes


The AbstractAddressScopes contract is found within the bin bundle.

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope

```

#### Return

```json
fixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeDetailsForKey(bytes32)


**getAddressScopeDetailsForKey(bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetailsForKey(bytes32)
```

#### Parameters

```solidity
_key // a scope key

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeys()


**getAddressScopeKeys()**


Returns the list of keys identifying the address/context scopes.

```endpoint
CALL getAddressScopeKeys()
```

#### Return

```json
the bytes32 scope keys
```


---

#### resolveAddressScope(address,bytes32,address)


**resolveAddressScope(address,bytes32,address)**


Returns the scope qualifier for the given address. If the scope depends on a ConditionalData, the function will attempt to resolve it using the provided DataStorage address. REVERTS if: - the scope is defined by a ConditionalData, but the DataStorage parameter is empty

```endpoint
CALL resolveAddressScope(address,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataStorage // a DataStorage contract to use as a basis if the scope is defined by a ConditionalData

```

#### Return

```json
the scope qualifier or an empty bytes32, if no qualifier is set or cannot be determined
```


---

#### setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)


**setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)**


Associates the given address with a scope qualifier for a given context. The context can be used to bind the same address to different scenarios and different scopes. The scope can either be represented by a fixed bytes32 value of by a ConditionalData that resolves to a bytes32 field. REVERTS if: - the given address is empty - neither the scope nor valid ConditionalData parameters are provided

```endpoint
CALL setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataPath // the dataPath of a ConditionalData defining the scope
_dataStorage // the dataStorgage address of a ConditionalData defining the scope
_dataStorageId // the dataStorageId of a ConditionalData defining the scope
_fixedScope // a bytes32 representing a fixed scope

```


---

### AbstractDocument


The AbstractDocument contract is found within the bin bundle.

#### addVersion(string)


**addVersion(string)**


Adds the specified hash as a new version of the document. The msg.sender is registered as owner and the version creation date is set to now.

```endpoint
CALL addVersion(string)
```

#### Parameters

```solidity
_hash // the version hash

```

#### Return

```json
BaseErrors.NO_ERROR, BaseErrors.INSUFFICIENT_PRIVILEGES (as determined by calling canAddVersion(), or BaseErrors.RESOURCE_ALREADY_EXISTS if the version has been added before.
```


---

#### getName()


**getName()**


Returns the document's name

```endpoint
CALL getName()
```


---

#### getNumberOfVersions()


**getNumberOfVersions()**


Returns the number of versions of this document

```endpoint
CALL getNumberOfVersions()
```

#### Return

```json
the number of versions
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getVersionCreated(string)


**getVersionCreated(string)**


Returns the creation date of the specified version hash.

```endpoint
CALL getVersionCreated(string)
```

#### Parameters

```solidity
_hash // the desired version hash

```

#### Return

```json
the creation date, or 0 if the version does not exist
```


---

#### getVersionCreator(string)


**getVersionCreator(string)**


Returns the address registered as the creator of the specified version hash.

```endpoint
CALL getVersionCreator(string)
```

#### Parameters

```solidity
_hash // the desired version hash

```

#### Return

```json
the creator address, or 0x0 if the version does not exist
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### AbstractDocumentTest Interface


The AbstractDocumentTest Interface contract is found within the bin bundle.

#### testDocumentCreation()


**testDocumentCreation()**


Tests document creation.

```endpoint
CALL testDocumentCreation()
```

#### Return

```json
"success", if successful or an explanatory message if not successful.
```


---

#### testDocumentVersioning()


**testDocumentVersioning()**


Tests document versioning.

```endpoint
CALL testDocumentVersioning()
```

#### Return

```json
"success", if successful or an explanatory message if not successful.
```


---

### AbstractVersioned


The AbstractVersioned contract is found within the bin bundle.

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

### ActiveAgreement Interface


The ActiveAgreement Interface contract is found within the bin bundle.

#### addEventListener(bytes32)


**addEventListener(bytes32)**


Adds the msg.sender as listener for the specified event.

```endpoint
CALL addEventListener(bytes32)
```

#### Parameters

```solidity
_event // the event to subscribe to

```


---

#### addEventListener(bytes32,address)


**addEventListener(bytes32,address)**


Adds the msg.sender as listener for the specified event.

```endpoint
CALL addEventListener(bytes32,address)
```

#### Parameters

```solidity
_event // the event to subscribe to
_listener // the address of an EventListener

```


---

#### cancel()


**cancel()**


Registers the msg.sender as having cancelled the agreement. During formation (legal states DRAFT and FORMULATED), the agreement can cancelled unilaterally by one of the parties to the agreement. During execution (legal state EXECUTED), the agreement can only be canceled if all parties agree to do so by invoking this function. This function should REVERT if the cancel operation could not be carried out successfully.

```endpoint
CALL cancel()
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope

```

#### Return

```json
fixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeDetailsForKey(bytes32)


**getAddressScopeDetailsForKey(bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetailsForKey(bytes32)
```

#### Parameters

```solidity
_key // a scope key

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeys()


**getAddressScopeKeys()**


Returns the list of keys identifying the address/context scopes.

```endpoint
CALL getAddressScopeKeys()
```

#### Return

```json
the bytes32 scope keys
```


---

#### getArchetype()


**getArchetype()**


Returns the archetype

```endpoint
CALL getArchetype()
```

#### Return

```json
the archetype address
```


---

#### getArrayLength(bytes32)


**getArrayLength(bytes32)**


Returns the length of an array with the specified ID in this DataStorage.

```endpoint
CALL getArrayLength(bytes32)
```

#### Parameters

```solidity
_id // the ID of an array-type value

```

#### Return

```json
the length of the array
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getCreator()


**getCreator()**


Returns the creator

```endpoint
CALL getCreator()
```

#### Return

```json
the creator

```


---

#### getDataIdAtIndex(uint256)


**getDataIdAtIndex(uint256)**


Returns the data id at the given index

```endpoint
CALL getDataIdAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index of the data

```

#### Return

```json
error uint error code id bytes32 id of the data
```


---

#### getDataType(bytes32)


**getDataType(bytes32)**


Returns the data type of the Data object identified by the given id

```endpoint
CALL getDataType(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
uint8 the DataType
```


---

#### getDataValueAsAddress(bytes32)


**getDataValueAsAddress(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsAddress(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
address the value of the data
```


---

#### getDataValueAsAddressArray(bytes32)


**getDataValueAsAddressArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsAddressArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
address[] the value of the data
```


---

#### getDataValueAsBool(bytes32)


**getDataValueAsBool(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBool(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bool the bool value of the data
```


---

#### getDataValueAsBoolArray(bytes32)


**getDataValueAsBoolArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBoolArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bool[] the value of the data
```


---

#### getDataValueAsBytes32(bytes32)


**getDataValueAsBytes32(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBytes32(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bytes32 the value of the data
```


---

#### getDataValueAsBytes32Array(bytes32)


**getDataValueAsBytes32Array(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBytes32Array(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bytes32[] the value of the data
```


---

#### getDataValueAsInt(bytes32)


**getDataValueAsInt(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsInt(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
int the value of the data
```


---

#### getDataValueAsIntArray(bytes32)


**getDataValueAsIntArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsIntArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
int256[] the value of the data
```


---

#### getDataValueAsString(bytes32)


**getDataValueAsString(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsString(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
string the value of the data
```


---

#### getDataValueAsUint(bytes32)


**getDataValueAsUint(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsUint(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
uint the value of the data
```


---

#### getDataValueAsUintArray(bytes32)


**getDataValueAsUintArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsUintArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
uint256[] the value of the data
```


---

#### getEventLogReference()


**getEventLogReference()**


Returns the reference for the event log of this ActiveAgreement

```endpoint
CALL getEventLogReference()
```

#### Return

```json
the file reference for the event log of this agreement
```


---

#### getGoverningAgreementAtIndex(uint256)


**getGoverningAgreementAtIndex(uint256)**


Retrieves the address for the governing agreement at the specified index

```endpoint
CALL getGoverningAgreementAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
the address for the governing agreement
```


---

#### getLegalState()


**getLegalState()**


Returns the legal state of this agreement

```endpoint
CALL getLegalState()
```

#### Return

```json
the Agreements.LegalState as a uint
```


---

#### getMaxNumberOfEvents()


**getMaxNumberOfEvents()**


Returns the max number of events for the event log

```endpoint
CALL getMaxNumberOfEvents()
```

#### Return

```json
the max number of events for the event log
```


---

#### getNumberOfData()


**getNumberOfData()**


Returns the number of data fields in this DataStorage

```endpoint
CALL getNumberOfData()
```

#### Return

```json
uint the size
```


---

#### getNumberOfGoverningAgreements()


**getNumberOfGoverningAgreements()**


Returns the number governing agreements for this agreement

```endpoint
CALL getNumberOfGoverningAgreements()
```

#### Return

```json
the number of governing agreements
```


---

#### getNumberOfParties()


**getNumberOfParties()**


Gets number of parties

```endpoint
CALL getNumberOfParties()
```

#### Return

```json
size number of parties
```


---

#### getPartyAtIndex(uint256)


**getPartyAtIndex(uint256)**


Returns the party at the given index

```endpoint
CALL getPartyAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
the party's address
```


---

#### getPrivateParametersReference()


**getPrivateParametersReference()**


Returns the reference to the private parameters of this ActiveAgreement

```endpoint
CALL getPrivateParametersReference()
```

#### Return

```json
the reference to an external document containing private parameters
```


---

#### getSignatureDetails(address)


**getSignatureDetails(address)**


Returns the timestamp of the signature of the given party.

```endpoint
CALL getSignatureDetails(address)
```

#### Parameters

```solidity
_party // the signing party

```

#### Return

```json
the address of the signee (if the party authorized a signee other than itself)the time of signing or 0 if the address is not a party to this agreement or has not signed yet
```


---

#### getSignatureTimestamp(address)


**getSignatureTimestamp(address)**


Returns the timestamp of the signature of the given party.

```endpoint
CALL getSignatureTimestamp(address)
```

#### Parameters

```solidity
_party // the signing party

```

#### Return

```json
the time of signing or 0 if the address is not a party to this agreement or has not signed yet
```


---

#### getSignee(address)


**getSignee(address)**


Returns the signee of the signature of the given party.

```endpoint
CALL getSignee(address)
```

#### Parameters

```solidity
_party // the signing party

```

#### Return

```json
the address of the signee (if the party authorized a signee other than itself)
```


---

#### initialize(address,address,string,bool,address[],address[])


**initialize(address,address,string,bool,address[],address[])**


Initializes this ActiveAgreement with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(address,address,string,bool,address[],address[])
```

#### Parameters

```solidity
_archetype // archetype address
_creator // the account that created this agreement
_governingAgreements // array of agreement addresses which govern this agreement
_isPrivate // if agreement is private
_parties // the signing parties to the agreement
_privateParametersFileReference // the file reference to the private parameters

```


---

#### isPrivate()


**isPrivate()**


Returns the private state

```endpoint
CALL isPrivate()
```

#### Return

```json
the private flag 
```


---

#### isSignedBy(address)


**isSignedBy(address)**


Returns whether the given account's signature is on the agreement.

```endpoint
CALL isSignedBy(address)
```

#### Parameters

```solidity
_signee // The account to check

```

#### Return

```json
true if the provided address is a recorded signature on the agreement, false otherwise
```


---

#### removeData(bytes32)


**removeData(bytes32)**


Removes the Data identified by the id from the DataMap, if it exists.

```endpoint
CALL removeData(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```


---

#### removeEventListener(bytes32)


**removeEventListener(bytes32)**


Removes the msg.sender from the list of listeners for the specified event.

```endpoint
CALL removeEventListener(bytes32)
```

#### Parameters

```solidity
_event // the event to unsubscribe from

```


---

#### removeEventListener(bytes32,address)


**removeEventListener(bytes32,address)**


Removes the msg.sender from the list of listeners for the specified event.

```endpoint
CALL removeEventListener(bytes32,address)
```

#### Parameters

```solidity
_event // the event to unsubscribe from
_listener // the address of an EventListener

```


---

#### resolveAddressScope(address,bytes32,address)


**resolveAddressScope(address,bytes32,address)**


Returns the scope for the given address and context. If the scope depends on a ConditionalData, the function should attempt to resolve it and return the result.

```endpoint
CALL resolveAddressScope(address,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataStorage // a DataStorage contract to use as a basis if the scope is defined by a ConditionalData

```

#### Return

```json
the scope qualifier or an empty bytes32, if no qualifier is set or cannot be determined
```


---

#### setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)


**setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)**


Associates the given address with a scope qualifier for a given context. The context can be used to bind the same address to different scenarios and different scopes. The scope can either be represented by a fixed bytes32 value of by a ConditionalData that resolves to a bytes32 field.

```endpoint
CALL setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataPath // the dataPath of a ConditionalData defining the scope
_dataStorage // the dataStorgage address of a ConditionalData defining the scope
_dataStorageId // the dataStorageId of a ConditionalData defining the scope
_fixedScope // a bytes32 representing a fixed scope

```


---

#### setDataValueAsAddress(bytes32,address)


**setDataValueAsAddress(bytes32,address)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsAddress(bytes32,address)
```

#### Parameters

```solidity
_id // the id of the data
_value // the address value of the data

```


---

#### setDataValueAsAddressArray(bytes32,address[])


**setDataValueAsAddressArray(bytes32,address[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsAddressArray(bytes32,address[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the address[] value of the data

```


---

#### setDataValueAsBool(bytes32,bool)


**setDataValueAsBool(bytes32,bool)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBool(bytes32,bool)
```

#### Parameters

```solidity
_id // the id of the data
_value // the bool value of the data

```


---

#### setDataValueAsBoolArray(bytes32,bool[])


**setDataValueAsBoolArray(bytes32,bool[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBoolArray(bytes32,bool[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the bool[] value of the data

```


---

#### setDataValueAsBytes32(bytes32,bytes32)


**setDataValueAsBytes32(bytes32,bytes32)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBytes32(bytes32,bytes32)
```

#### Parameters

```solidity
_id // the id of the data
_value // the bytes32 value of the data

```


---

#### setDataValueAsBytes32Array(bytes32,bytes32[])


**setDataValueAsBytes32Array(bytes32,bytes32[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBytes32Array(bytes32,bytes32[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the bytes32[] value of the data

```


---

#### setDataValueAsInt(bytes32,int256)


**setDataValueAsInt(bytes32,int256)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsInt(bytes32,int256)
```

#### Parameters

```solidity
_id // the id of the data
_value // the int value of the data

```


---

#### setDataValueAsIntArray(bytes32,int256[])


**setDataValueAsIntArray(bytes32,int256[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsIntArray(bytes32,int256[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the int256[] value of the data

```


---

#### setDataValueAsString(bytes32,string)


**setDataValueAsString(bytes32,string)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsString(bytes32,string)
```

#### Parameters

```solidity
_id // the id of the data
_value // the string value of the data

```


---

#### setDataValueAsUint(bytes32,uint256)


**setDataValueAsUint(bytes32,uint256)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsUint(bytes32,uint256)
```

#### Parameters

```solidity
_id // the id of the data
_value // the uint value of the data

```


---

#### setDataValueAsUintArray(bytes32,uint256[])


**setDataValueAsUintArray(bytes32,uint256[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsUintArray(bytes32,uint256[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the uint[] value of the data

```


---

#### setEventLogReference(string)


**setEventLogReference(string)**


Updates the file reference for the event log of this agreement

```endpoint
CALL setEventLogReference(string)
```

#### Parameters

```solidity
_eventLogFileReference // the file reference to the event log

```


---

#### setFulfilled()


**setFulfilled()**


Sets the legal state of this agreement to Agreements.LegalState.FULFILLED. Note: All other legal states are set by internal logic.

```endpoint
CALL setFulfilled()
```


---

#### setMaxNumberOfEvents(uint32)


**setMaxNumberOfEvents(uint32)**


Sets the max number of events for this agreement

```endpoint
CALL setMaxNumberOfEvents(uint32)
```


---

#### sign()


**sign()**


Applies the msg.sender signature This function should REVERT if the cancel operation could not be carried out successfully.

```endpoint
CALL sign()
```


---

### ActiveAgreementRegistry Interface


The ActiveAgreementRegistry Interface contract is found within the bin bundle.

#### addAgreementToCollection(bytes32,address)


**addAgreementToCollection(bytes32,address)**


Adds an agreement to given collection

```endpoint
CALL addAgreementToCollection(bytes32,address)
```

#### Parameters

```solidity
_agreement // agreement address Reverts if collection is not found
_collectionId // the bytes32 collection id

```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createAgreement(address,address,string,bool,address[],bytes32,address[])


**createAgreement(address,address,string,bool,address[],bytes32,address[])**


Creates an Active Agreement with the given parameters

```endpoint
CALL createAgreement(address,address,string,bool,address[],bytes32,address[])
```

#### Parameters

```solidity
_archetype // archetype
_collectionId // id of agreement collection (optional)
_creator // address
_governingAgreements // array of agreement addresses which govern this agreement (optional)
_isPrivate // agreement is private
_parties // parties array
_privateParametersFileReference // the file reference of the private parametes of this agreement

```

#### Return

```json
activeAgreement - the new ActiveAgreement's address, if successfully created, 0x0 otherwise
```


---

#### createAgreementCollection(address,uint8,bytes32)


**createAgreementCollection(address,uint8,bytes32)**


Creates a new agreement collection

```endpoint
CALL createAgreementCollection(address,uint8,bytes32)
```

#### Parameters

```solidity
_author // address of the author
_collectionType // the Agreements.CollectionType
_packageId // the ID of an archetype package

```

#### Return

```json
an error code indicating success or failureid bytes32 id of package
```


---

#### getActiveAgreementAtIndex(uint256)


**getActiveAgreementAtIndex(uint256)**


Gets activeAgreement address at given index

```endpoint
CALL getActiveAgreementAtIndex(uint256)
```

#### Parameters

```solidity
_index // index

```

#### Return

```json
the Active Agreement address
```


---

#### getActiveAgreementData(address)


**getActiveAgreementData(address)**


Returns data about the ActiveAgreement at the specified address

```endpoint
CALL getActiveAgreementData(address)
```

#### Parameters

```solidity
_activeAgreement // Active Agreement

```

#### Return

```json
archetype - the agreement's archetype adresscreator - the creator of the agreementprivateParametersFileReference - the file reference to the private agreement parameters (only used when agreement is private)eventLogFileReference - the file reference to the agreement's event logmaxNumberOfEvents - the maximum number of events allowed to be stored for this agreementisPrivate - whether there are private agreement parameters, i.e. stored off-chainlegalState - the agreement's Agreement.LegalState as uint8formationProcessInstance - the address of the process instance representing the formation of this agreementexecutionProcessInstance - the address of the process instance representing the execution of this agreement
```


---

#### getActiveAgreementsSize()


**getActiveAgreementsSize()**


Gets number of activeAgreements

```endpoint
CALL getActiveAgreementsSize()
```

#### Return

```json
size size
```


---

#### getAgreementAtIndexInCollection(bytes32,uint256)


**getAgreementAtIndexInCollection(bytes32,uint256)**


Gets agreement address at index in colelction

```endpoint
CALL getAgreementAtIndexInCollection(bytes32,uint256)
```

#### Parameters

```solidity
_id // id of the collection
_index // uint index

```

#### Return

```json
agreement address of archetype
```


---

#### getAgreementCollectionAtIndex(uint256)


**getAgreementCollectionAtIndex(uint256)**


Gets collection id at index

```endpoint
CALL getAgreementCollectionAtIndex(uint256)
```

#### Parameters

```solidity
_index // uint index

```

#### Return

```json
id bytes32 id
```


---

#### getAgreementCollectionData(bytes32)


**getAgreementCollectionData(bytes32)**


Gets collection data by id

```endpoint
CALL getAgreementCollectionData(bytes32)
```

#### Parameters

```solidity
_id // bytes32 collection id

```

#### Return

```json
author addresscollectionType type of collectionpackageId id of the archetype package
```


---

#### getAgreementParameterAtIndex(address,uint256)


**getAgreementParameterAtIndex(address,uint256)**


Returns the process data ID at the specified index

```endpoint
CALL getAgreementParameterAtIndex(address,uint256)
```

#### Parameters

```solidity
_pos // the index

```

#### Return

```json
the data ID
```


---

#### getAgreementParameterDetails(address,bytes32)


**getAgreementParameterDetails(address,bytes32)**


Returns information about the process data entry for the specified process and data ID

```endpoint
CALL getAgreementParameterDetails(address,bytes32)
```

#### Parameters

```solidity
_address // the active agreement
_dataId // the data ID

```

#### Return

```json
(process,id,uintValue,bytes32Value,addressValue,boolValue)
```


---

#### getArchetypeRegistry()


**getArchetypeRegistry()**


Returns the ArchetypeRegistry address

```endpoint
CALL getArchetypeRegistry()
```

#### Return

```json
address the ArchetypeRegistry
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getBpmService()


**getBpmService()**


Returns the BpmService address

```endpoint
CALL getBpmService()
```

#### Return

```json
address the BpmService
```


---

#### getGoverningAgreementAtIndex(address,uint256)


**getGoverningAgreementAtIndex(address,uint256)**


Retrieves the address for the governing agreement at the specified index

```endpoint
CALL getGoverningAgreementAtIndex(address,uint256)
```

#### Parameters

```solidity
_agreement // the address of the agreement
_index // the index position

```

#### Return

```json
the address for the governing agreement
```


---

#### getNumberOfAgreementCollections()


**getNumberOfAgreementCollections()**


Gets number of agreement collections

```endpoint
CALL getNumberOfAgreementCollections()
```

#### Return

```json
size size
```


---

#### getNumberOfAgreementParameters(address)


**getNumberOfAgreementParameters(address)**


Returns the number of agreement parameter entries.

```endpoint
CALL getNumberOfAgreementParameters(address)
```

#### Return

```json
the number of parameters
```


---

#### getNumberOfAgreementsInCollection(bytes32)


**getNumberOfAgreementsInCollection(bytes32)**


Gets number of agreements in given collection

```endpoint
CALL getNumberOfAgreementsInCollection(bytes32)
```

#### Parameters

```solidity
_id // id of the collection

```

#### Return

```json
size agreement count
```


---

#### getNumberOfGoverningAgreements(address)


**getNumberOfGoverningAgreements(address)**


Returns the number governing agreements for given agreement

```endpoint
CALL getNumberOfGoverningAgreements(address)
```

#### Return

```json
the number of governing agreements
```


---

#### getPartiesByActiveAgreementSize(address)


**getPartiesByActiveAgreementSize(address)**


Gets parties size for given Active Agreement

```endpoint
CALL getPartiesByActiveAgreementSize(address)
```

#### Parameters

```solidity
_activeAgreement // Active Agreement

```

#### Return

```json
size size
```


---

#### getPartyByActiveAgreementAtIndex(address,uint256)


**getPartyByActiveAgreementAtIndex(address,uint256)**


Gets getPartyByActiveAgreementAtIndex

```endpoint
CALL getPartyByActiveAgreementAtIndex(address,uint256)
```

#### Parameters

```solidity
_activeAgreement // Active Agreement
_index // index

```

#### Return

```json
party party
```


---

#### getPartyByActiveAgreementData(address,address)


**getPartyByActiveAgreementData(address,address)**


Returns data about the given party's signature on the specified agreement.

```endpoint
CALL getPartyByActiveAgreementData(address,address)
```

#### Parameters

```solidity
_activeAgreement // the ActiveAgreement
_party // the signing party

```

#### Return

```json
signedBy the actual signature authorized by the partysignatureTimestamp the timestamp when the party has signed, or 0 if not signed yet
```


---

#### processStateChanged(address)


**processStateChanged(address)**


Invoked by a ProcessStateChangeEventEmitter to notify of process state change

```endpoint
CALL processStateChanged(address)
```

#### Parameters

```solidity
_pi // the process instance whose state changed

```


---

#### setEventLogReference(address,string)


**setEventLogReference(address,string)**


Updates the file reference for the event log of the specified agreement

```endpoint
CALL setEventLogReference(address,string)
```

#### Parameters

```solidity
_activeAgreement // the address of active agreement
_eventLogFileReference // the file reference of the event log of this agreement

```


---

#### setMaxNumberOfEvents(address,uint32)


**setMaxNumberOfEvents(address,uint32)**


Sets the max number of events for this agreement

```endpoint
CALL setMaxNumberOfEvents(address,uint32)
```


---

#### startProcessLifecycle(address)


**startProcessLifecycle(address)**


Creates and starts a ProcessInstance to handle the workflows as defined by the given agreement's archetype. Depending on the configuration in the archetype, the returned address could be a formation process or execution process.

```endpoint
CALL startProcessLifecycle(address)
```

#### Parameters

```solidity
_agreement // an ActiveAgreement

```

#### Return

```json
error - an error code indicating success or failurethe address of a ProcessInstance, if successful
```


---

#### transferAddressScopes(address)


**transferAddressScopes(address)**


Sets address scopes on the given ProcessInstance based on the scopes defined in the ActiveAgreement referenced in the ProcessInstance. Address scopes relying on a ConditionalData configuration are translated, so they work from the POV of the ProcessInstance. This function ensures that any scopes (roles) set for user/organization addresses on the agreement are adhered to in the process.

```endpoint
CALL transferAddressScopes(address)
```

#### Parameters

```solidity
_processInstance // the ProcessInstance being configured

```


---

#### upgrade(address)


**upgrade(address)**


Performs the necessary steps to upgrade from this contract to the specified new version.

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a contract that replaces this one

```

#### Return

```json
true if successful, false otherwise
```


---

### ActiveAgreementRegistryDb Interface


The ActiveAgreementRegistryDb Interface contract is found within the bin bundle.

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---


### ActiveAgreementTest Interface


The ActiveAgreementTest Interface contract is found within the bin bundle.

#### testActiveAgreementCancellation()


**testActiveAgreementCancellation()**


Covers canceling an agreement in different stages

```endpoint
CALL testActiveAgreementCancellation()
```


---

#### testActiveAgreementSetup()


**testActiveAgreementSetup()**


Covers the setup and proper data retrieval of an agreement

```endpoint
CALL testActiveAgreementSetup()
```


---

#### testActiveAgreementSigning()


**testActiveAgreementSigning()**


Covers testing signing an agreement via users and organizations and the associated state changes.

```endpoint
CALL testActiveAgreementSigning()
```


---

### ActiveAgreementWorkflowTest Interface


The ActiveAgreementWorkflowTest Interface contract is found within the bin bundle.

#### testAddressScopeTransfer()


**testAddressScopeTransfer()**


Tests the DefaultActiveAgreementRegistry.transferAddressScopes function

```endpoint
CALL testAddressScopeTransfer()
```


---

#### testAgreementProcessLifecycle()


**testAgreementProcessLifecycle()**


Tests the handling of combinations of formation and execution processes, i.e. the lack of processes, in the ActiveAgreementRegistry.startProcessLifecycle function

```endpoint
CALL testAgreementProcessLifecycle()
```


---

### AddressScopes Interface


The AddressScopes Interface contract is found within the bin bundle.

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope

```

#### Return

```json
fixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeDetailsForKey(bytes32)


**getAddressScopeDetailsForKey(bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetailsForKey(bytes32)
```

#### Parameters

```solidity
_key // a scope key

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeys()


**getAddressScopeKeys()**


Returns the list of keys identifying the address/context scopes.

```endpoint
CALL getAddressScopeKeys()
```

#### Return

```json
the bytes32 scope keys
```


---

#### resolveAddressScope(address,bytes32,address)


**resolveAddressScope(address,bytes32,address)**


Returns the scope for the given address and context. If the scope depends on a ConditionalData, the function should attempt to resolve it and return the result.

```endpoint
CALL resolveAddressScope(address,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataStorage // a DataStorage contract to use as a basis if the scope is defined by a ConditionalData

```

#### Return

```json
the scope qualifier or an empty bytes32, if no qualifier is set or cannot be determined
```


---

#### setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)


**setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)**


Associates the given address with a scope qualifier for a given context. The context can be used to bind the same address to different scenarios and different scopes. The scope can either be represented by a fixed bytes32 value of by a ConditionalData that resolves to a bytes32 field.

```endpoint
CALL setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataPath // the dataPath of a ConditionalData defining the scope
_dataStorage // the dataStorgage address of a ConditionalData defining the scope
_dataStorageId // the dataStorageId of a ConditionalData defining the scope
_fixedScope // a bytes32 representing a fixed scope

```


---

### Agreement


The Agreement contract is found within the bin bundle.

#### addSignatories(address[])


**addSignatories(address[])**


Adds the specified signatories to this agreement, if they are valid, and returns the number of added signatories. Empty addresses and already registered signatories are rejected.

```endpoint
CALL addSignatories(address[])
```

#### Parameters

```solidity
_addresses // the signatories

```

#### Return

```json
the number of added signatories
```


---

#### addSignatory(address)


**addSignatory(address)**


Adds a single signatory to this agreement

```endpoint
CALL addSignatory(address)
```

#### Parameters

```solidity
_address // the address to add

```

#### Return

```json
NO_ERROR, INVALID_PARAM_VALUE if address is empty, RESOURCE_ALREADY_EXISTS if address has already been registered
```


---

#### addVersion(string)


**addVersion(string)**


Adds the specified hash as a new version of the document. The msg.sender is registered as owner and the version creation date is set to now.

```endpoint
CALL addVersion(string)
```

#### Parameters

```solidity
_hash // the version hash

```

#### Return

```json
BaseErrors.NO_ERROR, BaseErrors.INSUFFICIENT_PRIVILEGES (as determined by calling canAddVersion(), or BaseErrors.RESOURCE_ALREADY_EXISTS if the version has been added before.
```


---

#### confirmExecutionVersion(string)


**confirmExecutionVersion(string)**


Registers the msg.sender as having confirmed/endorsed the specified document version as the execution version.

```endpoint
CALL confirmExecutionVersion(string)
```

#### Parameters

```solidity
_version // the version

```

#### Return

```json
BaseErrors.NO_ERROR(), BaseErrors.INVALID_PARAM_VALUE() if given version is empty, or BaseErrors.RESOURCE_NOT_FOUND() if the version does not exist
```


---

#### getConfirmedVersion()


**getConfirmedVersion()**


Returns the confirmed version of this agreement, if it has been set.

```endpoint
CALL getConfirmedVersion()
```


---

#### getEndorsedVersion(address)


**getEndorsedVersion(address)**


Get the document version endorsed by the specified signatory.

```endpoint
CALL getEndorsedVersion(address)
```

#### Parameters

```solidity
_signatory // the signatory

```

#### Return

```json
the version hash, if an endorsed version exists, or an uninitialized string
```


---

#### getName()


**getName()**


Returns the document's name

```endpoint
CALL getName()
```


---

#### getNumberOfVersions()


**getNumberOfVersions()**


Returns the number of versions of this document

```endpoint
CALL getNumberOfVersions()
```

#### Return

```json
the number of versions
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getSignatoriesSize()


**getSignatoriesSize()**


Returns the number of signatories of this agreement.

```endpoint
CALL getSignatoriesSize()
```

#### Return

```json
the number of signatories
```


---

#### getVersionCreated(string)


**getVersionCreated(string)**


Returns the creation date of the specified version hash.

```endpoint
CALL getVersionCreated(string)
```

#### Parameters

```solidity
_hash // the desired version hash

```

#### Return

```json
the creation date, or 0 if the version does not exist
```


---

#### getVersionCreator(string)


**getVersionCreator(string)**


Returns the address registered as the creator of the specified version hash.

```endpoint
CALL getVersionCreator(string)
```

#### Parameters

```solidity
_hash // the desired version hash

```

#### Return

```json
the creator address, or 0x0 if the version does not exist
```


---

#### isConfirmedVersion(string)


**isConfirmedVersion(string)**


Verify if the specified version hash is the confirmed version.

```endpoint
CALL isConfirmedVersion(string)
```

#### Parameters

```solidity
_version // the version

```

#### Return

```json
true if the version matches the confirmed one, false otherwise
```


---

#### isEffective()


**isEffective()**


Returns whether this agreement is effective or not

```endpoint
CALL isEffective()
```


---

#### isFullyConfirmed(string)


**isFullyConfirmed(string)**


Determines if the submitted version has been signed by all signatories.

```endpoint
CALL isFullyConfirmed(string)
```

#### Parameters

```solidity
_version // the version

```

#### Return

```json
true if all configured signatories have signed that version, false otherwise
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### AgreementSignatureCheck Interface


The AgreementSignatureCheck Interface contract is found within the bin bundle.

#### complete(address,bytes32,bytes32,address)


**complete(address,bytes32,bytes32,address)**


Accesses the "agreement" IN data mapping to retrieve the address of an ActiveAgreement and verifies that the TX performer has applied a signature. REVERTS if: - the IN data mapping "agreement" cannot be accessed or results in an empty address - the presence of the signature on the agreement cannot be established.

```endpoint
CALL complete(address,bytes32,bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the globally unique ID of the ActivityInstance invoking this contract param _activityId the ID of the activity definition
_piAddress // the address of the ProcessInstance in which context the application is invoked
_txPerformer // the address performing the transaction

```


---

### AgreementTest Interface


The AgreementTest Interface contract is found within the bin bundle.

#### testModifiers()


**testModifiers()**


Tests agreement modifiers.

```endpoint
CALL testModifiers()
```


---

#### testSignatoryManagement()


**testSignatoryManagement()**


test different scenarios of adding signatories

```endpoint
CALL testSignatoryManagement()
```


---

#### testVersionSigning()


**testVersionSigning()**


Uses the given agreement to test version adding, signing, and agreement state changes.

```endpoint
CALL testVersionSigning()
```


---

### AgreementsAPI


The AgreementsAPI contract is found within the bin bundle.

#### authorizePartyActor(ActiveAgreement)


**authorizePartyActor(ActiveAgreement)**


Evaluates the msg.sender and tx.origin against the given agreement to determine if there is an authorized party/actor relationship.

```endpoint
CALL authorizePartyActor(ActiveAgreement)
```

#### Parameters

```solidity
_agreement // an ActiveAgreement

```

#### Return

```json
actor - the address of either msg.sender or tx.origin depending on which one was authorized; 0x0 if authorization failedparty - the agreement party associated with the identified actor. This is typically the same as the actor, but can also contain an Organization address if an Organization was registered as a party. 0x0 if authorization failed
```


---

#### isFullyExecuted(ActiveAgreement)


**isFullyExecuted(ActiveAgreement)**


Checks whether the given agreement is fully executed.

```endpoint
CALL isFullyExecuted(ActiveAgreement)
```

#### Parameters

```solidity
_agreement // an ActiveAgreement

```

#### Return

```json
true if all parties have signed, false otherwise
```


---

### ApplicationRegistry Interface


The ApplicationRegistry Interface contract is found within the bin bundle.

#### addAccessPoint(bytes32,bytes32,uint8,uint8)


**addAccessPoint(bytes32,bytes32,uint8,uint8)**


Creates an data access point for the given application

```endpoint
CALL addAccessPoint(bytes32,bytes32,uint8,uint8)
```

#### Parameters

```solidity
_accessPointId // the ID of the new access point
_dataType // a DataTypes code
_direction // the BpmModel.Direction (IN/OUT) of the data flow
_id // the ID of the application to which to add the access point

```

#### Return

```json
BaseErrors.RESOURCE_NOT_FOUND() if the application does not exist
BaseBaseErrors.RESOUCE_ALREADY_EXISTS() if the access point already exists
BaseBaseErrors.NO_ERROR() if no errors
```


---

#### addApplication(bytes32,uint8,address,bytes4,bytes32)


**addApplication(bytes32,uint8,address,bytes4,bytes32)**


Adds an application with the given parameters to this ApplicationRegistry

```endpoint
CALL addApplication(bytes32,uint8,address,bytes4,bytes32)
```

#### Parameters

```solidity
_function // the signature of the completion function
_id // the ID of the application
_location // the location of the contract implementing the application
_type // the BpmModel.ApplicationType
_webForm // the hash of a web form (only for web applications)

```

#### Return

```json
an error code indicating success or failure
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getAccessPointAtIndex(bytes32,uint256)


**getAccessPointAtIndex(bytes32,uint256)**


Returns the ID of the access point at the given index

```endpoint
CALL getAccessPointAtIndex(bytes32,uint256)
```

#### Parameters

```solidity
_id // the application id
_index // the index position of the access point

```

#### Return

```json
the access point id if it exists
```


---

#### getAccessPointData(bytes32,bytes32)


**getAccessPointData(bytes32,bytes32)**


Returns information about the access point with the given ID

```endpoint
CALL getAccessPointData(bytes32,bytes32)
```

#### Parameters

```solidity
_accessPointId // the access point ID
_id // the application ID

```

#### Return

```json
dataType the data typedirection the direction
```


---

#### getApplicationAtIndex(uint256)


**getApplicationAtIndex(uint256)**


Returns the ID of the application at the given index

```endpoint
CALL getApplicationAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the application ID, if it exists
```


---

#### getApplicationData(bytes32)


**getApplicationData(bytes32)**


Returns information about the application with the given ID

```endpoint
CALL getApplicationData(bytes32)
```

#### Parameters

```solidity
_id // the application ID

```

#### Return

```json
applicationType the BpmModel.ApplicationType as uint8location the applications contract addressmethod the function signature of the application's completion functionwebForm the form identifier (hash) of the web application (only for a web application)accessPointCount the count of access points of this application
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getNumberOfAccessPoints(bytes32)


**getNumberOfAccessPoints(bytes32)**


Returns the number of application access points for given application

```endpoint
CALL getNumberOfAccessPoints(bytes32)
```

#### Parameters

```solidity
_id // the id of the application

```

#### Return

```json
the number of access points for the application
```


---

#### getNumberOfApplications()


**getNumberOfApplications()**


Returns the number of applications defined in this ProcessModel

```endpoint
CALL getNumberOfApplications()
```

#### Return

```json
the number of applications
```


---

#### upgrade(address)


**upgrade(address)**


Performs the necessary steps to upgrade from this contract to the specified new version.

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a contract that replaces this one

```

#### Return

```json
true if successful, false otherwise
```


---

### ApplicationRegistryDb


The ApplicationRegistryDb contract is found within the bin bundle.

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---


### Archetype Interface


The Archetype Interface contract is found within the bin bundle.

#### activate()


**activate()**


Activates this archetype

```endpoint
CALL activate()
```


---

#### addDocument(string)


**addDocument(string)**


Adds the document specified by the external reference to this Archetype

```endpoint
CALL addDocument(string)
```

#### Parameters

```solidity
_fileReference // the external reference to the document

```


---

#### addJurisdiction(bytes2,bytes32)


**addJurisdiction(bytes2,bytes32)**


Adds the given jurisdiction in the form of a country code and region identifier to this archetype. References codes defined via IsoCountries interface implementations.

```endpoint
CALL addJurisdiction(bytes2,bytes32)
```

#### Parameters

```solidity
_country // a ISO- code, e.g. 'US'
_region // a region identifier from a IsoCountries contract

```

#### Return

```json
error code indicating success or failure
key of the jurisdiction just added
```


---

#### addParameter(uint8,bytes32)


**addParameter(uint8,bytes32)**


Adds a parameter to this Archetype

```endpoint
CALL addParameter(uint8,bytes32)
```

#### Parameters

```solidity
_parameterName // parameter name
_parameterType // parameter type (enum)

```

#### Return

```json
error - code indicating success or failureposition - the position at which the parameter was added, if successful
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### deactivate()


**deactivate()**


Deactivates this archetype

```endpoint
CALL deactivate()
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getAuthor()


**getAuthor()**


Gets Author

```endpoint
CALL getAuthor()
```

#### Return

```json
author author
```


---

#### getDocument(bytes32)


**getDocument(bytes32)**


Gets document reference with given key

```endpoint
CALL getDocument(bytes32)
```

#### Parameters

```solidity
_key // document key

```

#### Return

```json
fileReference - the reference to the external document
```


---

#### getDocumentKeyAtIndex(uint256)


**getDocumentKeyAtIndex(uint256)**


Returns the document key at the given index

```endpoint
CALL getDocumentKeyAtIndex(uint256)
```

#### Parameters

```solidity
_index // index

```

#### Return

```json
key - the document key
```


---

#### getExecutionProcessDefinition()


**getExecutionProcessDefinition()**


Returns the address of the ProcessDefinition that orchestrates the agreement execution.

```endpoint
CALL getExecutionProcessDefinition()
```

#### Return

```json
the address of a ProcessDefinition
```


---

#### getFormationProcessDefinition()


**getFormationProcessDefinition()**


Returns the address of the ProcessDefinition that orchestrates the agreement formation.

```endpoint
CALL getFormationProcessDefinition()
```

#### Return

```json
the address of a ProcessDefinition
```


---

#### getGoverningArchetypeAtIndex(uint256)


**getGoverningArchetypeAtIndex(uint256)**


Retrieves the address for the governing archetype at the specified index

```endpoint
CALL getGoverningArchetypeAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
the address for the governing archetype
```


---

#### getGoverningArchetypes()


**getGoverningArchetypes()**


Returns all governing archetype address for this archetype

```endpoint
CALL getGoverningArchetypes()
```

#### Return

```json
the address array containing all governing archetypes
```


---

#### getJurisdictionAtIndex(uint256)


**getJurisdictionAtIndex(uint256)**


Retrieves the key for the jurisdiction at the specified index

```endpoint
CALL getJurisdictionAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS() if index is out of boundsthe key of the jurisdiction or an empty bytes32 if the index was out of bounds
```


---

#### getJurisdictionData(bytes32)


**getJurisdictionData(bytes32)**


Returns information about the jurisdiction with the specified key

```endpoint
CALL getJurisdictionData(bytes32)
```

#### Parameters

```solidity
_key // the key identifying the jurisdiction

```

#### Return

```json
the country and region identifiers (see IsoCountries), if the jurisdiction exists
```


---

#### getNumberOfDocuments()


**getNumberOfDocuments()**


Gets number of documents

```endpoint
CALL getNumberOfDocuments()
```

#### Return

```json
size number of documents
```


---

#### getNumberOfGoverningArchetypes()


**getNumberOfGoverningArchetypes()**


Returns the number governing archetypes for this archetype

```endpoint
CALL getNumberOfGoverningArchetypes()
```

#### Return

```json
the number of governing archetypes
```


---

#### getNumberOfJurisdictions()


**getNumberOfJurisdictions()**


Returns the number jurisdictions for this archetype

```endpoint
CALL getNumberOfJurisdictions()
```

#### Return

```json
the number of jurisdictions
```


---

#### getNumberOfParameters()


**getNumberOfParameters()**


Gets number of parameters

```endpoint
CALL getNumberOfParameters()
```

#### Return

```json
size number of parameters
```


---

#### getParameterAtIndex(uint256)


**getParameterAtIndex(uint256)**


Gets parameter at index

```endpoint
CALL getParameterAtIndex(uint256)
```

#### Parameters

```solidity
_index // index

```

#### Return

```json
customField parameter
```


---

#### getParameterDetails(bytes32)


**getParameterDetails(bytes32)**


Gets parameter data type

```endpoint
CALL getParameterDetails(bytes32)
```

#### Parameters

```solidity
_parameter // parameter

```

#### Return

```json
error error TBDposition index of parameterparameterType parameter type
```


---

#### getPrice()


**getPrice()**


Gets price

```endpoint
CALL getPrice()
```

#### Return

```json
price
```


---

#### getSuccessor()


**getSuccessor()**


Returns the successor of this archetype

```endpoint
CALL getSuccessor()
```

#### Return

```json
address of successor archetype
```


---

#### initialize(uint256,bool,bool,address,address,address,address[])


**initialize(uint256,bool,bool,address,address,address,address[])**


Initializes this ActiveAgreement with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(uint256,bool,bool,address,address,address,address[])
```

#### Parameters

```solidity
_active // determines if this archetype is active
_author // author
_executionProcess // the address of a ProcessDefinition that orchestrates the agreement execution
_formationProcess // the address of a ProcessDefinition that orchestrates the agreement formation
_governingArchetypes // array of governing archetype addresses
_isPrivate // determines if this archetype's documents are encrypted

```


---

#### isActive()


**isActive()**


Returns the active state

```endpoint
CALL isActive()
```

#### Return

```json
true if active, false otherwise
```


---

#### isPrivate()


**isPrivate()**


Returns the private state

```endpoint
CALL isPrivate()
```

#### Return

```json
true if private, false otherwise
```


---

#### setPrice(uint256)


**setPrice(uint256)**


Sets price

```endpoint
CALL setPrice(uint256)
```

#### Parameters

```solidity
_price // price of archetype

```


---

#### setSuccessor(address)


**setSuccessor(address)**


Sets the successor this archetype. Setting a successor automatically deactivates this archetype. Fails if given successor is the same address as itself.  Fails if intended action will lead to two archetypes with their successors pointing to each other.

```endpoint
CALL setSuccessor(address)
```

#### Parameters

```solidity
_successor // address of successor archetype

```


---

### ArchetypeRegistry Interface


The ArchetypeRegistry Interface contract is found within the bin bundle.

#### activate(address,address)


**activate(address,address)**


Sets active to true for given archetype

```endpoint
CALL activate(address,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_author // address of author (must match the author of the archetype in order to activate)

```


---

#### activatePackage(bytes32,address)


**activatePackage(bytes32,address)**


Sets active to true for given archetype package

```endpoint
CALL activatePackage(bytes32,address)
```

#### Parameters

```solidity
_author // address of author (must match the author of the archetype package in order to activate)
_id // bytes32 id of archetype package

```


---

#### addArchetypeToPackage(bytes32,address)


**addArchetypeToPackage(bytes32,address)**


Adds archetype to package

```endpoint
CALL addArchetypeToPackage(bytes32,address)
```

#### Parameters

```solidity
_archetype // the archetype address Reverts if package is not found
_packageId // the bytes32 package id

```


---

#### addDocument(address,string)


**addDocument(address,string)**


Adds a file reference to the given Archetype

```endpoint
CALL addDocument(address,string)
```

#### Parameters

```solidity
_archetype // archetype
_fileReference // the external reference to the document

```


---

#### addJurisdiction(address,bytes2,bytes32)


**addJurisdiction(address,bytes2,bytes32)**


Adds the given jurisdiction in the form of a country code and region identifier to this archetype. References codes defined via IsoCountries interface implementations.

```endpoint
CALL addJurisdiction(address,bytes2,bytes32)
```

#### Parameters

```solidity
_country // a ISO- code, e.g. 'US'
_region // a region identifier from a IsoCountries contract

```

#### Return

```json
a return code indicating success or failure
```


---

#### addJurisdictions(address,bytes2[],bytes32[])


**addJurisdictions(address,bytes2[],bytes32[])**


Adds the given jurisdictions in the form of a country codes and region identifiers to this archetype. References codes defined via IsoCountries interface implementations.

```endpoint
CALL addJurisdictions(address,bytes2[],bytes32[])
```

#### Parameters

```solidity
_countries // an array of a ISO- code, e.g. 'US'
_regions // an array of region identifiers from a IsoCountries contract

```

#### Return

```json
a return code indicating success or failure
```


---

#### addParameter(address,uint8,bytes32)


**addParameter(address,uint8,bytes32)**


Adds the specified parameter to the archetype

```endpoint
CALL addParameter(address,uint8,bytes32)
```

#### Parameters

```solidity
_parameterName // parameter name
_parameterType // parameter type (enum)

```

#### Return

```json
a return code indicating success or failure
```


---

#### addParameters(address,uint8[],bytes32[])


**addParameters(address,uint8[],bytes32[])**


Adds the specified parameters to the archetype

```endpoint
CALL addParameters(address,uint8[],bytes32[])
```

#### Parameters

```solidity
_parameterNames // parameter names array
_parameterTypes // parameter type (enum) array

```

#### Return

```json
a return code indicating success or failure
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createArchetype(uint256,bool,bool,address,address,address,bytes32,address[])


**createArchetype(uint256,bool,bool,address,address,address,bytes32,address[])**


Creates a new archetype

```endpoint
CALL createArchetype(uint256,bool,bool,address,address,address,bytes32,address[])
```

#### Parameters

```solidity
_active // determines if this archetype is active
_author // author
_executionProcess // the address of a ProcessDefinition that orchestrates the agreement execution
_formationProcess // the address of a ProcessDefinition that orchestrates the agreement formation
_governingArchetypes // array of archetype addresses which govern this archetype (optional)
_isPrivate // determines if the archetype's documents are encrypted
_packageId // id of package this archetype is part of (optional)
_price // price

```

#### Return

```json
archetype - the new archetype's address, if successfully created Reverts if archetype address is already registered
```


---

#### createArchetypePackage(address,bool,bool)


**createArchetypePackage(address,bool,bool)**


Adds a new archetype package

```endpoint
CALL createArchetypePackage(address,bool,bool)
```

#### Parameters

```solidity
_active // makes it a inactive package
_author // address of author (user account of organization)
_isPrivate // makes it a private package visible to only the author

```

#### Return

```json
error BaseErrors.NO_ERROR(), BaseErrors.NULL_PARAM_NOT_ALLOWED(), BaseErrors.RESOURCE_ALREADY_EXISTS()id bytes32 id of package
```


---

#### deactivate(address,address)


**deactivate(address,address)**


Sets active to false for given archetype

```endpoint
CALL deactivate(address,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_author // address of author (must match the author of the archetype in order to deactivate)

```


---

#### deactivatePackage(bytes32,address)


**deactivatePackage(bytes32,address)**


Sets active to false for given archetype package

```endpoint
CALL deactivatePackage(bytes32,address)
```

#### Parameters

```solidity
_author // address of author (must match the author of the archetype package in order to deactivate)
_id // bytes32 id of archetype package

```


---

#### getArchetypeAtIndex(uint256)


**getArchetypeAtIndex(uint256)**


Gets archetype address at given index

```endpoint
CALL getArchetypeAtIndex(uint256)
```

#### Parameters

```solidity
_index // index

```

#### Return

```json
the archetype address
```


---

#### getArchetypeAtIndexInPackage(bytes32,uint256)


**getArchetypeAtIndexInPackage(bytes32,uint256)**


Gets archetype address at index in package

```endpoint
CALL getArchetypeAtIndexInPackage(bytes32,uint256)
```

#### Parameters

```solidity
_id // id of the package
_index // uint index

```

#### Return

```json
archetype address of archetype
```


---

#### getArchetypeData(address)


**getArchetypeData(address)**


Returns data about an archetype

```endpoint
CALL getArchetypeData(address)
```

#### Parameters

```solidity
_archetype // the archetype address

```

#### Return

```json
price priceauthor author addressactive boolisPrivate boolsuccessor addressformationProcessDefinitionexecutionProcessDefinition
```


---

#### getArchetypePackageAtIndex(uint256)


**getArchetypePackageAtIndex(uint256)**


Gets package id at index

```endpoint
CALL getArchetypePackageAtIndex(uint256)
```

#### Parameters

```solidity
_index // uint index

```

#### Return

```json
id bytes32 id
```


---

#### getArchetypePackageData(bytes32)


**getArchetypePackageData(bytes32)**


Gets package data by id

```endpoint
CALL getArchetypePackageData(bytes32)
```

#### Parameters

```solidity
_id // bytes32 package id

```

#### Return

```json
author addressisPrivate boolactive bool
```


---

#### getArchetypeSuccessor(address)


**getArchetypeSuccessor(address)**


Returns archetype successor

```endpoint
CALL getArchetypeSuccessor(address)
```

#### Parameters

```solidity
_archetype // address of archetype

```

#### Return

```json
address address of successor
```


---

#### getArchetypesSize()


**getArchetypesSize()**


Gets number of archetypes

```endpoint
CALL getArchetypesSize()
```

#### Return

```json
size size
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getGoverningArchetypeAtIndex(address,uint256)


**getGoverningArchetypeAtIndex(address,uint256)**


Retrieves the address of governing archetype at the specified index

```endpoint
CALL getGoverningArchetypeAtIndex(address,uint256)
```

#### Parameters

```solidity
_archetype // the address of the archetype
_index // the index position of its governing archetype

```

#### Return

```json
the address for the governing archetype
```


---

#### getJurisdictionAtIndexForArchetype(address,uint256)


**getJurisdictionAtIndexForArchetype(address,uint256)**


Returns the jurisdiction key at the specified index for the given archetype

```endpoint
CALL getJurisdictionAtIndexForArchetype(address,uint256)
```

#### Parameters

```solidity
_archetype // archetype address
_index // the index of the jurisdiction

```

#### Return

```json
the jurisdiction primary key
```


---

#### getJurisdictionDataForArchetype(address,bytes32)


**getJurisdictionDataForArchetype(address,bytes32)**


Returns data about the jurisdiction with the specified key in the given archetype

```endpoint
CALL getJurisdictionDataForArchetype(address,bytes32)
```

#### Parameters

```solidity
_archetype // archetype address
_key // the jurisdiction key

```

#### Return

```json
country the jurisdiction's countryregion the jurisdiction's region
```


---

#### getNumberOfArchetypePackages()


**getNumberOfArchetypePackages()**


Gets number of archetype packages

```endpoint
CALL getNumberOfArchetypePackages()
```

#### Return

```json
size size
```


---

#### getNumberOfArchetypesInPackage(bytes32)


**getNumberOfArchetypesInPackage(bytes32)**


Gets number of archetypes in given package

```endpoint
CALL getNumberOfArchetypesInPackage(bytes32)
```

#### Parameters

```solidity
_id // id of the package

```

#### Return

```json
size archetype count
```


---

#### getNumberOfGoverningArchetypes(address)


**getNumberOfGoverningArchetypes(address)**


Returns the number governing archetypes for the given archetype

```endpoint
CALL getNumberOfGoverningArchetypes(address)
```

#### Parameters

```solidity
_archetype // address of the archetype

```

#### Return

```json
the number of governing archetypes
```


---

#### getNumberOfJurisdictionsForArchetype(address)


**getNumberOfJurisdictionsForArchetype(address)**


Returns the number of jurisdictions for the given Archetype

```endpoint
CALL getNumberOfJurisdictionsForArchetype(address)
```

#### Parameters

```solidity
_archetype // archetype address

```

#### Return

```json
the number of jurisdictions
```


---

#### getParameterByArchetypeAtIndex(address,uint256)


**getParameterByArchetypeAtIndex(address,uint256)**


Gets parameter name by Archetype At index

```endpoint
CALL getParameterByArchetypeAtIndex(address,uint256)
```

#### Parameters

```solidity
_archetype // archetype
_index // index

```

#### Return

```json
name name
```


---

#### getParameterByArchetypeData(address,bytes32)


**getParameterByArchetypeData(address,bytes32)**


Returns data about the parameter at with the specified name

```endpoint
CALL getParameterByArchetypeData(address,bytes32)
```

#### Parameters

```solidity
_archetype // archetype
_name // name

```

#### Return

```json
position index of parameterparameterType parameter type
```


---

#### getParametersByArchetypeSize(address)


**getParametersByArchetypeSize(address)**


Gets parameters size for given Archetype

```endpoint
CALL getParametersByArchetypeSize(address)
```

#### Parameters

```solidity
_archetype // archetype

```

#### Return

```json
size size
```


---

#### packageHasArchetype(bytes32,address)


**packageHasArchetype(bytes32,address)**


Determines whether given archetype address is in the package identified by the packageId

```endpoint
CALL packageHasArchetype(bytes32,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_packageId // id of the package

```

#### Return

```json
hasArchetype bool representing if archetype is in package
```


---

#### setArchetypePrice(address,uint256)


**setArchetypePrice(address,uint256)**


Sets price of given archetype

```endpoint
CALL setArchetypePrice(address,uint256)
```

#### Parameters

```solidity
_archetype // archetype
_price // price

```


---

#### setArchetypeSuccessor(address,address,address)


**setArchetypeSuccessor(address,address,address)**


Sets archetype successor

```endpoint
CALL setArchetypeSuccessor(address,address,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_author // address of author (must match the author of the archetype in order to set successor)
_successor // address of successor

```


---

#### upgrade(address)


**upgrade(address)**


Performs the necessary steps to upgrade from this contract to the specified new version.

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a contract that replaces this one

```

#### Return

```json
true if successful, false otherwise
```


---

### ArchetypeRegistryDb Interface


The ArchetypeRegistryDb Interface contract is found within the bin bundle.

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### ArchetypeRegistryTest Interface


The ArchetypeRegistryTest Interface contract is found within the bin bundle.

#### testArchetypeCreation()


**testArchetypeCreation()**


Covers the creation and setup of an archetype

```endpoint
CALL testArchetypeCreation()
```


---

### ArrayUtils Library Implementation


The ArrayUtils Library Implementation contract is found within the bin bundle.

#### contains(address[],address)


**contains(address[],address)**


Returns whether the specified value is present in the given array

```endpoint
CALL contains(address[],address)
```

#### Parameters

```solidity
_list // the array
_value // the value

```

#### Return

```json
true if the value is found in the array, false otherwise
```


---

#### contains(bytes32[],bytes32)


**contains(bytes32[],bytes32)**


Returns whether the specified value is present in the given array

```endpoint
CALL contains(bytes32[],bytes32)
```

#### Parameters

```solidity
_list // the array
_value // the value

```

#### Return

```json
true if the value is found in the array, false otherwise
```


---

#### contains(int256[],int256)


**contains(int256[],int256)**


Returns whether the specified value is present in the given array

```endpoint
CALL contains(int256[],int256)
```

#### Parameters

```solidity
_list // the array
_value // the value

```

#### Return

```json
true if the value is found in the array, false otherwise
```


---

#### contains(uint256[],uint256)


**contains(uint256[],uint256)**


Returns whether the specified value is present in the given array

```endpoint
CALL contains(uint256[],uint256)
```

#### Parameters

```solidity
_list // the array
_value // the value

```

#### Return

```json
true if the value is found in the array, false otherwise
```


---

#### hasDuplicates(address[])


**hasDuplicates(address[])**


Determines whether the given array contains the same value more than once.

```endpoint
CALL hasDuplicates(address[])
```

#### Parameters

```solidity
_list // the array

```

#### Return

```json
true if at least one value in the array is not unique
```


---

#### hasDuplicates(bytes32[])


**hasDuplicates(bytes32[])**


Determines whether the given array contains the same value more than once.

```endpoint
CALL hasDuplicates(bytes32[])
```

#### Parameters

```solidity
_list // the array

```

#### Return

```json
true if at least one value in the array is not unique
```


---

#### hasDuplicates(int256[])


**hasDuplicates(int256[])**


Determines whether the given array contains the same value more than once.

```endpoint
CALL hasDuplicates(int256[])
```

#### Parameters

```solidity
_list // the array

```

#### Return

```json
true if at least one value in the array is not unique
```


---

#### hasDuplicates(uint256[])


**hasDuplicates(uint256[])**


Determines whether the given array contains the same value more than once.

```endpoint
CALL hasDuplicates(uint256[])
```

#### Parameters

```solidity
_list // the array

```

#### Return

```json
true if at least one value in the array is not unique
```


---

### ArrayUtilsTest Interface


The ArrayUtilsTest Interface contract is found within the bin bundle.

#### testContains()


**testContains()**


Tests the contains() functions

```endpoint
CALL testContains()
```


---

#### testHasDuplicates()


**testHasDuplicates()**


Tests the hasDuplicates() functions

```endpoint
CALL testHasDuplicates()
```


---




### BpmModelLib API Library


The BpmModelLib API Library contract is found within the bin bundle.

#### resolve(BpmModel.TransitionCondition storage,address)


**resolve(BpmModel.TransitionCondition storage,address)**


Resolves the given TransitionCondition agaist the provided DataStorage.

```endpoint
CALL resolve(BpmModel.TransitionCondition storage,address)
```

#### Parameters

```solidity
_condition // the transition condition
_dataStorage // a DataStorage contract address to use for data lookup for BOTH left- and right-hand side conditions (unless they point to an explicit DataStorage address that may differ from the provided one).

```

#### Return

```json
true if the condition evaluated to true, false otherwise
```


---

#### resolveRightHandValueAsAddress(BpmModel.TransitionCondition storage,address)


**resolveRightHandValueAsAddress(BpmModel.TransitionCondition storage,address)**


Resolves the given TransitionCondition value as an address using the provided DataStorage. REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)

```endpoint
CALL resolveRightHandValueAsAddress(BpmModel.TransitionCondition storage,address)
```

#### Parameters

```solidity
_condition // a BpmModel.TransitionCondition
_dataStorage // the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 

```

#### Return

```json
the result of resolving the TransitionCondition asn address value
```


---

#### resolveRightHandValueAsBool(BpmModel.TransitionCondition storage,address)


**resolveRightHandValueAsBool(BpmModel.TransitionCondition storage,address)**


Resolves the given TransitionCondition value as a bool using the provided DataStorage. REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)

```endpoint
CALL resolveRightHandValueAsBool(BpmModel.TransitionCondition storage,address)
```

#### Parameters

```solidity
_condition // a BpmModel.TransitionCondition
_dataStorage // the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 

```

#### Return

```json
the result of resolving the TransitionCondition as bool value
```


---

#### resolveRightHandValueAsBytes32(BpmModel.TransitionCondition storage,address)


**resolveRightHandValueAsBytes32(BpmModel.TransitionCondition storage,address)**


Resolves the given TransitionCondition value as a bytes32 using the provided DataStorage. REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)

```endpoint
CALL resolveRightHandValueAsBytes32(BpmModel.TransitionCondition storage,address)
```

#### Parameters

```solidity
_condition // a BpmModel.TransitionCondition
_dataStorage // the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 

```

#### Return

```json
the result of resolving the TransitionCondition as bytes32 value
```


---

#### resolveRightHandValueAsInt(BpmModel.TransitionCondition storage,address)


**resolveRightHandValueAsInt(BpmModel.TransitionCondition storage,address)**


Resolves the given TransitionCondition value as a int using the provided DataStorage. REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)

```endpoint
CALL resolveRightHandValueAsInt(BpmModel.TransitionCondition storage,address)
```

#### Parameters

```solidity
_condition // a BpmModel.TransitionCondition
_dataStorage // the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 

```

#### Return

```json
the result of resolving the TransitionCondition as int value
```


---

#### resolveRightHandValueAsString(BpmModel.TransitionCondition storage,address)


**resolveRightHandValueAsString(BpmModel.TransitionCondition storage,address)**


Resolves the given TransitionCondition value as a string using the provided DataStorage. REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)

```endpoint
CALL resolveRightHandValueAsString(BpmModel.TransitionCondition storage,address)
```

#### Parameters

```solidity
_condition // a BpmModel.TransitionCondition
_dataStorage // the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 

```

#### Return

```json
the result of resolving the TransitionCondition as string value
```


---

#### resolveRightHandValueAsUint(BpmModel.TransitionCondition storage,address)


**resolveRightHandValueAsUint(BpmModel.TransitionCondition storage,address)**


Resolves the given TransitionCondition value as a uint using the provided DataStorage. REVERTS: if the given condition does not have a right-hand side value (conditional or primitive)

```endpoint
CALL resolveRightHandValueAsUint(BpmModel.TransitionCondition storage,address)
```

#### Parameters

```solidity
_condition // a BpmModel.TransitionCondition
_dataStorage // the address of a DataStorage contract (only used for right-hand side conditional evaluation, not right-hand side primitive) 

```

#### Return

```json
the result of resolving the TransitionCondition as uint value
```


---


### BpmRuntimeLib Library


The BpmRuntimeLib Library contract is found within the bin bundle.

#### abort(BpmRuntime.ProcessInstance storage)


**abort(BpmRuntime.ProcessInstance storage)**


Aborts the given ProcessInstance and all of its activities

```endpoint
CALL abort(BpmRuntime.ProcessInstance storage)
```

#### Parameters

```solidity
_processInstance // the process instance to abort

```


---

#### addActivity(BpmRuntime.ProcessGraph storage,bytes32)


**addActivity(BpmRuntime.ProcessGraph storage,bytes32)**


Adds an activity with the specified ID to the given process runtime graph.

```endpoint
CALL addActivity(BpmRuntime.ProcessGraph storage,bytes32)
```

#### Parameters

```solidity
_graph // the process runtime graph
_id // the activity ID to add

```


---

#### addTransition(BpmRuntime.ProcessGraph storage,bytes32,BpmRuntime.TransitionType)


**addTransition(BpmRuntime.ProcessGraph storage,bytes32,BpmRuntime.TransitionType)**


Adds a transition with the specified ID to the given process runtime graph.

```endpoint
CALL addTransition(BpmRuntime.ProcessGraph storage,bytes32,BpmRuntime.TransitionType)
```

#### Parameters

```solidity
_graph // the process runtime graph
_id // the transition ID to add

```


---

#### authorizePerformer(bytes32,ProcessInstance)


**authorizePerformer(bytes32,ProcessInstance)**


Attempts to determine if either the msg.sender or the tx.origin is an authorized performer for the specified activity instance ID in the given ProcessInstance. The address of the one that cleared is returned with msg.sender always tried before tx.origin. If there is no direct match, an attempt is made to determine if the set performer is an Organization which can authorize one of the two addresses.

```endpoint
CALL authorizePerformer(bytes32,ProcessInstance)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance
_processInstance // the ProcessInstance that contains the specified activity instance

```

#### Return

```json
authorizedPerformer - the address (msg.sender or tx.origin) that was authorized, or 0x0 if no authorization is given
```


---

#### clear(BpmRuntime.ProcessGraph storage)


**clear(BpmRuntime.ProcessGraph storage)**


Resets the provided runtime graph, i.e. removes any previously created activities and transitions.

```endpoint
CALL clear(BpmRuntime.ProcessGraph storage)
```

#### Parameters

```solidity
_graph // the process runtime graph to clean up

```


---

#### configure(BpmRuntime.ProcessGraph storage,ProcessInstance)


**configure(BpmRuntime.ProcessGraph storage,ProcessInstance)**


Configures a ProcessGraph to be used for execution in the provided ProcessInstance. The provided graph is cleared of any existing activity/transition information and then configured using the ProcessDefinition of the process instance. REVERTS if: - the process instance's ProcessDefinition is not valid

```endpoint
CALL configure(BpmRuntime.ProcessGraph storage,ProcessInstance)
```

#### Parameters

```solidity
_graph // the BpmRuntime.ProcessGraph to configure

```


---

#### connect(BpmRuntime.ProcessGraph storage,bytes32,BpmModel.ModelElementType,bytes32,BpmModel.ModelElementType)


**connect(BpmRuntime.ProcessGraph storage,bytes32,BpmModel.ModelElementType,bytes32,BpmModel.ModelElementType)**


Establishes a connection between two elements in the ProcessGraph identified by the given IDs and using the provided type declarations. This function creates the "petry-net" graph structure and as such does not allow adding two places (or two transitions) directly. Therefore, the following combinations require the generation of additional objects: - activity -> activity: automatically generates a new NONE transition with two arcs to connect the activities - gateway -> gateway: automatically generates a new artificial activity to connect the transitions

```endpoint
CALL connect(BpmRuntime.ProcessGraph storage,bytes32,BpmModel.ModelElementType,bytes32,BpmModel.ModelElementType)
```

#### Parameters

```solidity
_graph // a BpmRuntime.ProcessGraph
_sourceId // the ID of the source object
_sourceType // the BpmModel.ModelElementType of the source object
_targetId // the ID of the target object
_targetType // the BpmModel.ModelElementType of the target object

```


---

#### continueTransaction(BpmRuntime.ProcessInstance storage,BpmService)


**continueTransaction(BpmRuntime.ProcessInstance storage,BpmService)**


Checks the given ProcessInstance for completeness and open activities. If activatable activities are detected, recursive execution is entered via execute(ProcessInstance). If the ProcessInstance is complete, its state is set to COMPLETED. Otherwise the function returns BaseErrors.NO_ERROR().

```endpoint
CALL continueTransaction(BpmRuntime.ProcessInstance storage,BpmService)
```

#### Parameters

```solidity
_processInstance // the BpmRuntime.ProcessInstance

```

#### Return

```json
BaseErrors.NO_ERROR() if no errors were encountered during processing or no processing happenedany error code from entering into a recursive execute(ProcessInstance) and continuing to execute the process
```


---

#### createActivityInstance(BpmRuntime.ProcessInstance storage,bytes32,uint256)


**createActivityInstance(BpmRuntime.ProcessInstance storage,bytes32,uint256)**


Creates a new BpmRuntime.ActivityInstance with the specified parameters and adds it to the given ProcessInstance

```endpoint
CALL createActivityInstance(BpmRuntime.ProcessInstance storage,bytes32,uint256)
```

#### Parameters

```solidity
_activityId // the ID of the activity as defined in the ProcessDefinition
_index // indicates the position of the ActivityInstance when used in a multi-instance context
_processInstance // the ProcessInstance to which the ActivityInstance is added

```

#### Return

```json
the unique global ID of the activity instance
```


---

#### execute(BpmRuntime.ActivityInstance storage,DataStorage,ProcessDefinition,BpmService)


**execute(BpmRuntime.ActivityInstance storage,DataStorage,ProcessDefinition,BpmService)**


Executes the given ActivityInstance based on the information in the provided ProcessDefinition.

```endpoint
CALL execute(BpmRuntime.ActivityInstance storage,DataStorage,ProcessDefinition,BpmService)
```

#### Parameters

```solidity
_activityInstance // the ActivityInstance
_processDefinition // a ProcessDefinition containing information how to execute the activity
_rootDataStorage // a DataStorage that can be used to resolve process data (typically this is the ProcessInstance itself)
_service // the BpmService to use for communicating

```

#### Return

```json
BaseErrors.INVALID_PARAM_STATE() if the ActivityInstance's state is not CREATED, SUSPENDED, or INTERRUPTEDBaseErrors.INVALID_ACTOR() if the ActivityInstance is of TaskType.USER, but neither the msg.sender nor the tx.origin is the assignee of the task.BaseErrors.NO_ERROR() if successful
```


---

#### execute(BpmRuntime.ProcessGraph storage)


**execute(BpmRuntime.ProcessGraph storage)**


Executes a single iteration of the given ProcessGraph, i.e. it goes over all transitions and attempts to fire them based on the current marker state of the network graph. If after this iteration the new marker state would result in more transitions being fired, this function should be invoked again.

```endpoint
CALL execute(BpmRuntime.ProcessGraph storage)
```

#### Parameters

```solidity
_graph // the process runtime graph

```

#### Return

```json
the number of transitions that fired
```


---

#### execute(BpmRuntime.ProcessInstance storage,BpmService)


**execute(BpmRuntime.ProcessInstance storage,BpmService)**


Executes the given ProcessInstance leveraging the given BpmService reference by looking for activities that are "ready" to be executed. Execution continues along the process graph until no more activities can be executed. This function implements a single transaction of all activities in a process flow until an asynchronous point in the flow is reached or the process has ended.

```endpoint
CALL execute(BpmRuntime.ProcessInstance storage,BpmService)
```

#### Parameters

```solidity
_processInstance // the ProcessInstance to execute
_service // the BpmService managing the ProcessInstance (used to register changes to the ProcessInstance and fire events)

```

#### Return

```json
BaseErrors.INVALID_STATE() if the ProcessInstance is not ACTIVEBaseErrors.NO_ERROR() if successful
```


---

#### hasActivatableActivities(BpmRuntime.ProcessGraph storage)


**hasActivatableActivities(BpmRuntime.ProcessGraph storage)**


Determines whether the given runtime instance has any activities that are waiting to be activated.

```endpoint
CALL hasActivatableActivities(BpmRuntime.ProcessGraph storage)
```

#### Parameters

```solidity
_graph // the ProcessGraph

```

#### Return

```json
true if at least one activatable activity was found, false otherwise
```


---

#### invokeApplication(BpmRuntime.ActivityInstance storage,address,bytes32,address,ProcessDefinition,ApplicationRegistry)


**invokeApplication(BpmRuntime.ActivityInstance storage,address,bytes32,address,ProcessDefinition,ApplicationRegistry)**


Performs a call on the given application ID defined in the provided ApplicationRegistry. The application's address should be registered as the ActivityInstance's performer prior to invoking this function. Currently unused parameters were unnamed to avoid compiler warnings: param _rootDataStorage a DataStorage that is used as the root or default for resolving data references param _processDefinition the process definition

```endpoint
CALL invokeApplication(BpmRuntime.ActivityInstance storage,address,bytes32,address,ProcessDefinition,ApplicationRegistry)
```

#### Parameters

```solidity
_activityInstance // the ActivityInstance
_application // the application ID
_applicationRegistry // the registry where information about an application can be retrieved
_txPerformer // the account that initiated the current transaction (optional)

```

#### Return

```json
BaseErrors.RUNTIME_ERROR if there was an exception in calling the defined appliationBaseErrors.NO_ERROR() if successful
```


---

#### isCompleted(BpmRuntime.ProcessGraph storage)


**isCompleted(BpmRuntime.ProcessGraph storage)**


Calls the execute() function on the given ProcessGraph, i.e. attempts to fire any possible transitions, and reports back on completeness and open activities. The following scenarios are possible: (completed, !readyActivities): the process is done, there are no more activities to process (!completed, readyActivities): the process is still active and there are activities ready for processing (!completed, !readyActivities): the process is still active, but no activities are ready to be processed (which means there must be instances waiting for asynchronous events)

```endpoint
CALL isCompleted(BpmRuntime.ProcessGraph storage)
```

#### Parameters

```solidity
_graph // the BpmRuntime.ProcessGraph

```

#### Return

```json
completed - if true, the graph cannot be executed any furtherreadyActivities - if true there are activities ready for processing, false otherwise
```


---

#### isTransitionEnabled(BpmRuntime.ProcessGraph storage,bytes32)


**isTransitionEnabled(BpmRuntime.ProcessGraph storage,bytes32)**


Determines whether the conditions are met to fire the provided transition.

```endpoint
CALL isTransitionEnabled(BpmRuntime.ProcessGraph storage,bytes32)
```

#### Parameters

```solidity
_graph // the process runtime graph containing the transition
_transitionId // the ID specifying the transition

```

#### Return

```json
true if the transitions can fire, false otherwise
```


---

#### resolveDataMappingLocation(BpmRuntime.ProcessInstance storage,bytes32,bytes32,BpmModel.Direction)


**resolveDataMappingLocation(BpmRuntime.ProcessInstance storage,bytes32,bytes32,BpmModel.Direction)**


Returns the resolved location of the data specified by the data mapping for the specified ActivityInstance.

```endpoint
CALL resolveDataMappingLocation(BpmRuntime.ProcessInstance storage,bytes32,bytes32,BpmModel.Direction)
```

#### Parameters

```solidity
_activityInstanceId // the ID of the activity instance
_dataMappingId // the ID of a data mapping associated with the activity instance
_direction // IN|OUT specifying the type of data mapping
_processInstance // provides the data context against which to resolve the data mapping

```

#### Return

```json
dataStorage - the address of a DataStorage that contains the requested data. Default is the ProcessInstance itself, if none other specifieddataPath - the ID with which the data can be retrieved
```


---

#### resolveParticipant(ProcessModel,DataStorage,bytes32)


**resolveParticipant(ProcessModel,DataStorage,bytes32)**


Provides runtime resolution capabilities to determine the account address or lookup location of an account for a participant in a given ProcessModel. This function supports dealing with concrete participants as well as conditional performers. Examples: Return value (FE80A3F6CDFEF73D4FACA7DBA1DFCF215299279D, "") => The address is a concrete (user) account and can be used directly Return value (AA194B34D18F710058C0B14CFDAD4FF0150856EA, "accountant") => The address is a DataStorage contract and the (user) account to use can be located using DataStorage(AA194B34D18F710058C0B14CFDAD4FF0150856EA).getDataValueAsAddress("accountant")

```endpoint
CALL resolveParticipant(ProcessModel,DataStorage,bytes32)
```

#### Parameters

```solidity
_dataStorage // a concrete DataStorage instance supporting the lookup
_participant // the ID of a participant in the given model
_processModel // a ProcessModel

```

#### Return

```json
target - either the address of an account or the address of another DataStorage where the account can be founddataPath - empty bytes32 in case the returned target is already an identified account or a key where to retrieve the account if the target is another DataStorage
```


---

#### setPerformer(BpmRuntime.ActivityInstance storage,ProcessDefinition,DataStorage)


**setPerformer(BpmRuntime.ActivityInstance storage,ProcessDefinition,DataStorage)**


Sets the performer on the given ActivityInstance based on the provided ProcessDefinition and DataStorage. The ActivityInstance must belong to a USER task for the performer to be set.

```endpoint
CALL setPerformer(BpmRuntime.ActivityInstance storage,ProcessDefinition,DataStorage)
```

#### Parameters

```solidity
_activityInstance // the ActivityInstance on which to set the performer
_processDefinition // the ProcessDefinition where the activity definition can be found
_rootDataStorage // a DataStorage to use as the basis to resolve data paths

```

#### Return

```json
true if the performer was set, false otherwise
```


---

#### traverseRuntimeGraph(ProcessDefinition,bytes32,BpmRuntime.ProcessGraph storage)


**traverseRuntimeGraph(ProcessDefinition,bytes32,BpmRuntime.ProcessGraph storage)**


Recursive function to walk a graph of model elements in the given ProcessDefinition starting at the specified element ID. Due to the recursive nature of the function, it is not checked whether the ProcessDefinition is valid. This is the responsibility of the calling function that initiates the recursion!

```endpoint
CALL traverseRuntimeGraph(ProcessDefinition,bytes32,BpmRuntime.ProcessGraph storage)
```

#### Parameters

```solidity
_currentId // the current element's ID which is being processed
_graph // the process runtime graph being constructed
_processDefinition // the ProcessDefinition on which the runtime graph should be based

```


---

### BpmService Interface


The BpmService Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createDefaultProcessInstance(address,address,bytes32)


**createDefaultProcessInstance(address,address,bytes32)**


Creates a new ProcessInstance initiated with the provided parameters. This ProcessInstance can be further customized and then submitted to the #startProcessInstance(ProcessInstance) function for execution.

```endpoint
CALL createDefaultProcessInstance(address,address,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
_processDefinition // the address of a ProcessDefinition
_startedBy // the address of an account that regarded as the starting user

```


---

#### getActivityInstanceAtIndex(address,uint256)


**getActivityInstanceAtIndex(address,uint256)**


Returns the ActivityInstance ID at the specified index

```endpoint
CALL getActivityInstanceAtIndex(address,uint256)
```

#### Parameters

```solidity
_address // the process instance address
_pos // the activity instance index

```

#### Return

```json
the ActivityInstance ID
```


---

#### getActivityInstanceData(address,bytes32)


**getActivityInstanceData(address,bytes32)**


Returns ActivityInstance data for the given ActivityInstance ID

```endpoint
CALL getActivityInstanceData(address,bytes32)
```

#### Parameters

```solidity
_id // the global ID of the activity instance
_processInstance // the process instance address to which the ActivityInstance belongs

```

#### Return

```json
activityId - the ID of the activity as defined by the process definitioncreated - the creation timestampcompleted - the completion timestampperformer - the account who is performing the activity (for interactive activities only)completedBy - the account who completed the activity (for interactive activities only) state - the uint8 representation of the BpmRuntime.ActivityInstanceState of this activity instance
```


---

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns detailed information about the address scope with the given key in the specified ProcessInstance

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_key // a scope key
_processInstance // the address of a ProcessInstance

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeyAtIndex(address,uint256)


**getAddressScopeKeyAtIndex(address,uint256)**


Returns the address scope key at the given index position of the specified ProcessInstance.

```endpoint
CALL getAddressScopeKeyAtIndex(address,uint256)
```

#### Parameters

```solidity
_index // the index position
_processInstance // the address of a ProcessInstance

```

#### Return

```json
the bytes32 scope key
```


---

#### getApplicationRegistry()


**getApplicationRegistry()**


Returns a reference to the ApplicationRegistry currently used by this BpmService

```endpoint
CALL getApplicationRegistry()
```

#### Return

```json
the ApplicationRegistry
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getBpmServiceDb()


**getBpmServiceDb()**


Returns a reference to the BpmServiceDb currently used by this BpmService

```endpoint
CALL getBpmServiceDb()
```

#### Return

```json
the BpmServiceDb
```


---

#### getNumberOfActivityInstances(address)


**getNumberOfActivityInstances(address)**


Returns the number of activity instances.

```endpoint
CALL getNumberOfActivityInstances(address)
```

#### Return

```json
the activity instance count as size
```


---

#### getNumberOfAddressScopes(address)


**getNumberOfAddressScopes(address)**


Returns the number of address scopes for the given ProcessInstance.

```endpoint
CALL getNumberOfAddressScopes(address)
```

#### Parameters

```solidity
_processInstance // the address of a ProcessInstance

```

#### Return

```json
the number of scopes
```


---

#### getNumberOfProcessData(address)


**getNumberOfProcessData(address)**


Returns the number of process data entries.

```endpoint
CALL getNumberOfProcessData(address)
```

#### Return

```json
the process data size
```


---

#### getNumberOfProcessInstances()


**getNumberOfProcessInstances()**


Returns the number of Process Instances.

```endpoint
CALL getNumberOfProcessInstances()
```

#### Return

```json
the process instance count as size
```


---

#### getProcessDataAtIndex(address,uint256)


**getProcessDataAtIndex(address,uint256)**


Returns the process data ID at the specified index

```endpoint
CALL getProcessDataAtIndex(address,uint256)
```

#### Parameters

```solidity
_pos // the index

```

#### Return

```json
the data ID
```


---

#### getProcessDataDetails(address,bytes32)


**getProcessDataDetails(address,bytes32)**


Returns information about the process data entry for the specified process and data ID

```endpoint
CALL getProcessDataDetails(address,bytes32)
```

#### Parameters

```solidity
_address // the process instance
_dataId // the data ID

```

#### Return

```json
(process,id,uintValue,bytes32Value,addressValue,boolValue)
```


---

#### getProcessInstanceAtIndex(uint256)


**getProcessInstanceAtIndex(uint256)**


Returns the process instance address at the specified index

```endpoint
CALL getProcessInstanceAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index

```

#### Return

```json
the process instance address or or BaseErrors.INDEX_OUT_OF_BOUNDS(), 0x0
```


---

#### getProcessInstanceData(address)


**getProcessInstanceData(address)**


Returns information about the process intance with the specified address

```endpoint
CALL getProcessInstanceData(address)
```

#### Parameters

```solidity
_address // the process instance address

```

#### Return

```json
processDefinition the address of the ProcessDefinitionstate the BpmRuntime.ProcessInstanceState as uint8startedBy the address of the account who started the process
```


---

#### getProcessInstanceForActivity(bytes32)


**getProcessInstanceForActivity(bytes32)**


Returns the address of the ProcessInstance of the specified ActivityInstance ID

```endpoint
CALL getProcessInstanceForActivity(bytes32)
```

#### Parameters

```solidity
_aiId // the ID of an ActivityInstance

```

#### Return

```json
the ProcessInstance address or 0x0 if it cannot be found
```


---

#### getProcessModelRepository()


**getProcessModelRepository()**


Gets the ProcessModelRepository address for this BpmService

```endpoint
CALL getProcessModelRepository()
```

#### Return

```json
the address of the repository
```


---

#### startProcess(address,bytes32)


**startProcess(address,bytes32)**


Creates a new ProcessInstance based on the specified ProcessDefinition and starts its execution

```endpoint
CALL startProcess(address,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
_processDefinition // the address of a ProcessDefinition

```

#### Return

```json
error code indicating success or failureinstance the address of a ProcessInstance, if successful
```


---

#### startProcessFromRepository(bytes32,bytes32,bytes32)


**startProcessFromRepository(bytes32,bytes32,bytes32)**


Creates a new ProcessInstance based on the specified IDs of a ProcessModel and ProcessDefinition and starts its execution

```endpoint
CALL startProcessFromRepository(bytes32,bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
_modelId // the model that qualifies the process ID, if multiple models are deployed, otherwise optional
_processDefinitionId // the ID of the process definition

```

#### Return

```json
error code indicating success or failureinstance the address of a ProcessInstance, if successful
```


---

#### startProcessInstance(address)


**startProcessInstance(address)**


Initializes, registers, and executes a given ProcessInstance

```endpoint
CALL startProcessInstance(address)
```

#### Parameters

```solidity
_pi // the ProcessInstance

```

#### Return

```json
BaseErrors.NO_ERROR() if successful or an error code from initializing or executing the ProcessInstance
```


---

#### upgrade(address)


**upgrade(address)**


Performs the necessary steps to upgrade from this contract to the specified new version.

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a contract that replaces this one

```

#### Return

```json
true if successful, false otherwise
```


---

### BpmServiceDb


The BpmServiceDb contract is found within the bin bundle.

#### addActivityInstance(bytes32)


**addActivityInstance(bytes32)**


Adds the given ActivityInstance ID to the registered activity instances. Can only be invoked by an already registered ProcessInstance. The sending ProcessInstance (msg.sender) is recorded as well.

```endpoint
CALL addActivityInstance(bytes32)
```

#### Parameters

```solidity
_id // the globally unique ID of an ActivityInstance

```


---

#### addProcessInstance(address)


**addProcessInstance(address)**


Adds the given address to the registered process instances. Can only be invoked by the owner of this BpmServiceDb.

```endpoint
CALL addProcessInstance(address)
```

#### Parameters

```solidity
_address // the address of a ProcessInstance

```


---

#### getNumberOfActivityInstances()


**getNumberOfActivityInstances()**


Returns the number of registered activity instances.

```endpoint
CALL getNumberOfActivityInstances()
```

#### Return

```json
the number of activity instances
```


---

#### getNumberOfProcessInstances()


**getNumberOfProcessInstances()**


Returns the number of registered process instances.

```endpoint
CALL getNumberOfProcessInstances()
```

#### Return

```json
the number of process instances
```


---

#### getProcessInstanceAtIndex(uint256)


**getProcessInstanceAtIndex(uint256)**


Returns the process instance address at the specified index

```endpoint
CALL getProcessInstanceAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index

```

#### Return

```json
the process instance address
```


---

#### getProcessInstanceForActivity(bytes32)


**getProcessInstanceForActivity(bytes32)**


Returns the address of the ProcessInstance of the specified ActivityInstance ID

```endpoint
CALL getProcessInstanceForActivity(bytes32)
```

#### Parameters

```solidity
_aiId // the ID of an ActivityInstance

```

#### Return

```json
the ProcessInstance address or 0x0 if it cannot be found
```


---

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### BpmServiceTest Interface


The BpmServiceTest Interface contract is found within the bin bundle.

#### testConditionalLoopRoute()


**testConditionalLoopRoute()**


Tests a conditional looping implementation (see also loop graph test)

```endpoint
CALL testConditionalLoopRoute()
```


---

#### testGatewayRouting()


**testGatewayRouting()**


Tests a straight-through process with XOR and AND gateways

```endpoint
CALL testGatewayRouting()
```


---

#### testInternalProcessExecution()


**testInternalProcessExecution()**


Uses a simple process flow in order to test BpmService-internal functions.

```endpoint
CALL testInternalProcessExecution()
```


---

#### testProcessGraphConditionalLoop()


**testProcessGraphConditionalLoop()**


Tests a process graph containing a looping pattern based on a condition using artificial activities between the gateways.

```endpoint
CALL testProcessGraphConditionalLoop()
```


---

#### testProcessGraphCreation()


**testProcessGraphCreation()**


Tests the creation and configuration of a process instance from a process definition, specifically the tranlation into a BpmRuntime.ProcessGraph

```endpoint
CALL testProcessGraphCreation()
```


---

#### testProcessGraphExclusiveGateway()


**testProcessGraphExclusiveGateway()**


Tests a process graph containing XOR split and join transitions

```endpoint
CALL testProcessGraphExclusiveGateway()
```


---

#### testProcessGraphExclusiveGatewayWithDefault()


**testProcessGraphExclusiveGatewayWithDefault()**


Tests a process graph containing XOR split with default transition

```endpoint
CALL testProcessGraphExclusiveGatewayWithDefault()
```


---

#### testProcessGraphMultiGateway()


**testProcessGraphMultiGateway()**


Tests a process graph containing multiple sequential gateways to ensure activation markers are passed along correctly using artificial activities between the gateways.

```endpoint
CALL testProcessGraphMultiGateway()
```


---

#### testProcessGraphParallelGateway()


**testProcessGraphParallelGateway()**


Tests a process graph containing AND split and join transitions

```endpoint
CALL testProcessGraphParallelGateway()
```


---

#### testProcessGraphSequential()


**testProcessGraphSequential()**


Tests a process graph consisting of sequential activities.

```endpoint
CALL testProcessGraphSequential()
```


---

#### testSuccessiveGatewaysRoute()


**testSuccessiveGatewaysRoute()**


Tests a graph with multiple successive gateways and conditions and default transitions to ensure the logic is translated correctly

```endpoint
CALL testSuccessiveGatewaysRoute()
```


---

### DOUG - Decentralized Organization Upgrade Guy


The DOUG - Decentralized Organization Upgrade Guy contract is found within the bin bundle.

#### deploy(string,address)


**deploy(string,address)**


Registers the contract with the given address under the specified ID and performs a deployment procedure which involves dependency injection and upgrades from previously deployed contracts with the same ID.

```endpoint
CALL deploy(string,address)
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
true if successful, false otherwise
```


---

#### deployVersion(string,address,uint8[3])


**deployVersion(string,address,uint8[3])**


Attempts to register the contract with the given address under the specified ID and version and performs a deployment procedure which involves dependency injection and upgrades from previously deployed contracts with the same ID.

```endpoint
CALL deployVersion(string,address,uint8[3])
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
true if successful, false otherwise
```


---

#### lookup(string)


**lookup(string)**


Returns the address of a contract registered under the given ID.

```endpoint
CALL lookup(string)
```

#### Parameters

```solidity
_id // the ID under which the contract is registered

```

#### Return

```json
the contract's address
```


---

#### lookupVersion(string,uint8[3])


**lookupVersion(string,uint8[3])**


Returns the address of the specified version of a contract registered under the given ID.

```endpoint
CALL lookupVersion(string,uint8[3])
```

#### Parameters

```solidity
_id // the ID under which the contract is registered

```

#### Return

```json
the contract's address of 0x0 if the given ID and version cannot be found.
```


---

#### register(string,address)


**register(string,address)**


Registers the contract with the given address under the specified ID.

```endpoint
CALL register(string,address)
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
true if successful, false otherwise
```


---

#### registerVersion(string,address,uint8[3])


**registerVersion(string,address,uint8[3])**


Registers the contract with the given address under the specified ID and version.

```endpoint
CALL registerVersion(string,address,uint8[3])
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
version - the version under which the contract was registered.
```


---

### DataStorageTest Interface


The DataStorageTest Interface contract is found within the bin bundle.

#### testAddressScopedDataStorage()


**testAddressScopedDataStorage()**


Tests functions specific to AddressScopes

```endpoint
CALL testAddressScopedDataStorage()
```


---

### DataStorageUtils Library


The DataStorageUtils Library contract is found within the bin bundle.

#### getArrayLength(DataStorageUtils.DataMap storage,bytes32)


**getArrayLength(DataStorageUtils.DataMap storage,bytes32)**


Returns the length of an array with the specified ID in the given DataMap. It is expected that the data value at the given ID is an array type, otherwise length 0 is returned.

```endpoint
CALL getArrayLength(DataStorageUtils.DataMap storage,bytes32)
```

#### Parameters

```solidity
_key // a key pointing to a supported array-type field
_map // the DataMap

```

#### Return

```json
the length of the array
```


---

#### getDataType(DataStorageUtils.DataMap storage,bytes32)


**getDataType(DataStorageUtils.DataMap storage,bytes32)**


Returns the DataTypes value for the specified field key from the given map.

```endpoint
CALL getDataType(DataStorageUtils.DataMap storage,bytes32)
```

#### Parameters

```solidity
_key // the field key
_map // a DataMap

```

#### Return

```json
the uint8 value of the data type
```


---

#### keyAtIndex(DataStorageUtils.DataMap storage,uint256)


**keyAtIndex(DataStorageUtils.DataMap storage,uint256)**


Returns the ID of the Data at the specified index in the given map

```endpoint
CALL keyAtIndex(DataStorageUtils.DataMap storage,uint256)
```


---

#### remove(DataStorageUtils.DataMap storage,bytes32)


**remove(DataStorageUtils.DataMap storage,bytes32)**


Removes the Data registered at the specified key in the provided map. The _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(DataStorageUtils.DataMap storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### resolveDataLocation(DataStorageUtils.ConditionalData storage,DataStorage)


**resolveDataLocation(DataStorageUtils.ConditionalData storage,DataStorage)**


Resolves the location of a ConditionalData against the provided DataStorage. This function is guaranteed to return a data location consisting of an address/path combination. If that is not possible, the functions reverts. REVERTS if:  - the DataStorage address cannot be determined and is empty

```endpoint
CALL resolveDataLocation(DataStorageUtils.ConditionalData storage,DataStorage)
```

#### Parameters

```solidity
_conditionalData // a ConditionalData with instructions how to find the desired data
_dataStorage // a DataStorage contract to use as a basis for the resolution

```

#### Return

```json
dataStorage - the address of a DataStorage that contains the requested data or 0x0 if a dataStorageId was provided that has no value in the dataPath - the ID with which the data can be retrieved from the DataStorage
```


---

#### resolveDataStorageAddress(bytes32,address,DataStorage)


**resolveDataStorageAddress(bytes32,address,DataStorage)**


Returns the address location of a DataStorage contract using the provided information. This is the most basic routine to determine from where to retrieve a data value. It uses the same attributes that are encoded in a ConditionalData struct, therefore supporting the handling of ConditionalData structs. The rules of resolving the location are as follows: 1. If an absolute location in the form of a dataStorage address is available, this address is returned 2. If a dataStorageId is provided, it's used as a dataPath to retrieve and return an address from the DataStorage parameter. 3. In all other cases, the optional DataStorage parameter is returned. REVERTS if: - for step 2 the DataStorage parameter is empty

```endpoint
CALL resolveDataStorageAddress(bytes32,address,DataStorage)
```

#### Parameters

```solidity
_dataStorage // the absolute address of a DataStorage
_dataStorageId // a path by which an address can be retrieved from a DataStorage
_refDataStorage // an optional DataStorge required to determine an address, if no absolute address was provided

```

#### Return

```json
the address of a DataStorage
```


---

#### resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,address)


**resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,address)**


Resolves an expression where all the relevant parts of the expression are provided as parameters.

```endpoint
CALL resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,address)
```

#### Parameters

```solidity
_dataId // an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
_dataPath // a dataPath where the target data is located
_dataStorage // a DataStorage contract where the target data is located
_op // a valid comparison operator 
_value // a address value to use as right-hand value to compare against the target data

```

#### Return

```json
boolean result of the comparison
```


---

#### resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,bool)


**resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,bool)**


Resolves an expression where all the relevant parts of the expression are provided as parameters.

```endpoint
CALL resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,bool)
```

#### Parameters

```solidity
_dataId // an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
_dataPath // a dataPath where the target data is located
_dataStorage // a DataStorage contract where the target data is located
_op // a valid comparison operator 
_value // a bool value to use as right-hand value to compare against the target data

```

#### Return

```json
boolean result of the comparison
```


---

#### resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,bytes32)


**resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,bytes32)**


Resolves an expression where all the relevant parts of the expression are provided as parameters.

```endpoint
CALL resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,bytes32)
```

#### Parameters

```solidity
_dataId // an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
_dataPath // a dataPath where the target data is located
_dataStorage // a DataStorage contract where the target data is located
_op // a valid comparison operator 
_value // a bytes32 value to use as right-hand value to compare against the target data

```

#### Return

```json
boolean result of the comparison
```


---

#### resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,int256)


**resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,int256)**


Resolves an expression where all the relevant parts of the expression are provided as parameters.

```endpoint
CALL resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,int256)
```

#### Parameters

```solidity
_dataId // an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
_dataPath // a dataPath where the target data is located
_dataStorage // a DataStorage contract where the target data is located
_op // a valid comparison operator 
_value // a uint value to use as right-hand value to compare against the target data

```

#### Return

```json
boolean result of the comparison
```


---

#### resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,string)


**resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,string)**


Resolves an expression where all the relevant parts of the expression are provided as parameters.

```endpoint
CALL resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,string)
```

#### Parameters

```solidity
_dataId // an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
_dataPath // a dataPath where the target data is located
_dataStorage // a DataStorage contract where the target data is located
_op // a valid comparison operator 
_value // a string value to use as right-hand value to compare against the target data

```

#### Return

```json
boolean result of the comparison
```


---

#### resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,uint256)


**resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,uint256)**


Resolves an expression where all the relevant parts of the expression are provided as parameters.

```endpoint
CALL resolveExpression(DataStorage,bytes32,bytes32,DataStorageUtils.COMPARISON_OPERATOR,uint256)
```

#### Parameters

```solidity
_dataId // an optional dataId which if supplied is then used to find a different DataStorage where the target data is located
_dataPath // a dataPath where the target data is located
_dataStorage // a DataStorage contract where the target data is located
_op // a valid comparison operator 
_value // a uint value to use as right-hand value to compare against the target data

```

#### Return

```json
boolean result of the comparison
```


---



### DefaultActiveAgreement Interface


The DefaultActiveAgreement Interface contract is found within the bin bundle.

#### addEventListener(bytes32)


**addEventListener(bytes32)**


Adds the msg.sender as listener for the specified event.

```endpoint
CALL addEventListener(bytes32)
```

#### Parameters

```solidity
_event // the event to subscribe to

```


---

#### addEventListener(bytes32,address)


**addEventListener(bytes32,address)**


Adds the specified listener to the specified event.

```endpoint
CALL addEventListener(bytes32,address)
```

#### Parameters

```solidity
_event // the event to subscribe to
_listener // the address of an EventListener

```


---

#### cancel()


**cancel()**


Registers the msg.sender as having canceled the agreement. During formation (legal states DRAFT and FORMULATED), the agreement can canceled unilaterally by one of the parties to the agreement. During execution (legal state EXECUTED), the agreement can only be canceled if all parties agree to do so by invoking this function. REVERTS if: - the caller could not be authorized (see AgreementsAPI.authorizePartyActor())

```endpoint
CALL cancel()
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope

```

#### Return

```json
fixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeDetailsForKey(bytes32)


**getAddressScopeDetailsForKey(bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetailsForKey(bytes32)
```

#### Parameters

```solidity
_key // a scope key

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeys()


**getAddressScopeKeys()**


Returns the list of keys identifying the address/context scopes.

```endpoint
CALL getAddressScopeKeys()
```

#### Return

```json
the bytes32 scope keys
```


---

#### getArchetype()


**getArchetype()**


Returns the archetype

```endpoint
CALL getArchetype()
```

#### Return

```json
the archetype address 
```


---

#### getArrayLength(bytes32)


**getArrayLength(bytes32)**


Overrides DataStorage.getArrayLength(bytes32). Returns the number of parties for special ID DATA_FIELD_AGREEMENT_PARTIES. Otherwise behaves identical to DataStorage.getArrayLength(bytes32).

```endpoint
CALL getArrayLength(bytes32)
```

#### Parameters

```solidity
_id // the ID of the data field

```

#### Return

```json
the size of the specified array
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getCreator()


**getCreator()**


Returns the creator

```endpoint
CALL getCreator()
```

#### Return

```json
the creator address
```


---

#### getDataValueAsAddressArray(bytes32)


**getDataValueAsAddressArray(bytes32)**


Overriden method of DataStorage to return the agreement parties for special ID DATA_FIELD_AGREEMENT_PARTIES.

```endpoint
CALL getDataValueAsAddressArray(bytes32)
```

#### Parameters

```solidity
_id // the bytes32 ID of an address array

```

#### Return

```json
the address array
```


---

#### getEventLogReference()


**getEventLogReference()**


Returns the reference for the event log of this ActiveAgreement

```endpoint
CALL getEventLogReference()
```

#### Return

```json
the reference to an external document containing the event log
```


---

#### getGoverningAgreementAtIndex(uint256)


**getGoverningAgreementAtIndex(uint256)**


Retrieves the address for the governing agreement at the specified index

```endpoint
CALL getGoverningAgreementAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
the address for the governing agreement
```


---

#### getLegalState()


**getLegalState()**


Returns the legal state of this agreement

```endpoint
CALL getLegalState()
```

#### Return

```json
the Agreements.LegalState as a uint
```


---

#### getMaxNumberOfEvents()


**getMaxNumberOfEvents()**


Returns the max number of events for the event log

```endpoint
CALL getMaxNumberOfEvents()
```

#### Return

```json
the max number of events for the event log
```


---

#### getNumberOfData()


**getNumberOfData()**


Returns the number of data fields in this DataStorage

```endpoint
CALL getNumberOfData()
```

#### Return

```json
uint the size
```


---

#### getNumberOfGoverningAgreements()


**getNumberOfGoverningAgreements()**


Returns the number governing agreements for this agreement

```endpoint
CALL getNumberOfGoverningAgreements()
```

#### Return

```json
the number of governing agreements
```


---

#### getNumberOfParties()


**getNumberOfParties()**


Gets number of parties

```endpoint
CALL getNumberOfParties()
```

#### Return

```json
size number of parties
```


---

#### getPartyAtIndex(uint256)


**getPartyAtIndex(uint256)**


Returns the party at the given index

```endpoint
CALL getPartyAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
the party's address or 0x0 if the index is out of bounds
```


---

#### getPrivateParametersReference()


**getPrivateParametersReference()**


Returns the reference to the private parameters of this ActiveAgreement

```endpoint
CALL getPrivateParametersReference()
```

#### Return

```json
the reference to an external document containing private parameters
```


---

#### getSignatureDetails(address)


**getSignatureDetails(address)**


Returns the signee and timestamp of the signature of the given party.

```endpoint
CALL getSignatureDetails(address)
```

#### Parameters

```solidity
_party // the signing party

```

#### Return

```json
the address of the signee (if the party authorized a signee other than itself)the time of signing or 0 if the address is not a party to this agreement or has not signed yet
```


---

#### getSignatureTimestamp(address)


**getSignatureTimestamp(address)**


Returns the timestamp of the signature of the given party.

```endpoint
CALL getSignatureTimestamp(address)
```

#### Parameters

```solidity
_party // the signing party

```

#### Return

```json
the time of signing or 0 if the address is not a party to this agreement or has not signed yet
```


---

#### getSignee(address)


**getSignee(address)**


Returns the signee of the signature of the given party.

```endpoint
CALL getSignee(address)
```

#### Parameters

```solidity
_party // the signing party

```

#### Return

```json
the address of the signee (if the party authorized a signee other than itself)
```


---

#### initialize(address,address,string,bool,address[],address[])


**initialize(address,address,string,bool,address[],address[])**


Initializes this ActiveAgreement with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(address,address,string,bool,address[],address[])
```

#### Parameters

```solidity
_archetype // archetype address
_creator // the account that created this agreement
_governingAgreements // array of agreement addresses which govern this agreement (optional)
_isPrivate // if agreement is private
_parties // the signing parties to the agreement
_privateParametersFileReference // the file reference to the private parameters (optional)

```


---

#### isPrivate()


**isPrivate()**


Returns the private flag

```endpoint
CALL isPrivate()
```

#### Return

```json
the private flag 
```


---

#### isSignedBy(address)


**isSignedBy(address)**


Returns whether the given account's signature is on the agreement.

```endpoint
CALL isSignedBy(address)
```

#### Parameters

```solidity
_signee // The account to check

```

#### Return

```json
true if the provided address is a recorded signature on the agreement, false otherwise
```


---

#### removeData(bytes32)


**removeData(bytes32)**


Removes the Data identified by the id from the DataMap, if it exists.

```endpoint
CALL removeData(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```


---

#### removeEventListener(bytes32)


**removeEventListener(bytes32)**


Removes the msg.sender from the list of listeners for the specified event.

```endpoint
CALL removeEventListener(bytes32)
```

#### Parameters

```solidity
_event // the event to unsubscribe from

```


---

#### removeEventListener(bytes32,address)


**removeEventListener(bytes32,address)**


Removes the specified listener from the list of listeners for the specified event.

```endpoint
CALL removeEventListener(bytes32,address)
```

#### Parameters

```solidity
_event // the event to unsubscribe from
_listener // the address of an EventListener

```


---

#### resolveAddressScope(address,bytes32,address)


**resolveAddressScope(address,bytes32,address)**


Returns the scope qualifier for the given address. If the scope depends on a ConditionalData, the function will attempt to resolve it using the provided DataStorage address. REVERTS if: - the scope is defined by a ConditionalData, but the DataStorage parameter is empty

```endpoint
CALL resolveAddressScope(address,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataStorage // a DataStorage contract to use as a basis if the scope is defined by a ConditionalData

```

#### Return

```json
the scope qualifier or an empty bytes32, if no qualifier is set or cannot be determined
```


---

#### setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)


**setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)**


Associates the given address with a scope qualifier for a given context. The context can be used to bind the same address to different scenarios and different scopes. The scope can either be represented by a fixed bytes32 value of by a ConditionalData that resolves to a bytes32 field. REVERTS if: - the given address is empty - neither the scope nor valid ConditionalData parameters are provided

```endpoint
CALL setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataPath // the dataPath of a ConditionalData defining the scope
_dataStorage // the dataStorgage address of a ConditionalData defining the scope
_dataStorageId // the dataStorageId of a ConditionalData defining the scope
_fixedScope // a bytes32 representing a fixed scope

```


---

#### setEventLogReference(string)


**setEventLogReference(string)**


Updates the file reference for the event log of this agreement

```endpoint
CALL setEventLogReference(string)
```

#### Parameters

```solidity
_eventLogFileReference // the file reference to the event log

```


---

#### setFulfilled()


**setFulfilled()**


Sets the legal state of this agreement to Agreements.LegalState.FULFILLED. Note: All other legal states are set by internal logic.

```endpoint
CALL setFulfilled()
```


---

#### setMaxNumberOfEvents(uint32)


**setMaxNumberOfEvents(uint32)**


Sets the max number of events for this agreement

```endpoint
CALL setMaxNumberOfEvents(uint32)
```


---

#### sign()


**sign()**


Applies the msg.sender or tx.origin as a signature to this agreement, if it can be authorized as a valid signee. The timestamp of an already existing signature is not overwritten in case the agreement is signed again! REVERTS if: - the caller could not be authorized (see AgreementsAPI.authorizePartyActor())

```endpoint
CALL sign()
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

### DefaultActiveAgreementRegistry Interface


The DefaultActiveAgreementRegistry Interface contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### addAgreementToCollection(bytes32,address)


**addAgreementToCollection(bytes32,address)**


Adds an agreement to given collection REVERTS if: - the ArchetypeRegistry dependency cannot be found via the ArtifactsFinder - a collection with the given ID is not found - the agreement's archetype is part of the collection's package

```endpoint
CALL addAgreementToCollection(bytes32,address)
```

#### Parameters

```solidity
_agreement // agreement address
_collectionId // the bytes32 collection id

```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createAgreement(address,address,string,bool,address[],bytes32,address[])


**createAgreement(address,address,string,bool,address[],bytes32,address[])**


Creates an Active Agreement with the given parameters

```endpoint
CALL createAgreement(address,address,string,bool,address[],bytes32,address[])
```

#### Parameters

```solidity
_archetype // archetype
_collectionId // id of agreement collection (optional)
_creator // address
_governingAgreements // array of agreement addresses which govern this agreement (optional)
_isPrivate // agreement is private
_parties // parties array
_privateParametersFileReference // the file reference of the private parametes of this agreement

```

#### Return

```json
activeAgreement - the new ActiveAgreement's address, if successfully created, 0x0 otherwise Reverts if:	Archetype address is empty	Duplicate governing agreements are passed	Agreement address is already registered	Given collectionId does not exist
```


---

#### createAgreementCollection(address,uint8,bytes32)


**createAgreementCollection(address,uint8,bytes32)**


Creates a new agreement collection

```endpoint
CALL createAgreementCollection(address,uint8,bytes32)
```

#### Parameters

```solidity
_author // address of the author
_collectionType // the Agreements.CollectionType
_packageId // the ID of an archetype package

```

#### Return

```json
error BaseErrors.NO_ERROR(), BaseErrors.NULL_PARAM_NOT_ALLOWED(), BaseErrors.RESOURCE_ALREADY_EXISTS()id bytes32 id of package
```


---

#### eventFired(bytes32,address)


**eventFired(bytes32,address)**


Overwrites AbstractEventListener function to receive state updates from ActiveAgreements that are registered in this registry. Currently supports AGREEMENT_STATE_CHANGED

```endpoint
CALL eventFired(bytes32,address)
```


---

#### eventFired(bytes32,address,address)


**eventFired(bytes32,address,address)**


See EventListener.eventFired(bytes32,address,address)

```endpoint
CALL eventFired(bytes32,address,address)
```


---

#### eventFired(bytes32,address,bytes32)


**eventFired(bytes32,address,bytes32)**


See EventListener.eventFired(bytes32,address,bytes32)

```endpoint
CALL eventFired(bytes32,address,bytes32)
```


---

#### eventFired(bytes32,address,bytes32,address)


**eventFired(bytes32,address,bytes32,address)**


See EventListener.eventFired(bytes32,address,bytes32,address)

```endpoint
CALL eventFired(bytes32,address,bytes32,address)
```


---

#### eventFired(bytes32,address,string)


**eventFired(bytes32,address,string)**


See EventListener.eventFired(bytes32,address,string)

```endpoint
CALL eventFired(bytes32,address,string)
```


---

#### eventFired(bytes32,address,uint256)


**eventFired(bytes32,address,uint256)**


See EventListener.eventFired(bytes32,address,uint)

```endpoint
CALL eventFired(bytes32,address,uint256)
```


---

#### getActiveAgreementAtIndex(uint256)


**getActiveAgreementAtIndex(uint256)**


Gets the ActiveAgreement address at given index

```endpoint
CALL getActiveAgreementAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
the Active Agreement address
```


---

#### getActiveAgreementData(address)


**getActiveAgreementData(address)**


Returns data about the ActiveAgreement at the specified address, if it is an agreement known to this registry.

```endpoint
CALL getActiveAgreementData(address)
```

#### Parameters

```solidity
_activeAgreement // Active Agreement

```

#### Return

```json
archetype - the agreement's archetype adresscreator - the creator of the agreementprivateParametersFileReference - the file reference to the private agreement parameters (only used when agreement is private)eventLogFileReference - the file reference to the agreement's event logmaxNumberOfEvents - the maximum number of events allowed to be stored for this agreementisPrivate - whether there are private agreement parameters, i.e. stored off-chainlegalState - the agreement's Agreement.LegalState as uint8formationProcessInstance - the address of the process instance representing the formation of this agreementexecutionProcessInstance - the address of the process instance representing the execution of this agreement
```


---

#### getActiveAgreementsSize()


**getActiveAgreementsSize()**


Gets number of activeAgreements

```endpoint
CALL getActiveAgreementsSize()
```

#### Return

```json
size size
```


---

#### getAgreementAtIndexInCollection(bytes32,uint256)


**getAgreementAtIndexInCollection(bytes32,uint256)**


Gets agreement address at index in colelction

```endpoint
CALL getAgreementAtIndexInCollection(bytes32,uint256)
```

#### Parameters

```solidity
_id // id of the collection
_index // uint index

```

#### Return

```json
agreement address of archetype
```


---

#### getAgreementCollectionAtIndex(uint256)


**getAgreementCollectionAtIndex(uint256)**


Gets collection id at index

```endpoint
CALL getAgreementCollectionAtIndex(uint256)
```

#### Parameters

```solidity
_index // uint index

```

#### Return

```json
id bytes32 id
```


---

#### getAgreementCollectionData(bytes32)


**getAgreementCollectionData(bytes32)**


Gets collection data by id

```endpoint
CALL getAgreementCollectionData(bytes32)
```

#### Parameters

```solidity
_id // bytes32 collection id

```

#### Return

```json
author addresscollectionType type of collectionpackageId id of the archetype package
```


---

#### getAgreementParameterAtIndex(address,uint256)


**getAgreementParameterAtIndex(address,uint256)**


Returns the ID of the agreement parameter value at the given index.

```endpoint
CALL getAgreementParameterAtIndex(address,uint256)
```

#### Parameters

```solidity
_pos // the index

```

#### Return

```json
the parameter ID
```


---

#### getAgreementParameterDetails(address,bytes32)


**getAgreementParameterDetails(address,bytes32)**


Returns information about the process data entry for the specified process and data ID

```endpoint
CALL getAgreementParameterDetails(address,bytes32)
```

#### Parameters

```solidity
_address // the active agreement
_dataId // the parameter ID

```

#### Return

```json
(process,id,uintValue,bytes32Value,addressValue,boolValue)
```


---

#### getArchetypeRegistry()


**getArchetypeRegistry()**


Returns the ArchetypeRegistry address

```endpoint
CALL getArchetypeRegistry()
```

#### Return

```json
address the ArchetypeRegistry
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getBpmService()


**getBpmService()**


Returns the BpmService address

```endpoint
CALL getBpmService()
```

#### Return

```json
address the BpmService
```


---

#### getGoverningAgreementAtIndex(address,uint256)


**getGoverningAgreementAtIndex(address,uint256)**


Retrieves the address for the governing agreement at the specified index

```endpoint
CALL getGoverningAgreementAtIndex(address,uint256)
```

#### Parameters

```solidity
_agreement // the address of the agreement
_index // the index position

```

#### Return

```json
the address for the governing agreement
```


---

#### getNumberOfAgreementCollections()


**getNumberOfAgreementCollections()**


Gets number of agreement collections

```endpoint
CALL getNumberOfAgreementCollections()
```

#### Return

```json
size size
```


---

#### getNumberOfAgreementParameters(address)


**getNumberOfAgreementParameters(address)**


Returns the number of agreement parameter values.

```endpoint
CALL getNumberOfAgreementParameters(address)
```

#### Return

```json
the number of parameters
```


---

#### getNumberOfAgreementsInCollection(bytes32)


**getNumberOfAgreementsInCollection(bytes32)**


Gets number of agreements in given collection

```endpoint
CALL getNumberOfAgreementsInCollection(bytes32)
```

#### Parameters

```solidity
_id // id of the collection

```

#### Return

```json
size agreement count
```


---

#### getNumberOfGoverningAgreements(address)


**getNumberOfGoverningAgreements(address)**


Returns the number governing agreements for given agreement

```endpoint
CALL getNumberOfGoverningAgreements(address)
```

#### Return

```json
the number of governing agreements
```


---

#### getPartiesByActiveAgreementSize(address)


**getPartiesByActiveAgreementSize(address)**


Gets parties size for given Active Agreement

```endpoint
CALL getPartiesByActiveAgreementSize(address)
```

#### Parameters

```solidity
_activeAgreement // Active Agreement

```

#### Return

```json
the number of parties
```


---

#### getPartyByActiveAgreementAtIndex(address,uint256)


**getPartyByActiveAgreementAtIndex(address,uint256)**


Gets getPartyByActiveAgreementAtIndex

```endpoint
CALL getPartyByActiveAgreementAtIndex(address,uint256)
```

#### Parameters

```solidity
_activeAgreement // Active Agreement
_index // index

```

#### Return

```json
the party address or 0x0 if the index is out of bounds
```


---

#### getPartyByActiveAgreementData(address,address)


**getPartyByActiveAgreementData(address,address)**


Returns data about the given party's signature on the specified agreement.

```endpoint
CALL getPartyByActiveAgreementData(address,address)
```

#### Parameters

```solidity
_activeAgreement // the ActiveAgreement
_party // the signing party

```

#### Return

```json
signedBy the actual signature authorized by the partysignatureTimestamp the timestamp when the party has signed, or 0 if not signed yet
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### processStateChanged(address)


**processStateChanged(address)**

```endpoint
CALL processStateChanged(address)
```

#### Parameters

```solidity
_processInstance // the process instance whose state has changed

```


---

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### setEventLogReference(address,string)


**setEventLogReference(address,string)**


Updates the file reference for the event log of the specified agreement

```endpoint
CALL setEventLogReference(address,string)
```

#### Parameters

```solidity
_activeAgreement // Address of active agreement
_eventLogFileReference // the file reference of the event log of this agreement

```


---

#### setMaxNumberOfEvents(address,uint32)


**setMaxNumberOfEvents(address,uint32)**


Sets the max number of events for this agreement

```endpoint
CALL setMaxNumberOfEvents(address,uint32)
```


---

#### startProcessLifecycle(address)


**startProcessLifecycle(address)**


Creates and starts a ProcessInstance to handle the workflows as defined by the given agreement's archetype. Depending on the configuration in the archetype, the returned address can be either a formation process or an execution process. An execution process will only be started if *no* formation process is defined for the archetype. Otherwise, the execution process will automatically start after the formation process (see #processStateChanged(ProcessInstance)) REVERTS if: - the provided ActiveAgreement is a 0x0 address - a formation process should be started, but the legal state of the agreement is not FORMULATED - a formation process should be started, but there is already an ongoing formation ProcessInstance registered for this agreement - an execution process should be started, but the legal state of the agreement is not EXECUTED - an execution process should be started, but there is already an ongoing execution ProcessInstance registered for this agreement

```endpoint
CALL startProcessLifecycle(address)
```

#### Parameters

```solidity
_agreement // an ActiveAgreement

```

#### Return

```json
error - BaseErrors.NO_ERROR() if a ProcessInstance was started successfully, or a different error code if there were problems in the processthe address of a ProcessInstance, if successful
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferAddressScopes(address)


**transferAddressScopes(address)**


Sets address scopes on the given ProcessInstance based on the scopes defined in the ActiveAgreement referenced in the ProcessInstance. Address scopes relying on a ConditionalData configuration are translated, so they work from the POV of the ProcessInstance. This function ensures that any scopes (roles) set for user/organization addresses on the agreement are available and adhered to in the process in the context of activities. Each scope on the agreement is examined whether its data field context is connected to a model participant (swimlane) in the ProcessDefinition/ProcessModel that guides the ProcessInstance. If a match is found, the activity definitions in the ProcessInstance that are connected (assigned) to the participant are used as contexts to set up address scopes on the ProcessInstance. This function performs a crucial translation of role restrictions specified on the agreement to make sure the same qualifications are available when performing user tasks using organizational scopes (departments). Example (address + context = scope): Address scope on the agreement using a data field context: 0x94EcB18404251B0C8E88B0D8fbde7145c72AEC22 + "Buyer" = "LogisticsDepartment" Address scope on the ProcessInstance using an activity context: 0x94EcB18404251B0C8E88B0D8fbde7145c72AEC22 + "ApproveOrder" = "LogisticsDepartment" REVERTS if: - the ProcessInstance is not in state CREATED - the provided ProcessInstance does not have an ActiveAgreement set under DATA_ID_AGREEMENT

```endpoint
CALL transferAddressScopes(address)
```

#### Parameters

```solidity
_processInstance // the ProcessInstance being configured

```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### ApplicationRegistry


The ApplicationRegistry contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### addAccessPoint(bytes32,bytes32,uint8,uint8)


**addAccessPoint(bytes32,bytes32,uint8,uint8)**


Creates an data access point for the given application

```endpoint
CALL addAccessPoint(bytes32,bytes32,uint8,uint8)
```

#### Parameters

```solidity
_accessPointId // the ID of the new access point
_dataType // a DataTypes code
_direction // the BpmModel.Direction (IN/OUT) of the data flow
_id // the ID of the application to which to add the access point

```

#### Return

```json
BaseErrors.RESOURCE_NOT_FOUND() if the application does not exist
BaseBaseErrors.RESOUCE_ALREADY_EXISTS() if the access point already exists
BaseBaseErrors.NO_ERROR() if no errors
```


---

#### addApplication(bytes32,uint8,address,bytes4,bytes32)


**addApplication(bytes32,uint8,address,bytes4,bytes32)**


Adds a Service application with the given parameters to this ApplicationRegistry

```endpoint
CALL addApplication(bytes32,uint8,address,bytes4,bytes32)
```

#### Parameters

```solidity
_function // the signature of the completion function
_id // the ID of the application
_location // the location of the contract implementing the application
_type // the BpmModel.ApplicationType
_webForm // the hash of a web form (only for web applications)

```

#### Return

```json
BaseErrors.RESOURCE_ALREADY_EXISTS() if an application with the given ID already exists, BaseErrors.NO_ERROR() otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getAccessPointAtIndex(bytes32,uint256)


**getAccessPointAtIndex(bytes32,uint256)**


Returns the ID of the access point at the given index

```endpoint
CALL getAccessPointAtIndex(bytes32,uint256)
```

#### Parameters

```solidity
_id // the application id
_index // the index position of the access point

```

#### Return

```json
the access point id if it exists
```


---

#### getAccessPointData(bytes32,bytes32)


**getAccessPointData(bytes32,bytes32)**


Returns information about the access point with the given ID

```endpoint
CALL getAccessPointData(bytes32,bytes32)
```

#### Parameters

```solidity
_accessPointId // the access point ID
_id // the application ID

```

#### Return

```json
dataType the data typedirection the direction
```


---

#### getApplicationAtIndex(uint256)


**getApplicationAtIndex(uint256)**


Returns the ID of the application at the given index

```endpoint
CALL getApplicationAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the application ID, if it exists
```


---

#### getApplicationData(bytes32)


**getApplicationData(bytes32)**


Returns information about the application with the given ID

```endpoint
CALL getApplicationData(bytes32)
```

#### Parameters

```solidity
_id // the application ID

```

#### Return

```json
applicationType the BpmModel.ApplicationType as uint8location the applications contract addressmethod the function signature of the application's completion functionwebForm the form identifier (hash) of the web application (only for a web application)accessPointCount the count of access points of this application
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getNumberOfAccessPoints(bytes32)


**getNumberOfAccessPoints(bytes32)**


Returns the number of application access points for given application

```endpoint
CALL getNumberOfAccessPoints(bytes32)
```

#### Parameters

```solidity
_id // the id of the application

```

#### Return

```json
the number of access points for the application
```


---

#### getNumberOfApplications()


**getNumberOfApplications()**


Returns the number of applications defined in this ProcessModel

```endpoint
CALL getNumberOfApplications()
```

#### Return

```json
the number of applications
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### DefaultArchetype


The DefaultArchetype contract is found within the bin bundle.

#### activate()


**activate()**


Activates this archetype

```endpoint
CALL activate()
```


---

#### addDocument(string)


**addDocument(string)**


Adds the document specified by the external reference to the archetype under the given name REVERTS if: - a document with the same file reference already exists

```endpoint
CALL addDocument(string)
```

#### Parameters

```solidity
_fileReference // the external reference to the document

```


---

#### addJurisdiction(bytes2,bytes32)


**addJurisdiction(bytes2,bytes32)**


Adds the given jurisdiction in the form of a country code and region identifier to this archetype. References codes defined via IsoCountries interface implementations. If the region is empty, the jurisdiction will only reference the country and the regions will be emptied, i.e. any prior regions for that country will be removed. REVERTS if: - the provided country is empty

```endpoint
CALL addJurisdiction(bytes2,bytes32)
```

#### Parameters

```solidity
_country // a ISO-code, e.g. 'US'
_region // a region identifier from a IsoCountries contract

```

#### Return

```json
BaseErrors.NO_ERROR() if successful, and key of jurisdiction was added
```


---

#### addParameter(uint8,bytes32)


**addParameter(uint8,bytes32)**


Adds a parameter to the Archetype

```endpoint
CALL addParameter(uint8,bytes32)
```

#### Parameters

```solidity
_parameterName // the parameter name
_parameterType // the DataTypes.ParameterType

```

#### Return

```json
BaseErrors.NO_ERROR() and position of parameter, if successful,BaseErrors.NULL_PARAM_NOT_ALLOWED() if _parameter is empty,BaseErrors.RESOURCE_ALREADY_EXISTS() if _parameter already exists
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### deactivate()


**deactivate()**


Deactivates this archetype

```endpoint
CALL deactivate()
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getAuthor()


**getAuthor()**


Gets Author

```endpoint
CALL getAuthor()
```

#### Return

```json
author author
```


---

#### getDocument(bytes32)


**getDocument(bytes32)**


Gets document reference with given key REVERTS if: - a document with the provided key does not exist

```endpoint
CALL getDocument(bytes32)
```

#### Parameters

```solidity
_key // the document key

```

#### Return

```json
fileReference - the reference to the external document
```


---

#### getDocumentKeyAtIndex(uint256)


**getDocumentKeyAtIndex(uint256)**


Returns the document key at the given index REVERTS if: - the given index is out of bounds

```endpoint
CALL getDocumentKeyAtIndex(uint256)
```

#### Parameters

```solidity
_index // index

```

#### Return

```json
key - the document key
```


---

#### getExecutionProcessDefinition()


**getExecutionProcessDefinition()**


Returns the address of the ProcessDefinition that orchestrates the agreement execution.

```endpoint
CALL getExecutionProcessDefinition()
```

#### Return

```json
the address of a ProcessDefinition
```


---

#### getFormationProcessDefinition()


**getFormationProcessDefinition()**


Returns the address of the ProcessDefinition that orchestrates the agreement formation.

```endpoint
CALL getFormationProcessDefinition()
```

#### Return

```json
the address of a ProcessDefinition
```


---

#### getGoverningArchetypeAtIndex(uint256)


**getGoverningArchetypeAtIndex(uint256)**


Retrieves the address for the governing archetype at the specified index

```endpoint
CALL getGoverningArchetypeAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
the address for the governing archetype
```


---

#### getGoverningArchetypes()


**getGoverningArchetypes()**


Returns all governing archetype address for this archetype

```endpoint
CALL getGoverningArchetypes()
```

#### Return

```json
the address array containing all governing archetypes
```


---

#### getJurisdictionAtIndex(uint256)


**getJurisdictionAtIndex(uint256)**


Retrieves the key for the jurisdiction at the specified index

```endpoint
CALL getJurisdictionAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS() if index is out of boundsthe key of the jurisdiction or an empty bytes32 if the index was out of bounds
```


---

#### getJurisdictionData(bytes32)


**getJurisdictionData(bytes32)**


Returns information about the jurisdiction with the specified key

```endpoint
CALL getJurisdictionData(bytes32)
```

#### Parameters

```solidity
_key // the key identifying the jurisdiction

```

#### Return

```json
the country and region identifiers (see IsoCountries), if the jurisdiction exists
```


---

#### getNumberOfDocuments()


**getNumberOfDocuments()**


Gets number of documents

```endpoint
CALL getNumberOfDocuments()
```

#### Return

```json
size number of documents
```


---

#### getNumberOfGoverningArchetypes()


**getNumberOfGoverningArchetypes()**


Returns the number governing archetypes for this archetype

```endpoint
CALL getNumberOfGoverningArchetypes()
```

#### Return

```json
the number of governing archetypes
```


---

#### getNumberOfJurisdictions()


**getNumberOfJurisdictions()**


Returns the number jurisdictions for this archetype

```endpoint
CALL getNumberOfJurisdictions()
```

#### Return

```json
the number of jurisdictions
```


---

#### getNumberOfParameters()


**getNumberOfParameters()**


Gets number of parameters

```endpoint
CALL getNumberOfParameters()
```

#### Return

```json
size number of parameters
```


---

#### getParameterAtIndex(uint256)


**getParameterAtIndex(uint256)**


Gets parameter at index

```endpoint
CALL getParameterAtIndex(uint256)
```

#### Parameters

```solidity
_index // index

```

#### Return

```json
parameter parameter
```


---

#### getParameterDetails(bytes32)


**getParameterDetails(bytes32)**


Gets parameter data type

```endpoint
CALL getParameterDetails(bytes32)
```

#### Parameters

```solidity
_parameter // parameter

```

#### Return

```json
error error TBDposition index of parameterparameterType parameter type
```


---

#### getPrice()


**getPrice()**


Gets price

```endpoint
CALL getPrice()
```

#### Return

```json
price
```


---

#### getSuccessor()


**getSuccessor()**


Returns the successor of this archetype

```endpoint
CALL getSuccessor()
```

#### Return

```json
address of successor archetype
```


---

#### initialize(uint256,bool,bool,address,address,address,address[])


**initialize(uint256,bool,bool,address,address,address,address[])**


Initializes this ActiveAgreement with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(uint256,bool,bool,address,address,address,address[])
```

#### Parameters

```solidity
_active // determines if this archetype is active
_author // author
_executionProcess // the address of a ProcessDefinition that orchestrates the agreement execution
_formationProcess // the address of a ProcessDefinition that orchestrates the agreement formation
_governingArchetypes // array of governing archetype addresses (optional)
_isPrivate // determines if this archetype's documents are encrypted

```


---

#### isActive()


**isActive()**


Returns the active state

```endpoint
CALL isActive()
```

#### Return

```json
true if active, false otherwise
```


---

#### isPrivate()


**isPrivate()**


Returns the private state

```endpoint
CALL isPrivate()
```

#### Return

```json
true if private, false otherwise
```


---

#### setPrice(uint256)


**setPrice(uint256)**


Sets price

```endpoint
CALL setPrice(uint256)
```

#### Parameters

```solidity
_price // price of archetype

```


---

#### setSuccessor(address)


**setSuccessor(address)**


Sets the successor this archetype. Setting a successor automatically deactivates this archetype. Fails if given successor is the same address as itself.  Fails if intended action will lead to two archetypes with their successors pointing to each other.

```endpoint
CALL setSuccessor(address)
```

#### Parameters

```solidity
_successor // address of successor archetype

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

### DefaultArchetypeRegistry


The DefaultArchetypeRegistry contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### activate(address,address)


**activate(address,address)**


Sets active to true for given archetype

```endpoint
CALL activate(address,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_author // address of author (must match the author of the archetype in order to activate)

```


---

#### activatePackage(bytes32,address)


**activatePackage(bytes32,address)**


Sets active to true for given archetype package

```endpoint
CALL activatePackage(bytes32,address)
```

#### Parameters

```solidity
_author // address of author (must match the author of the archetype package in order to activate)
_id // bytes32 id of archetype package

```


---

#### addArchetypeToPackage(bytes32,address)


**addArchetypeToPackage(bytes32,address)**


Adds archetype to package

```endpoint
CALL addArchetypeToPackage(bytes32,address)
```

#### Parameters

```solidity
_archetype // the archetype address Reverts if package is not found
_packageId // the bytes32 package id

```


---

#### addDocument(address,string)


**addDocument(address,string)**


Adds a file reference to the given Archetype REVERTS if: - the given archetype is not registered in this ArchetypeRegistry

```endpoint
CALL addDocument(address,string)
```

#### Parameters

```solidity
_archetype // archetype
_fileReference // the external reference to the document

```


---

#### addJurisdiction(address,bytes2,bytes32)


**addJurisdiction(address,bytes2,bytes32)**


Adds the given jurisdiction in the form of a country code and region identifier to this archetype. References codes defined via IsoCountries interface implementations.

```endpoint
CALL addJurisdiction(address,bytes2,bytes32)
```

#### Parameters

```solidity
_country // a ISO-3166-1 code, e.g. 'US'
_region // a region identifier from a IsoCountries contract

```

#### Return

```json
BaseErrors.NO_ERROR() if succesfulBaseErrors.RESOURCE_NOT_FOUND() if archetype is not foundany error returned from the Archetype.addJurisdiction() function
```


---

#### addJurisdictions(address,bytes2[],bytes32[])


**addJurisdictions(address,bytes2[],bytes32[])**


Adds the given jurisdictions in the form of a country codes and region identifiers to this archetype. References codes defined via IsoCountries interface implementations.

```endpoint
CALL addJurisdictions(address,bytes2[],bytes32[])
```

#### Parameters

```solidity
_countries // an array of a ISO-3166-1 code, e.g. 'US'
_regions // an array of region identifiers from a IsoCountries contract

```

#### Return

```json
BaseErrors.NO_ERROR() if succesfulBaseErrors.RESOURCE_NOT_FOUND() if archetype is not foundBaseErrors.INVALID_PARAM_STATE() if the lengths of the two arrays don't match
```


---

#### addParameter(address,uint8,bytes32)


**addParameter(address,uint8,bytes32)**


Adds parameter to archetype

```endpoint
CALL addParameter(address,uint8,bytes32)
```

#### Parameters

```solidity
_archetype // the archetype address
_parameterName // the parameter name
_parameterType // data type (enum)

```

#### Return

```json
BaseErrors.NO_ERROR() if successfulBaseErrors.RESOURCE_NOT_FOUND() if archetype is not foundany error returned from the Archetype.addParameter() function
```


---

#### addParameters(address,uint8[],bytes32[])


**addParameters(address,uint8[],bytes32[])**


Adds the specified parameters to the archetype. If one of the parameters cannot be added, the operation aborts and returns that error code.

```endpoint
CALL addParameters(address,uint8[],bytes32[])
```

#### Parameters

```solidity
_archetype // the archetype address
_parameterNames // the parameter names
_parameterTypes // the parameter types

```

#### Return

```json
BaseErrors.NO_ERROR() if succesfulBaseErrors.RESOURCE_NOT_FOUND() if archetype is not foundBaseErrors.INVALID_PARAM_STATE() if the lengths of the two arrays don't match
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createArchetype(uint256,bool,bool,address,address,address,bytes32,address[])


**createArchetype(uint256,bool,bool,address,address,address,bytes32,address[])**


Creates a new archetype

```endpoint
CALL createArchetype(uint256,bool,bool,address,address,address,bytes32,address[])
```

#### Parameters

```solidity
_active // determines if this archetype is active
_author // author
_executionProcess // the address of a ProcessDefinition that orchestrates the agreement execution
_formationProcess // the address of a ProcessDefinition that orchestrates the agreement formation
_governingArchetypes // array of archetype addresses which govern this archetype (optional)
_isPrivate // determines if the archetype's documents are encrypted
_packageId // id of package this archetype is part of (optional)
_price // price

```

#### Return

```json
archetype - the new archetype's address, if successfully created Reverts if archetype address is already registered
```


---

#### createArchetypePackage(address,bool,bool)


**createArchetypePackage(address,bool,bool)**


Adds a new archetype package

```endpoint
CALL createArchetypePackage(address,bool,bool)
```

#### Parameters

```solidity
_active // makes it a inactive package
_author // address of author (user account of organization)
_isPrivate // makes it a private package visible to only the author

```

#### Return

```json
error BaseErrors.NO_ERROR(), BaseErrors.NULL_PARAM_NOT_ALLOWED(), BaseErrors.RESOURCE_ALREADY_EXISTS()id bytes32 id of package
```


---

#### deactivate(address,address)


**deactivate(address,address)**


Sets active to false for given archetype

```endpoint
CALL deactivate(address,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_author // address of author (must match the author of the archetype in order to deactivate)

```


---

#### deactivatePackage(bytes32,address)


**deactivatePackage(bytes32,address)**


Sets active to false for given archetype package

```endpoint
CALL deactivatePackage(bytes32,address)
```

#### Parameters

```solidity
_author // address of author (must match the author of the archetype package in order to deactivate)
_id // bytes32 id of archetype package

```


---

#### getArchetypeAtIndex(uint256)


**getArchetypeAtIndex(uint256)**


Gets archetype address at given index

```endpoint
CALL getArchetypeAtIndex(uint256)
```

#### Parameters

```solidity
_index // index

```

#### Return

```json
archetype archetype
```


---

#### getArchetypeAtIndexInPackage(bytes32,uint256)


**getArchetypeAtIndexInPackage(bytes32,uint256)**


Gets archetype address at index in package

```endpoint
CALL getArchetypeAtIndexInPackage(bytes32,uint256)
```

#### Parameters

```solidity
_id // id of the package
_index // uint index

```

#### Return

```json
archetype address of archetype
```


---

#### getArchetypeData(address)


**getArchetypeData(address)**


Returns data about an archetype

```endpoint
CALL getArchetypeData(address)
```

#### Parameters

```solidity
_archetype // the archetype address

```

#### Return

```json
price priceauthor author addressactive boolisPrivate boolsuccessor addressformationProcessDefinitionexecutionProcessDefinition
```


---

#### getArchetypePackageAtIndex(uint256)


**getArchetypePackageAtIndex(uint256)**


Gets package id at index

```endpoint
CALL getArchetypePackageAtIndex(uint256)
```

#### Parameters

```solidity
_index // uint index

```

#### Return

```json
id bytes32 id
```


---

#### getArchetypePackageData(bytes32)


**getArchetypePackageData(bytes32)**


Gets package data by id

```endpoint
CALL getArchetypePackageData(bytes32)
```

#### Parameters

```solidity
_id // bytes32 package id

```

#### Return

```json
author addressisPrivate boolactive bool
```


---

#### getArchetypeSuccessor(address)


**getArchetypeSuccessor(address)**


Returns archetype successor

```endpoint
CALL getArchetypeSuccessor(address)
```

#### Parameters

```solidity
_archetype // address of archetype

```

#### Return

```json
address address of successor
```


---

#### getArchetypesSize()


**getArchetypesSize()**


Gets number of archetypes

```endpoint
CALL getArchetypesSize()
```

#### Return

```json
size size
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getGoverningArchetypeAtIndex(address,uint256)


**getGoverningArchetypeAtIndex(address,uint256)**


Retrieves the address of governing archetype at the specified index

```endpoint
CALL getGoverningArchetypeAtIndex(address,uint256)
```

#### Parameters

```solidity
_archetype // the address of the archetype
_index // the index position of its governing archetype

```

#### Return

```json
the address for the governing archetype
```


---

#### getJurisdictionAtIndexForArchetype(address,uint256)


**getJurisdictionAtIndexForArchetype(address,uint256)**


Returns the jurisdiction key at the specified index for the given archetype

```endpoint
CALL getJurisdictionAtIndexForArchetype(address,uint256)
```

#### Parameters

```solidity
_archetype // archetype address
_index // the index of the jurisdiction

```

#### Return

```json
the jurisdiction primary key
```


---

#### getJurisdictionDataForArchetype(address,bytes32)


**getJurisdictionDataForArchetype(address,bytes32)**


Returns data about the jurisdiction with the specified key in the given archetype

```endpoint
CALL getJurisdictionDataForArchetype(address,bytes32)
```

#### Parameters

```solidity
_archetype // archetype address
_key // the jurisdiction key

```

#### Return

```json
country the jurisdiction's countryregion the jurisdiction's region
```


---

#### getNumberOfArchetypePackages()


**getNumberOfArchetypePackages()**


Gets number of archetype packages

```endpoint
CALL getNumberOfArchetypePackages()
```

#### Return

```json
size size
```


---

#### getNumberOfArchetypesInPackage(bytes32)


**getNumberOfArchetypesInPackage(bytes32)**


Gets number of archetypes in given package

```endpoint
CALL getNumberOfArchetypesInPackage(bytes32)
```

#### Parameters

```solidity
_id // id of the package

```

#### Return

```json
size archetype count
```


---

#### getNumberOfGoverningArchetypes(address)


**getNumberOfGoverningArchetypes(address)**


Returns the number governing archetypes for the given archetype

```endpoint
CALL getNumberOfGoverningArchetypes(address)
```

#### Parameters

```solidity
_archetype // address of the archetype

```

#### Return

```json
the number of governing archetypes
```


---

#### getNumberOfJurisdictionsForArchetype(address)


**getNumberOfJurisdictionsForArchetype(address)**


Returns the number of jurisdictions for the given Archetype

```endpoint
CALL getNumberOfJurisdictionsForArchetype(address)
```

#### Parameters

```solidity
_archetype // archetype address

```

#### Return

```json
the number of jurisdictions
```


---

#### getParameterByArchetypeAtIndex(address,uint256)


**getParameterByArchetypeAtIndex(address,uint256)**


Gets parameter name by Archetype At index

```endpoint
CALL getParameterByArchetypeAtIndex(address,uint256)
```

#### Parameters

```solidity
_archetype // archetype
_index // index

```

#### Return

```json
name name
```


---

#### getParameterByArchetypeData(address,bytes32)


**getParameterByArchetypeData(address,bytes32)**


Returns data about the parameter at with the specified name

```endpoint
CALL getParameterByArchetypeData(address,bytes32)
```

#### Parameters

```solidity
_archetype // archetype
_name // name

```

#### Return

```json
position index of parameterparameterType parameter type
```


---

#### getParametersByArchetypeSize(address)


**getParametersByArchetypeSize(address)**


Gets parameter count for given Archetype

```endpoint
CALL getParametersByArchetypeSize(address)
```

#### Parameters

```solidity
_archetype // archetype

```

#### Return

```json
size size
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### packageHasArchetype(bytes32,address)


**packageHasArchetype(bytes32,address)**


Determines whether given archetype address is in the package identified by the packageId

```endpoint
CALL packageHasArchetype(bytes32,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_packageId // id of the package

```

#### Return

```json
hasArchetype bool representing if archetype is in package
```


---

#### setArchetypePrice(address,uint256)


**setArchetypePrice(address,uint256)**


Sets price of given archetype

```endpoint
CALL setArchetypePrice(address,uint256)
```

#### Parameters

```solidity
_archetype // archetype
_price // price

```


---

#### setArchetypeSuccessor(address,address,address)


**setArchetypeSuccessor(address,address,address)**


Sets archetype successor

```endpoint
CALL setArchetypeSuccessor(address,address,address)
```

#### Parameters

```solidity
_archetype // address of archetype
_author // address of author (must match the author of the archetype in order to set successor)
_successor // address of successor

```


---

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### DefaultArtifactRegistry


The DefaultArtifactRegistry contract is found within the bin bundle.

#### getArtifact(string)


**getArtifact(string)**


Implements ArtifactsFinder.getArtifact(string)

```endpoint
CALL getArtifact(string)
```


---

#### getArtifactByVersion(string,uint8[3])


**getArtifactByVersion(string,uint8[3])**


Implements ArtifactsFinder.getArtifactByVersion(string,uint8[3])

```endpoint
CALL getArtifactByVersion(string,uint8[3])
```


---

#### getNumberOfArtifacts()


**getNumberOfArtifacts()**


Returns the number of artifacts registered in this ArtifactsRegistry irrespective of how many version of an artifact exist.

```endpoint
CALL getNumberOfArtifacts()
```

#### Return

```json
the number of unique artifact IDs
```


---

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### initialize()


**initialize()**


Initializes this DefaultArtifactsRegistry by setting the systemOwner to the msg.sender This function replaces the constructor as a means to set storage variables. REVERTS if: - the contract had already been initialized before

```endpoint
CALL initialize()
```


---

#### registerArtifact(string,address,uint8[3],bool)


**registerArtifact(string,address,uint8[3],bool)**


Registers an artifact with the provided information. REVERTS if: - the artifact ID or location are empty - the artifact ID and version are already registered with a different address location

```endpoint
CALL registerArtifact(string,address,uint8[3],bool)
```

#### Parameters

```solidity
_activeVersion // whether this version of the artifact should be tracked as the active version
_artifactAddress // the address of the smart contract artifact
_artifactId // the ID of the artifact
_version // the semantic version of the artifact

```


---

#### setActiveVersion(string,uint8[3])


**setActiveVersion(string,uint8[3])**


Sets the specified artifact and version to be tracked as the active version. REVERTS if: - the specified artifact ID and version don't exist in this ArtifactsRegistry

```endpoint
CALL setActiveVersion(string,uint8[3])
```

#### Parameters

```solidity
_artifactId // the ID of the artifact
_version // the semantic version of the artifact

```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### DefaultBpmService


The DefaultBpmService contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createDefaultProcessInstance(address,address,bytes32)


**createDefaultProcessInstance(address,address,bytes32)**


Creates a new ProcessInstance initiated with the provided parameters. This ProcessInstance can be further customized and then submitted to the #startProcessInstance(ProcessInstance) function for execution. The ownership of the created ProcessInstance is transfered to the msg.sender, i.e. the caller of this function will be the owner of the ProcessInstance. REVERTS if: - the provided ProcessDefinition is NULL

```endpoint
CALL createDefaultProcessInstance(address,address,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
_processDefinition // the address of a ProcessDefinition
_startedBy // the address of an account that regarded as the starting user. If empty, the msg.sender is used.

```


---

#### getActivityInstanceAtIndex(address,uint256)


**getActivityInstanceAtIndex(address,uint256)**


Returns the ActivityInstance ID at the specified index

```endpoint
CALL getActivityInstanceAtIndex(address,uint256)
```

#### Parameters

```solidity
_address // the process instance address
_pos // the activity instance index

```

#### Return

```json
the ActivityInstance ID
```


---

#### getActivityInstanceData(address,bytes32)


**getActivityInstanceData(address,bytes32)**


Returns ActivityInstance data for given the ActivityInstance ID

```endpoint
CALL getActivityInstanceData(address,bytes32)
```

#### Parameters

```solidity
_id // the global ID of the activity instance
_processInstance // the process instance address to which the ActivityInstance belongs

```

#### Return

```json
activityId - the ID of the activity as defined by the process definitioncreated - the creation timestampcompleted - the completion timestampperformer - the account who is performing the activity (for interactive activities only)completedBy - the account who completed the activity (for interactive activities only) state - the uint8 representation of the BpmRuntime.ActivityInstanceState of this activity instance
```


---

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns detailed information about the address scope with the given key in the specified ProcessInstance

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_key // a scope key
_processInstance // the address of a ProcessInstance

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeyAtIndex(address,uint256)


**getAddressScopeKeyAtIndex(address,uint256)**


Returns the address scope key at the given index position of the specified ProcessInstance.

```endpoint
CALL getAddressScopeKeyAtIndex(address,uint256)
```

#### Parameters

```solidity
_index // the index position
_processInstance // the address of a ProcessInstance

```

#### Return

```json
the bytes32 scope key
```


---

#### getApplicationRegistry()


**getApplicationRegistry()**


Returns a reference to the ApplicationRegistry currently used by this BpmService

```endpoint
CALL getApplicationRegistry()
```

#### Return

```json
the ApplicationRegistry
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getBpmServiceDb()


**getBpmServiceDb()**


Returns a reference to the BpmServiceDb currently used by this BpmService

```endpoint
CALL getBpmServiceDb()
```

#### Return

```json
the BpmServiceDb
```


---

#### getNumberOfActivityInstances(address)


**getNumberOfActivityInstances(address)**


Returns the number of activity instances.

```endpoint
CALL getNumberOfActivityInstances(address)
```

#### Return

```json
the activity instance count as size
```


---

#### getNumberOfAddressScopes(address)


**getNumberOfAddressScopes(address)**


Returns the number of address scopes for the given ProcessInstance.

```endpoint
CALL getNumberOfAddressScopes(address)
```

#### Parameters

```solidity
_processInstance // the address of a ProcessInstance

```

#### Return

```json
the number of scopes
```


---

#### getNumberOfProcessData(address)


**getNumberOfProcessData(address)**


Returns the number of process data entries.

```endpoint
CALL getNumberOfProcessData(address)
```

#### Return

```json
the process data size
```


---

#### getNumberOfProcessInstances()


**getNumberOfProcessInstances()**


Returns the number of process instances.

```endpoint
CALL getNumberOfProcessInstances()
```

#### Return

```json
the process instance count as size
```


---

#### getProcessDataAtIndex(address,uint256)


**getProcessDataAtIndex(address,uint256)**


Returns the process data ID at the specified index

```endpoint
CALL getProcessDataAtIndex(address,uint256)
```

#### Parameters

```solidity
_pos // the index

```

#### Return

```json
the data ID
```


---

#### getProcessDataDetails(address,bytes32)


**getProcessDataDetails(address,bytes32)**


Returns information about the process data entry for the specified process and data ID

```endpoint
CALL getProcessDataDetails(address,bytes32)
```

#### Parameters

```solidity
_address // the process instance
_dataId // the data ID

```

#### Return

```json
(process,id,uintValue,bytes32Value,addressValue,boolValue)
```


---

#### getProcessInstanceAtIndex(uint256)


**getProcessInstanceAtIndex(uint256)**


Returns the process instance address at the specified index

```endpoint
CALL getProcessInstanceAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index

```

#### Return

```json
the process instance address or BaseErrors.INDEX_OUT_OF_BOUNDS(), 0x0
```


---

#### getProcessInstanceData(address)


**getProcessInstanceData(address)**


Returns information about the process intance with the specified address

```endpoint
CALL getProcessInstanceData(address)
```

#### Parameters

```solidity
_address // the process instance address

```

#### Return

```json
processDefinition the address of the ProcessDefinitionstate the BpmRuntime.ProcessInstanceState as uint8startedBy the address of the account who started the process
```


---

#### getProcessInstanceForActivity(bytes32)


**getProcessInstanceForActivity(bytes32)**


Returns the address of the ProcessInstance of the specified ActivityInstance ID

```endpoint
CALL getProcessInstanceForActivity(bytes32)
```

#### Parameters

```solidity
_aiId // the ID of an ActivityInstance

```

#### Return

```json
the ProcessInstance address or 0x0 if it cannot be found
```


---

#### getProcessModelRepository()


**getProcessModelRepository()**


Gets the ProcessModelRepository address for this BpmService

```endpoint
CALL getProcessModelRepository()
```

#### Return

```json
the ProcessModelRepository
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### startProcess(address,bytes32)


**startProcess(address,bytes32)**


Creates a new ProcessInstance based on the specified ProcessDefinition and starts its execution

```endpoint
CALL startProcess(address,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
_processDefinition // the address of a ProcessDefinition

```

#### Return

```json
any error resulting from ProcessInstance.execute() or BaseErrors.NO_ERROR(), if successfulthe address of a ProcessInstance, if successful
```


---

#### startProcessFromRepository(bytes32,bytes32,bytes32)


**startProcessFromRepository(bytes32,bytes32,bytes32)**


Creates a new ProcessInstance based on the specified IDs of a ProcessModel and ProcessDefinition and starts its execution

```endpoint
CALL startProcessFromRepository(bytes32,bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional) REVERTS if: - a ProcessDefinition cannot be located in the ProcessModelRepository
_modelId // the model that qualifies the process ID, if multiple models are deployed, otherwise optional
_processDefinitionId // the ID of the process definition

```

#### Return

```json
any error resulting from ProcessInstance.execute() or ProcessBaseErrors.NO_ERROR(), if successfulthe address of a ProcessInstance, if successful //TODO this function should be called startProcess(bytes32, bytes32), but our JS libs have a problem with polymorphism: AN-301
```


---

#### startProcessInstance(address)


**startProcessInstance(address)**


Initializes, registers, and executes a given ProcessInstance

```endpoint
CALL startProcessInstance(address)
```

#### Parameters

```solidity
_pi // the ProcessInstance

```

#### Return

```json
BaseErrors.NO_ERROR() if successful or an error code from executing the ProcessInstance
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### DefaultDocumentFunctionsTest Interface


The DefaultDocumentFunctionsTest Interface contract is found within the bin bundle.

#### pubCanAddVersion()


**pubCanAddVersion()**


Tests `canAddVersion` creation.

```endpoint
CALL pubCanAddVersion()
```

#### Return

```json
"success", if successful or an explanatory message if not successful.
```


---

### DefaultDoug


The DefaultDoug contract is found within the bin bundle.

#### deploy(string,address)


**deploy(string,address)**


Registers the contract with the given address under the specified ID and performs a deployment procedure which involves dependency injection and upgrades from previously deployed contracts with the same ID. This function is a convenience wrapper around the #deployVersion(string,address,uint8[3]) function. If the contract implements VersionedArtifact, that version will be used for registration, otherwise the contract will get registered with version 0.0.0.

```endpoint
CALL deploy(string,address)
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
true if successful, false otherwise
```


---

#### deployVersion(string,address,uint8[3])


**deployVersion(string,address,uint8[3])**


Registers the contract with the given address under the specified ID and performs a deployment procedure which involves dependency injection and upgrades from previously deployed contracts with the same ID. Note that if the contract implements VersionedArtifact, that version will be used for registration and the provided version will be ignored! If the given contract implements ArtifactsFinderEnabled, it will be passed an instance of the ArtifactsRegistry, so that it can perform dependency lookups and register for changes. If the contract implements Upgradeable and it replaces an existing active version of the same ID that is also Upgradeable, the upgrade function will be invoked. REVERTS if: - the provided contract is Upgradeable, but this DOUG contract is not the upgradeOwner - a contract with the same ID is being replaced, but the upgrade between predecessor and successor failed (see Upgradeable.upgrade(address))

```endpoint
CALL deployVersion(string,address,uint8[3])
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
true if successful, false otherwise
```


---

#### getArtifactsRegistry()


**getArtifactsRegistry()**


Returns the address of the ArtifactsRegistry used in this DefaultDoug

```endpoint
CALL getArtifactsRegistry()
```

#### Return

```json
the address of the ArtifactsRegistry
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### lookup(string)


**lookup(string)**


Returns the address of the active version of a contract registered under the given ID. If a specific (or non-active) version of a registered contract needs to be retrieved, please use #getArtifactsRegistry().getArtifactVersion(string,uint8[3])

```endpoint
CALL lookup(string)
```

#### Parameters

```solidity
_id // the ID under which the contract is registered

```

#### Return

```json
the contract's address of 0x0 if no active version for the given ID is registered.
```


---

#### lookupVersion(string,uint8[3])


**lookupVersion(string,uint8[3])**


Returns the address of the active version of a contract registered under the given ID. If a specific (or non-active) version of a registered contract needs to be retrieved, please use #getArtifactsRegistry().getArtifactVersion(string,uint8[3])

```endpoint
CALL lookupVersion(string,uint8[3])
```

#### Parameters

```solidity
_id // the ID under which the contract is registered

```

#### Return

```json
the contract's address of 0x0 if no active version for the given ID is registered.
```


---

#### register(string,address)


**register(string,address)**


Registers the contract with the given address under the specified ID in DOUG's ArtifactsRegistry. This function is a convenience wrapper around the #registerVersion(string,address,uint8[3]) function. If the contract implements VersionedArtifact, that version will be used for registration, otherwise the contract will get registered with version 0.0.0.

```endpoint
CALL register(string,address)
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
version - the version under which the contract was registered.
```


---

#### registerVersion(string,address,uint8[3])


**registerVersion(string,address,uint8[3])**


Registers the contract with the given address under the specified ID in DOUG's ArtifactsRegistry. Note that if the contract implements VersionedArtifact, that version will be used for registration and the provided version will be ignored! REVERTS if: - the ArtifactRegistry rejects the artifact, most commonly because an artifact with the same ID and version, but a different address is already registered.

```endpoint
CALL registerVersion(string,address,uint8[3])
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
version - the version under which the contract was registered.
```


---

#### setArtifactsRegistry(address)


**setArtifactsRegistry(address)**


Sets the given address to be this DOUG's ArtifactsRegistry. REVERTS if: - the ArtifactsRegistry is not a SystemOwned contract or if the system owner is not set to this DOUG.

```endpoint
CALL setArtifactsRegistry(address)
```

#### Parameters

```solidity
_artifactsRegistry // the address of an ArtifactsRegistry contract

```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### DefaultEcosystem


The DefaultEcosystem contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### initialize()


**initialize()**


Initializes this DefaultOrganization with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. Sets the msg.sender as the owner of the Ecosystem

```endpoint
CALL initialize()
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### DefaultEcosystemRegistry


The DefaultEcosystemRegistry contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createEcosystem(string)


**createEcosystem(string)**


Creates a new Ecosystem with the given name. REVERTS if: - the name is already registered

```endpoint
CALL createEcosystem(string)
```

#### Parameters

```solidity
_name // the name under which to register the Ecosystem

```

#### Return

```json
the address of the new Ecosystem
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### DefaultOrganization


The DefaultOrganization contract is found within the bin bundle.

#### addDepartment(bytes32)


**addDepartment(bytes32)**


Adds the department with the specified ID to this Organization.

```endpoint
CALL addDepartment(bytes32)
```

#### Parameters

```solidity
_id // the department ID (must be unique)

```

#### Return

```json
true if the department was added successfully, false otherwise (e.g. if the ID already exists)
```


---

#### addUser(address)


**addUser(address)**


Adds the specified user to this Organization. This function guarantees that the user is part of this organization, if it returns true.

```endpoint
CALL addUser(address)
```

#### Parameters

```solidity
_userAccount // the user to add

```

#### Return

```json
true if the user is successfully added to the organization, false otherwise (e.g. if the user account address was empty)
```


---

#### addUserToDepartment(address,bytes32)


**addUserToDepartment(address,bytes32)**


Adds the specified user to the organization if they aren't already registered, then adds the user to the department if they aren't already in it. An empty department ID will result in the user being added to the default department. This function guarantees that the user is both a member of the organization as well as the specified department, if it returns true.

```endpoint
CALL addUserToDepartment(address,bytes32)
```

#### Parameters

```solidity
_department // department id to which the user should be added
_userAccount // the user to add

```

#### Return

```json
true if successfully added, false otherwise (e.g. if the department does not exist or if the user account address is empty)
```


---

#### authorizeUser(address,bytes32)


**authorizeUser(address,bytes32)**


Returns whether the given user account is authorized within this Organization. The optional department/role identifier can be used to provide an additional authorization scope against which to authorize the user. The following special cases exist: 1. If the provided department matches the keccak256 hash of the address of this organization, the user is regarded as authorized, if belonging to this organization (without having to be associated with a 2. If the department is empty or if it is an unknown (non-existent) department, the user will be evaluated against the DEFAULT department. particular department).

```endpoint
CALL authorizeUser(address,bytes32)
```

#### Parameters

```solidity
_department // an optional department/role context
_userAccount // the user account

```

#### Return

```json
true if authorized, false otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getApproverAtIndex(uint256)


**getApproverAtIndex(uint256)**


Returns the approver's address at the given index position.

```endpoint
CALL getApproverAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index position

```

#### Return

```json
the address or 0x0 if the position does not exist
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getDefaultDepartmentId()


**getDefaultDepartmentId()**


Returns the ID of this Organization's default department

```endpoint
CALL getDefaultDepartmentId()
```

#### Return

```json
the ID of the default department
```


---

#### getNumberOfApprovers()


**getNumberOfApprovers()**


Returns the number of registered approvers.

```endpoint
CALL getNumberOfApprovers()
```

#### Return

```json
the number of approvers
```


---

#### getNumberOfUsers()


**getNumberOfUsers()**


returns the number of users associated with this organization

```endpoint
CALL getNumberOfUsers()
```

#### Return

```json
the number of users
```


---

#### getUserAtIndex(uint256)


**getUserAtIndex(uint256)**


Returns the user's address at the given index position.

```endpoint
CALL getUserAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index position

```

#### Return

```json
the address or 0x0 if the position does not exist
```


---

#### initialize(address[],bytes32)


**initialize(address[],bytes32)**


Initializes this DefaultOrganization with the provided list of initial approvers. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. If the approvers list is empty, the msg.sender is registered as an approver for this Organization. Also, a default department is automatically created which cannot be removed as it serves as the catch-all for authorizations that cannot otherwise be matched with existing departments. REVERTS if: - the contract had already been initialized before

```endpoint
CALL initialize(address[],bytes32)
```

#### Parameters

```solidity
_defaultDepartmentId // an optional ID for the default department of this organization
_initialApprovers // an array of addresses that should be registered as approvers for this Organization

```


---

#### removeDepartment(bytes32)


**removeDepartment(bytes32)**


Removes the department with the specified ID, if it exists and is not the defaultDepartmentId.

```endpoint
CALL removeDepartment(bytes32)
```

#### Parameters

```solidity
_depId // a department ID

```

#### Return

```json
true if a department with that ID existed and was successfully removed, false otherwise
```


---

#### removeUser(address)


**removeUser(address)**


Removes the user from this Organization and all departments they were in.

```endpoint
CALL removeUser(address)
```

#### Parameters

```solidity
_userAccount // the account to remove

```

#### Return

```json
bool true if user is removed successfully
```


---

#### removeUserFromDepartment(address,bytes32)


**removeUserFromDepartment(address,bytes32)**


Removes the user from the department in this organization

```endpoint
CALL removeUserFromDepartment(address,bytes32)
```

#### Parameters

```solidity
_depId // the department to remove the user from
_userAccount // the user to remove

```

#### Return

```json
bool indicating success or failure
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

### DefaultParticipantsManager


The DefaultParticipantsManager contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createOrganization(address[],bytes32)


**createOrganization(address[],bytes32)**


Creates and adds a new Organization with the specified parameters REVERTS if: - The Organization was created, but cannot be added to the this ParticipantsManager.

```endpoint
CALL createOrganization(address[],bytes32)
```

#### Parameters

```solidity
_defaultDepartmentId // an optional custom ID for the default department of this organization.
_initialApprovers // the initial owners/admins of the Organization. If left empty, the msg.sender will be set as an approver.

```

#### Return

```json
BaseErrors.NO_ERROR() if successfulthe address of the newly created Organization, or 0x0 if not successful
```


---

#### createUserAccount(bytes32,address,address)


**createUserAccount(bytes32,address,address)**


Creates and registers a UserAccount, and optionally establishes the connection of the user to an ecosystem, if an address is provided REVERTS if: - neither owner nor ecosystem addresses are provided

```endpoint
CALL createUserAccount(bytes32,address,address)
```

#### Parameters

```solidity
_ecosystem // owner (optional)
_id // id (required)
_owner // owner (optional)

```

#### Return

```json
the address of the created UserAccount
```


---

#### getApproverAtIndex(address,uint256)


**getApproverAtIndex(address,uint256)**


Returns the approver's address at the given index position of the specified organization.

```endpoint
CALL getApproverAtIndex(address,uint256)
```

#### Parameters

```solidity
_organization // the organization's address
_pos // the index position

```

#### Return

```json
the approver's address, if the position exists
```


---

#### getApproverData(address,address)


**getApproverData(address,address)**


Function supports SQLsol, but only returns the approver address parameter. Unused parameter `address` refers to the Organization and is required by SQLsol

```endpoint
CALL getApproverData(address,address)
```

#### Parameters

```solidity
_approver // the approver's address

```

#### Return

```json
the approver address
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getNumberOfApprovers(address)


**getNumberOfApprovers(address)**


Returns the number of registered approvers in the specified organization.

```endpoint
CALL getNumberOfApprovers(address)
```

#### Parameters

```solidity
_organization // the organization's address

```

#### Return

```json
the number of approvers
```


---

#### getNumberOfOrganizations()


**getNumberOfOrganizations()**


Returns the number of registered organizations.

```endpoint
CALL getNumberOfOrganizations()
```

#### Return

```json
the number of organizations
```


---

#### getNumberOfUsers(address)


**getNumberOfUsers(address)**


returns the number of users associated with the specified organization

```endpoint
CALL getNumberOfUsers(address)
```

#### Parameters

```solidity
_organization // the organization's address

```

#### Return

```json
the number of users
```


---

#### getOrganizationAtIndex(uint256)


**getOrganizationAtIndex(uint256)**


Returns the address of the Organization at the given index.

```endpoint
CALL getOrganizationAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index position

```

#### Return

```json
the address of the Organization or 0x0 if the index position does not exist
```


---

#### getOrganizationData(address)


**getOrganizationData(address)**


Returns the public data of the organization at the specified address

```endpoint
CALL getOrganizationData(address)
```

#### Parameters

```solidity
_organization // the address of an organization

```

#### Return

```json
the organization's ID and name
```


---

#### getUserAccountsSize()


**getUserAccountsSize()**


Gets user accounts size.

```endpoint
CALL getUserAccountsSize()
```

#### Return

```json
size size
```


---

#### getUserAtIndex(address,uint256)


**getUserAtIndex(address,uint256)**


Returns the user's address at the given index position in the specified organization.

```endpoint
CALL getUserAtIndex(address,uint256)
```

#### Parameters

```solidity
_organization // the organization's address
_pos // the index position

```

#### Return

```json
the address or 0x0 if the position does not exist
```


---

#### getUserData(address,address)


**getUserData(address,address)**


Returns information about the specified user in the context of the given organization (only address is stored) Unused parameter `address` refers to the Organization and is required by SQLsol

```endpoint
CALL getUserData(address,address)
```

#### Parameters

```solidity
_user // the user's address

```

#### Return

```json
userAddress - the user's address
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### organizationExists(address)


**organizationExists(address)**


Indicates whether the specified organization in this ParticipantsManager

```endpoint
CALL organizationExists(address)
```

#### Parameters

```solidity
_address // organization address

```

#### Return

```json
true if the given address belongs to a known Organization, false otherwise
```


---

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

#### userAccountExists(address)


**userAccountExists(address)**


Indicates whether the specified UserAccount exists in this ParticipantsManager

```endpoint
CALL userAccountExists(address)
```

#### Parameters

```solidity
_userAccount // user account address

```

#### Return

```json
true if the given address belongs to a known UserAccount, false otherwise
```


---

### DefaultProcessDefinition


The DefaultProcessDefinition contract is found within the bin bundle.

#### addProcessInterfaceImplementation(address,bytes32)


**addProcessInterfaceImplementation(address,bytes32)**


Adds the specified process interface to the list of supported process interfaces of this ProcessDefinition The model address is allowed to be empty in which case this process definition's model will be used.

```endpoint
CALL addProcessInterfaceImplementation(address,bytes32)
```

#### Parameters

```solidity
_interfaceId // the ID of the interface
_model // the model defining the interface

```

#### Return

```json
BaseErrors.RESOURCE_NOT_FOUND() if the specified interface cannot be located in the modelBaseErrors.NO_ERROR() upon successful creation.
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createActivityDefinition(bytes32,uint8,uint8,uint8,bytes32,bool,bytes32,bytes32,bytes32)


**createActivityDefinition(bytes32,uint8,uint8,uint8,bytes32,bool,bytes32,bytes32,bytes32)**


Creates a new activity definition with the specified parameters.

```endpoint
CALL createActivityDefinition(bytes32,uint8,uint8,uint8,bytes32,bool,bytes32,bytes32,bytes32)
```

#### Parameters

```solidity
_activityType // the BpmModel.ActivityType [TASK|SUBPROCESS]
_application // the application handling the execution of the activity
_assignee // the ID of the participant performing the activity (for USER tasks only)
_behavior // the BpmModel.TaskBehavior [SEND|SENDRECEIVE|RECEIVE]
_id // the activity ID
_multiInstance // whether the activity represents multiple instances
_subProcessDefinitionId // references a subprocess definition (only for SUBPROCESS ActivityType)
_subProcessModelId // references the model containg a subprocess definition (only for SUBPROCESS ActivityType)
_taskType // the BpmModel.TaskType [NONE|USER|SERVICE|EVENT]

```

#### Return

```json
BaseErrors.RESOURCE_ALREADY_EXISTS() if an activity with the same ID already existsBaseErrors.INVALID_PARAM_VALUE() if an assignee is specified, but the BpmModel.TaskType is not USERBaseErrors.NULL_PARAM_NOT_ALLOWED() if BpmModel.TaskType is USER, but no assignee was specifiedBaseErrors.RESOURCE_NOT_FOUND() if an assignee is specified that does not exist in the modelBaseErrors.NO_ERROR() upon successful creation.
```


---

#### createDataMapping(bytes32,uint8,bytes32,bytes32,bytes32,address)


**createDataMapping(bytes32,uint8,bytes32,bytes32,bytes32,address)**


Create a data mapping for the specified activity and direction.

```endpoint
CALL createDataMapping(bytes32,uint8,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_accessPath // the access path offered by the application. If the application does not have any access paths, this field is used as an ID for the mapping.
_activityId // the ID of the activity in this ProcessDefinition
_dataPath // a data path (key) to use for data lookup on a DataStorage.
_dataStorage // an optional address of a DataStorage as basis for the data path other than the default one
_dataStorageId // an optional key to identify a DataStorage as basis for the data path other than the default one
_direction // the BpmModel.Direction [IN|OUT]

```


---

#### createGateway(bytes32,uint8)


**createGateway(bytes32,uint8)**


Creates a new BpmModel.Gateway model element with the specified ID and type REVERTS: if the ID already exists

```endpoint
CALL createGateway(bytes32,uint8)
```

#### Parameters

```solidity
_id // the ID under which to register the element
_type // a BpmModel.GatewayType

```


---

#### createTransition(bytes32,bytes32)


**createTransition(bytes32,bytes32)**


Creates a transition between the specified source and target objects. REVERTS if: - no element with the source ID exists - no element with the target ID exists - one of source/target is an activity and an existing connection on that activity would be overwritten. This is a necessary restriction to avoid dangling references

```endpoint
CALL createTransition(bytes32,bytes32)
```

#### Parameters

```solidity
_source // the start of the transition
_target // the end of the transition

```

#### Return

```json
BaseErrors.NO_ERROR() upon successful creation.
```


---

#### createTransitionConditionForAddress(bytes32,bytes32,bytes32,bytes32,address,uint8,address)


**createTransitionConditionForAddress(bytes32,bytes32,bytes32,bytes32,address,uint8,address)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object. REVERT: if the specified transition between the gateway and activity does not exist REVERT: if the specified activity is set as the default output of the gateway

```endpoint
CALL createTransitionConditionForAddress(bytes32,bytes32,bytes32,bytes32,address,uint8,address)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side primitive comparison value

```


---

#### createTransitionConditionForBool(bytes32,bytes32,bytes32,bytes32,address,uint8,bool)


**createTransitionConditionForBool(bytes32,bytes32,bytes32,bytes32,address,uint8,bool)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object. REVERT: if the specified transition between the gateway and activity does not exist REVERT: if the specified activity is set as the default output of the gateway

```endpoint
CALL createTransitionConditionForBool(bytes32,bytes32,bytes32,bytes32,address,uint8,bool)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side primitive comparison value

```


---

#### createTransitionConditionForBytes32(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32)


**createTransitionConditionForBytes32(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object. REVERT: if the specified transition between the gateway and activity does not exist REVERT: if the specified activity is set as the default output of the gateway

```endpoint
CALL createTransitionConditionForBytes32(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side primitive comparison value

```


---

#### createTransitionConditionForDataStorage(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32,bytes32,address)


**createTransitionConditionForDataStorage(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32,bytes32,address)**


Creates a transition condition between the specified gateway and activity using the given parameters. The "lh..." parameters are used to construct a left-hand side DataStorageUtils.ConditionalData object while the "rh..." ones are used for a right-hand side DataStorageUtils.ConditionalData as comparison REVERT: if the specified transition between the gateway and activity does not exist REVERT: if the specified activity is set as the default output of the gateway

```endpoint
CALL createTransitionConditionForDataStorage(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32,bytes32,address)
```

#### Parameters

```solidity
_gatewayId // the ID of a gateway in this ProcessDefinition
_lhDataPath // the left-hand side dataPath condition
_lhDataStorage // the left-hand side dataStorage condition
_lhDataStorageId // the left-hand side dataStorageId condition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_rhDataPath // the right-hand side dataPath condition
_rhDataStorage // the right-hand side dataStorage condition
_rhDataStorageId // the right-hand side dataStorageId condition
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition

```


---

#### createTransitionConditionForInt(bytes32,bytes32,bytes32,bytes32,address,uint8,int256)


**createTransitionConditionForInt(bytes32,bytes32,bytes32,bytes32,address,uint8,int256)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object. REVERT: if the specified transition between the gateway and activity does not exist REVERT: if the specified activity is set as the default output of the gateway

```endpoint
CALL createTransitionConditionForInt(bytes32,bytes32,bytes32,bytes32,address,uint8,int256)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side primitive comparison value

```


---

#### createTransitionConditionForString(bytes32,bytes32,bytes32,bytes32,address,uint8,string)


**createTransitionConditionForString(bytes32,bytes32,bytes32,bytes32,address,uint8,string)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object. REVERT: if the specified transition between the gateway and activity does not exist REVERT: if the specified activity is set as the default output of the gateway

```endpoint
CALL createTransitionConditionForString(bytes32,bytes32,bytes32,bytes32,address,uint8,string)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side primitive comparison value

```


---

#### createTransitionConditionForUint(bytes32,bytes32,bytes32,bytes32,address,uint8,uint256)


**createTransitionConditionForUint(bytes32,bytes32,bytes32,bytes32,address,uint8,uint256)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object. REVERT: if the specified transition between the gateway and activity does not exist REVERT: if the specified activity is set as the default output of the gateway

```endpoint
CALL createTransitionConditionForUint(bytes32,bytes32,bytes32,bytes32,address,uint8,uint256)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side primitive comparison value

```


---

#### getActivitiesForParticipant(bytes32)


**getActivitiesForParticipant(bytes32)**


Returns the IDs of all activities connected to the given model participant. This function can be used to retrieve all user tasks belonging to the same "swimlane" in the model.

```endpoint
CALL getActivitiesForParticipant(bytes32)
```

#### Parameters

```solidity
_participantId // the ID of a participant in the model

```

#### Return

```json
an array of activity IDs
```


---

#### getActivityAtIndex(uint256)


**getActivityAtIndex(uint256)**


Returns the ID of the ActivityDefinition at the specified index position of the given Process Definition

```endpoint
CALL getActivityAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
bytes32 the ActivityDefinition ID, if it exists
```


---

#### getActivityData(bytes32)


**getActivityData(bytes32)**


Returns information about the activity definition with the given ID.

```endpoint
CALL getActivityData(bytes32)
```

#### Parameters

```solidity
_id // the bytes32 id of the activity definition

```

#### Return

```json
activityType the BpmModel.ActivityType as uint8taskType the BpmModel.TaskType as uint8taskBehavior the BpmModel.TaskBehavior as uint8assignee the ID of the activity's assignee (for interactive activities)multiInstance whether the activity is a multi-instanceapplication the activity's applicationsubProcessModelId the ID of a process model (for subprocess activities)subProcessDefinitionId the ID of a process definition (for subprocess activities)
```


---

#### getActivityGraphDetails(bytes32)


**getActivityGraphDetails(bytes32)**


Returns connectivity details about the specified activity.

```endpoint
CALL getActivityGraphDetails(bytes32)
```

#### Parameters

```solidity
_id // the ID of an activity

```

#### Return

```json
predecessor - the ID of its predecessor model elementsuccessor - the ID of its successor model element
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getElementType(bytes32)


**getElementType(bytes32)**


Returns the ModelElementType for the element with the specified ID. REVERTS if: - the element does not exist to avoid returning 0 as a valid type.

```endpoint
CALL getElementType(bytes32)
```

#### Parameters

```solidity
_id // the ID of a model element

```

#### Return

```json
the BpmModel.ModelElementType
```


---

#### getGatewayGraphDetails(bytes32)


**getGatewayGraphDetails(bytes32)**


Returns connectivity details about the specified gateway.

```endpoint
CALL getGatewayGraphDetails(bytes32)
```

#### Parameters

```solidity
_id // the ID of a gateway

```

#### Return

```json
inputs - the IDs of model elements that are inputs to this gatewayoutputs - the IDs of model elements that are outputs of this gatewaygatewayType - the BpmModel.GatewayTypedefaultOutput - the default output connection (applies only to XOR|OR type gateways)
```


---

#### getId()


**getId()**


Returns the id of the process definition

```endpoint
CALL getId()
```

#### Return

```json
bytes32 id of the process definition
```


---

#### getImplementedProcessInterfaceAtIndex(uint256)


**getImplementedProcessInterfaceAtIndex(uint256)**


Returns information about the process interface at the given index

```endpoint
CALL getImplementedProcessInterfaceAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
modelAddress the interface's modelinterfaceId the interface ID
```


---

#### getInDataMappingDetails(bytes32,bytes32)


**getInDataMappingDetails(bytes32,bytes32)**


Returns information about the IN data mapping of the specified activity with the given ID.

```endpoint
CALL getInDataMappingDetails(bytes32,bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_id // the data mapping ID

```

#### Return

```json
dataMappingId the id of the data mappingaccessPath the access path on the applicationdataPath a data path (key) to use for identifying the data location in a DataStorage contractdataStorageId a key to identify a secondary DataStorage as basis for the data path other than the default onedataStorage an address of a DataStorage as basis for the data path other than the default one
```


---

#### getInDataMappingIdAtIndex(bytes32,uint256)


**getInDataMappingIdAtIndex(bytes32,uint256)**


Returns the ID of the IN data mapping of the specified activity at the specified index.

```endpoint
CALL getInDataMappingIdAtIndex(bytes32,uint256)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_idx // the index position

```

#### Return

```json
the mapping ID, if it exists
```


---

#### getInDataMappingKeys(bytes32)


**getInDataMappingKeys(bytes32)**


Returns an array of the IN data mapping ids of the specified activity.

```endpoint
CALL getInDataMappingKeys(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the data mapping ids
```


---

#### getModel()


**getModel()**


Returns the ProcessModel which contains this process definition

```endpoint
CALL getModel()
```

#### Return

```json
the ProcessModel reference
```


---

#### getModelId()


**getModelId()**


Returns the ID of the model which contains this process definition

```endpoint
CALL getModelId()
```

#### Return

```json
the model ID
```


---

#### getNumberOfActivities()


**getNumberOfActivities()**


Returns the number of activity definitions in this ProcessDefinition.

```endpoint
CALL getNumberOfActivities()
```

#### Return

```json
the number of activity definitions
```


---

#### getNumberOfImplementedProcessInterfaces()


**getNumberOfImplementedProcessInterfaces()**


Returns the number of implemented process interfaces implemented by this ProcessDefinition

```endpoint
CALL getNumberOfImplementedProcessInterfaces()
```

#### Return

```json
the number of process interfaces
```


---

#### getNumberOfInDataMappings(bytes32)


**getNumberOfInDataMappings(bytes32)**


Returns the number of IN data mappings for the specified activity.

```endpoint
CALL getNumberOfInDataMappings(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the number of IN data mappings
```


---

#### getNumberOfOutDataMappings(bytes32)


**getNumberOfOutDataMappings(bytes32)**


Returns the number of OUT data mappings for the specified activity.

```endpoint
CALL getNumberOfOutDataMappings(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the number of OUT data mappings
```


---

#### getOutDataMappingDetails(bytes32,bytes32)


**getOutDataMappingDetails(bytes32,bytes32)**


Returns information about the OUT data mapping of the specified activity with the given ID.

```endpoint
CALL getOutDataMappingDetails(bytes32,bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_id // the data mapping ID

```

#### Return

```json
dataMappingId the id of the data mappingaccessPath the access path on the applicationdataPath a data path (key) to use for identifying the data location in a DataStorage contractdataStorageId a key to identify a secondary DataStorage as basis for the data path other than the default onedataStorage an address of a DataStorage as basis for the data path other than the default one
```


---

#### getOutDataMappingIdAtIndex(bytes32,uint256)


**getOutDataMappingIdAtIndex(bytes32,uint256)**


Returns the ID of the OUT data mapping of the specified activity at the specified index.

```endpoint
CALL getOutDataMappingIdAtIndex(bytes32,uint256)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_idx // the index position

```

#### Return

```json
the mapping ID, if it exists
```


---

#### getOutDataMappingKeys(bytes32)


**getOutDataMappingKeys(bytes32)**


Returns an array of the OUT data mapping ids of the specified activity.

```endpoint
CALL getOutDataMappingKeys(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the data mapping ids
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getStartActivity()


**getStartActivity()**


Returns the ID of the start activity of this process definition. This value is set during the validate() function, if the process is valid.

```endpoint
CALL getStartActivity()
```

#### Return

```json
the ID of the identified start activity
```


---

#### implementsProcessInterface(address,bytes32)


**implementsProcessInterface(address,bytes32)**


indicates whether this ProcessDefinition implements the specified interface

```endpoint
CALL implementsProcessInterface(address,bytes32)
```

#### Parameters

```solidity
_interfaceId // the ID of the interface
_model // the model defining the interface

```

#### Return

```json
true if the interface is supported, false otherwise
```


---

#### initialize(bytes32,address)


**initialize(bytes32,address)**


Initializes this DefaultOrganization with the specified ID and belonging to the given model. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. REVERTS if - the _model is an empty address or if the ID is empty

```endpoint
CALL initialize(bytes32,address)
```

#### Parameters

```solidity
_id // the ProcessDefinition ID
_model // the address of a ProcessModel in which this ProcessDefinition is created

```


---

#### isValid()


**isValid()**


Returns the current validity state

```endpoint
CALL isValid()
```

#### Return

```json
true if valid, false otherwise
```


---

#### modelElementExists(bytes32)


**modelElementExists(bytes32)**


Returns whether the given ID belongs to a model element (gateway or activity) known in this ProcessDefinition.

```endpoint
CALL modelElementExists(bytes32)
```

#### Parameters

```solidity
_id // the ID of a model element

```

#### Return

```json
true if it exists, false otherwise
```


---

#### resolveTransitionCondition(bytes32,bytes32,address)


**resolveTransitionCondition(bytes32,bytes32,address)**


Resolves a transition condition between the given source and target model elements using the provided DataStorage to lookup data. If no condition exists for the specified transition, the function will always return 'true' as default.

```endpoint
CALL resolveTransitionCondition(bytes32,bytes32,address)
```

#### Parameters

```solidity
_dataStorage // the address of a DataStorage.
_sourceId // the ID of a model element in this ProcessDefinition, e.g. a gateway
_targetId // the ID of a model element in this ProcessDefinition, e.g. an activity

```

#### Return

```json
true if the condition evaluated to 'true' or if no condition exists, false otherwise
```


---

#### setDefaultTransition(bytes32,bytes32)


**setDefaultTransition(bytes32,bytes32)**


Sets the specified activity to be the default output (default transition) of the specified gateway. REVERTS if: - the specified transition between the gateway and target element does not exist

```endpoint
CALL setDefaultTransition(bytes32,bytes32)
```

#### Parameters

```solidity
_gatewayId // the ID of a gateway in this ProcessDefinition
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### validate()


**validate()**


Validates the coherence of the process definition in terms of the diagram and its configuration and sets the valid flag. Currently performed validation: 1. There must be exactly one start activity, i.e. one activity with no predecessor

```endpoint
CALL validate()
```

#### Return

```json
result - boolean indicating validityerrorMessage - empty string if valid, otherwise contains a hint what failed
```


---

### DefaultProcessInstance


The DefaultProcessInstance contract is found within the bin bundle.

#### abort()


**abort()**


Aborts this ProcessInstance and halts any ongoing activities. After the abort the ProcessInstance cannot be resurrected.

```endpoint
CALL abort()
```


---

#### addProcessStateChangeListener(address)


**addProcessStateChangeListener(address)**


Adds a ProcessStateChangeListener to listeners collection

```endpoint
CALL addProcessStateChangeListener(address)
```

#### Parameters

```solidity
_listener // the ProcessStateChangeListener to add

```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### completeActivity(bytes32,address)


**completeActivity(bytes32,address)**


Completes the specified activity

```endpoint
CALL completeActivity(bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the activity instance
_service // the BpmService managing this ProcessInstance (required for changes to this ProcessInstance after the activity completes)

```

#### Return

```json
BaseErrors.NO_ERROR() if successfulBaseErrors.RESOURCE_NOT_FOUND() if the activity instance cannot be locatedBaseErrors.INVALID_STATE() if the activity is not in a state to be completed (SUSPENDED or INTERRUPTED)BaseErrors.INVALID_ACTOR() if the msg.sender or tx.origin is not the assignee of the task
```


---

#### completeActivityWithAddressData(bytes32,address,bytes32,address)


**completeActivityWithAddressData(bytes32,address,bytes32,address)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithAddressData(bytes32,address,bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the address value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithBoolData(bytes32,address,bytes32,bool)


**completeActivityWithBoolData(bytes32,address,bytes32,bool)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithBoolData(bytes32,address,bytes32,bool)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the bool value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithBytes32Data(bytes32,address,bytes32,bytes32)


**completeActivityWithBytes32Data(bytes32,address,bytes32,bytes32)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithBytes32Data(bytes32,address,bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the bytes32 value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithIntData(bytes32,address,bytes32,int256)


**completeActivityWithIntData(bytes32,address,bytes32,int256)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithIntData(bytes32,address,bytes32,int256)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the int value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithStringData(bytes32,address,bytes32,string)


**completeActivityWithStringData(bytes32,address,bytes32,string)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithStringData(bytes32,address,bytes32,string)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the string value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithUintData(bytes32,address,bytes32,uint256)


**completeActivityWithUintData(bytes32,address,bytes32,uint256)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithUintData(bytes32,address,bytes32,uint256)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the uint value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### execute(address)


**execute(address)**


Initiates execution of this ProcessInstance consisting of attempting to activate and process any activities and advance the state of the runtime graph.

```endpoint
CALL execute(address)
```

#### Parameters

```solidity
_service // the BpmService managing this ProcessInstance (required for changes to this ProcessInstance and access to the BpmServiceDb)

```

#### Return

```json
error code indicating success or failure
```


---

#### getActivityInDataAsAddress(bytes32,bytes32)


**getActivityInDataAsAddress(bytes32,bytes32)**


Returns the address value of the specified IN data mapping in the context of the given activity instance. Note: This function triggers a REVERT under conditions set in the pre_inDataPermissionCheck(bytes32) modifier!

```endpoint
CALL getActivityInDataAsAddress(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the address value resulting from resolving the data mapping
```


---

#### getActivityInDataAsBool(bytes32,bytes32)


**getActivityInDataAsBool(bytes32,bytes32)**


Returns the bool value of the specified IN data mapping in the context of the given activity instance. Note: This function triggers a REVERT under conditions set in the pre_inDataPermissionCheck(bytes32) modifier!

```endpoint
CALL getActivityInDataAsBool(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the bool value resulting from resolving the data mapping
```


---

#### getActivityInDataAsBytes32(bytes32,bytes32)


**getActivityInDataAsBytes32(bytes32,bytes32)**


Returns the bytes32 value of the specified IN data mapping in the context of the given activity instance. Note: This function triggers a REVERT under conditions set in the pre_inDataPermissionCheck(bytes32) modifier!

```endpoint
CALL getActivityInDataAsBytes32(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the bytes32 value resulting from resolving the data mapping
```


---

#### getActivityInDataAsInt(bytes32,bytes32)


**getActivityInDataAsInt(bytes32,bytes32)**


Returns the int value of the specified IN data mapping in the context of the given activity instance. Note: This function triggers a REVERT under conditions set in the pre_inDataPermissionCheck(bytes32) modifier!

```endpoint
CALL getActivityInDataAsInt(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the int value resulting from resolving the data mapping
```


---

#### getActivityInDataAsString(bytes32,bytes32)


**getActivityInDataAsString(bytes32,bytes32)**


Returns the string value of the specified IN data mapping in the context of the given activity instance. Note: This function triggers a REVERT under conditions set in the pre_inDataPermissionCheck(bytes32) modifier!

```endpoint
CALL getActivityInDataAsString(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the string value resulting from resolving the data mapping
```


---

#### getActivityInDataAsUint(bytes32,bytes32)


**getActivityInDataAsUint(bytes32,bytes32)**


Returns the uint value of the specified IN data mapping in the context of the given activity instance. Note: This function triggers a REVERT under conditions set in the pre_inDataPermissionCheck(bytes32) modifier!

```endpoint
CALL getActivityInDataAsUint(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the uint value resulting from resolving the data mapping
```


---

#### getActivityInstanceAtIndex(uint256)


**getActivityInstanceAtIndex(uint256)**


Returns the globally unique ID of the activity instance at the specified index in the ProcessInstance.

```endpoint
CALL getActivityInstanceAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the bytes32 ID
```


---

#### getActivityInstanceData(bytes32)


**getActivityInstanceData(bytes32)**


Returns information about the activity instance with the specified ID

```endpoint
CALL getActivityInstanceData(bytes32)
```

#### Parameters

```solidity
_id // the global ID of the activity instance

```

#### Return

```json
created - the creation timestampcompleted - the completion timestampperformer - the account who is performing the activity (for interactive activities only)completedBy - the account who completed the activity (for interactive activities only) activityId - the ID of the activity as defined by the process definitionstate - the uint8 representation of the BpmRuntime.ActivityInstanceState of this activity instance
```


---

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope

```

#### Return

```json
fixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeDetailsForKey(bytes32)


**getAddressScopeDetailsForKey(bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetailsForKey(bytes32)
```

#### Parameters

```solidity
_key // a scope key

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeys()


**getAddressScopeKeys()**


Returns the list of keys identifying the address/context scopes.

```endpoint
CALL getAddressScopeKeys()
```

#### Return

```json
the bytes32 scope keys
```


---

#### getArrayLength(bytes32)


**getArrayLength(bytes32)**


Returns the length of an array with the specified ID in this DataStorage.

```endpoint
CALL getArrayLength(bytes32)
```

#### Parameters

```solidity
_id // the ID of an array-type value

```

#### Return

```json
the length of the array
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getNumberOfActivityInstances()


**getNumberOfActivityInstances()**


Returns the number of activity instances currently contained in this ProcessInstance. Note that this number is subject to change as long as the process isntance is not completed.

```endpoint
CALL getNumberOfActivityInstances()
```

#### Return

```json
the number of activity instances
```


---

#### getNumberOfData()


**getNumberOfData()**


Returns the number of data fields in this DataStorage

```endpoint
CALL getNumberOfData()
```

#### Return

```json
uint the size
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getProcessDefinition()


**getProcessDefinition()**


Returns the process definition on which this instance is based.

```endpoint
CALL getProcessDefinition()
```

#### Return

```json
the address of a ProcessDefinition
```


---

#### getStartedBy()


**getStartedBy()**


Returns the account that started this process instance

```endpoint
CALL getStartedBy()
```

#### Return

```json
the address registered when creating the process instance
```


---

#### getState()


**getState()**


Returns the state of this process instance

```endpoint
CALL getState()
```

#### Return

```json
the uint8 representation of the BpmRuntime.ProcessInstanceState
```


---

#### initRuntime()


**initRuntime()**


Initiates the runtime graph that handles the state of this ProcessInstance and activates the start activity. The state of this ProcessInstance must be CREATED. If initiation is successful, the state of this ProcessInstance is set to ACTIVE. Triggers REVERT if the ProcessInstance is not in state CREATED.

```endpoint
CALL initRuntime()
```


---

#### initialize(address,address,bytes32)


**initialize(address,address,bytes32)**


Initializes this DefaultProcessInstance with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. REVERTS if: - the provided ProcessDefinition is NULL

```endpoint
CALL initialize(address,address,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
_processDefinition // the ProcessDefinition which this ProcessInstance should follow
_startedBy // (optional) account which initiated the transaction that started the process. If empty, the msg.sender is registered as having started the process

```


---

#### notifyProcessStateChange()


**notifyProcessStateChange()**


Notifies listeners about a process state change

```endpoint
CALL notifyProcessStateChange()
```


---

#### removeData(bytes32)


**removeData(bytes32)**


Removes the Data identified by the id from the DataMap, if it exists.

```endpoint
CALL removeData(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```


---

#### resolveAddressScope(address,bytes32,address)


**resolveAddressScope(address,bytes32,address)**


Returns the scope qualifier for the given address. If the scope depends on a ConditionalData, the function will attempt to resolve it using the provided DataStorage address. REVERTS if: - the scope is defined by a ConditionalData, but the DataStorage parameter is empty

```endpoint
CALL resolveAddressScope(address,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataStorage // a DataStorage contract to use as a basis if the scope is defined by a ConditionalData

```

#### Return

```json
the scope qualifier or an empty bytes32, if no qualifier is set or cannot be determined
```


---

#### resolveInDataLocation(bytes32,bytes32)


**resolveInDataLocation(bytes32,bytes32)**


Resolves the target storage location for the specified IN data mapping in the context of the given activity instance. REVERTS: if there is no activity instance with the specified ID in this ProcessInstance

```endpoint
CALL resolveInDataLocation(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance
_dataMappingId // the ID of a data mapping defined for the activity

```

#### Return

```json
dataStorage - the address of a DataStoragedataPath - the dataPath under which to find data mapping value
```


---

#### resolveOutDataLocation(bytes32,bytes32)


**resolveOutDataLocation(bytes32,bytes32)**


Resolves the target storage location for the specified OUT data mapping in the context of the given activity instance. REVERTS: if there is no activity instance with the specified ID in this ProcessInstance

```endpoint
CALL resolveOutDataLocation(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance
_dataMappingId // the ID of a data mapping defined for the activity

```

#### Return

```json
dataStorage - the address of a DataStoragedataPath - the dataPath under which to find data mapping value
```


---

#### resolveTransitionCondition(bytes32,bytes32)


**resolveTransitionCondition(bytes32,bytes32)**


Resolves the transition condition identified by the given source and target using the data contained in this ProcessInstance. Both source and target IDs are identifiers from the ProcessGraph and the function therefore takes into account that the target ID could belong to an artificial activity (place) that was inserted to support to successive gateways. If this situation is detected, this function will attempt to determine the correct target ID which was used in the ProcessDefinition (which usually is the transition element following the specified target).

```endpoint
CALL resolveTransitionCondition(bytes32,bytes32)
```

#### Parameters

```solidity
_sourceId // the ID of a graph element that is the source element of a transition (the source always corresponds to a gateway ID in the ProcessDefinition)
_targetId // the ID of a graph element that is the target element of a transition

```

#### Return

```json
true if the transition condition exists and evaluates to true, false otherwise
```


---

#### setActivityOutDataAsAddress(bytes32,bytes32,address)


**setActivityOutDataAsAddress(bytes32,bytes32,address)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance. Note: This function triggers a REVERT under conditions set in the pre_outDataPermissionCheck(bytes32) modifier!

```endpoint
CALL setActivityOutDataAsAddress(bytes32,bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsBool(bytes32,bytes32,bool)


**setActivityOutDataAsBool(bytes32,bytes32,bool)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance. Note: This function triggers a REVERT under conditions set in the pre_outDataPermissionCheck(bytes32) modifier!

```endpoint
CALL setActivityOutDataAsBool(bytes32,bytes32,bool)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsBytes32(bytes32,bytes32,bytes32)


**setActivityOutDataAsBytes32(bytes32,bytes32,bytes32)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance. Note: This function triggers a REVERT under conditions set in the pre_outDataPermissionCheck(bytes32) modifier!

```endpoint
CALL setActivityOutDataAsBytes32(bytes32,bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsInt(bytes32,bytes32,int256)


**setActivityOutDataAsInt(bytes32,bytes32,int256)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance. Note: This function triggers a REVERT under conditions set in the pre_outDataPermissionCheck(bytes32) modifier!

```endpoint
CALL setActivityOutDataAsInt(bytes32,bytes32,int256)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsString(bytes32,bytes32,string)


**setActivityOutDataAsString(bytes32,bytes32,string)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance. Note: This function triggers a REVERT under conditions set in the pre_outDataPermissionCheck(bytes32) modifier!

```endpoint
CALL setActivityOutDataAsString(bytes32,bytes32,string)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsUint(bytes32,bytes32,uint256)


**setActivityOutDataAsUint(bytes32,bytes32,uint256)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance. Note: This function triggers a REVERT under conditions set in the pre_outDataPermissionCheck(bytes32) modifier!

```endpoint
CALL setActivityOutDataAsUint(bytes32,bytes32,uint256)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance managed by this BpmService
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)


**setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)**


Associates the given address with a scope qualifier for a given context. The context can be used to bind the same address to different scenarios and different scopes. The scope can either be represented by a fixed bytes32 value of by a ConditionalData that resolves to a bytes32 field. REVERTS if: - the given address is empty - neither the scope nor valid ConditionalData parameters are provided

```endpoint
CALL setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataPath // the dataPath of a ConditionalData defining the scope
_dataStorage // the dataStorgage address of a ConditionalData defining the scope
_dataStorageId // the dataStorageId of a ConditionalData defining the scope
_fixedScope // a bytes32 representing a fixed scope

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### DefaultProcessModel


The DefaultProcessModel contract is found within the bin bundle.

#### addDataDefinition(bytes32,bytes32,uint8)


**addDataDefinition(bytes32,bytes32,uint8)**


Adds a data definition to this ProcessModel The data definitions are stored under an artificial key derived as the hash of the _dataId and _dataPath parameter values.

```endpoint
CALL addDataDefinition(bytes32,bytes32,uint8)
```

#### Parameters

```solidity
_dataId // the ID of the data object
_dataPath // the path to a data value
_parameterType // the DataTypes.ParameterType of the data object

```


---

#### addParticipant(bytes32,address,bytes32,bytes32,address)


**addParticipant(bytes32,address,bytes32,bytes32,address)**


Adds a participant with the specified ID and attributes to this ProcessModel

```endpoint
CALL addParticipant(bytes32,address,bytes32,bytes32,address)
```

#### Parameters

```solidity
_account // the address of a participant account
_dataPath // the field key under which to locate the conditional participant
_dataStorage // the address of a DataStorage contract to find a conditional participant
_dataStorageId // a field key in a known DataStorage containing an address of another DataStorage contract
_id // the participant ID

```

#### Return

```json
BaseErrors.INVALID_PARAM_VALUE() if both participant and conditional participant are being attempted to be set or if the config for a conditional participant is missing the _dataPathBaseErrors.NO_ERROR() if successful
```


---

#### addProcessInterface(bytes32)


**addProcessInterface(bytes32)**


Adds a process interface declaration to this ProcessModel that process definitions can refer to

```endpoint
CALL addProcessInterface(bytes32)
```

#### Parameters

```solidity
_interfaceId // the ID of the interface

```

#### Return

```json
BaseErrors.RESOURCE_ALREADY_EXISTS() if an interface with the given ID already exists, BaseErrors.NO_ERROR() otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createProcessDefinition(bytes32,address)


**createProcessDefinition(bytes32,address)**


Creates a new process definition with the given parameters in this ProcessModel. REVERTS if: - a ProcessDefinition with the same ID already exists in the ProcessModel - the new ProcessDefinition cannot be added to the #definitions mapping

```endpoint
CALL createProcessDefinition(bytes32,address)
```

#### Parameters

```solidity
_artifactsFinder // an ArtifactFinder instance to create the ObjectProxy
_processDefinitionId // the process definition ID

```

#### Return

```json
newAddress - the address of the new ObjectProxy for the ProcessDefinition when successful
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getAuthor()


**getAuthor()**


Returns model author address

```endpoint
CALL getAuthor()
```

#### Return

```json
the model author
```


---

#### getConditionalParticipant(bytes32,bytes32,address)


**getConditionalParticipant(bytes32,bytes32,address)**


Returns the participant ID in this model that matches the given ConditionalData parameters.

```endpoint
CALL getConditionalParticipant(bytes32,bytes32,address)
```

#### Parameters

```solidity
_dataPath // a data path
_dataStorage // the address of a DataStorage
_dataStorageId // the path to a DataStorage

```

#### Return

```json
the ID of a participant or an empty bytes32, if no matching participant exists
```


---

#### getDataDefinitionDetailsAtIndex(uint256)


**getDataDefinitionDetailsAtIndex(uint256)**


Returns details about the data definition at the given index position REVERTS if: - the index is out of bounds

```endpoint
CALL getDataDefinitionDetailsAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
key - the key of the data definitionparameterType - the uint representation of the DataTypes.ParameterType
```


---

#### getId()


**getId()**


Returns this model's ID

```endpoint
CALL getId()
```

#### Return

```json
the model ID
```


---

#### getModelFileReference()


**getModelFileReference()**


Returns the file reference for the model file

```endpoint
CALL getModelFileReference()
```

#### Return

```json
the external file reference
```


---

#### getNumberOfDataDefinitions()


**getNumberOfDataDefinitions()**


Returns the number of data definitions in the ProcessModel

```endpoint
CALL getNumberOfDataDefinitions()
```

#### Return

```json
the number of data definitions
```


---

#### getNumberOfParticipants()


**getNumberOfParticipants()**


Returns the number of participants defined in this ProcessModel

```endpoint
CALL getNumberOfParticipants()
```

#### Return

```json
the number of participants
```


---

#### getNumberOfProcessDefinitions()


**getNumberOfProcessDefinitions()**


Returns the number of process definitions in this ProcessModel

```endpoint
CALL getNumberOfProcessDefinitions()
```

#### Return

```json
the number of process definitions
```


---

#### getNumberOfProcessInterfaces()


**getNumberOfProcessInterfaces()**


Returns the number of process interfaces declared in this ProcessModel

```endpoint
CALL getNumberOfProcessInterfaces()
```

#### Return

```json
the number of process interfaces
```


---

#### getParticipantAtIndex(uint256)


**getParticipantAtIndex(uint256)**


Returns the ID of the participant at the given index

```endpoint
CALL getParticipantAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the participant ID, if it exists
```


---

#### getParticipantData(bytes32)


**getParticipantData(bytes32)**


Returns information about the participant with the given ID

```endpoint
CALL getParticipantData(bytes32)
```

#### Parameters

```solidity
_id // the participant ID

```

#### Return

```json
location the applications contract address, only available for a service participantmethod the function signature of the participant, only available for a service participantwebForm the form identifier (formHash) of the web participant, only available for a web participant
```


---

#### getProcessDefinition(bytes32)


**getProcessDefinition(bytes32)**


Returns the address of the ProcessDefinition with the specified ID

```endpoint
CALL getProcessDefinition(bytes32)
```

#### Parameters

```solidity
_id // the process ID

```

#### Return

```json
the address of the process definition, if it exists
```


---

#### getProcessDefinitionAtIndex(uint256)


**getProcessDefinitionAtIndex(uint256)**


Returns the address for the ProcessDefinition at the given index

```endpoint
CALL getProcessDefinitionAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the address of the ProcessDefinition, if it exists
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

#### hasParticipant(bytes32)


**hasParticipant(bytes32)**


Returns whether a participant with the specified ID exists in this ProcessModel

```endpoint
CALL hasParticipant(bytes32)
```

#### Parameters

```solidity
_id // the participant ID

```

#### Return

```json
true if it exists, false otherwise
```


---

#### hasProcessInterface(bytes32)


**hasProcessInterface(bytes32)**


Returns whether a process interface with the specified ID exists in this ProcessModel

```endpoint
CALL hasProcessInterface(bytes32)
```

#### Parameters

```solidity
_interfaceId // the interface ID

```

#### Return

```json
true if it exists, false otherwise
```


---

#### initialize(bytes32,uint8[3],address,bool,string)


**initialize(bytes32,uint8[3],address,bool,string)**


Initializes this DefaultProcessModel with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(bytes32,uint8[3],address,bool,string)
```

#### Parameters

```solidity
_author // the model author
_id // the model ID
_isPrivate // indicates if model is visible only to creator
_modelFileReference // the reference to the external model file from which this ProcessModel originated
_version // the model version

```


---

#### isPrivate()


**isPrivate()**


Returns whether the model is private

```endpoint
CALL isPrivate()
```

#### Return

```json
true if the model is private, false otherwise
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

### DefaultProcessModelRepository


The DefaultProcessModelRepository contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### activateModel(address)


**activateModel(address)**


Activates the given ProcessModel and deactivates any previously activated model version of the same ID

```endpoint
CALL activateModel(address)
```

#### Parameters

```solidity
_model // the ProcessModel to activate. REVERTS if: - the given ProcessModel ID and version are not registered in this ProcessModelRepository - there is a registered model with the same ID and version, but the address differs from the given ProcessModel - 

```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createProcessDefinition(address,bytes32)


**createProcessDefinition(address,bytes32)**


Creates a new process definition with the given parameters in the provided ProcessModel.

```endpoint
CALL createProcessDefinition(address,bytes32)
```

#### Parameters

```solidity
_processDefinitionId // the process definition ID
_processModelAddress // the ProcessModel in which to create the ProcessDefinition

```

#### Return

```json
newAddress - the address of the new ProcessDefinition when successful
```


---

#### createProcessModel(bytes32,uint8[3],address,bool,string)


**createProcessModel(bytes32,uint8[3],address,bool,string)**


Factory function to instantiate a ProcessModel. The model is automatically added to this repository.

```endpoint
CALL createProcessModel(bytes32,uint8[3],address,bool,string)
```

#### Parameters

```solidity
_author // the model author
_id // the model ID
_isPrivate // indicates if the model is private
_modelFileReference // the reference to the external model file from which this ProcessModel originated
_version // the model version

```


---

#### getActivityAtIndex(address,address,uint256)


**getActivityAtIndex(address,address,uint256)**


Returns the ID of the ActivityDefinition at the specified index position of the given Process Definition The first param "address" is the model address. It's not named explicitly to avoid compiler warnings due to it not being used.

```endpoint
CALL getActivityAtIndex(address,address,uint256)
```

#### Parameters

```solidity
_index // the index position
_processDefinition // a Process Definition address

```

#### Return

```json
bytes32 the ActivityDefinition ID, if it exists
```


---

#### getActivityData(address,address,bytes32)


**getActivityData(address,address,bytes32)**


Returns information about the activity definition with the given ID. The first param "address" is the model address. It's not named explicitly to avoid compiler warnings due to it not being used.

```endpoint
CALL getActivityData(address,address,bytes32)
```

#### Parameters

```solidity
_id // the bytes32 id of the activity definition
_processDefinition // a Process Definition address

```

#### Return

```json
activityType the BpmModel.ActivityType as uint8taskType the BpmModel.TaskType as uint8taskBehavior the BpmModel.TaskBehavior as uint8assignee the ID of the activity's assignee (for interactive activities)multiInstance whether the activity is a multi-instanceapplication the activity's applicationsubProcessModelId the ID of a process model (for subprocess activities)subProcessDefinitionId the ID of a process definition (for subprocess activities)
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getModel(bytes32)


**getModel(bytes32)**


Returns the address of the activated model with the given ID

```endpoint
CALL getModel(bytes32)
```

#### Parameters

```solidity
_id // the model ID

```

#### Return

```json
the model address, if it exists and has an active version
```


---

#### getModelAtIndex(uint256)


**getModelAtIndex(uint256)**


Returns the address of the ProcessModel at the given index position, if it exists

```endpoint
CALL getModelAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the model address
```


---

#### getModelByVersion(bytes32,uint8[3])


**getModelByVersion(bytes32,uint8[3])**


Returns the address of the model with the given ID and version

```endpoint
CALL getModelByVersion(bytes32,uint8[3])
```

#### Parameters

```solidity
_id // the model ID
_version // the model version

```

#### Return

```json
the model address, if found
```


---

#### getNumberOfActivities(address,address)


**getNumberOfActivities(address,address)**


Returns the number of Activity Definitions in the specified Process Definition The first param "address" is the model address. It's not named explicitly to avoid compiler warnings due to it not being used.

```endpoint
CALL getNumberOfActivities(address,address)
```

#### Parameters

```solidity
_processDefinition // a Process Definition address

```

#### Return

```json
uint - the number of Activity Definitions
```


---

#### getNumberOfModels()


**getNumberOfModels()**


Returns the number of models in this repository.

```endpoint
CALL getNumberOfModels()
```

#### Return

```json
size - the number of models
```


---

#### getNumberOfProcessDefinitions(address)


**getNumberOfProcessDefinitions(address)**


Returns the number of process definitions in the specified model

```endpoint
CALL getNumberOfProcessDefinitions(address)
```

#### Parameters

```solidity
_model // a ProcessModel address

```

#### Return

```json
size - the number of process definitions
```


---

#### getProcessDefinition(bytes32,bytes32)


**getProcessDefinition(bytes32,bytes32)**


Returns the process definition address when the model ID and process definition ID are provided

```endpoint
CALL getProcessDefinition(bytes32,bytes32)
```

#### Parameters

```solidity
_modelId // - the ProcessModel ID

```

#### Return

```json
_processId - the ProcessDefinition IDaddress - the ProcessDefinition address
```


---

#### getProcessDefinitionAtIndex(address,uint256)


**getProcessDefinitionAtIndex(address,uint256)**


Returns the address of the ProcessDefinition at the specified index position of the given model

```endpoint
CALL getProcessDefinitionAtIndex(address,uint256)
```

#### Parameters

```solidity
_idx // the index position
_model // a ProcessModel address

```

#### Return

```json
the ProcessDefinition address, if it exists
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### DefaultTestService Interface


The DefaultTestService Interface contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### DefaultUserAccount


The DefaultUserAccount contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### forwardCall(address,bytes)


**forwardCall(address,bytes)**


Forwards a call to the specified target using the given bytes message.

```endpoint
CALL forwardCall(address,bytes)
```

#### Parameters

```solidity
_payload // the function payload consisting of the 4-bytes function hash and the abi-encoded function parameters which is typically created by calling abi.encodeWithSelector(bytes4, args...) or abi.encodeWithSignature(signatureString, args...) 
_target // the address to call

```

#### Return

```json
returnData - the bytes returned from calling the target function, if successful. REVERTS if: - the target address is empty (0x0) - the target contract threw an exception (reverted). In this case this function will revert using the same reason
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### initialize(address,address)


**initialize(address,address)**


Initializes this DefaultOrganization with the specified owner and/or ecosystem . This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. One or both owner/ecosystem are required to be set to guarantee another entity has control over this UserAccount REVERTS if: - both owner and ecosystem are empty.

```endpoint
CALL initialize(address,address)
```

#### Parameters

```solidity
_ecosystem // address of an ecosystem (optional)
_owner // public external address of individual owner (optional)

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---


### Document Interface


The Document Interface contract is found within the bin bundle.

#### addVersion(string)


**addVersion(string)**


Registers a new document version

```endpoint
CALL addVersion(string)
```

#### Parameters

```solidity
_hash // the hash representing the version being added

```

#### Return

```json
an error code in case of problems
```


---

#### getName()


**getName()**


Returns the document's name

```endpoint
CALL getName()
```

#### Return

```json
the name
```


---

#### getNumberOfVersions()


**getNumberOfVersions()**


Returns the number of versions of this document

```endpoint
CALL getNumberOfVersions()
```

#### Return

```json
the number of versions
```


---

#### getVersionCreated(string)


**getVersionCreated(string)**


Returns the creation date of the specified version hash

```endpoint
CALL getVersionCreated(string)
```

#### Parameters

```solidity
_hash // the desired version

```

#### Return

```json
the creation date, if the version exists
```


---

#### getVersionCreator(string)


**getVersionCreator(string)**


Returns the account of the entity that created the specified version hash

```endpoint
CALL getVersionCreator(string)
```

#### Parameters

```solidity
_hash // the desired version

```

#### Return

```json
the creator's address, if the version exists
```


---


### DougProxy


The DougProxy contract is found within the bin bundle.

#### getDelegate()


**getDelegate()**


Implements AbstractDelegateProxy.getDelegate()

```endpoint
CALL getDelegate()
```

#### Return

```json
the address of the proxied contract
```


---

#### getOwner()


**getOwner()**


Returns the owner of this DougProxy

```endpoint
CALL getOwner()
```

#### Return

```json
the owner address
```


---

#### setProxiedDoug(address)


**setProxiedDoug(address)**


Allows the owner to set the DOUG contract in this proxy to the given address.

```endpoint
CALL setProxiedDoug(address)
```

#### Parameters

```solidity
_doug // the DOUG instance's address to proxy

```


---




### ERC165Utils


The ERC165Utils contract is found within the bin bundle.

#### implementsInterface(address,bytes4)


**implementsInterface(address,bytes4)**


Detects whether the given contract implements the specified ERC165 interface signature. This is a modified implementation of the example in EIP 881 to avoid the use of the "staticcall" opcode. This function performs two invocations: 1. A "call" to the 0x01ffc9a7 function signature to test if it can be invoked 2. If step 1 returns 'true', the contract is cast to ERC165 and the supportsInterface(bytes4) function is invoked

```endpoint
CALL implementsInterface(address,bytes4)
```

#### Parameters

```solidity
_contract // the contract to be examined
_interfaceId // the signature of the interface for which to test

```

#### Return

```json
true if the contract implements the interface, false otherwise
```


---

### Ecosystem Interface


The Ecosystem Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### initialize()


**initialize()**


Initializes this DefaultOrganization with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. Sets the msg.sender as the owner of the Ecosystem

```endpoint
CALL initialize()
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### EcosystemRegistry Interface


The EcosystemRegistry Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createEcosystem(string)


**createEcosystem(string)**


Creates a new Ecosystem with the given name.

```endpoint
CALL createEcosystem(string)
```

#### Parameters

```solidity
_name // the name under which to register the Ecosystem

```

#### Return

```json
the address of the new Ecosystem
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### upgrade(address)


**upgrade(address)**


Performs the necessary steps to upgrade from this contract to the specified new version.

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a contract that replaces this one

```

#### Return

```json
true if successful, false otherwise
```


---

### EcosystemRegistryDb


The EcosystemRegistryDb contract is found within the bin bundle.

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### EcosystemTest Interface


The EcosystemTest Interface contract is found within the bin bundle.

#### testEcosystemLifecycle()


**testEcosystemLifecycle()**


Tests the functions of a single Ecosystem

```endpoint
CALL testEcosystemLifecycle()
```


---

#### testEcosystemRegistry()


**testEcosystemRegistry()**


Tests the EcoystemRegistry

```endpoint
CALL testEcosystemRegistry()
```


---

### Errors Library


The Errors Library contract is found within the bin bundle.

#### format(string,string,string)


**format(string,string,string)**


Format the provided parameters into an error string

```endpoint
CALL format(string,string,string)
```

#### Parameters

```solidity
_code // an error code
_location // a string identifying to origin of the error
_message // an error message

```

#### Return

```json
a concatenated string consisting of the three parameters delimited by the DELIMITER()
```


---

#### logError(bytes32,string,string,string)


**logError(bytes32,string,string,string)**


Logs an error event

```endpoint
CALL logError(bytes32,string,string,string)
```

#### Parameters

```solidity
_code // an error code
_eventId // the identifier to use for the indexed event ID
_location // a string identifying to origin of the error
_message // an error message

```


---

#### revertIf(bool,string,string,string)


**revertIf(bool,string,string,string)**


Wrapper function around a revert that avoids assembling the error message if the condition is false. This function is meant to replace require(condition, ErrorsLib.format(...)) to avoid the cost of assembling an error string before the condition is checked.

```endpoint
CALL revertIf(bool,string,string,string)
```

#### Parameters

```solidity
_code // an error code
_location // a string identifying to origin of the error
_message // an error message

```


---


### IsoCountries Interface


The IsoCountries Interface contract is found within the bin bundle.

#### appendNewVersion(address)


**appendNewVersion(address)**


Appends the given version as the latest in version linked list

```endpoint
CALL appendNewVersion(address)
```

#### Return

```json
error - failure to append due to various reasons
```


---

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getTargetVersion(uint8[3])


**getTargetVersion(uint8[3])**


Retrieves the specified version

```endpoint
CALL getTargetVersion(uint8[3])
```

#### Parameters

```solidity
_targetVer // - the version to retrieve

```

#### Return

```json
targetAddr - address of the version to retrieve, 0x0 if not found
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

#### setLatest(address)


**setLatest(address)**


Sets the latest version, and recursively sets latest for preceeding links

```endpoint
CALL setLatest(address)
```

#### Parameters

```solidity
_latest // - the latest version

```

#### Return

```json
success - representing whether latest was successfully set for all links
```


---

#### setPredecessor()


**setPredecessor()**


Sets the predecessor to msg.sender who should also have the same owner

```endpoint
CALL setPredecessor()
```

#### Return

```json
error - if a predecessor is already set (i.e. no overwriting allowed), or if there is a owner mismatch
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### IsoCountries100 Interface


The IsoCountries100 Interface contract is found within the bin bundle.

#### appendNewVersion(address)


**appendNewVersion(address)**


Appends the given version as the latest in version linked list

```endpoint
CALL appendNewVersion(address)
```

#### Return

```json
error - failure to append due to various reasons
```


---

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getTargetVersion(uint8[3])


**getTargetVersion(uint8[3])**


Retrieves the specified version

```endpoint
CALL getTargetVersion(uint8[3])
```

#### Parameters

```solidity
_targetVer // - the version to retrieve

```

#### Return

```json
targetAddr - address of the version to retrieve, 0x0 if not found
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

#### setLatest(address)


**setLatest(address)**


Sets the latest version, and recursively sets latest for preceeding links

```endpoint
CALL setLatest(address)
```

#### Parameters

```solidity
_latest // - the latest version

```

#### Return

```json
success - representing whether latest was successfully set for all links
```


---

#### setPredecessor()


**setPredecessor()**


Sets the predecessor to msg.sender who should also have the same owner

```endpoint
CALL setPredecessor()
```

#### Return

```json
error - if a predecessor is already set (i.e. no overwriting allowed), or if there is a owner mismatch
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---


### IsoCurrencies Interface


The IsoCurrencies Interface contract is found within the bin bundle.

#### appendNewVersion(address)


**appendNewVersion(address)**


Appends the given version as the latest in version linked list

```endpoint
CALL appendNewVersion(address)
```

#### Return

```json
error - failure to append due to various reasons
```


---

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getTargetVersion(uint8[3])


**getTargetVersion(uint8[3])**


Retrieves the specified version

```endpoint
CALL getTargetVersion(uint8[3])
```

#### Parameters

```solidity
_targetVer // - the version to retrieve

```

#### Return

```json
targetAddr - address of the version to retrieve, 0x0 if not found
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

#### setLatest(address)


**setLatest(address)**


Sets the latest version, and recursively sets latest for preceeding links

```endpoint
CALL setLatest(address)
```

#### Parameters

```solidity
_latest // - the latest version

```

#### Return

```json
success - representing whether latest was successfully set for all links
```


---

#### setPredecessor()


**setPredecessor()**


Sets the predecessor to msg.sender who should also have the same owner

```endpoint
CALL setPredecessor()
```

#### Return

```json
error - if a predecessor is already set (i.e. no overwriting allowed), or if there is a owner mismatch
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### IsoCurrencies100 Interface


The IsoCurrencies100 Interface contract is found within the bin bundle.

#### appendNewVersion(address)


**appendNewVersion(address)**


Appends the given version as the latest in version linked list

```endpoint
CALL appendNewVersion(address)
```

#### Return

```json
error - failure to append due to various reasons
```


---

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getTargetVersion(uint8[3])


**getTargetVersion(uint8[3])**


Retrieves the specified version

```endpoint
CALL getTargetVersion(uint8[3])
```

#### Parameters

```solidity
_targetVer // - the version to retrieve

```

#### Return

```json
targetAddr - address of the version to retrieve, 0x0 if not found
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

#### setLatest(address)


**setLatest(address)**


Sets the latest version, and recursively sets latest for preceeding links

```endpoint
CALL setLatest(address)
```

#### Parameters

```solidity
_latest // - the latest version

```

#### Return

```json
success - representing whether latest was successfully set for all links
```


---

#### setPredecessor()


**setPredecessor()**


Sets the predecessor to msg.sender who should also have the same owner

```endpoint
CALL setPredecessor()
```

#### Return

```json
error - if a predecessor is already set (i.e. no overwriting allowed), or if there is a owner mismatch
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---


### Mappings API Library


The Mappings API Library contract is found within the bin bundle.

#### addToArray(Mappings.AddressAddressArrayMap storage,address,address,bool)


**addToArray(Mappings.AddressAddressArrayMap storage,address,address,bool)**


Adds the specified value to the array that is stored in the map under the given key. The boolean parameter can be used to avoid duplicate values in the array.Note that the array will be automatically initiated even if there was no prior entry at the specified key. If you want to make sure the key is valid, use exists(key).

```endpoint
CALL addToArray(Mappings.AddressAddressArrayMap storage,address,address,bool)
```

#### Parameters

```solidity
_key // the key for the array
_map // the map
_unique // set to true if the value should only be added if it does not already exist in the array
_value // the value to store in the array

```

#### Return

```json
the length of the array after the operation
```


---

#### addToArray(Mappings.AddressBytes32ArrayMap storage,address,bytes32,bool)


**addToArray(Mappings.AddressBytes32ArrayMap storage,address,bytes32,bool)**


Adds the specified value to the array that is stored in the map under the given key. The boolean parameter can be used to avoid duplicate values in the array.Note that the array will be automatically initiated even if there was no prior entry at the specified key. If you want to make sure the key is valid, use exists(key).

```endpoint
CALL addToArray(Mappings.AddressBytes32ArrayMap storage,address,bytes32,bool)
```

#### Parameters

```solidity
_key // the key for the array
_map // the map
_unique // set to true if the value should only be added if it does not already exist in the array
_value // the value to store in the array

```

#### Return

```json
the length of the array after the operation
```


---

#### addToArray(Mappings.Bytes32AddressArrayMap storage,bytes32,address,bool)


**addToArray(Mappings.Bytes32AddressArrayMap storage,bytes32,address,bool)**


Adds the specified value to the array that is stored in the map under the given key. The boolean parameter can be used to avoid duplicate values in the array.Note that the array will be automatically initiated even if there was no prior entry at the specified key. If you want to make sure the key is valid, use exists(key).

```endpoint
CALL addToArray(Mappings.Bytes32AddressArrayMap storage,bytes32,address,bool)
```

#### Parameters

```solidity
_key // the key for the array
_map // the map
_unique // set to true if the value should only be added if it does not already exist in the array
_value // the value to store in the array

```

#### Return

```json
the length of the array after the operation
```


---

#### addToArray(Mappings.UintAddressArrayMap storage,uint256,address,bool)


**addToArray(Mappings.UintAddressArrayMap storage,uint256,address,bool)**


Adds the specified value to the array that is stored in the map under the given key. The boolean parameter can be used to avoid duplicate values in the array.Note that the array will be automatically initiated even if there was no prior entry at the specified key. If you want to make sure the key is valid, use exists(key).

```endpoint
CALL addToArray(Mappings.UintAddressArrayMap storage,uint256,address,bool)
```

#### Parameters

```solidity
_key // the key for the array
_map // the map
_unique // set to true if the value should only be added if it does not already exist in the array
_value // the value to store in the array

```

#### Return

```json
the length of the array after the operation
```


---

#### addToArray(Mappings.UintBytes32ArrayMap storage,uint256,bytes32,bool)


**addToArray(Mappings.UintBytes32ArrayMap storage,uint256,bytes32,bool)**


Adds the specified value to the array that is stored in the map under the given key. The boolean parameter can be used to avoid duplicate values in the array.Note that the array will be automatically initiated even if there was no prior entry at the specified key. If you want to make sure the key is valid, use exists(key).

```endpoint
CALL addToArray(Mappings.UintBytes32ArrayMap storage,uint256,bytes32,bool)
```

#### Parameters

```solidity
_key // the key for the array
_map // the map
_unique // set to true if the value should only be added if it does not already exist in the array
_value // the value to store in the array

```

#### Return

```json
the length of the array after the operation
```


---

#### clear(Mappings.AddressAddressArrayMap storage)


**clear(Mappings.AddressAddressArrayMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.AddressAddressArrayMap storage)
```

#### Parameters

```solidity
_map // the AddressArrayMap

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.AddressAddressMap storage)


**clear(Mappings.AddressAddressMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.AddressAddressMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.AddressBoolMap storage)


**clear(Mappings.AddressBoolMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.AddressBoolMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.AddressBytes32ArrayMap storage)


**clear(Mappings.AddressBytes32ArrayMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.AddressBytes32ArrayMap storage)
```

#### Parameters

```solidity
_map // the AddressBytes32ArrayMap

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.AddressBytes32Map storage)


**clear(Mappings.AddressBytes32Map storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.AddressBytes32Map storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.AddressStringMap storage)


**clear(Mappings.AddressStringMap storage)**


Removes all entries stored in the map.

```endpoint
CALL clear(Mappings.AddressStringMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.Bytes32AddressArrayMap storage)


**clear(Mappings.Bytes32AddressArrayMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.Bytes32AddressArrayMap storage)
```

#### Parameters

```solidity
_map // the AddressArrayMap

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.Bytes32AddressMap storage)


**clear(Mappings.Bytes32AddressMap storage)**


Removes all entries stored in the map.

```endpoint
CALL clear(Mappings.Bytes32AddressMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.Bytes32Bytes32Map storage)


**clear(Mappings.Bytes32Bytes32Map storage)**


Removes all entries stored in the map.

```endpoint
CALL clear(Mappings.Bytes32Bytes32Map storage)
```

#### Parameters

```solidity
_map // the Bytes32Bytes32Map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.Bytes32StringMap storage)


**clear(Mappings.Bytes32StringMap storage)**


Removes all entries stored in the map.

```endpoint
CALL clear(Mappings.Bytes32StringMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.Bytes32UintMap storage)


**clear(Mappings.Bytes32UintMap storage)**


Removes all entries stored in the map.

```endpoint
CALL clear(Mappings.Bytes32UintMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.StringAddressMap storage)


**clear(Mappings.StringAddressMap storage)**


Removes all entries stored in the map.

```endpoint
CALL clear(Mappings.StringAddressMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.UintAddressArrayMap storage)


**clear(Mappings.UintAddressArrayMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.UintAddressArrayMap storage)
```

#### Parameters

```solidity
_map // the AddressArrayMap

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.UintAddressMap storage)


**clear(Mappings.UintAddressMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.UintAddressMap storage)
```

#### Parameters

```solidity
_map // the map

```

#### Return

```json
the number of removed entries
```


---

#### clear(Mappings.UintBytes32ArrayMap storage)


**clear(Mappings.UintBytes32ArrayMap storage)**


Removes all entries stored in the mapping.

```endpoint
CALL clear(Mappings.UintBytes32ArrayMap storage)
```

#### Parameters

```solidity
_map // the AddressArrayMap

```

#### Return

```json
the number of removed entries
```


---

#### exists(Mappings.AddressAddressArrayMap storage,address)


**exists(Mappings.AddressAddressArrayMap storage,address)**

```endpoint
CALL exists(Mappings.AddressAddressArrayMap storage,address)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.AddressAddressMap storage,address)


**exists(Mappings.AddressAddressMap storage,address)**

```endpoint
CALL exists(Mappings.AddressAddressMap storage,address)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.AddressBoolMap storage,address)


**exists(Mappings.AddressBoolMap storage,address)**

```endpoint
CALL exists(Mappings.AddressBoolMap storage,address)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.AddressBytes32ArrayMap storage,address)


**exists(Mappings.AddressBytes32ArrayMap storage,address)**

```endpoint
CALL exists(Mappings.AddressBytes32ArrayMap storage,address)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.AddressBytes32Map storage,address)


**exists(Mappings.AddressBytes32Map storage,address)**

```endpoint
CALL exists(Mappings.AddressBytes32Map storage,address)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.AddressStringMap storage,address)


**exists(Mappings.AddressStringMap storage,address)**


Convenience function to return the row[_key].exists value.

```endpoint
CALL exists(Mappings.AddressStringMap storage,address)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.Bytes32AddressArrayMap storage,bytes32)


**exists(Mappings.Bytes32AddressArrayMap storage,bytes32)**

```endpoint
CALL exists(Mappings.Bytes32AddressArrayMap storage,bytes32)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.Bytes32AddressMap storage,bytes32)


**exists(Mappings.Bytes32AddressMap storage,bytes32)**


Convenience function to return the row[_key].exists value.

```endpoint
CALL exists(Mappings.Bytes32AddressMap storage,bytes32)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.Bytes32Bytes32Map storage,bytes32)


**exists(Mappings.Bytes32Bytes32Map storage,bytes32)**


Convenience function to return the row[_key].exists value.

```endpoint
CALL exists(Mappings.Bytes32Bytes32Map storage,bytes32)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.Bytes32StringMap storage,bytes32)


**exists(Mappings.Bytes32StringMap storage,bytes32)**


Convenience function to return the row[_key].exists value.

```endpoint
CALL exists(Mappings.Bytes32StringMap storage,bytes32)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.Bytes32UintMap storage,bytes32)


**exists(Mappings.Bytes32UintMap storage,bytes32)**


Convenience function to return the row[_key].exists value.

```endpoint
CALL exists(Mappings.Bytes32UintMap storage,bytes32)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.StringAddressMap storage,string)


**exists(Mappings.StringAddressMap storage,string)**


Convenience function to return the row[_key].exists value.

```endpoint
CALL exists(Mappings.StringAddressMap storage,string)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.UintAddressArrayMap storage,uint256)


**exists(Mappings.UintAddressArrayMap storage,uint256)**

```endpoint
CALL exists(Mappings.UintAddressArrayMap storage,uint256)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.UintAddressMap storage,uint256)


**exists(Mappings.UintAddressMap storage,uint256)**

```endpoint
CALL exists(Mappings.UintAddressMap storage,uint256)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### exists(Mappings.UintBytes32ArrayMap storage,uint256)


**exists(Mappings.UintBytes32ArrayMap storage,uint256)**

```endpoint
CALL exists(Mappings.UintBytes32ArrayMap storage,uint256)
```

#### Return

```json
true if the map contains valid values at the specified key, false otherwise.
```


---

#### get(Mappings.AddressAddressArrayMap storage,address)


**get(Mappings.AddressAddressArrayMap storage,address)**


Retrieves the address array in the map at the specified key.

```endpoint
CALL get(Mappings.AddressAddressArrayMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the addresses array value registered at the specified key, or empty address[] if it doesn't exist
```


---

#### get(Mappings.AddressAddressMap storage,address)


**get(Mappings.AddressAddressMap storage,address)**

```endpoint
CALL get(Mappings.AddressAddressMap storage,address)
```

#### Return

```json
the value registered at the specified key, or 0x0 if it doesn't exist
```


---

#### get(Mappings.AddressBoolMap storage,address)


**get(Mappings.AddressBoolMap storage,address)**

```endpoint
CALL get(Mappings.AddressBoolMap storage,address)
```

#### Return

```json
the value registered at the specified key, or an empty bool if it doesn't exist
```


---

#### get(Mappings.AddressBytes32ArrayMap storage,address)


**get(Mappings.AddressBytes32ArrayMap storage,address)**


Retrieves the bytes32 array in the map at the specified key.

```endpoint
CALL get(Mappings.AddressBytes32ArrayMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressBytes32ArrayMap

```

#### Return

```json
the addresses array value registered at the specified key, or empty bytes32[] if it doesn't exist
```


---

#### get(Mappings.AddressBytes32Map storage,address)


**get(Mappings.AddressBytes32Map storage,address)**

```endpoint
CALL get(Mappings.AddressBytes32Map storage,address)
```

#### Return

```json
the value registered at the specified key, or an empty bytes32 if it doesn't exist
```


---

#### get(Mappings.AddressStringMap storage,address)


**get(Mappings.AddressStringMap storage,address)**

```endpoint
CALL get(Mappings.AddressStringMap storage,address)
```

#### Return

```json
the value registered at the specified key, or an empty string if it doesn't exist
```


---

#### get(Mappings.Bytes32AddressArrayMap storage,bytes32)


**get(Mappings.Bytes32AddressArrayMap storage,bytes32)**


Retrieves the address array in the map at the specified key.

```endpoint
CALL get(Mappings.Bytes32AddressArrayMap storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the addresses array value registered at the specified key, or empty address[] if it doesn't exist
```


---

#### get(Mappings.Bytes32AddressMap storage,bytes32)


**get(Mappings.Bytes32AddressMap storage,bytes32)**

```endpoint
CALL get(Mappings.Bytes32AddressMap storage,bytes32)
```

#### Return

```json
the value registered at the specified key, or 0x0 if it doesn't exist
```


---

#### get(Mappings.Bytes32Bytes32Map storage,bytes32)


**get(Mappings.Bytes32Bytes32Map storage,bytes32)**

```endpoint
CALL get(Mappings.Bytes32Bytes32Map storage,bytes32)
```

#### Return

```json
the value registered at the specified key, or 0x0 if it doesn't exist
```


---

#### get(Mappings.Bytes32StringMap storage,bytes32)


**get(Mappings.Bytes32StringMap storage,bytes32)**

```endpoint
CALL get(Mappings.Bytes32StringMap storage,bytes32)
```

#### Return

```json
the value registered at the specified key, or an empty string if it doesn't exist
```


---

#### get(Mappings.Bytes32UintMap storage,bytes32)


**get(Mappings.Bytes32UintMap storage,bytes32)**

```endpoint
CALL get(Mappings.Bytes32UintMap storage,bytes32)
```

#### Return

```json
the value registered at the specified key
```


---

#### get(Mappings.StringAddressMap storage,string)


**get(Mappings.StringAddressMap storage,string)**

```endpoint
CALL get(Mappings.StringAddressMap storage,string)
```

#### Return

```json
the value registered at the specified key, or 0x0 if it doesn't exist
```


---

#### get(Mappings.UintAddressArrayMap storage,uint256)


**get(Mappings.UintAddressArrayMap storage,uint256)**


Retrieves the address array in the map at the specified key.

```endpoint
CALL get(Mappings.UintAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the addresses array value registered at the specified key, or empty address[] if it doesn't exist
```


---

#### get(Mappings.UintAddressMap storage,uint256)


**get(Mappings.UintAddressMap storage,uint256)**

```endpoint
CALL get(Mappings.UintAddressMap storage,uint256)
```

#### Return

```json
the value registered at the specified key, or 0x0 if it doesn't exist
```


---

#### get(Mappings.UintBytes32ArrayMap storage,uint256)


**get(Mappings.UintBytes32ArrayMap storage,uint256)**


Retrieves the address array in the map at the specified key.

```endpoint
CALL get(Mappings.UintBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the addresses array value registered at the specified key, or empty bytes32[] if it doesn't exist
```


---

#### insert(Mappings.AddressAddressArrayMap storage,address,address[])


**insert(Mappings.AddressAddressArrayMap storage,address,address[])**


Inserts the given address array value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.AddressAddressArrayMap storage,address,address[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_ALREADY_EXISTS()
```


---

#### insert(Mappings.AddressAddressMap storage,address,address)


**insert(Mappings.AddressAddressMap storage,address,address)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.AddressAddressMap storage,address,address)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.AddressBoolMap storage,address,bool)


**insert(Mappings.AddressBoolMap storage,address,bool)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.AddressBoolMap storage,address,bool)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.AddressBytes32ArrayMap storage,address,bytes32[])


**insert(Mappings.AddressBytes32ArrayMap storage,address,bytes32[])**


Inserts the given bytes32 array value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.AddressBytes32ArrayMap storage,address,bytes32[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_ALREADY_EXISTS()
```


---

#### insert(Mappings.AddressBytes32Map storage,address,bytes32)


**insert(Mappings.AddressBytes32Map storage,address,bytes32)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.AddressBytes32Map storage,address,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.AddressStringMap storage,address,string)


**insert(Mappings.AddressStringMap storage,address,string)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.AddressStringMap storage,address,string)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.Bytes32AddressArrayMap storage,bytes32,address[])


**insert(Mappings.Bytes32AddressArrayMap storage,bytes32,address[])**


Inserts the given address array value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.Bytes32AddressArrayMap storage,bytes32,address[])
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_ALREADY_EXISTS()
```


---

#### insert(Mappings.Bytes32AddressMap storage,bytes32,address)


**insert(Mappings.Bytes32AddressMap storage,bytes32,address)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.Bytes32AddressMap storage,bytes32,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.Bytes32Bytes32Map storage,bytes32,bytes32)


**insert(Mappings.Bytes32Bytes32Map storage,bytes32,bytes32)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.Bytes32Bytes32Map storage,bytes32,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the Bytes32Bytes32Map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.Bytes32StringMap storage,bytes32,string)


**insert(Mappings.Bytes32StringMap storage,bytes32,string)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.Bytes32StringMap storage,bytes32,string)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.Bytes32UintMap storage,bytes32,uint256)


**insert(Mappings.Bytes32UintMap storage,bytes32,uint256)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.Bytes32UintMap storage,bytes32,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the Uint Map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.StringAddressMap storage,string,address)


**insert(Mappings.StringAddressMap storage,string,address)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.StringAddressMap storage,string,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.UintAddressArrayMap storage,uint256,address[])


**insert(Mappings.UintAddressArrayMap storage,uint256,address[])**


Inserts the given address array value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.UintAddressArrayMap storage,uint256,address[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_ALREADY_EXISTS()
```


---

#### insert(Mappings.UintAddressMap storage,uint256,address)


**insert(Mappings.UintAddressMap storage,uint256,address)**


Inserts the given value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.UintAddressMap storage,uint256,address)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_ALREADY_EXISTS
```


---

#### insert(Mappings.UintBytes32ArrayMap storage,uint256,bytes32[])


**insert(Mappings.UintBytes32ArrayMap storage,uint256,bytes32[])**


Inserts the given bytes32 array value at the specified key in the provided map, but only if the key does not exist, yet. The `insert` function essentially behaves like a database insert in that it avoids entering duplicate keys. In most cases you'd want to use `insertOrUpdate(...)`

```endpoint
CALL insert(Mappings.UintBytes32ArrayMap storage,uint256,bytes32[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_ALREADY_EXISTS()
```


---

#### insertOrUpdate(Mappings.AddressAddressArrayMap storage,address,address[])


**insertOrUpdate(Mappings.AddressAddressArrayMap storage,address,address[])**


Inserts or updates the given address array value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.AddressAddressArrayMap storage,address,address[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.AddressAddressMap storage,address,address)


**insertOrUpdate(Mappings.AddressAddressMap storage,address,address)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.AddressAddressMap storage,address,address)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.AddressBoolMap storage,address,bool)


**insertOrUpdate(Mappings.AddressBoolMap storage,address,bool)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.AddressBoolMap storage,address,bool)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.AddressBytes32ArrayMap storage,address,bytes32[])


**insertOrUpdate(Mappings.AddressBytes32ArrayMap storage,address,bytes32[])**


Inserts or updates the given address array value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.AddressBytes32ArrayMap storage,address,bytes32[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.AddressBytes32Map storage,address,bytes32)


**insertOrUpdate(Mappings.AddressBytes32Map storage,address,bytes32)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.AddressBytes32Map storage,address,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.AddressStringMap storage,address,string)


**insertOrUpdate(Mappings.AddressStringMap storage,address,string)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.AddressStringMap storage,address,string)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.Bytes32AddressArrayMap storage,bytes32,address[])


**insertOrUpdate(Mappings.Bytes32AddressArrayMap storage,bytes32,address[])**


Inserts or updates the given address array value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.Bytes32AddressArrayMap storage,bytes32,address[])
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.Bytes32AddressMap storage,bytes32,address)


**insertOrUpdate(Mappings.Bytes32AddressMap storage,bytes32,address)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.Bytes32AddressMap storage,bytes32,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.Bytes32Bytes32Map storage,bytes32,bytes32)


**insertOrUpdate(Mappings.Bytes32Bytes32Map storage,bytes32,bytes32)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.Bytes32Bytes32Map storage,bytes32,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the Bytes32Bytes32Map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.Bytes32StringMap storage,bytes32,string)


**insertOrUpdate(Mappings.Bytes32StringMap storage,bytes32,string)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.Bytes32StringMap storage,bytes32,string)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.Bytes32UintMap storage,bytes32,uint256)


**insertOrUpdate(Mappings.Bytes32UintMap storage,bytes32,uint256)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.Bytes32UintMap storage,bytes32,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the Uint Map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.StringAddressMap storage,string,address)


**insertOrUpdate(Mappings.StringAddressMap storage,string,address)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.StringAddressMap storage,string,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.UintAddressArrayMap storage,uint256,address[])


**insertOrUpdate(Mappings.UintAddressArrayMap storage,uint256,address[])**


Inserts or updates the given address array value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.UintAddressArrayMap storage,uint256,address[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.UintAddressMap storage,uint256,address)


**insertOrUpdate(Mappings.UintAddressMap storage,uint256,address)**


Inserts or updates the given value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.UintAddressMap storage,uint256,address)
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### insertOrUpdate(Mappings.UintBytes32ArrayMap storage,uint256,bytes32[])


**insertOrUpdate(Mappings.UintBytes32ArrayMap storage,uint256,bytes32[])**


Inserts or updates the given address array value at the specified key in the provided map.

```endpoint
CALL insertOrUpdate(Mappings.UintBytes32ArrayMap storage,uint256,bytes32[])
```

#### Parameters

```solidity
_key // the key
_map // the map
_value // the value

```

#### Return

```json
the size of the map after the operation
```


---

#### keyAtIndex(Mappings.AddressAddressArrayMap storage,uint256)


**keyAtIndex(Mappings.AddressAddressArrayMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.AddressAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.AddressAddressMap storage,uint256)


**keyAtIndex(Mappings.AddressAddressMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.AddressAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), 0x0)
```


---

#### keyAtIndex(Mappings.AddressBoolMap storage,uint256)


**keyAtIndex(Mappings.AddressBoolMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.AddressBoolMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), 0x0)
```


---

#### keyAtIndex(Mappings.AddressBytes32ArrayMap storage,uint256)


**keyAtIndex(Mappings.AddressBytes32ArrayMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.AddressBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressBytes32ArrayMap

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.AddressBytes32Map storage,uint256)


**keyAtIndex(Mappings.AddressBytes32Map storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.AddressBytes32Map storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), 0x0)
```


---

#### keyAtIndex(Mappings.AddressStringMap storage,uint256)


**keyAtIndex(Mappings.AddressStringMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.AddressStringMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.Bytes32AddressArrayMap storage,uint256)


**keyAtIndex(Mappings.Bytes32AddressArrayMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.Bytes32AddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.Bytes32AddressMap storage,uint256)


**keyAtIndex(Mappings.Bytes32AddressMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.Bytes32AddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.Bytes32Bytes32Map storage,uint256)


**keyAtIndex(Mappings.Bytes32Bytes32Map storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.Bytes32Bytes32Map storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the Bytes32Bytes32Map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.Bytes32StringMap storage,uint256)


**keyAtIndex(Mappings.Bytes32StringMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.Bytes32StringMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.Bytes32UintMap storage,uint256)


**keyAtIndex(Mappings.Bytes32UintMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.Bytes32UintMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.StringAddressMap storage,uint256)


**keyAtIndex(Mappings.StringAddressMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.StringAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.UintAddressArrayMap storage,uint256)


**keyAtIndex(Mappings.UintAddressArrayMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.UintAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndex(Mappings.UintAddressMap storage,uint256)


**keyAtIndex(Mappings.UintAddressMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.UintAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), uint(-1))
```


---

#### keyAtIndex(Mappings.UintBytes32ArrayMap storage,uint256)


**keyAtIndex(Mappings.UintBytes32ArrayMap storage,uint256)**


Retrieves the key at the given index, if it exists.

```endpoint
CALL keyAtIndex(Mappings.UintBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
(BaseErrors.NO_ERROR(), key) or (BaseErrors.INDEX_OUT_OF_BOUNDS(), "")
```


---

#### keyAtIndexHasNext(Mappings.AddressAddressArrayMap storage,uint256)


**keyAtIndexHasNext(Mappings.AddressAddressArrayMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.AddressAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or 0x0nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.AddressAddressMap storage,uint256)


**keyAtIndexHasNext(Mappings.AddressAddressMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.AddressAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or 0x0nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.AddressBoolMap storage,uint256)


**keyAtIndexHasNext(Mappings.AddressBoolMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.AddressBoolMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or 0x0nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.AddressBytes32ArrayMap storage,uint256)


**keyAtIndexHasNext(Mappings.AddressBytes32ArrayMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.AddressBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or uint(-1)nextIndex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.AddressBytes32Map storage,uint256)


**keyAtIndexHasNext(Mappings.AddressBytes32Map storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.AddressBytes32Map storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or 0x0nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.AddressStringMap storage,uint256)


**keyAtIndexHasNext(Mappings.AddressStringMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.AddressStringMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or ""nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.Bytes32AddressArrayMap storage,uint256)


**keyAtIndexHasNext(Mappings.Bytes32AddressArrayMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.Bytes32AddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or ""nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.Bytes32AddressMap storage,uint256)


**keyAtIndexHasNext(Mappings.Bytes32AddressMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.Bytes32AddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or ""nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.Bytes32Bytes32Map storage,uint256)


**keyAtIndexHasNext(Mappings.Bytes32Bytes32Map storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.Bytes32Bytes32Map storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the Bytes32Bytes32Map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or ""nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.Bytes32StringMap storage,uint256)


**keyAtIndexHasNext(Mappings.Bytes32StringMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.Bytes32StringMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or ""nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.Bytes32UintMap storage,uint256)


**keyAtIndexHasNext(Mappings.Bytes32UintMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.Bytes32UintMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or ""nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.StringAddressMap storage,uint256)


**keyAtIndexHasNext(Mappings.StringAddressMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.StringAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or ""nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.UintAddressArrayMap storage,uint256)


**keyAtIndexHasNext(Mappings.UintAddressArrayMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.UintAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or uint(-1)nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.UintAddressMap storage,uint256)


**keyAtIndexHasNext(Mappings.UintAddressMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.UintAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or uint(-1)nextindex the next index if there is one or 0
```


---

#### keyAtIndexHasNext(Mappings.UintBytes32ArrayMap storage,uint256)


**keyAtIndexHasNext(Mappings.UintBytes32ArrayMap storage,uint256)**


Retrieves the key at the given index position and the index of the next artifact.

```endpoint
CALL keyAtIndexHasNext(Mappings.UintBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
error BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS()key the key or uint(-1)nextindex the next index if there is one or 0
```


---

#### keyIndex(Mappings.AddressAddressArrayMap storage,address)


**keyIndex(Mappings.AddressAddressArrayMap storage,address)**


Retrieves the index of the specified key.

```endpoint
CALL keyIndex(Mappings.AddressAddressArrayMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.AddressAddressMap storage,address)


**keyIndex(Mappings.AddressAddressMap storage,address)**

```endpoint
CALL keyIndex(Mappings.AddressAddressMap storage,address)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.AddressBoolMap storage,address)


**keyIndex(Mappings.AddressBoolMap storage,address)**

```endpoint
CALL keyIndex(Mappings.AddressBoolMap storage,address)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.AddressBytes32ArrayMap storage,address)


**keyIndex(Mappings.AddressBytes32ArrayMap storage,address)**


Retrieves the index of the specified key.

```endpoint
CALL keyIndex(Mappings.AddressBytes32ArrayMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressBytes32ArrayMap

```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.AddressBytes32Map storage,address)


**keyIndex(Mappings.AddressBytes32Map storage,address)**

```endpoint
CALL keyIndex(Mappings.AddressBytes32Map storage,address)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.AddressStringMap storage,address)


**keyIndex(Mappings.AddressStringMap storage,address)**

```endpoint
CALL keyIndex(Mappings.AddressStringMap storage,address)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.Bytes32AddressArrayMap storage,bytes32)


**keyIndex(Mappings.Bytes32AddressArrayMap storage,bytes32)**


Retrieves the index of the specified key.

```endpoint
CALL keyIndex(Mappings.Bytes32AddressArrayMap storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.Bytes32AddressMap storage,bytes32)


**keyIndex(Mappings.Bytes32AddressMap storage,bytes32)**

```endpoint
CALL keyIndex(Mappings.Bytes32AddressMap storage,bytes32)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.Bytes32Bytes32Map storage,bytes32)


**keyIndex(Mappings.Bytes32Bytes32Map storage,bytes32)**

```endpoint
CALL keyIndex(Mappings.Bytes32Bytes32Map storage,bytes32)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.Bytes32StringMap storage,bytes32)


**keyIndex(Mappings.Bytes32StringMap storage,bytes32)**

```endpoint
CALL keyIndex(Mappings.Bytes32StringMap storage,bytes32)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.Bytes32UintMap storage,bytes32)


**keyIndex(Mappings.Bytes32UintMap storage,bytes32)**

```endpoint
CALL keyIndex(Mappings.Bytes32UintMap storage,bytes32)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.StringAddressMap storage,string)


**keyIndex(Mappings.StringAddressMap storage,string)**

```endpoint
CALL keyIndex(Mappings.StringAddressMap storage,string)
```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.UintAddressArrayMap storage,uint256)


**keyIndex(Mappings.UintAddressArrayMap storage,uint256)**


Retrieves the index of the specified key.

```endpoint
CALL keyIndex(Mappings.UintAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.UintAddressMap storage,uint256)


**keyIndex(Mappings.UintAddressMap storage,uint256)**


Retrieves the index of the specified key.

```endpoint
CALL keyIndex(Mappings.UintAddressMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### keyIndex(Mappings.UintBytes32ArrayMap storage,uint256)


**keyIndex(Mappings.UintBytes32ArrayMap storage,uint256)**


Retrieves the index of the specified key.

```endpoint
CALL keyIndex(Mappings.UintBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
the index of the given key or int_constant uint(-1) if the key does not exist
```


---

#### remove(Mappings.AddressAddressArrayMap storage,address)


**remove(Mappings.AddressAddressArrayMap storage,address)**


Removes the address array registered at the specified key in the provided map.the _map.keys array might get re-ordered by this operation: if the removed entry was not the last element in the map's keys, the last element will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.AddressAddressArrayMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_NOT_FOUND().
```


---

#### remove(Mappings.AddressAddressMap storage,address)


**remove(Mappings.AddressAddressMap storage,address)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.AddressAddressMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.AddressBoolMap storage,address)


**remove(Mappings.AddressBoolMap storage,address)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.AddressBoolMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.AddressBytes32ArrayMap storage,address)


**remove(Mappings.AddressBytes32ArrayMap storage,address)**


Removes the bytes32 array registered at the specified key in the provided map.the _map.keys array might get re-ordered by this operation: if the removed entry was not the last element in the map's keys, the last element will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.AddressBytes32ArrayMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_NOT_FOUND().
```


---

#### remove(Mappings.AddressBytes32Map storage,address)


**remove(Mappings.AddressBytes32Map storage,address)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.AddressBytes32Map storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.AddressStringMap storage,address)


**remove(Mappings.AddressStringMap storage,address)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.AddressStringMap storage,address)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.Bytes32AddressArrayMap storage,bytes32)


**remove(Mappings.Bytes32AddressArrayMap storage,bytes32)**


Removes the address array registered at the specified key in the provided map.the _map.keys array might get re-ordered by this operation: if the removed entry was not the last element in the map's keys, the last element will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.Bytes32AddressArrayMap storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_NOT_FOUND().
```


---

#### remove(Mappings.Bytes32AddressMap storage,bytes32)


**remove(Mappings.Bytes32AddressMap storage,bytes32)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.Bytes32AddressMap storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.Bytes32Bytes32Map storage,bytes32)


**remove(Mappings.Bytes32Bytes32Map storage,bytes32)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.Bytes32Bytes32Map storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the Bytes32Bytes32Map

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.Bytes32StringMap storage,bytes32)


**remove(Mappings.Bytes32StringMap storage,bytes32)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.Bytes32StringMap storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.Bytes32UintMap storage,bytes32)


**remove(Mappings.Bytes32UintMap storage,bytes32)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.Bytes32UintMap storage,bytes32)
```

#### Parameters

```solidity
_key // the key
_map // the Uint Map

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.StringAddressMap storage,string)


**remove(Mappings.StringAddressMap storage,string)**


Removes the entry registered at the specified key in the provided map.the _map.keys array may get re-ordered by this operation: unless the removed entry was the last element in the map's keys, the last key will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.StringAddressMap storage,string)
```

#### Parameters

```solidity
_key // the key
_map // the AddressMap

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.UintAddressArrayMap storage,uint256)


**remove(Mappings.UintAddressArrayMap storage,uint256)**


Removes the address array registered at the specified key in the provided map.the _map.keys array might get re-ordered by this operation: if the removed entry was not the last element in the map's keys, the last element will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.UintAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_NOT_FOUND().
```


---

#### remove(Mappings.UintAddressMap storage,uint256)


**remove(Mappings.UintAddressMap storage,uint256)**


Removes the entry registered at the specified key in the provided map.the _map.keys array might get re-ordered by this operation: if the removed entry was not the last element in the map's keys, the last element will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.UintAddressMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR or BaseErrors.RESOURCE_NOT_FOUND.
```


---

#### remove(Mappings.UintBytes32ArrayMap storage,uint256)


**remove(Mappings.UintBytes32ArrayMap storage,uint256)**


Removes the address array registered at the specified key in the provided map.the _map.keys array might get re-ordered by this operation: if the removed entry was not the last element in the map's keys, the last element will be moved into the void position created by the removal.

```endpoint
CALL remove(Mappings.UintBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_key // the key
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.RESOURCE_NOT_FOUND().
```


---

#### removeFromArray(Mappings.AddressAddressArrayMap storage,address,address,bool)


**removeFromArray(Mappings.AddressAddressArrayMap storage,address,address,bool)**


Removes the given value from the inner array in the given map structure. The bool parameter controls if 'all' occurences of the value should be deleted.Searching for the value to be deleted starts at the end of the array, but LIFO is not guaranteed, because entries can be moved around as part of this function, i.e. when the deletion does not happen to be at the end of the array, the last entry is swapped into position of the deleted item and the array is truncated at the end.

```endpoint
CALL removeFromArray(Mappings.AddressAddressArrayMap storage,address,address,bool)
```

#### Parameters

```solidity
_all // if true, the entire array will be traversed and all occurences deleted, if false only the first encountered one
_key // the key for the array
_map // the map
_value // the value to be deleted in the array

```

#### Return

```json
the resulting array length
```


---

#### removeFromArray(Mappings.AddressBytes32ArrayMap storage,address,bytes32,bool)


**removeFromArray(Mappings.AddressBytes32ArrayMap storage,address,bytes32,bool)**


Removes the given value from the inner array in the given map structure. The bool parameter controls if 'all' occurences of the value should be deleted.Searching for the value to be deleted starts at the end of the array, but LIFO is not guaranteed, because entries can be moved around as part of this function, i.e. when the deletion does not happen to be at the end of the array, the last entry is swapped into position of the deleted item and the array is truncated at the end.

```endpoint
CALL removeFromArray(Mappings.AddressBytes32ArrayMap storage,address,bytes32,bool)
```

#### Parameters

```solidity
_all // if true, the entire array will be traversed and all occurences deleted, if false only the first encountered one
_key // the key for the array
_map // the map
_value // the value to be deleted in the array

```

#### Return

```json
the resulting array length
```


---

#### removeFromArray(Mappings.Bytes32AddressArrayMap storage,bytes32,address,bool)


**removeFromArray(Mappings.Bytes32AddressArrayMap storage,bytes32,address,bool)**


Removes the given value from the inner array in the given map structure. The bool parameter controls if 'all' occurences of the value should be deleted.Searching for the value to be deleted starts at the end of the array, but LIFO is not guaranteed, because entries can be moved around as part of this function, i.e. when the deletion does not happen to be at the end of the array, the last entry is swapped into position of the deleted item and the array is truncated at the end.

```endpoint
CALL removeFromArray(Mappings.Bytes32AddressArrayMap storage,bytes32,address,bool)
```

#### Parameters

```solidity
_all // if true, the entire array will be traversed and all occurences deleted, if false only the first encountered one
_key // the key for the array
_map // the map
_value // the value to be deleted in the array

```

#### Return

```json
the resulting array length
```


---

#### removeFromArray(Mappings.UintAddressArrayMap storage,uint256,address,bool)


**removeFromArray(Mappings.UintAddressArrayMap storage,uint256,address,bool)**


Removes the given value from the inner array in the given map structure. The bool parameter controls if 'all' occurences of the value should be deleted.Searching for the value to be deleted starts at the end of the array, but LIFO is not guaranteed, because entries can be moved around as part of this function, i.e. when the deletion does not happen to be at the end of the array, the last entry is swapped into position of the deleted item and the array is truncated at the end.

```endpoint
CALL removeFromArray(Mappings.UintAddressArrayMap storage,uint256,address,bool)
```

#### Parameters

```solidity
_all // if true, the entire array will be traversed and all occurences deleted, if false only the first encountered one
_key // the key for the array
_map // the map
_value // the value to be deleted in the array

```

#### Return

```json
the resulting array length
```


---

#### removeFromArray(Mappings.UintBytes32ArrayMap storage,uint256,bytes32,bool)


**removeFromArray(Mappings.UintBytes32ArrayMap storage,uint256,bytes32,bool)**


Removes the given value from the inner array in the given map structure. The bool parameter controls if 'all' occurences of the value should be deleted.Searching for the value to be deleted starts at the end of the array, but LIFO is not guaranteed, because entries can be moved around as part of this function, i.e. when the deletion does not happen to be at the end of the array, the last entry is swapped into position of the deleted item and the array is truncated at the end.

```endpoint
CALL removeFromArray(Mappings.UintBytes32ArrayMap storage,uint256,bytes32,bool)
```

#### Parameters

```solidity
_all // if true, the entire array will be traversed and all occurences deleted, if false only the first encountered one
_key // the key for the array
_map // the map
_value // the value to be deleted in the array

```

#### Return

```json
the resulting array length
```


---

#### valueAtIndexHasNext(Mappings.AddressAddressArrayMap storage,uint256)


**valueAtIndexHasNext(Mappings.AddressAddressArrayMap storage,uint256)**


Retrieves the array at the given index position and the index of the next array.Internal function to retrieve the value and nextIndex from a given Map

```endpoint
CALL valueAtIndexHasNext(Mappings.AddressAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value or address[], and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.AddressAddressMap storage,uint256)


**valueAtIndexHasNext(Mappings.AddressAddressMap storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.AddressAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.AddressBoolMap storage,uint256)


**valueAtIndexHasNext(Mappings.AddressBoolMap storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.AddressBoolMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.AddressBytes32ArrayMap storage,uint256)


**valueAtIndexHasNext(Mappings.AddressBytes32ArrayMap storage,uint256)**


Retrieves the array at the given index position and the index of the next array.Internal function to retrieve the value and nextIndex from a given Map

```endpoint
CALL valueAtIndexHasNext(Mappings.AddressBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value or bytes32[], and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.AddressBytes32Map storage,uint256)


**valueAtIndexHasNext(Mappings.AddressBytes32Map storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.AddressBytes32Map storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.AddressStringMap storage,uint256)


**valueAtIndexHasNext(Mappings.AddressStringMap storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.AddressStringMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.Bytes32AddressArrayMap storage,uint256)


**valueAtIndexHasNext(Mappings.Bytes32AddressArrayMap storage,uint256)**


Retrieves the array at the given index position and the index of the next array.Internal function to retrieve the value and nextIndex from a given Map

```endpoint
CALL valueAtIndexHasNext(Mappings.Bytes32AddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value or address[], and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.Bytes32AddressMap storage,uint256)


**valueAtIndexHasNext(Mappings.Bytes32AddressMap storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.Bytes32AddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.Bytes32Bytes32Map storage,uint256)


**valueAtIndexHasNext(Mappings.Bytes32Bytes32Map storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.Bytes32Bytes32Map storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the Bytes32Bytes32Map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.Bytes32StringMap storage,uint256)


**valueAtIndexHasNext(Mappings.Bytes32StringMap storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.Bytes32StringMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.Bytes32UintMap storage,uint256)


**valueAtIndexHasNext(Mappings.Bytes32UintMap storage,uint256)**


Retrieves the value at the given index position and the index of the next value.

```endpoint
CALL valueAtIndexHasNext(Mappings.Bytes32UintMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.StringAddressMap storage,uint256)


**valueAtIndexHasNext(Mappings.StringAddressMap storage,uint256)**


Retrieves the value at the given index position and the index of the next address.

```endpoint
CALL valueAtIndexHasNext(Mappings.StringAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.UintAddressArrayMap storage,uint256)


**valueAtIndexHasNext(Mappings.UintAddressArrayMap storage,uint256)**


Retrieves the array at the given index position and the index of the next array.Internal function to retrieve the value and nextIndex from a given Map

```endpoint
CALL valueAtIndexHasNext(Mappings.UintAddressArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value or address[], and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.UintAddressMap storage,uint256)


**valueAtIndexHasNext(Mappings.UintAddressMap storage,uint256)**


Retrieves the value at the given index position and the index of the next address.Internal function to retrieve the value and nextIndex from a given Map

```endpoint
CALL valueAtIndexHasNext(Mappings.UintAddressMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the map

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value, and nextIndex
```


---

#### valueAtIndexHasNext(Mappings.UintBytes32ArrayMap storage,uint256)


**valueAtIndexHasNext(Mappings.UintBytes32ArrayMap storage,uint256)**


Retrieves the array at the given index position and the index of the next array.Internal function to retrieve the value and nextIndex from a given Map

```endpoint
CALL valueAtIndexHasNext(Mappings.UintBytes32ArrayMap storage,uint256)
```

#### Parameters

```solidity
_index // the index
_map // the AddressArrayMap

```

#### Return

```json
BaseErrors.NO_ERROR() or BaseErrors.INDEX_OUT_OF_BOUNDS(), value or bytes32[], and nextIndex
```


---

### MappingsLibTest Interface


The MappingsLibTest Interface contract is found within the bin bundle.

#### testAddressAddressArrayMap()


**testAddressAddressArrayMap()**


Tests functions belonging to AddressAddressArrayMap in Mappings. TODO: test functions that return dynamic arrays.

```endpoint
CALL testAddressAddressArrayMap()
```


---

#### testAddressAddressMap()


**testAddressAddressMap()**


Tests functions belonging to AddressAddressMap in Mappings.

```endpoint
CALL testAddressAddressMap()
```


---

#### testAddressBoolMap()


**testAddressBoolMap()**


Tests functions belonging to AddressBoolMap in Mappings.

```endpoint
CALL testAddressBoolMap()
```


---

#### testAddressBytes32ArrayMap()


**testAddressBytes32ArrayMap()**


Tests functions belonging to AddressBytes32ArrayMap in Mappings. TODO: test functions that return dynamic arrays.

```endpoint
CALL testAddressBytes32ArrayMap()
```


---

#### testAddressBytes32Map()


**testAddressBytes32Map()**


Tests functions belonging to AddressBytes32Map in Mappings.

```endpoint
CALL testAddressBytes32Map()
```


---

#### testBytes32AddressArrayMap()


**testBytes32AddressArrayMap()**


Tests functions belonging to Bytes32AddressArrayMap in Mappings. TODO: test functions that return dynamic arrays. 

```endpoint
CALL testBytes32AddressArrayMap()
```


---

#### testBytes32AddressMap()


**testBytes32AddressMap()**


Tests functions belonging to Bytes32AddressMap in Mappings.

```endpoint
CALL testBytes32AddressMap()
```


---

#### testBytes32Bytes32Map()


**testBytes32Bytes32Map()**


Tests functions belonging to Bytes32Bytes32Map in Mappings.

```endpoint
CALL testBytes32Bytes32Map()
```


---

#### testBytes32StringMap()


**testBytes32StringMap()**


Tests functions belonging to Bytes32StringMap in Mappings.

```endpoint
CALL testBytes32StringMap()
```


---

#### testBytes32UintMap()


**testBytes32UintMap()**


Tests functions belonging to Bytes32Bytes32Map in Mappings.

```endpoint
CALL testBytes32UintMap()
```


---

#### testStringAddressMap()


**testStringAddressMap()**


Tests functions belonging to StringAddressMap in Mappings.

```endpoint
CALL testStringAddressMap()
```


---

#### testUintAddressArrayMap()


**testUintAddressArrayMap()**


Tests functions belonging to UintAddressArrayMap in Mappings. TODO: test functions that return dynamic arrays.

```endpoint
CALL testUintAddressArrayMap()
```


---

#### testUintAddressMap()


**testUintAddressMap()**


Tests functions belonging to UintAddressMap in Mappings.

```endpoint
CALL testUintAddressMap()
```


---

#### testUintBytes32ArrayMap()


**testUintBytes32ArrayMap()**


Tests functions belonging to UintBytes32ArrayMap in Mappings. TODO: test functions that return dynamic arrays.

```endpoint
CALL testUintBytes32ArrayMap()
```


---





### Organization Interface


The Organization Interface contract is found within the bin bundle.

#### addDepartment(bytes32)


**addDepartment(bytes32)**


Adds the department with the specified ID to this Organization.

```endpoint
CALL addDepartment(bytes32)
```

#### Parameters

```solidity
_id // the department ID (must be unique)

```

#### Return

```json
true if the department was added successfully, false otherwise
```


---

#### addUser(address)


**addUser(address)**


Adds the specified user to this organization as an active user. If the user already exists, the function ensures the account is active.

```endpoint
CALL addUser(address)
```

#### Parameters

```solidity
_userAccount // the user to add

```

#### Return

```json
bool true if successful
```


---

#### addUserToDepartment(address,bytes32)


**addUserToDepartment(address,bytes32)**


Adds the specified user to the organization if they aren't already registered, then adds the user to the department if they aren't already in it.

```endpoint
CALL addUserToDepartment(address,bytes32)
```

#### Parameters

```solidity
_department // department id to which the user should be added
_userAccount // the user to add

```

#### Return

```json
bool true if successful
```


---

#### authorizeUser(address,bytes32)


**authorizeUser(address,bytes32)**


Returns whether the given user account is active in this organization and is authorized. The optional department/role identifier can be used to provide an additional authorization scope against which to authorize the user.

```endpoint
CALL authorizeUser(address,bytes32)
```

#### Parameters

```solidity
_department // an optional department/role context
_userAccount // the user account

```

#### Return

```json
true if authorized, false otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getApproverAtIndex(uint256)


**getApproverAtIndex(uint256)**


Returns the approver's address at the given index position.

```endpoint
CALL getApproverAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index position

```

#### Return

```json
the address, if the position exists
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getDefaultDepartmentId()


**getDefaultDepartmentId()**


Returns the ID of this Organization's default department

```endpoint
CALL getDefaultDepartmentId()
```

#### Return

```json
the ID of the default department
```


---

#### getDepartmentUserAtIndex(bytes32,uint256)


**getDepartmentUserAtIndex(bytes32,uint256)**


Returns the user's address at the given index of the department.

```endpoint
CALL getDepartmentUserAtIndex(bytes32,uint256)
```

#### Parameters

```solidity
_depId // the id of the department
_index // the index position

```

#### Return

```json
userAccount the address of the user or 0x0 if the position does not exist
```


---

#### getNumberOfApprovers()


**getNumberOfApprovers()**


Returns the number of registered approvers.

```endpoint
CALL getNumberOfApprovers()
```

#### Return

```json
the number of approvers
```


---

#### getNumberOfDepartmentUsers(bytes32)


**getNumberOfDepartmentUsers(bytes32)**


Returns the number of users in a given department of the organization.

```endpoint
CALL getNumberOfDepartmentUsers(bytes32)
```

#### Parameters

```solidity
_depId // the id of the department

```

#### Return

```json
size the number of users
```


---

#### getNumberOfUsers()


**getNumberOfUsers()**


returns the number of users associated with this organization

```endpoint
CALL getNumberOfUsers()
```

#### Return

```json
the number of users
```


---

#### getOrganizationDetails()


**getOrganizationDetails()**


Returns detailed information about this Organization

```endpoint
CALL getOrganizationDetails()
```

#### Return

```json
numberOfApprovers - the number of approvers in the organizationorganizationKey - a globaly unique identifier for the organization
```


---

#### getOrganizationKey()


**getOrganizationKey()**


Returns the organization key of this Organization.

```endpoint
CALL getOrganizationKey()
```

#### Return

```json
a globaly unique identifier for the Organization
```


---

#### getUserAtIndex(uint256)


**getUserAtIndex(uint256)**


Returns the user's address at the given index position.

```endpoint
CALL getUserAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index position

```

#### Return

```json
the address or 0x0 if the position does not exist
```


---

#### initialize(address[],bytes32)


**initialize(address[],bytes32)**


Initializes this DefaultOrganization with the provided list of initial approvers. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(address[],bytes32)
```

#### Parameters

```solidity
_defaultDepartmentId // an optional ID for the default department of this organization
_initialApprovers // an array of addresses that should be registered as approvers for this Organization

```


---

#### removeDepartment(bytes32)


**removeDepartment(bytes32)**


Removes the department in this organization.

```endpoint
CALL removeDepartment(bytes32)
```

#### Parameters

```solidity
_depId // the department to remove

```

#### Return

```json
bool indicating success or failure
```


---

#### removeUser(address)


**removeUser(address)**


Removes the user in this organization.

```endpoint
CALL removeUser(address)
```

#### Parameters

```solidity
_userAccount // the account to remove

```

#### Return

```json
bool indicating success or failure
```


---

#### removeUserFromDepartment(address,bytes32)


**removeUserFromDepartment(address,bytes32)**


Removes the user from the department in this organization

```endpoint
CALL removeUserFromDepartment(address,bytes32)
```

#### Parameters

```solidity
_depId // the department to remove the user from
_userAccount // the user to remove

```

#### Return

```json
bool indicating success or failure
```


---

### Owned


The Owned contract is found within the bin bundle.

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### OwnedDelegateUnstructuredProxy


The OwnedDelegateUnstructuredProxy contract is found within the bin bundle.

#### getDelegate()


**getDelegate()**


Implements AbstractDelegateProxy.getDelegate() Retrieves and returns the delegate address for this proxy from the fixed storage position

```endpoint
CALL getDelegate()
```

#### Return

```json
the address of the proxied contract
```


---

#### getOwner()


**getOwner()**


Returns the address of the proxy owner

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### setDelegate(address)


**setDelegate(address)**


Sets the proxied contract, i.e. the delegate target of this proxy to the specified address

```endpoint
CALL setDelegate(address)
```

#### Parameters

```solidity
_delegateAddress // the new address of the proxied contract to which calls are forwarded REVERTS if: - the msg.sender is not the owner

```


---

### OwnerTransferable


The OwnerTransferable contract is found within the bin bundle.

#### transferOwnership(address)


**transferOwnership(address)**


Allows to transfer control of the contract to a new owner.

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### ParticipantsManager Interface


The ParticipantsManager Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createOrganization(address[],bytes32)


**createOrganization(address[],bytes32)**


Creates and adds a new Organization with the specified parameters

```endpoint
CALL createOrganization(address[],bytes32)
```

#### Parameters

```solidity
_defaultDepartmentId // an optional custom name/label for the default department of this organization.
_initialApprovers // the initial owners/admins of the Organization.

```

#### Return

```json
error code and the address of the newly created organization, if successful
```


---

#### createUserAccount(bytes32,address,address)


**createUserAccount(bytes32,address,address)**


Creates and adds a user account, and optionally registers the user with an ecosystem if an address is provided

```endpoint
CALL createUserAccount(bytes32,address,address)
```

#### Parameters

```solidity
_ecosystem // owner (optional)
_id // id (required)
_owner // owner (optional)

```

#### Return

```json
userAccount user account
```


---

#### getApproverAtIndex(address,uint256)


**getApproverAtIndex(address,uint256)**


Returns the approver's address at the given index position of the specified organization.

```endpoint
CALL getApproverAtIndex(address,uint256)
```

#### Parameters

```solidity
_organization // the organization's address
_pos // the index position

```

#### Return

```json
the approver's address, if the position exists
```


---

#### getApproverData(address,address)


**getApproverData(address,address)**


Function supports SQLsol, but only returns the approver address parameter.

```endpoint
CALL getApproverData(address,address)
```

#### Parameters

```solidity
_approver // the approver's address
_organization // the organization's address

```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getNumberOfApprovers(address)


**getNumberOfApprovers(address)**


Returns the number of registered approvers in the specified organization.

```endpoint
CALL getNumberOfApprovers(address)
```

#### Parameters

```solidity
_organization // the organization's address

```

#### Return

```json
the number of approvers
```


---

#### getNumberOfOrganizations()


**getNumberOfOrganizations()**


Returns the number of registered organizations.

```endpoint
CALL getNumberOfOrganizations()
```

#### Return

```json
the number of organizations
```


---

#### getNumberOfUsers(address)


**getNumberOfUsers(address)**


returns the number of users associated with the specified organization

```endpoint
CALL getNumberOfUsers(address)
```

#### Parameters

```solidity
_organization // the organization's address

```

#### Return

```json
the number of users
```


---

#### getOrganizationAtIndex(uint256)


**getOrganizationAtIndex(uint256)**


Returns the organization at the specified index.

```endpoint
CALL getOrganizationAtIndex(uint256)
```

#### Parameters

```solidity
_pos // the index position

```

#### Return

```json
the address of the organization
```


---

#### getOrganizationData(address)


**getOrganizationData(address)**


Returns the public data of the organization at the specified address

```endpoint
CALL getOrganizationData(address)
```

#### Parameters

```solidity
_organization // the address of an organization

```

#### Return

```json
the organization's ID and name
```


---

#### getUserAtIndex(address,uint256)


**getUserAtIndex(address,uint256)**


Returns the user's address at the given index position in the specified organization.

```endpoint
CALL getUserAtIndex(address,uint256)
```

#### Parameters

```solidity
_organization // the organization's address
_pos // the index position

```

#### Return

```json
the address or 0x0 if the position does not exist
```


---

#### getUserData(address,address)


**getUserData(address,address)**


Returns information about the specified user in the context of the given organization (only address is stored)

```endpoint
CALL getUserData(address,address)
```

#### Parameters

```solidity
_organization // the organization's address
_user // the user's address

```

#### Return

```json
userAddress - address of the user
```


---

#### organizationExists(address)


**organizationExists(address)**


Indicates whether the specified organization in this ParticipantsManager

```endpoint
CALL organizationExists(address)
```

#### Parameters

```solidity
_address // organization address

```

#### Return

```json
true if the given address belongs to a known Organization, false otherwise
```


---

#### upgrade(address)


**upgrade(address)**


Performs the necessary steps to upgrade from this contract to the specified new version.

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a contract that replaces this one

```

#### Return

```json
true if successful, false otherwise
```


---

#### userAccountExists(address)


**userAccountExists(address)**


Indicates whether the specified UserAccount exists in this ParticipantsManager

```endpoint
CALL userAccountExists(address)
```

#### Parameters

```solidity
_userAccount // user account address

```

#### Return

```json
true if the given address belongs to a known UserAccount, false otherwise
```


---

### ParticipantsManagerDb


The ParticipantsManagerDb contract is found within the bin bundle.

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### ParticipantsManagerTest Interface


The ParticipantsManagerTest Interface contract is found within the bin bundle.

#### testOrganizationAuthorization()


**testOrganizationAuthorization()**


Tests the variations of the organization's authorizeUser function

```endpoint
CALL testOrganizationAuthorization()
```


---

#### testUserAccountSecurity()


**testUserAccountSecurity()**


Tests UserAccount/Owner/Ecosystem relationships and authorizing transactions.

```endpoint
CALL testUserAccountSecurity()
```


---

### ProcessDefinition Interface


The ProcessDefinition Interface contract is found within the bin bundle.

#### addProcessInterfaceImplementation(address,bytes32)


**addProcessInterfaceImplementation(address,bytes32)**


Adds the specified process interface to the list of supported process interfaces of this ProcessDefinition

```endpoint
CALL addProcessInterfaceImplementation(address,bytes32)
```

#### Parameters

```solidity
_interfaceId // the ID of the interface
_model // the model defining the interface

```

#### Return

```json
an error code signaling success or failure
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createActivityDefinition(bytes32,uint8,uint8,uint8,bytes32,bool,bytes32,bytes32,bytes32)


**createActivityDefinition(bytes32,uint8,uint8,uint8,bytes32,bool,bytes32,bytes32,bytes32)**


Creates a new activity definition with the specified parameters.

```endpoint
CALL createActivityDefinition(bytes32,uint8,uint8,uint8,bytes32,bool,bytes32,bytes32,bytes32)
```

#### Parameters

```solidity
_activityType // the BpmModel.ActivityType [TASK|SUBPROCESS]
_application // the application handling the execution of the activity
_assignee // the ID of the participant performing the activity (for USER tasks only)
_behavior // the BpmModel.TaskBehavior [SEND|SENDRECEIVE|RECEIVE]
_id // the activity ID
_multiInstance // whether the activity represents multiple instances
_subProcessDefinitionId // references a subprocess definition (only for SUBPROCESS ActivityType)
_subProcessModelId // references the model containg a subprocess definition (only for SUBPROCESS ActivityType)
_taskType // the BpmModel.TaskType [NONE|USER|SERVICE|EVENT]

```

#### Return

```json
an error code indicating success or failure
```


---

#### createDataMapping(bytes32,uint8,bytes32,bytes32,bytes32,address)


**createDataMapping(bytes32,uint8,bytes32,bytes32,bytes32,address)**


Create a data mapping for the specified activity and direction.

```endpoint
CALL createDataMapping(bytes32,uint8,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_accessPath // the access path offered by the application. If the application does not have any access paths, this field is used as an ID for the mapping.
_activityId // the ID of the activity in this ProcessDefinition
_dataPath // a data path (key) to use for data lookup on a DataStorage.
_dataStorage // an optional address of a DataStorage as basis for the data path other than the default one
_dataStorageId // an optional key to identify a DataStorage as basis for the data path other than the default one
_direction // the BpmModel.Direction [IN|OUT]

```


---

#### createGateway(bytes32,uint8)


**createGateway(bytes32,uint8)**


Creates a new BpmModel.Gateway model element with the specified ID and type

```endpoint
CALL createGateway(bytes32,uint8)
```

#### Parameters

```solidity
_id // the ID under which to register the element
_type // a BpmModel.GatewayType

```


---

#### createTransition(bytes32,bytes32)


**createTransition(bytes32,bytes32)**


Creates a transition between the specified source and target elements.

```endpoint
CALL createTransition(bytes32,bytes32)
```

#### Parameters

```solidity
_source // the start of the transition
_target // the end of the transition

```

#### Return

```json
an error code indicating success or failure
```


---

#### createTransitionConditionForAddress(bytes32,bytes32,bytes32,bytes32,address,uint8,address)


**createTransitionConditionForAddress(bytes32,bytes32,bytes32,bytes32,address,uint8,address)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object.

```endpoint
CALL createTransitionConditionForAddress(bytes32,bytes32,bytes32,bytes32,address,uint8,address)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side comparison value

```


---

#### createTransitionConditionForBool(bytes32,bytes32,bytes32,bytes32,address,uint8,bool)


**createTransitionConditionForBool(bytes32,bytes32,bytes32,bytes32,address,uint8,bool)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object.

```endpoint
CALL createTransitionConditionForBool(bytes32,bytes32,bytes32,bytes32,address,uint8,bool)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side comparison value

```


---

#### createTransitionConditionForBytes32(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32)


**createTransitionConditionForBytes32(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object.

```endpoint
CALL createTransitionConditionForBytes32(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side comparison value

```


---

#### createTransitionConditionForDataStorage(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32,bytes32,address)


**createTransitionConditionForDataStorage(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32,bytes32,address)**


Creates a transition condition between the specified gateway and activity using the given parameters. The "lh..." parameters are used to construct a left-hand side DataStorageUtils.ConditionalData object while the "rh..." ones are used for a right-hand side DataStorageUtils.ConditionalData as comparison

```endpoint
CALL createTransitionConditionForDataStorage(bytes32,bytes32,bytes32,bytes32,address,uint8,bytes32,bytes32,address)
```

#### Parameters

```solidity
_gatewayId // the ID of a gateway in this ProcessDefinition
_lhDataPath // the left-hand side dataPath condition
_lhDataStorage // the left-hand side dataStorage condition
_lhDataStorageId // the left-hand side dataStorageId condition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_rhDataPath // the right-hand side dataPath condition
_rhDataStorage // the right-hand side dataStorage condition
_rhDataStorageId // the right-hand side dataStorageId condition
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition

```


---

#### createTransitionConditionForInt(bytes32,bytes32,bytes32,bytes32,address,uint8,int256)


**createTransitionConditionForInt(bytes32,bytes32,bytes32,bytes32,address,uint8,int256)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object.

```endpoint
CALL createTransitionConditionForInt(bytes32,bytes32,bytes32,bytes32,address,uint8,int256)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side comparison value

```


---

#### createTransitionConditionForString(bytes32,bytes32,bytes32,bytes32,address,uint8,string)


**createTransitionConditionForString(bytes32,bytes32,bytes32,bytes32,address,uint8,string)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object.

```endpoint
CALL createTransitionConditionForString(bytes32,bytes32,bytes32,bytes32,address,uint8,string)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side comparison value

```


---

#### createTransitionConditionForUint(bytes32,bytes32,bytes32,bytes32,address,uint8,uint256)


**createTransitionConditionForUint(bytes32,bytes32,bytes32,bytes32,address,uint8,uint256)**


Creates a transition condition between the specified gateway and activity using the given parameters. The parameters dataPath, dataStorageId, and dataStorage are used to construct a left-hand side DataStorageUtils.ConditionalData object.

```endpoint
CALL createTransitionConditionForUint(bytes32,bytes32,bytes32,bytes32,address,uint8,uint256)
```

#### Parameters

```solidity
_dataPath // the left-hand side dataPath condition
_dataStorage // the left-hand side dataStorage condition
_dataStorageId // the left-hand side dataStorageId condition
_gatewayId // the ID of a gateway in this ProcessDefinition
_operator // the uint8 representation of a DataStorageUtils.COMPARISON_OPERATOR
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition
_value // the right-hand side comparison value

```


---

#### getActivitiesForParticipant(bytes32)


**getActivitiesForParticipant(bytes32)**


Returns the IDs of all activities connected to the given model participant. This function can be used to retrieve all user tasks belonging to the same "swimlane" in the model.

```endpoint
CALL getActivitiesForParticipant(bytes32)
```

#### Parameters

```solidity
_participantId // the ID of a participant in the model

```

#### Return

```json
an array of activity IDs
```


---

#### getActivityAtIndex(uint256)


**getActivityAtIndex(uint256)**


Returns the ID of the ActivityDefinition at the specified index position of the given Process Definition

```endpoint
CALL getActivityAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
bytes32 the ActivityDefinition ID, if it exists
```


---

#### getActivityData(bytes32)


**getActivityData(bytes32)**


Returns information about the activity definition with the given ID.

```endpoint
CALL getActivityData(bytes32)
```

#### Parameters

```solidity
_id // the bytes32 id of the activity definition

```

#### Return

```json
activityType the BpmModel.ActivityType as uint8taskType the BpmModel.TaskType as uint8taskBehavior the BpmModel.TaskBehavior as uint8assignee the ID of the activity's assignee (for interactive activities)multiInstance whether the activity is a multi-instanceapplication the activity's applicationsubProcessModelId the ID of a process model (for subprocess activities)subProcessDefinitionId the ID of a process definition (for subprocess activities)
```


---

#### getActivityGraphDetails(bytes32)


**getActivityGraphDetails(bytes32)**


Returns connectivity details about the specified activity.

```endpoint
CALL getActivityGraphDetails(bytes32)
```

#### Parameters

```solidity
_id // the ID of an activity

```

#### Return

```json
predecessor - the ID of its predecessor model elementsuccessor - the ID of its successor model element
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getElementType(bytes32)


**getElementType(bytes32)**


Returns the ModelElementType for the element with the specified ID.

```endpoint
CALL getElementType(bytes32)
```

#### Parameters

```solidity
_id // the ID of a model element

```

#### Return

```json
the BpmModel.ModelElementType
```


---

#### getGatewayGraphDetails(bytes32)


**getGatewayGraphDetails(bytes32)**


Returns connectivity details about the specified gateway.

```endpoint
CALL getGatewayGraphDetails(bytes32)
```

#### Parameters

```solidity
_id // the ID of a gateway

```

#### Return

```json
inputs - the IDs of model elements that are inputs to this gatewayoutputs - the IDs of model elements that are outputs of this gatewaygatewayType - the BpmModel.GatewayTypedefaultOutput - the default output connection (applies only to XOR|OR type gateways)
```


---

#### getId()


**getId()**


Returns the identifier of this contract.

```endpoint
CALL getId()
```

#### Return

```json
the bytes32 ID
```


---

#### getImplementedProcessInterfaceAtIndex(uint256)


**getImplementedProcessInterfaceAtIndex(uint256)**


Returns information about the process interface at the given index

```endpoint
CALL getImplementedProcessInterfaceAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
modelAddress the interface's modelinterfaceId the interface ID
```


---

#### getInDataMappingDetails(bytes32,bytes32)


**getInDataMappingDetails(bytes32,bytes32)**


Returns information about the IN data mapping of the specified activity with the given ID.

```endpoint
CALL getInDataMappingDetails(bytes32,bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_id // the data mapping ID

```

#### Return

```json
dataMappingId the id of the data mappingaccessPath the access path on the applicationdataPath a data path (key) to use for identifying the data location in a DataStorage contractdataStorageId a key to identify a secondary DataStorage as basis for the data path other than the default onedataStorage an address of a DataStorage as basis for the data path other than the default one
```


---

#### getInDataMappingIdAtIndex(bytes32,uint256)


**getInDataMappingIdAtIndex(bytes32,uint256)**


Returns the ID of the IN data mapping of the specified activity at the specified index.

```endpoint
CALL getInDataMappingIdAtIndex(bytes32,uint256)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_idx // the index position

```

#### Return

```json
the mapping ID, if it exists
```


---

#### getInDataMappingKeys(bytes32)


**getInDataMappingKeys(bytes32)**


Returns an array of the IN data mapping ids of the specified activity.

```endpoint
CALL getInDataMappingKeys(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the data mapping ids
```


---

#### getModel()


**getModel()**


Returns the ProcessModel which contains this process definition

```endpoint
CALL getModel()
```

#### Return

```json
the ProcessModel reference
```


---

#### getModelId()


**getModelId()**


Returns the ID of the model which contains this process definition

```endpoint
CALL getModelId()
```

#### Return

```json
the model ID
```


---

#### getNumberOfActivities()


**getNumberOfActivities()**


Returns the number of activity definitions in this ProcessDefinition.

```endpoint
CALL getNumberOfActivities()
```

#### Return

```json
the number of activity definitions
```


---

#### getNumberOfImplementedProcessInterfaces()


**getNumberOfImplementedProcessInterfaces()**


Returns the number of implemented process interfaces implemented by this ProcessDefinition

```endpoint
CALL getNumberOfImplementedProcessInterfaces()
```

#### Return

```json
the number of process interfaces
```


---

#### getNumberOfInDataMappings(bytes32)


**getNumberOfInDataMappings(bytes32)**


Returns the number of IN data mappings for the specified activity.

```endpoint
CALL getNumberOfInDataMappings(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the number of IN data mappings
```


---

#### getNumberOfOutDataMappings(bytes32)


**getNumberOfOutDataMappings(bytes32)**


Returns the number of OUT data mappings for the specified activity.

```endpoint
CALL getNumberOfOutDataMappings(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the number of OUT data mappings
```


---

#### getOutDataMappingDetails(bytes32,bytes32)


**getOutDataMappingDetails(bytes32,bytes32)**


Returns information about the OUT data mapping of the specified activity with the given ID.

```endpoint
CALL getOutDataMappingDetails(bytes32,bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_id // the data mapping ID

```

#### Return

```json
dataMappingId the id of the data mappingaccessPath the access path on the applicationdataPath a data path (key) to use for identifying the data location in a DataStorage contractdataStorageId a key to identify a secondary DataStorage as basis for the data path other than the default onedataStorage an address of a DataStorage as basis for the data path other than the default one
```


---

#### getOutDataMappingIdAtIndex(bytes32,uint256)


**getOutDataMappingIdAtIndex(bytes32,uint256)**


Returns the ID of the OUT data mapping of the specified activity at the specified index.

```endpoint
CALL getOutDataMappingIdAtIndex(bytes32,uint256)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition
_idx // the index position

```

#### Return

```json
the mapping ID, if it exists
```


---

#### getOutDataMappingKeys(bytes32)


**getOutDataMappingKeys(bytes32)**


Returns an array of the OUT data mapping ids of the specified activity.

```endpoint
CALL getOutDataMappingKeys(bytes32)
```

#### Parameters

```solidity
_activityId // the ID of the activity in this ProcessDefinition

```

#### Return

```json
the data mapping ids
```


---

#### getStartActivity()


**getStartActivity()**


Returns the ID of the start activity of this process definition. If the process is valid, this value must be set.

```endpoint
CALL getStartActivity()
```

#### Return

```json
the ID of the identified start activity
```


---

#### implementsProcessInterface(address,bytes32)


**implementsProcessInterface(address,bytes32)**


indicates whether this ProcessDefinition implements the specified interface

```endpoint
CALL implementsProcessInterface(address,bytes32)
```

#### Parameters

```solidity
_interfaceId // the ID of the interface
_model // the model defining the interface

```

#### Return

```json
true if the interface is supported, false otherwise
```


---

#### initialize(bytes32,address)


**initialize(bytes32,address)**


Initializes this DefaultOrganization with the specified ID and belonging to the given model. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. REVERTS if - the _model is an empty address or if the ID is empty

```endpoint
CALL initialize(bytes32,address)
```

#### Parameters

```solidity
_id // the ProcessDefinition ID
_model // the address of a ProcessModel in which this ProcessDefinition is created

```


---

#### isValid()


**isValid()**


Returns the current validity state

```endpoint
CALL isValid()
```

#### Return

```json
true if valid, false otherwise
```


---

#### modelElementExists(bytes32)


**modelElementExists(bytes32)**


Returns whether the given ID belongs to a model element (gateway or activity) known in this ProcessDefinition.

```endpoint
CALL modelElementExists(bytes32)
```

#### Parameters

```solidity
_id // the ID of a model element

```

#### Return

```json
true if it exists, false otherwise
```


---

#### resolveTransitionCondition(bytes32,bytes32,address)


**resolveTransitionCondition(bytes32,bytes32,address)**


Resolves a transition condition between the given source and target model elements using the provided DataStorage to lookup data. The function should return 'true' as default if no condition exists for the specified transition.

```endpoint
CALL resolveTransitionCondition(bytes32,bytes32,address)
```

#### Parameters

```solidity
_dataStorage // the address of a DataStorage.
_sourceId // the ID of a model element in this ProcessDefinition, e.g. a gateway
_targetId // the ID of a model element in this ProcessDefinition, e.g. an activity

```

#### Return

```json
true if the condition evaluated to 'true' or if no condition exists, false otherwise
```


---

#### setDefaultTransition(bytes32,bytes32)


**setDefaultTransition(bytes32,bytes32)**


Sets the specified activity to be the default output (default transition) of the specified gateway.

```endpoint
CALL setDefaultTransition(bytes32,bytes32)
```

#### Parameters

```solidity
_gatewayId // the ID of a gateway in this ProcessDefinition
_targetElementId // the ID of a graph element (activity or gateway) in this ProcessDefinition

```


---

#### validate()


**validate()**


Validates the coherence of the process definition in terms of the diagram and its configuration and sets the valid flag.

```endpoint
CALL validate()
```

#### Return

```json
valid - boolean indicating validityerrorMessage - empty string if valid, otherwise contains a hint what failed
```


---

### ProcessDefinitionTest Interface


The ProcessDefinitionTest Interface contract is found within the bin bundle.

#### testProcessDefinition()


**testProcessDefinition()**


Tests building of the ProcessDefinition and checking for validity along the way

```endpoint
CALL testProcessDefinition()
```


---

#### testTransitionConditionResolution()


**testTransitionConditionResolution()**


Tests the setup and resolution of transition conditions via the ProcessDefinition

```endpoint
CALL testTransitionConditionResolution()
```


---

### ProcessInstance Interface


The ProcessInstance Interface contract is found within the bin bundle.

#### abort()


**abort()**


Aborts this ProcessInstance and halts any ongoing activities. After the abort the ProcessInstance cannot be resurrected.

```endpoint
CALL abort()
```


---

#### addProcessStateChangeListener(address)


**addProcessStateChangeListener(address)**


Adds a ProcessStateChangeListener to listeners collection

```endpoint
CALL addProcessStateChangeListener(address)
```

#### Parameters

```solidity
_listener // the ProcessStateChangeListener to add

```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### completeActivity(bytes32,address)


**completeActivity(bytes32,address)**


Completes the specified activity

```endpoint
CALL completeActivity(bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the activity instance
_service // the BpmService managing this ProcessInstance (required for changes to this ProcessInstance after the activity completes)

```

#### Return

```json
an error code indicating success or failure
```


---

#### completeActivityWithAddressData(bytes32,address,bytes32,address)


**completeActivityWithAddressData(bytes32,address,bytes32,address)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithAddressData(bytes32,address,bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the address value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithBoolData(bytes32,address,bytes32,bool)


**completeActivityWithBoolData(bytes32,address,bytes32,bool)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithBoolData(bytes32,address,bytes32,bool)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the bool value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithBytes32Data(bytes32,address,bytes32,bytes32)


**completeActivityWithBytes32Data(bytes32,address,bytes32,bytes32)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithBytes32Data(bytes32,address,bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the bytes32 value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithIntData(bytes32,address,bytes32,int256)


**completeActivityWithIntData(bytes32,address,bytes32,int256)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithIntData(bytes32,address,bytes32,int256)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the int value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithStringData(bytes32,address,bytes32,string)


**completeActivityWithStringData(bytes32,address,bytes32,string)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithStringData(bytes32,address,bytes32,string)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the string value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### completeActivityWithUintData(bytes32,address,bytes32,uint256)


**completeActivityWithUintData(bytes32,address,bytes32,uint256)**


Writes data via BpmService and then completes the specified activity.

```endpoint
CALL completeActivityWithUintData(bytes32,address,bytes32,uint256)
```

#### Parameters

```solidity
_activityInstanceId // the task ID
_dataMappingId // the id of the dataMapping that points to data storage slot
_service // the BpmService required for lookup and access to the BpmServiceDb
_value // the uint value of the data

```

#### Return

```json
error code if the completion failed
```


---

#### execute(address)


**execute(address)**


Initiates execution of this ProcessInstance consisting of attempting to activate and process any activities and advance the state of the runtime graph.

```endpoint
CALL execute(address)
```

#### Parameters

```solidity
_service // the BpmService managing this ProcessInstance (required for changes to this ProcessInstance and access to the BpmServiceDb)

```

#### Return

```json
error code indicating success or failure
```


---

#### getActivityInDataAsAddress(bytes32,bytes32)


**getActivityInDataAsAddress(bytes32,bytes32)**


Returns the address value of the specified IN data mapping in the context of the given activity instance.

```endpoint
CALL getActivityInDataAsAddress(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the address value resulting from resolving the data mapping
```


---

#### getActivityInDataAsBool(bytes32,bytes32)


**getActivityInDataAsBool(bytes32,bytes32)**


Returns the bool value of the specified IN data mapping in the context of the given activity instance.

```endpoint
CALL getActivityInDataAsBool(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the bool value resulting from resolving the data mapping
```


---

#### getActivityInDataAsBytes32(bytes32,bytes32)


**getActivityInDataAsBytes32(bytes32,bytes32)**


Returns the bytes32 value of the specified IN data mapping in the context of the given activity instance.

```endpoint
CALL getActivityInDataAsBytes32(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the bytes32 value resulting from resolving the data mapping
```


---

#### getActivityInDataAsInt(bytes32,bytes32)


**getActivityInDataAsInt(bytes32,bytes32)**


Returns the int value of the specified IN data mapping in the context of the given activity instance.

```endpoint
CALL getActivityInDataAsInt(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the int value resulting from resolving the data mapping
```


---

#### getActivityInDataAsString(bytes32,bytes32)


**getActivityInDataAsString(bytes32,bytes32)**


Returns the string value of the specified IN data mapping in the context of the given activity instance.

```endpoint
CALL getActivityInDataAsString(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the string value resulting from resolving the data mapping
```


---

#### getActivityInDataAsUint(bytes32,bytes32)


**getActivityInDataAsUint(bytes32,bytes32)**


Returns the uint value of the specified IN data mapping in the context of the given activity instance.

```endpoint
CALL getActivityInDataAsUint(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an IN data mapping defined for the activity

```

#### Return

```json
the uint value resulting from resolving the data mapping
```


---

#### getActivityInstanceAtIndex(uint256)


**getActivityInstanceAtIndex(uint256)**


Returns the globally unique ID of the activity instance at the specified index in the ProcessInstance.

```endpoint
CALL getActivityInstanceAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the bytes32 ID
```


---

#### getActivityInstanceData(bytes32)


**getActivityInstanceData(bytes32)**


Returns information about the activity instance with the specified ID

```endpoint
CALL getActivityInstanceData(bytes32)
```

#### Parameters

```solidity
_id // the global ID of the activity instance

```

#### Return

```json
activityId - the ID of the activity as defined by the process definitioncreated - the creation timestampcompleted - the completion timestampperformer - the account who is performing the activity (for interactive activities only)completedBy - the account who completed the activity (for interactive activities only) state - the uint8 representation of the BpmRuntime.ActivityInstanceState of this activity instance
```


---

#### getAddressScopeDetails(address,bytes32)


**getAddressScopeDetails(address,bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetails(address,bytes32)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope

```

#### Return

```json
fixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeDetailsForKey(bytes32)


**getAddressScopeDetailsForKey(bytes32)**


Returns details about the configuration of the address scope.

```endpoint
CALL getAddressScopeDetailsForKey(bytes32)
```

#### Parameters

```solidity
_key // a scope key

```

#### Return

```json
keyAddress - the address encoded in the keykeyContext - the context encoded in the keyfixedScope - a bytes32 representing a fixed scopedataPath - the dataPath of a ConditionalData defining the scopedataStorageId - the dataStorageId of a ConditionalData defining the scopedataStorage - the dataStorgage address of a ConditionalData defining the scope
```


---

#### getAddressScopeKeys()


**getAddressScopeKeys()**


Returns the list of keys identifying the address/context scopes.

```endpoint
CALL getAddressScopeKeys()
```

#### Return

```json
the bytes32 scope keys
```


---

#### getArrayLength(bytes32)


**getArrayLength(bytes32)**


Returns the length of an array with the specified ID in this DataStorage.

```endpoint
CALL getArrayLength(bytes32)
```

#### Parameters

```solidity
_id // the ID of an array-type value

```

#### Return

```json
the length of the array
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getDataIdAtIndex(uint256)


**getDataIdAtIndex(uint256)**


Returns the data id at the given index

```endpoint
CALL getDataIdAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index of the data

```

#### Return

```json
error uint error code id bytes32 id of the data
```


---

#### getDataType(bytes32)


**getDataType(bytes32)**


Returns the data type of the Data object identified by the given id

```endpoint
CALL getDataType(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
uint8 the DataType
```


---

#### getDataValueAsAddress(bytes32)


**getDataValueAsAddress(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsAddress(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
address the value of the data
```


---

#### getDataValueAsAddressArray(bytes32)


**getDataValueAsAddressArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsAddressArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
address[] the value of the data
```


---

#### getDataValueAsBool(bytes32)


**getDataValueAsBool(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBool(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bool the bool value of the data
```


---

#### getDataValueAsBoolArray(bytes32)


**getDataValueAsBoolArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBoolArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bool[] the value of the data
```


---

#### getDataValueAsBytes32(bytes32)


**getDataValueAsBytes32(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBytes32(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bytes32 the value of the data
```


---

#### getDataValueAsBytes32Array(bytes32)


**getDataValueAsBytes32Array(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsBytes32Array(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
bytes32[] the value of the data
```


---

#### getDataValueAsInt(bytes32)


**getDataValueAsInt(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsInt(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
int the value of the data
```


---

#### getDataValueAsIntArray(bytes32)


**getDataValueAsIntArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsIntArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
int256[] the value of the data
```


---

#### getDataValueAsString(bytes32)


**getDataValueAsString(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsString(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
string the value of the data
```


---

#### getDataValueAsUint(bytes32)


**getDataValueAsUint(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsUint(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
uint the value of the data
```


---

#### getDataValueAsUintArray(bytes32)


**getDataValueAsUintArray(bytes32)**


Gets the value of the Data object identified by the given id

```endpoint
CALL getDataValueAsUintArray(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```

#### Return

```json
uint256[] the value of the data
```


---

#### getNumberOfActivityInstances()


**getNumberOfActivityInstances()**


Returns the number of activity instances currently contained in this ProcessInstance. Note that this number is subject to change as long as the process isntance is not completed.

```endpoint
CALL getNumberOfActivityInstances()
```

#### Return

```json
the number of activity instances
```


---

#### getNumberOfData()


**getNumberOfData()**


Returns the number of data fields in this DataStorage

```endpoint
CALL getNumberOfData()
```

#### Return

```json
uint the size
```


---

#### getProcessDefinition()


**getProcessDefinition()**


Returns the process definition on which this instance is based.

```endpoint
CALL getProcessDefinition()
```

#### Return

```json
the address of a ProcessDefinition
```


---

#### getStartedBy()


**getStartedBy()**


Returns the account that started this process instance

```endpoint
CALL getStartedBy()
```

#### Return

```json
the address registered when creating the process instance
```


---

#### getState()


**getState()**


Returns the state of this process instance

```endpoint
CALL getState()
```

#### Return

```json
the uint representation of the BpmRuntime.ProcessInstanceState
```


---

#### initRuntime()


**initRuntime()**


Initiates and populates the runtime graph that will handle the state of this ProcessInstance.

```endpoint
CALL initRuntime()
```


---

#### initialize(address,address,bytes32)


**initialize(address,address,bytes32)**


Initializes this ProcessInstance with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(address,address,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of a subprocess activity instance that initiated this ProcessInstance (optional)
_processDefinition // the ProcessDefinition which this ProcessInstance should follow
_startedBy // (optional) account which initiated the transaction that started the process. If empty, the msg.sender is registered as having started the process

```


---

#### notifyProcessStateChange()


**notifyProcessStateChange()**


Notifies listeners about a process state change

```endpoint
CALL notifyProcessStateChange()
```


---

#### removeData(bytes32)


**removeData(bytes32)**


Removes the Data identified by the id from the DataMap, if it exists.

```endpoint
CALL removeData(bytes32)
```

#### Parameters

```solidity
_id // the id of the data

```


---

#### resolveAddressScope(address,bytes32,address)


**resolveAddressScope(address,bytes32,address)**


Returns the scope for the given address and context. If the scope depends on a ConditionalData, the function should attempt to resolve it and return the result.

```endpoint
CALL resolveAddressScope(address,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataStorage // a DataStorage contract to use as a basis if the scope is defined by a ConditionalData

```

#### Return

```json
the scope qualifier or an empty bytes32, if no qualifier is set or cannot be determined
```


---

#### resolveInDataLocation(bytes32,bytes32)


**resolveInDataLocation(bytes32,bytes32)**


Resolves the target storage location for the specified IN data mapping in the context of the given activity instance.

```endpoint
CALL resolveInDataLocation(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance
_dataMappingId // the ID of a data mapping defined for the activity

```

#### Return

```json
dataStorage - the address of a DataStoragedataPath - the dataPath under which to find data mapping value
```


---

#### resolveOutDataLocation(bytes32,bytes32)


**resolveOutDataLocation(bytes32,bytes32)**


Resolves the target storage location for the specified OUT data mapping in the context of the given activity instance.

```endpoint
CALL resolveOutDataLocation(bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance
_dataMappingId // the ID of a data mapping defined for the activity

```

#### Return

```json
dataStorage - the address of a DataStoragedataPath - the dataPath under which to find data mapping value
```


---

#### setActivityOutDataAsAddress(bytes32,bytes32,address)


**setActivityOutDataAsAddress(bytes32,bytes32,address)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance.

```endpoint
CALL setActivityOutDataAsAddress(bytes32,bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsBool(bytes32,bytes32,bool)


**setActivityOutDataAsBool(bytes32,bytes32,bool)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance.

```endpoint
CALL setActivityOutDataAsBool(bytes32,bytes32,bool)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsBytes32(bytes32,bytes32,bytes32)


**setActivityOutDataAsBytes32(bytes32,bytes32,bytes32)**


Applies the given bytes32 value to the OUT data mapping with the specified ID on the specified activity instance.

```endpoint
CALL setActivityOutDataAsBytes32(bytes32,bytes32,bytes32)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsInt(bytes32,bytes32,int256)


**setActivityOutDataAsInt(bytes32,bytes32,int256)**


Applies the given int value to the OUT data mapping with the specified ID on the specified activity instance.

```endpoint
CALL setActivityOutDataAsInt(bytes32,bytes32,int256)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsString(bytes32,bytes32,string)


**setActivityOutDataAsString(bytes32,bytes32,string)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance.

```endpoint
CALL setActivityOutDataAsString(bytes32,bytes32,string)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setActivityOutDataAsUint(bytes32,bytes32,uint256)


**setActivityOutDataAsUint(bytes32,bytes32,uint256)**


Applies the given value to the OUT data mapping with the specified ID on the specified activity instance.

```endpoint
CALL setActivityOutDataAsUint(bytes32,bytes32,uint256)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an activity instance in this ProcessInstance
_dataMappingId // the ID of an OUT data mapping defined for the activity
_value // the value to set

```


---

#### setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)


**setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)**


Associates the given address with a scope qualifier for a given context. The context can be used to bind the same address to different scenarios and different scopes. The scope can either be represented by a fixed bytes32 value of by a ConditionalData that resolves to a bytes32 field.

```endpoint
CALL setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)
```

#### Parameters

```solidity
_address // an address
_context // a context declaration binding the address to a scope
_dataPath // the dataPath of a ConditionalData defining the scope
_dataStorage // the dataStorgage address of a ConditionalData defining the scope
_dataStorageId // the dataStorageId of a ConditionalData defining the scope
_fixedScope // a bytes32 representing a fixed scope

```


---

#### setDataValueAsAddress(bytes32,address)


**setDataValueAsAddress(bytes32,address)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsAddress(bytes32,address)
```

#### Parameters

```solidity
_id // the id of the data
_value // the address value of the data

```


---

#### setDataValueAsAddressArray(bytes32,address[])


**setDataValueAsAddressArray(bytes32,address[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsAddressArray(bytes32,address[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the address[] value of the data

```


---

#### setDataValueAsBool(bytes32,bool)


**setDataValueAsBool(bytes32,bool)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBool(bytes32,bool)
```

#### Parameters

```solidity
_id // the id of the data
_value // the bool value of the data

```


---

#### setDataValueAsBoolArray(bytes32,bool[])


**setDataValueAsBoolArray(bytes32,bool[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBoolArray(bytes32,bool[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the bool[] value of the data

```


---

#### setDataValueAsBytes32(bytes32,bytes32)


**setDataValueAsBytes32(bytes32,bytes32)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBytes32(bytes32,bytes32)
```

#### Parameters

```solidity
_id // the id of the data
_value // the bytes32 value of the data

```


---

#### setDataValueAsBytes32Array(bytes32,bytes32[])


**setDataValueAsBytes32Array(bytes32,bytes32[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsBytes32Array(bytes32,bytes32[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the bytes32[] value of the data

```


---

#### setDataValueAsInt(bytes32,int256)


**setDataValueAsInt(bytes32,int256)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsInt(bytes32,int256)
```

#### Parameters

```solidity
_id // the id of the data
_value // the int value of the data

```


---

#### setDataValueAsIntArray(bytes32,int256[])


**setDataValueAsIntArray(bytes32,int256[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsIntArray(bytes32,int256[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the int256[] value of the data

```


---

#### setDataValueAsString(bytes32,string)


**setDataValueAsString(bytes32,string)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsString(bytes32,string)
```

#### Parameters

```solidity
_id // the id of the data
_value // the string value of the data

```


---

#### setDataValueAsUint(bytes32,uint256)


**setDataValueAsUint(bytes32,uint256)**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsUint(bytes32,uint256)
```

#### Parameters

```solidity
_id // the id of the data
_value // the uint value of the data

```


---

#### setDataValueAsUintArray(bytes32,uint256[])


**setDataValueAsUintArray(bytes32,uint256[])**


Creates a Data object with the given value and inserts it into the DataMap

```endpoint
CALL setDataValueAsUintArray(bytes32,uint256[])
```

#### Parameters

```solidity
_id // the id of the data
_value // the uint[] value of the data

```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows to transfer control of the contract to a new owner.

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### ProcessModel Interface


The ProcessModel Interface contract is found within the bin bundle.

#### addDataDefinition(bytes32,bytes32,uint8)


**addDataDefinition(bytes32,bytes32,uint8)**


Adds a data definition to this ProcessModel

```endpoint
CALL addDataDefinition(bytes32,bytes32,uint8)
```

#### Parameters

```solidity
_dataId // the ID of the data object
_dataPath // the path to a data value
_parameterType // the DataTypes.ParameterType of the data object

```


---

#### addParticipant(bytes32,address,bytes32,bytes32,address)


**addParticipant(bytes32,address,bytes32,bytes32,address)**


Adds a participant with the specified ID and attributes to this ProcessModel

```endpoint
CALL addParticipant(bytes32,address,bytes32,bytes32,address)
```

#### Parameters

```solidity
_account // the address of a participant account
_dataPath // the field key under which to locate the conditional participant
_dataStorage // the address of a DataStorage contract to find a conditional participant
_dataStorageId // a field key in a known DataStorage containing an address of another DataStorage contract
_id // the participant ID

```

#### Return

```json
an error code indicating success or failure
```


---

#### addProcessInterface(bytes32)


**addProcessInterface(bytes32)**


Adds a process interface declaration to this ProcessModel that process definitions can refer to

```endpoint
CALL addProcessInterface(bytes32)
```

#### Parameters

```solidity
_interfaceId // the ID of the interface

```

#### Return

```json
an error code indicating success of failure
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // a Versioned contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createProcessDefinition(bytes32,address)


**createProcessDefinition(bytes32,address)**


Creates a new process definition with the given parameters in this ProcessModel

```endpoint
CALL createProcessDefinition(bytes32,address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder
_id // the process ID

```

#### Return

```json
the address of the new ProcessDefinition when successful
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getAuthor()


**getAuthor()**


Returns model author address

```endpoint
CALL getAuthor()
```

#### Return

```json
the model author
```


---

#### getConditionalParticipant(bytes32,bytes32,address)


**getConditionalParticipant(bytes32,bytes32,address)**


Returns the participant ID in this model that matches the given ConditionalData parameters.

```endpoint
CALL getConditionalParticipant(bytes32,bytes32,address)
```

#### Parameters

```solidity
_dataPath // a data path
_dataStorage // the address of a DataStorage
_dataStorageId // the path to a DataStorage

```

#### Return

```json
the ID of a participant or an empty bytes32, if no matching participant exists
```


---

#### getDataDefinitionDetailsAtIndex(uint256)


**getDataDefinitionDetailsAtIndex(uint256)**


Returns details about the data definition at the given index position

```endpoint
CALL getDataDefinitionDetailsAtIndex(uint256)
```

#### Parameters

```solidity
_index // the index position

```

#### Return

```json
key - the key of the data definitionparameterType - the uint representation of the DataTypes.ParameterType
```


---

#### getId()


**getId()**


Returns the identifier of this contract.

```endpoint
CALL getId()
```

#### Return

```json
the bytes32 ID
```


---

#### getModelFileReference()


**getModelFileReference()**


Returns the file reference for the model file

```endpoint
CALL getModelFileReference()
```

#### Return

```json
the external file reference
```


---

#### getNumberOfDataDefinitions()


**getNumberOfDataDefinitions()**


Returns the number of data definitions in the ProcessModel

```endpoint
CALL getNumberOfDataDefinitions()
```

#### Return

```json
the number of data definitions
```


---

#### getNumberOfParticipants()


**getNumberOfParticipants()**


Returns the number of participants defined in this ProcessModel

```endpoint
CALL getNumberOfParticipants()
```

#### Return

```json
the number of participants
```


---

#### getNumberOfProcessDefinitions()


**getNumberOfProcessDefinitions()**


Returns the number of process definitions in this ProcessModel

```endpoint
CALL getNumberOfProcessDefinitions()
```

#### Return

```json
the number of process definitions
```


---

#### getNumberOfProcessInterfaces()


**getNumberOfProcessInterfaces()**


Returns the number of process interfaces declared in this ProcessModel

```endpoint
CALL getNumberOfProcessInterfaces()
```

#### Return

```json
the number of process interfaces
```


---

#### getParticipantAtIndex(uint256)


**getParticipantAtIndex(uint256)**


Returns the ID of the participant at the given index

```endpoint
CALL getParticipantAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the participant ID, if it exists
```


---

#### getParticipantData(bytes32)


**getParticipantData(bytes32)**


Returns information about the participant with the given ID

```endpoint
CALL getParticipantData(bytes32)
```

#### Parameters

```solidity
_id // the participant ID

```

#### Return

```json
location the applications contract address, only available for a service participantmethod the function signature of the participant, only available for a service participantwebForm the form identifier (formHash) of the web participant, only available for a web participant
```


---

#### getProcessDefinition(bytes32)


**getProcessDefinition(bytes32)**


Returns the address of the ProcessDefinition with the specified ID

```endpoint
CALL getProcessDefinition(bytes32)
```

#### Parameters

```solidity
_id // the process ID

```

#### Return

```json
the address of the process definition, if it exists
```


---

#### getProcessDefinitionAtIndex(uint256)


**getProcessDefinitionAtIndex(uint256)**


Returns the address for the ProcessDefinition at the given index

```endpoint
CALL getProcessDefinitionAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the address of the ProcessDefinition, if it exists
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

#### hasParticipant(bytes32)


**hasParticipant(bytes32)**


Returns whether a participant with the specified ID exists in this ProcessModel

```endpoint
CALL hasParticipant(bytes32)
```

#### Parameters

```solidity
_id // the participant ID

```

#### Return

```json
true if it exists, false otherwise
```


---

#### hasProcessInterface(bytes32)


**hasProcessInterface(bytes32)**


Returns whether a process interface with the specified ID exists in this ProcessModel

```endpoint
CALL hasProcessInterface(bytes32)
```

#### Parameters

```solidity
_interfaceId // the interface ID

```

#### Return

```json
true if it exists, false otherwise
```


---

#### initialize(bytes32,uint8[3],address,bool,string)


**initialize(bytes32,uint8[3],address,bool,string)**


Initializes this DefaultOrganization with the provided parameters. This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(bytes32,uint8[3],address,bool,string)
```

#### Parameters

```solidity
_author // the model author
_id // the model ID
_isPrivate // indicates if model is visible only to creator
_modelFileReference // the reference to the external model file from which this ProcessModel originated
_version // the model version

```


---

#### isPrivate()


**isPrivate()**


Returns whether the model is private

```endpoint
CALL isPrivate()
```

#### Return

```json
true if the model is private, false otherwise
```


---

### ProcessModelRepository Interface


The ProcessModelRepository Interface contract is found within the bin bundle.

#### activateModel(address)


**activateModel(address)**


Activates the given ProcessModel and deactivates any previously activated model version of the same ID

```endpoint
CALL activateModel(address)
```

#### Parameters

```solidity
_model // the ProcessModel to activate

```

#### Return

```json
an error indicating success or failure
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### createProcessDefinition(address,bytes32)


**createProcessDefinition(address,bytes32)**


Creates a new process definition with the given parameters in the provided ProcessModel.

```endpoint
CALL createProcessDefinition(address,bytes32)
```

#### Parameters

```solidity
_processDefinitionId // the process definition ID
_processModelAddress // the ProcessModel in which to create the ProcessDefinition

```

#### Return

```json
newAddress - the address of the new ProcessDefinition when successful
```


---

#### createProcessModel(bytes32,uint8[3],address,bool,string)


**createProcessModel(bytes32,uint8[3],address,bool,string)**


Factory function to instantiate a ProcessModel. The model is automatically added to this repository.

```endpoint
CALL createProcessModel(bytes32,uint8[3],address,bool,string)
```

#### Parameters

```solidity
_author // the model author
_id // the model ID
_isPrivate // indicates if the model is private
_modelFileReference // the reference to the external model file from which this ProcessModel originated
_version // the model version

```


---

#### getActivityAtIndex(address,address,uint256)


**getActivityAtIndex(address,address,uint256)**


Returns the ID of the ActivityDefinition at the specified index position of the given Process Definition

```endpoint
CALL getActivityAtIndex(address,address,uint256)
```

#### Parameters

```solidity
_index // the index position
_model // the model address
_processDefinition // a Process Definition address

```

#### Return

```json
bytes32 the ActivityDefinition ID, if it exists
```


---

#### getActivityData(address,address,bytes32)


**getActivityData(address,address,bytes32)**


Returns information about the activity definition with the given ID.

```endpoint
CALL getActivityData(address,address,bytes32)
```

#### Parameters

```solidity
_id // the bytes32 id of the activity definition
_model // the model address
_processDefinition // a Process Definition address

```

#### Return

```json
activityType the BpmModel.ActivityType as uint8taskType the BpmModel.TaskType as uint8taskBehavior the BpmModel.TaskBehavior as uint8assignee the ID of the activity's assignee (for interactive activities)multiInstance whether the activity is a multi-instanceapplication the activity's applicationsubProcessModelId the ID of a process model (for subprocess activities)subProcessDefinitionId the ID of a process definition (for subprocess activities)
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getModel(bytes32)


**getModel(bytes32)**


Returns the address of the activated model with the given ID, if it exists and is activated

```endpoint
CALL getModel(bytes32)
```

#### Parameters

```solidity
_id // the model ID

```

#### Return

```json
the model address, if found
```


---

#### getModelAtIndex(uint256)


**getModelAtIndex(uint256)**


Returns the address of the ProcessModel at the given index position, if it exists

```endpoint
CALL getModelAtIndex(uint256)
```

#### Parameters

```solidity
_idx // the index position

```

#### Return

```json
the model address
```


---

#### getModelByVersion(bytes32,uint8[3])


**getModelByVersion(bytes32,uint8[3])**


Returns the address of the model with the given ID and version

```endpoint
CALL getModelByVersion(bytes32,uint8[3])
```

#### Parameters

```solidity
_id // the model ID
_version // the model version

```

#### Return

```json
the model address, if found
```


---

#### getNumberOfActivities(address,address)


**getNumberOfActivities(address,address)**


Returns the number of Activity Definitions in the specified Process 

```endpoint
CALL getNumberOfActivities(address,address)
```

#### Parameters

```solidity
_model // the model address
_processDefinition // a Process Definition address

```

#### Return

```json
uint - the number of Activity Definitions
```


---

#### getNumberOfModels()


**getNumberOfModels()**


Returns the number of models in this repository.

```endpoint
CALL getNumberOfModels()
```

#### Return

```json
size - the number of models
```


---

#### getNumberOfProcessDefinitions(address)


**getNumberOfProcessDefinitions(address)**


Returns the number of process definitions in the specified model

```endpoint
CALL getNumberOfProcessDefinitions(address)
```

#### Parameters

```solidity
_model // a ProcessModel address

```

#### Return

```json
size - the number of process definitions
```


---

#### getProcessDefinition(bytes32,bytes32)


**getProcessDefinition(bytes32,bytes32)**


Returns the process definition address when the model ID and process definition ID are provided

```endpoint
CALL getProcessDefinition(bytes32,bytes32)
```

#### Parameters

```solidity
_modelId // - the ProcessModel ID

```

#### Return

```json
_processId - the ProcessDefinition IDaddress - the ProcessDefinition address
```


---

#### getProcessDefinitionAtIndex(address,uint256)


**getProcessDefinitionAtIndex(address,uint256)**


Returns the address of the ProcessDefinition at the specified index position of the given model

```endpoint
CALL getProcessDefinitionAtIndex(address,uint256)
```

#### Parameters

```solidity
_idx // the index position
_model // a ProcessModel address

```

#### Return

```json
the ProcessDefinition address, if it exists
```


---

#### upgrade(address)


**upgrade(address)**


Performs the necessary steps to upgrade from this contract to the specified new version.

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a contract that replaces this one

```

#### Return

```json
true if successful, false otherwise
```


---

### ProcessModelRepositoryDb Interface


The ProcessModelRepositoryDb Interface contract is found within the bin bundle.

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---




### ServiceDb Interface


The ServiceDb Interface contract is found within the bin bundle.

#### getSystemOwner()


**getSystemOwner()**


Returns the system owner

```endpoint
CALL getSystemOwner()
```

#### Return

```json
the address of the system owner
```


---

#### transferSystemOwnership(address)


**transferSystemOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferSystemOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---


### SignatoryProxy Interface


The SignatoryProxy Interface contract is found within the bin bundle.

#### addSignatory(address)


**addSignatory(address)**


Enable calling `addSignatories` on `agreement`.

```endpoint
CALL addSignatory(address)
```

#### Parameters

```solidity
_signatory // is _signatory

```


---

#### addVersion(string)


**addVersion(string)**


Enable calling `addVersion` on `agreement`.

```endpoint
CALL addVersion(string)
```

#### Parameters

```solidity
_version // is _version

```


---

#### confirmExecutionVersion(string)


**confirmExecutionVersion(string)**


Enable calling `confirmExecutionVersion` on `agreement`.

```endpoint
CALL confirmExecutionVersion(string)
```

#### Parameters

```solidity
_version // is _version

```


---

#### createAgreementAsOwner(string)


**createAgreementAsOwner(string)**


Deploy agreement.

```endpoint
CALL createAgreementAsOwner(string)
```

#### Parameters

```solidity
_name // is _name

```


---

#### signAgreement(address,string)


**signAgreement(address,string)**


Invokes confirmExecutionAgreement on the provided agreement using the specified version.

```endpoint
CALL signAgreement(address,string)
```

#### Parameters

```solidity
_agreement // the agreement

```


---



### TestAgreement Interface


The TestAgreement Interface contract is found within the bin bundle.

#### addSignatories(address[])


**addSignatories(address[])**


Adds the specified signatories to this agreement, if they are valid, and returns the number of added signatories. Empty addresses and already registered signatories are rejected.

```endpoint
CALL addSignatories(address[])
```

#### Parameters

```solidity
_addresses // the signatories

```

#### Return

```json
the number of added signatories
```


---

#### addSignatory(address)


**addSignatory(address)**


Adds a single signatory to this agreement

```endpoint
CALL addSignatory(address)
```

#### Parameters

```solidity
_address // the address to add

```

#### Return

```json
NO_ERROR, INVALID_PARAM_VALUE if address is empty, RESOURCE_ALREADY_EXISTS if address has already been registered
```


---

#### addVersion(string)


**addVersion(string)**


Adds the specified hash as a new version of the document. The msg.sender is registered as owner and the version creation date is set to now.

```endpoint
CALL addVersion(string)
```

#### Parameters

```solidity
_hash // the version hash

```

#### Return

```json
BaseErrors.NO_ERROR, BaseErrors.INSUFFICIENT_PRIVILEGES (as determined by calling canAddVersion(), or BaseErrors.RESOURCE_ALREADY_EXISTS if the version has been added before.
```


---

#### confirmExecutionVersion(string)


**confirmExecutionVersion(string)**


Registers the msg.sender as having confirmed/endorsed the specified document version as the execution version.

```endpoint
CALL confirmExecutionVersion(string)
```

#### Parameters

```solidity
_version // the version

```

#### Return

```json
BaseErrors.NO_ERROR(), BaseErrors.INVALID_PARAM_VALUE() if given version is empty, or BaseErrors.RESOURCE_NOT_FOUND() if the version does not exist
```


---

#### getConfirmedVersion()


**getConfirmedVersion()**


Returns the confirmed version of this agreement, if it has been set.

```endpoint
CALL getConfirmedVersion()
```


---

#### getEndorsedVersion(address)


**getEndorsedVersion(address)**


Get the document version endorsed by the specified signatory.

```endpoint
CALL getEndorsedVersion(address)
```

#### Parameters

```solidity
_signatory // the signatory

```

#### Return

```json
the version hash, if an endorsed version exists, or an uninitialized string
```


---

#### getName()


**getName()**


Returns the document's name

```endpoint
CALL getName()
```


---

#### getNumberOfVersions()


**getNumberOfVersions()**


Returns the number of versions of this document

```endpoint
CALL getNumberOfVersions()
```

#### Return

```json
the number of versions
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### getSignatoriesSize()


**getSignatoriesSize()**


Returns the number of signatories of this agreement.

```endpoint
CALL getSignatoriesSize()
```

#### Return

```json
the number of signatories
```


---

#### getVersionCreated(string)


**getVersionCreated(string)**


Returns the creation date of the specified version hash.

```endpoint
CALL getVersionCreated(string)
```

#### Parameters

```solidity
_hash // the desired version hash

```

#### Return

```json
the creation date, or 0 if the version does not exist
```


---

#### getVersionCreator(string)


**getVersionCreator(string)**


Returns the address registered as the creator of the specified version hash.

```endpoint
CALL getVersionCreator(string)
```

#### Parameters

```solidity
_hash // the desired version hash

```

#### Return

```json
the creator address, or 0x0 if the version does not exist
```


---

#### isConfirmedVersion(string)


**isConfirmedVersion(string)**


Verify if the specified version hash is the confirmed version.

```endpoint
CALL isConfirmedVersion(string)
```

#### Parameters

```solidity
_version // the version

```

#### Return

```json
true if the version matches the confirmed one, false otherwise
```


---

#### isEffective()


**isEffective()**


Returns whether this agreement is effective or not

```endpoint
CALL isEffective()
```


---

#### isFullyConfirmed(string)


**isFullyConfirmed(string)**


Determines if the submitted version has been signed by all signatories.

```endpoint
CALL isFullyConfirmed(string)
```

#### Parameters

```solidity
_version // the version

```

#### Return

```json
true if all configured signatories have signed that version, false otherwise
```


---

#### modifyByOnlyByOwnerOrSignatory(address)


**modifyByOnlyByOwnerOrSignatory(address)**


Function to be modified by `onlyByOwnerOrSignatory`.

```endpoint
CALL modifyByOnlyByOwnerOrSignatory(address)
```


---

#### modifyByOnlyBySignatory(address)


**modifyByOnlyBySignatory(address)**


Function to be modified by `onlyBySignatory`.

```endpoint
CALL modifyByOnlyBySignatory(address)
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---


### TestDoug


The TestDoug contract is found within the bin bundle.

#### deploy(string,address)


**deploy(string,address)**


Deploys the given contract by adding it without performing any checks or upgrades from previous versions.

```endpoint
CALL deploy(string,address)
```

#### Parameters

```solidity
_address // the contract address
_id // the key under which to register the contract

```

#### Return

```json
always true
```


---

#### deployVersion(string,address,uint8[3])


**deployVersion(string,address,uint8[3])**


Attempts to register the contract with the given address under the specified ID and version and performs a deployment procedure which involves dependency injection and upgrades from previously deployed contracts with the same ID.

```endpoint
CALL deployVersion(string,address,uint8[3])
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
true if successful, false otherwise
```


---

#### lookup(string)


**lookup(string)**


Returns the address registered under the given key

```endpoint
CALL lookup(string)
```

#### Parameters

```solidity
_id // the key to use for lookup

```

#### Return

```json
the contract address or 0x0
```


---

#### lookupVersion(string,uint8[3])


**lookupVersion(string,uint8[3])**


Returns the address of the specified version of a contract registered under the given ID.

```endpoint
CALL lookupVersion(string,uint8[3])
```

#### Parameters

```solidity
_id // the ID under which the contract is registered

```

#### Return

```json
the contract's address of 0x0 if the given ID and version cannot be found.
```


---

#### registerVersion(string,address,uint8[3])


**registerVersion(string,address,uint8[3])**


Registers the contract with the given address under the specified ID and version.

```endpoint
CALL registerVersion(string,address,uint8[3])
```

#### Parameters

```solidity
_address // the address of the contract
_id // the ID under which to register the contract

```

#### Return

```json
version - the version under which the contract was registered.
```


---

### TestObjectFactory Interface


The TestObjectFactory Interface contract is found within the bin bundle.

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

### TestObjectProxy Interface


The TestObjectProxy Interface contract is found within the bin bundle.

#### getDelegate()


**getDelegate()**


Implements AbstractDelegateProxy.getDelegate() Retrieves and returns the delegate address for this proxy by querying DOUG using the obect class identifier.

```endpoint
CALL getDelegate()
```

#### Return

```json
the address of the proxied contract
```


---



### TestServiceWithDependency Interface


The TestServiceWithDependency Interface contract is found within the bin bundle.

#### acceptDatabase(address)


**acceptDatabase(address)**


Implementation of DbInterchangeable.acceptDatabase(address). Sets the provided database as this contract's database, if this contract has been granted system ownership of the database. This function can only be called from the upgradeOwner or from another contract that shares the same upgradeOwner (the second scenario applies when the database is migrated from a previous version as part of an upgrade). REVERTS if: - the msg.sender is neither the uprade owner nor another UpgradeOwned contract with the same upgrade owner

```endpoint
CALL acceptDatabase(address)
```

#### Parameters

```solidity
_db // the database contract

```

#### Return

```json
true if it was accepted, false otherwise
```


---

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### migrateFrom(address)


**migrateFrom(address)**


Empty implementation of Migratable.migrateFrom(address).

```endpoint
CALL migrateFrom(address)
```

#### Return

```json
always true
```


---

#### migrateTo(address)


**migrateTo(address)**


Implementation of Migratable.migrateTo(address) that transfers system ownership of the database in this contract to the successor and calls DbInterchangeable.acceptDatabase(address) on the successor. REVERTS if: - the database contract was not accepted by the successor

```endpoint
CALL migrateTo(address)
```

#### Parameters

```solidity
_successor // the successor contract to which to migrate the database

```

#### Return

```json
true if the database was successfully accepted by the successor, otherwise a REVERT is triggered to rollback the change of system ownership.
```


---

#### setArtifactsFinder(address)


**setArtifactsFinder(address)**


Sets the ArtifactsFinder address.

```endpoint
CALL setArtifactsFinder(address)
```

#### Parameters

```solidity
_artifactsFinder // the address of an ArtifactsFinder

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---

### TestUserAccount Interface


The TestUserAccount Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### forwardCall(address,bytes)


**forwardCall(address,bytes)**


Forwards a call to the specified target using the given bytes message.

```endpoint
CALL forwardCall(address,bytes)
```

#### Parameters

```solidity
_payload // the function payload consisting of the 4-bytes function hash and the abi-encoded function parameters which is typically created by calling abi.encodeWithSelector(bytes4, args...) or abi.encodeWithSignature(signatureString, args...) 
_target // the address to call

```

#### Return

```json
returnData - the bytes returned from calling the target function, if successful. REVERTS if: - the target address is empty (0x0) - the target contract threw an exception (reverted). In this case this function will revert using the same reason
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### initialize(address,address)


**initialize(address,address)**


Initializes this DefaultOrganization with the specified owner and/or ecosystem . This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy. One or both owner/ecosystem are required to be set to guarantee another entity has control over this UserAccount REVERTS if: - both owner and ecosystem are empty.

```endpoint
CALL initialize(address,address)
```

#### Parameters

```solidity
_ecosystem // address of an ecosystem (optional)
_owner // public external address of individual owner (optional)

```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### TotalCounterCheck Interface


The TotalCounterCheck Interface contract is found within the bin bundle.

#### complete(address,bytes32,bytes32,address)


**complete(address,bytes32,bytes32,address)**


Increases a counter and writes result back. Also compares counter to total and set boolean output if total reached.

```endpoint
CALL complete(address,bytes32,bytes32,address)
```

#### Parameters

```solidity
_activityInstanceId // the ID of an ActivityInstance param _activityId the ID of the activity definition param _txPerformer the address which started the process transaction
_piAddress // the address of the ProcessInstance in which context this application is invoked

```


---

### TypeUtils Library


The TypeUtils Library contract is found within the bin bundle.

#### contentLength(bytes32)


**contentLength(bytes32)**


Returns the length of the alphanumeric content of the bytes32, i.e. the number of non-empty bytes

```endpoint
CALL contentLength(bytes32)
```

#### Parameters

```solidity
self // bytes32

```

#### Return

```json
the length
```


---

#### isEmpty(bytes32)


**isEmpty(bytes32)**


Checks if the given bytes32 is empty, i.e. does not have any content.

```endpoint
CALL isEmpty(bytes32)
```

#### Parameters

```solidity
_value // the value to check

```

#### Return

```json
true if empty, false otherwise
```


---

#### toBytes32(bytes)


**toBytes32(bytes)**


Converts the given bytes to bytes32. If the bytes are longer than 32, it will be truncated.

```endpoint
CALL toBytes32(bytes)
```

#### Parameters

```solidity
b // a byte[]

```

#### Return

```json
the bytes32 representation
```


---

#### toBytes32(string)


**toBytes32(string)**


Converts the given string to bytes32. If the string is longer than 32 bytes, it will be truncated.

```endpoint
CALL toBytes32(string)
```

#### Parameters

```solidity
s // a string

```

#### Return

```json
the bytes32 representation
```


---

#### toBytes32(uint256)


**toBytes32(uint256)**


Converts an unsigned integer to its string representation.

```endpoint
CALL toBytes32(uint256)
```

#### Parameters

```solidity
v // The number to be converted.

```

#### Return

```json
the bytes32 representation
```


---

#### toString(bytes32)


**toString(bytes32)**


Converts bytes32 to string

```endpoint
CALL toString(bytes32)
```

#### Parameters

```solidity
x // bytes32

```

#### Return

```json
the string representation
```


---

#### toUint(bytes)


**toUint(bytes)**


Converts the given bytes into the corresponding uint representation

```endpoint
CALL toUint(bytes)
```

#### Parameters

```solidity
b // a byte[]

```

#### Return

```json
the uint representation
```


---


### UpgradeDummy Interface


The UpgradeDummy Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

#### transferUpgradeOwnership(address)


**transferUpgradeOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner.

```endpoint
CALL transferUpgradeOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

#### upgrade(address)


**upgrade(address)**


Checks the version and invokes migrateTo and migrateFrom in order to transfer state (push then pull) REVERTS if: - Either migrateTo or migrateFrom were not successful

```endpoint
CALL upgrade(address)
```

#### Parameters

```solidity
_successor // the address of a Versioned contract that replaces this one

```

#### Return

```json
true if the upgrade was successful, otherwise a REVERT is triggered to rollback any changes from the upgrade
```


---



### UserAccount Interface


The UserAccount Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // a VersionedArtifact contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### forwardCall(address,bytes)


**forwardCall(address,bytes)**


Forwards a call to the specified target using the given bytes message.

```endpoint
CALL forwardCall(address,bytes)
```

#### Parameters

```solidity
_payload // the function payload consisting of the 4-bytes function hash and the abi-encoded function parameters
_target // the address to call

```

#### Return

```json
returnData - the bytes returned from calling the target function, if successful
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### getOwner()


**getOwner()**


Returns the owner of this contract

```endpoint
CALL getOwner()
```

#### Return

```json
the owner's address
```


---

#### initialize(address,address)


**initialize(address,address)**


Initializes this DefaultOrganization with the specified owner and/or ecosystem . This function replaces the contract constructor, so it can be used as the delegate target for an ObjectProxy.

```endpoint
CALL initialize(address,address)
```

#### Parameters

```solidity
_ecosystem // address of an ecosystem
_owner // public external address of individual owner

```


---

#### transferOwnership(address)


**transferOwnership(address)**


Allows the current owner to transfer control of the contract to a new owner. REVERTS if: - the new owner is empty

```endpoint
CALL transferOwnership(address)
```

#### Parameters

```solidity
_newOwner // The address to transfer ownership to.

```


---

### UserAccountTest Interface


The UserAccountTest Interface contract is found within the bin bundle.

#### testCallForwarding()


**testCallForwarding()**


Tests the UserAccount call forwarding logic

```endpoint
CALL testCallForwarding()
```


---



### Versioned Interface


The Versioned Interface contract is found within the bin bundle.

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // a Versioned contract to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

### VersionedContract Interface


The VersionedContract Interface contract is found within the bin bundle.

#### compareVersion(address)


**compareVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareVersion(uint8[3])


**compareVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getVersion()


**getVersion()**


Returns the version as 3-digit array

```endpoint
CALL getVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getVersionMajor()


**getVersionMajor()**


Returns the major version number

```endpoint
CALL getVersionMajor()
```

#### Return

```json
the major version
```


---

#### getVersionMinor()


**getVersionMinor()**


returns the minor version number

```endpoint
CALL getVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getVersionPatch()


**getVersionPatch()**


returns the patch version number

```endpoint
CALL getVersionPatch()
```

#### Return

```json
the patch version
```


---

### VersionedObject Interface


The VersionedObject Interface contract is found within the bin bundle.

#### compareArtifactVersion(address)


**compareArtifactVersion(address)**


Compares this contract's version to the version of the contract at the specified address.

```endpoint
CALL compareArtifactVersion(address)
```

#### Parameters

```solidity
_other // the address to which this contract is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### compareArtifactVersion(uint8[3])


**compareArtifactVersion(uint8[3])**


Compares this contract's version to the specified version.

```endpoint
CALL compareArtifactVersion(uint8[3])
```

#### Parameters

```solidity
_version // the version to which this contract's version is compared

```

#### Return

```json
0 (equal), -1 (the other version is lower), or 1 (the other version is higher).
```


---

#### getArtifactVersion()


**getArtifactVersion()**


Returns the version as 3-digit array

```endpoint
CALL getArtifactVersion()
```

#### Return

```json
the version as unit8[3]
```


---

#### getArtifactVersionMajor()


**getArtifactVersionMajor()**


Returns the major version number

```endpoint
CALL getArtifactVersionMajor()
```

#### Return

```json
the major version
```


---

#### getArtifactVersionMinor()


**getArtifactVersionMinor()**


returns the minor version number

```endpoint
CALL getArtifactVersionMinor()
```

#### Return

```json
the minor version
```


---

#### getArtifactVersionPatch()


**getArtifactVersionPatch()**


returns the patch version number

```endpoint
CALL getArtifactVersionPatch()
```

#### Return

```json
the patch version
```


---

#### supportsInterface(bytes4)


**supportsInterface(bytes4)**


Returns whether the declared interface signature is supported by this contract

```endpoint
CALL supportsInterface(bytes4)
```

#### Parameters

```solidity
_interfaceId // the signature of the ERC165 interface

```

#### Return

```json
true if supported, false otherwise
```


---

### VersionedTest Interface


The VersionedTest Interface contract is found within the bin bundle.

#### testCompare()


**testCompare()**


Tests the compare function of the Versioned contract

```endpoint
CALL testCompare()
```


---

