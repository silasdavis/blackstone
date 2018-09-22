pragma solidity ^0.4.23;

import "commons-base/BaseErrors.sol";
import "commons-utils/DataTypes.sol";

import "commons-collections/DataStorage.sol";
import "commons-collections/FullDataStorage.sol";
import "commons-collections/AbstractAddressScopes.sol";
import "commons-collections/DataStorageUtils.sol";

contract DataStorageTest {
	
	string SUCCESS = "success";
	bytes32 EMPTY = "";
	FullDataStorage myStorage = new TestDataStorage();
	FullDataStorage mySubDataStorage = new TestDataStorage();
	
	// address[]
	address[100] addressArr;
	address[100] retAddressArr;
	address[] retAddressArrCopy;

	// uint256[]
	uint256[100] u256Arr;
	uint256[100] retU256Arr;
	uint256[] retU256ArrCopy;

	// int256[]
	int256[100] i256Arr;
	int256[100] retI256Arr;
	int256[100] retI256Arr2;
	int256[] retI256ArrCopy;
	int256[] retI256ArrCopy2;

	// bytes32[]
	bytes32[100] dcSuperheroes;
	bytes32[100] heroes;
	bytes32[] heroesCopy;
	
	uint8 num = 200;
	address addr = 0x64A6b18404251B0C8E88b0D8FbDE7145C72aFC75;

	bool myCoolBool = true;
	bytes32 boolId = "myCoolBool";
	bytes32 numId = "twoHundred";
	bytes32 addrId = "myAddr";
	bytes32 myValId = "letter1";
	bytes32 my16bValId = "someId";
	bytes32 addressArrId = "addressArrId";
	bytes32 u256ArrId = "uint256ArrId";
	bytes32 i256ArrId = "int256ArrId";
	bytes32 bytesArrayId = "DCSuperheroes";
	
	bytes1 myVal = "a";
	bytes16 my16bVal = "abcd1234";
	bytes32 batman = "batman";
	bytes32 superman = "superman";
	bytes32 wonderwoman = "wonderwoman";

	bytes32 num10 = "num10";
	uint ten = 10;
	bytes32 trueVal = "trueVal";
	bool truthy = true;
	bytes32 marmot = "marmot";
	string marmotName = "toby";
	string antman = "antman";
	bytes32 subStorageId = "substorage";
	bytes32 compAddrId = "comparableAddr";
	address compAddr = 0x94EcB18404251B0C8E88B0D8fbde7145c72AEC22;
	
	uint error;

	function testPrimitivesDataStorageAndRetrieval() external returns (string) {
		
		// bool
		myStorage.setDataValueAsBool(boolId, myCoolBool);
		if (myStorage.getDataType(boolId) != DataTypes.BOOL()) return "bool Data object dataType is not DataTypes.BOOL()";
		if (!myStorage.getDataValueAsBool(boolId)) return "bool value should have been true";

		// uint8
		myStorage.setDataValueAsUintType(numId, num, DataTypes.UINT8());
		if (myStorage.getDataType(numId) != DataTypes.UINT8()) return "uint8 Data object dataType is not DataTypes.UINT8()";
		if (myStorage.getDataValueAsUint(numId) != num) return "uint8 value should have been 200";

		// uint
		numId = "twoHundred2";
		myStorage.setDataValueAsUint(numId, num);
		if (myStorage.getDataType(numId) != DataTypes.UINT256()) return "unspecified uint size should be saved as DataTypes.UINT256()";
		if (myStorage.getDataValueAsUint(numId) != num) return "uint8 value should have been 200";

		// address
		myStorage.setDataValueAsAddress(addrId, addr);
		if (myStorage.getDataType(addrId) != DataTypes.ADDRESS()) return "address Data object dataType is not DataTypes.ADDRESS()";
		if (myStorage.getDataValueAsAddress(addrId) != addr) return "address value does not match saved address";

		// bytes32
		myStorage.setDataValueAsBytes32(myValId, myVal);
		if (myStorage.getDataType(myValId) != DataTypes.BYTES32()) return "bytes1 Data object with unspecifiec dataType should be of type DataTypes.BYTES32()";
		if (myStorage.getDataValueAsBytes32(myValId) != myVal) return "output value does not match saved bytes1";

		// bytes16
		myStorage.setDataValueAsBytes32Type(my16bValId, my16bVal, DataTypes.BYTES16());
		if (myStorage.getDataType(my16bValId) != DataTypes.BYTES16()) return "bytes16 Data object should have type DataTypes.BYTES16()";
		if (myStorage.getDataValueAsBytes32(my16bValId) != my16bVal) return "output value does not match saved bytes16";
		
		return SUCCESS;
	}

	function testArraysDataStorageAndRetrieval() external returns (string) {

		// address[]
		addressArr[0] = 0xd23B9DC1f8DFc5C722243b19dA46F9174e9409Ab;
		addressArr[1] = 0x34266B66E9D8627213a2129Bb7c305DfC1Db8e04;
		addressArr[2] = 0xdFcf0C7a89BF918F388F2D00f7D45f8C5aFB80f9;
		myStorage.setDataValueAsAddressArray(addressArrId, addressArr);
		retAddressArr = myStorage.getDataValueAsAddressArray(addressArrId);
		if (myStorage.getDataType(addressArrId) != DataTypes.ADDRESSARRAY()) return "address[] datatype is not DataTypes.ADDRESSARRAY()";
		if (retAddressArr.length != 100) return "data storage should return an array with length of 100";
		for (uint a = 0; a < retAddressArr.length; a++) {
			if (retAddressArr[a] != 0) {
				retAddressArrCopy.push(retAddressArr[a]);
			}
		}
		if (retAddressArrCopy.length > 3) return "dynamic array contains more then 3 elements";
		if (retAddressArrCopy[2] != addressArr[2]) return "address[] value at index 2 does not match original";
		// overwrite and test array entries count
		addressArr[15] = 0xcf52c4C67020f2A8514cde7a391dFad67b629c23;
		addressArr[99] = 0x4B4070A988e8D5444d1e167579F8eb304f4F2520;
		myStorage.setDataValueAsAddressArray(addressArrId, addressArr);
		if (myStorage.getNumberOfArrayEntries(addressArrId, false) != 3) return "getNumberOfArrayEntries for address[] returned wrong size";
		if (myStorage.getNumberOfArrayEntries(addressArrId, true) != 5) return "getNumberOfArrayEntries fullscan for address[] returned wrong size";

		// uint256[]
		u256Arr[0] = 16;
		u256Arr[1] = 64;
		u256Arr[2] = 255;
		myStorage.setDataValueAsUintArray(u256ArrId, u256Arr);
		retU256Arr = myStorage.getDataValueAsUintArray(u256ArrId);
		if (myStorage.getDataType(u256ArrId) != DataTypes.UINT256ARRAY()) return "uint256[] datatype is not DataTypes.UINT256ARRAY()";
		if (retU256Arr.length != 100) return "data storage should return an array with length of 100";
		for (uint u = 0; u < retU256Arr.length; u++) {
			if (retU256Arr[u] != 0) {
				retU256ArrCopy.push(retU256Arr[u]);
			}
		}
		if (retU256ArrCopy.length > 3) return "dynamic array contains more then 3 elements";
		if (retU256ArrCopy[2] != 255) return "uint256[] value at index 2 does not match original";

		// int256[]
		i256Arr[0] = 16;
		i256Arr[1] = 64;
		i256Arr[2] = 255;
		myStorage.setDataValueAsIntArray(i256ArrId, i256Arr);
		retI256Arr = myStorage.getDataValueAsIntArray(i256ArrId);
		if (myStorage.getDataType(i256ArrId) != DataTypes.INT256ARRAY()) return "int256[] datatype is not DataTypes.INT256ARRAY()";
		if (retI256Arr.length != 100) return "data storage should return an array with length of 100";
		for (uint i = 0; i < retI256Arr.length; i++) {
			if (retI256Arr[i] != 0) {
				retI256ArrCopy.push(retI256Arr[i]);
			}
		}
		if (retI256ArrCopy.length > 3) return "dynamic array contains more then 3 elements";
		if (retI256ArrCopy[2] != 255) return "int256[] value at index 2 does not match original";

		// bytes32[]
		dcSuperheroes[0] = batman;
		dcSuperheroes[1] = superman;
		dcSuperheroes[2] = wonderwoman;
		myStorage.setDataValueAsBytes32Array(bytesArrayId, dcSuperheroes);
		heroes = myStorage.getDataValueAsBytes32Array(bytesArrayId);
		if (myStorage.getDataType(bytesArrayId) != DataTypes.BYTES32ARRAY()) return "bytes32[] datatype is not DataTypes.BYTES32ARRAY()";
		if (heroes.length != 100) return "data storage should return an array with length of 100";
		for (uint j = 0; j < heroes.length; j++) {
			if (heroes[j] != "") {
				heroesCopy.push(heroes[j]);
			}
		}
		if (heroesCopy.length > 3) return "dynamic array contains more then 3 elements";
		if (heroesCopy[2] != wonderwoman) return "bytes32[] value at index 2 does not match original";
		// overwrite and test array entries count
		dcSuperheroes[10] = "Spiderman";
		dcSuperheroes[78] = "Hulk";
		myStorage.setDataValueAsBytes32Array(bytesArrayId, dcSuperheroes);
		if (myStorage.getNumberOfArrayEntries(bytesArrayId, false) != 3) return "getNumberOfArrayEntries for bytes32[] returned wrong size";
		if (myStorage.getNumberOfArrayEntries(bytesArrayId, true) != 5) return "getNumberOfArrayEntries fullscan for bytes32[] returned wrong size";

		return SUCCESS;
	}

	function testDataRemoval () external returns (string) {
		if (myStorage.getSize() != 10) return "pre-removal storage size should be 10";
		
		myStorage.removeData(i256ArrId);
		retI256Arr2 = myStorage.getDataValueAsIntArray(i256ArrId);
		for (uint i = 0; i < retI256Arr2.length; i++) {
			if (retI256Arr2[i] != 0) {
				retI256ArrCopy2.push(retI256Arr2[i]);
			}
		}
		if (retI256ArrCopy2.length > 0) return "dynamic array should be empty, deletion failed";
		
		if (myStorage.getSize() != 9) return "post-removal storage size should be 9";
		
		return SUCCESS;
	}

	function testDataComparison() external returns (string) {
		bool result;

		myStorage.setDataValueAsAddress(subStorageId, mySubDataStorage);
		
		// compare uints
		myStorage.setDataValueAsUintType(num10, ten, DataTypes.UINT256());
		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, num10, DataStorageUtils.COMPARISON_OPERATOR.EQ, ten);
		if (result != true) return "Expected 10 == 10 to be true";

		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, num10, DataStorageUtils.COMPARISON_OPERATOR.NEQ, uint(12));
		if (result != true) return "Expected 10 != 12 to be true";

		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, num10, DataStorageUtils.COMPARISON_OPERATOR.LT, uint(12));
		if (result != true) return "Expected 10 < 12 to be true";

		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, num10, DataStorageUtils.COMPARISON_OPERATOR.GT, uint(12));
		if (result != false) return "Expected 10 > 12 to be false";

		// compare bools
		myStorage.setDataValueAsBool(trueVal, truthy);
		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, trueVal, DataStorageUtils.COMPARISON_OPERATOR.EQ, true);
		if (result != true) return "Expected truthy to be true";

		// compare bytes32
		myStorage.setDataValueAsBytes32(batman, batman);
		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, batman, DataStorageUtils.COMPARISON_OPERATOR.EQ, superman);
		if (result != false) return "Expected batman == superman to be false";

		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, batman, DataStorageUtils.COMPARISON_OPERATOR.EQ, bytes32("batman"));
		if (result != true) return "Expected batman == batman to be true";

		// compare string
		myStorage.setDataValueAsString(marmot, marmotName);
		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, marmot, DataStorageUtils.COMPARISON_OPERATOR.EQ, antman);
		if (result != false) return "Expected toby == antman to be false";

		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, marmot, DataStorageUtils.COMPARISON_OPERATOR.NEQ, marmotName);
		if (result != false) return "Expected toby != toby to be false";

		// compare address
		myStorage.setDataValueAsAddress(compAddrId, compAddr);
		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, compAddrId, DataStorageUtils.COMPARISON_OPERATOR.EQ, addr);
		if (result != false) return "Expected compAddr == addr to be false";

		result = DataStorageUtils.resolveExpression(myStorage, EMPTY, compAddrId, DataStorageUtils.COMPARISON_OPERATOR.NEQ, compAddr);
		if (result != false) return "Expected compAddr != compAddr to be false";

		// compare uint in substorage
		mySubDataStorage.setDataValueAsUintType(num10, 10, DataTypes.UINT256());
		result = DataStorageUtils.resolveExpression(myStorage, subStorageId, num10, DataStorageUtils.COMPARISON_OPERATOR.EQ, ten);
		if (result != true) return "Expected 10 == 10 to be true in substorage";

		return SUCCESS;
	}

	/**
	 * @dev Tests functions specific to AddressScopes
	 */
	function testAddressScopedDataStorage() external returns (string) {

		ScopedStorage testStorage = new ScopedStorage();

		testStorage.setDataValueAsAddress("Buyer", address(this));
		testStorage.setDataValueAsAddress("Seller", msg.sender);
		if (address(testStorage).call(bytes4(keccak256(abi.encodePacked("setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)"))), address(0), "context1", "Scope1", EMPTY, EMPTY, 0x0))
			return "Setting a scope on an empty address should revert";
		if (address(testStorage).call(bytes4(keccak256(abi.encodePacked("setAddressScope(address,bytes32,bytes32,bytes32,bytes32,address)"))), address(this), EMPTY, EMPTY, EMPTY, EMPTY, 0x0))
			return "Setting a scope with no fixed or conditional scope information should revert";

		testStorage.setAddressScope(address(this), EMPTY, "testScope", EMPTY, EMPTY, 0x0);
		testStorage.setDataValueAsBytes32("ConditionalScope", "senderScope");
		// set the second scope twice to test overwriting and length expectations
		testStorage.setAddressScope(msg.sender, "context1", EMPTY, "fakeCondition", EMPTY, 0x0);
		testStorage.setAddressScope(msg.sender, "context1", EMPTY, "ConditionalScope", EMPTY, 0x0);

		if (testStorage.resolveAddressScope(address(this), EMPTY, DataStorage(0x0)) != "testScope") return "Scope for address(this)/EMPTY not resolved correctly";
		if (address(testStorage).call(bytes4(keccak256(abi.encodePacked("resolveAddressScope(address,bytes32,DataStorage)"))), msg.sender, "context1", DataStorage(0x0)))
			return "Retrieving a scope defined by ConditionalData should revert if no DataStorage is passed";
		if (testStorage.resolveAddressScope(msg.sender, "context1", testStorage) != "senderScope") return "Scope for msg.sender/context1 not resolved correctly";
		bytes32 fixedScope;
		bytes32 dataPath;
		bytes32 dataStorageId;
		address dataStorage;
		(fixedScope, dataPath, dataStorageId, dataStorage) = testStorage.getAddressScopeDetails(address(this), EMPTY);
		if (fixedScope != "testScope") return "fixedScope via scope details for address(this)/EMPTY not returned correctly";
		(fixedScope, dataPath, dataStorageId, dataStorage) = testStorage.getAddressScopeDetails(msg.sender, "context1");
		if (fixedScope != "") return "fixedScope via scope details for msg.sender/context1 not returned correctly";
		if (dataPath != "ConditionalScope") return "dataPath via scope details for msg.sender/context1 not returned correctly";
		if (dataStorageId != "") return "dataStorageId via scope details for msg.sender/context1 not returned correctly";
		if (dataStorage != 0x0) return "dataStorage via scope details for msg.sender/context1 not returned correctly";

		return SUCCESS;
	}

}


contract TestDataStorage is FullDataStorage {

}

contract ScopedStorage is AbstractDataStorage, AbstractAddressScopes {

}