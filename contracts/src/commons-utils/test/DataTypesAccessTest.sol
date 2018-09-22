pragma solidity ^0.4.23;

import "commons-utils/DataTypes.sol";
import "commons-utils/DataTypesAccess.sol";

contract DataTypesAccessTest {

	string constant SUCCESS = "success";

	function testDataTypesAccess() external returns (string) {

		DataTypesAccess access = new DataTypesAccess();

		for(uint i=0; i<access.getNumberOfDataTypes(); i++) {
			if (!DataTypes.isValid(uint8(access.getDataTypeAtIndex(i)))) {
				return "Detected an invalid data type in DataTypeAccess.";
			}
		}
		
		if (access.getDataTypeAtIndex(4) != uint(DataTypes.UINT16())) return "expected UINT8 (3) at index 3";
		if (access.getDataTypeAtIndex(13) != uint(DataTypes.INT64())) return "expected INT32 (15) at index 13";
		if (access.getDataTypeAtIndex(32) != uint(DataTypes.UINT8ARRAY())) return "expected UINT8ARRAY (103) at index 32";

		return SUCCESS;
	}

}