const contracts = require('../controllers/contracts-controller');
const CONTRACT_ACTIVE_AGREEMENT = global.__monax_bundles.AGREEMENTS.contracts.ACTIVE_AGREEMENT;
const { PARAMETER_TYPE: PARAM_TYPE, DATA_TYPES } = global.__monax_constants;

/* **********************************************************
 *       PARAMETER TYPES TO SOLIDITY DATA TYPES MAPPING
 *       dataTypes match DataTypes.sol uint8 data types
 *       parameterTypes match Agreements.ParameterType enums
 ********************************************************** */

const agreementDataSetters = {};
const agreementDataGetters = {};
const activityOutDataSetters = {};
const activityInDataGetters = {};

/* **********************************
 *      AGREEMENT DATA SETTERS
 ********************************** */

const setDataValueAsBool = (agreementAddr, fieldName, fieldValue) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.setDataValueAsBool(fieldName, fieldValue, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

const setDataValueAsString = (agreementAddr, fieldName, fieldValue) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.setDataValueAsString(fieldName, fieldValue, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

const setDataValueAsUint = (agreementAddr, fieldName, fieldValue) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.setDataValueAsUint(fieldName, fieldValue, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

const setDataValueAsInt = (agreementAddr, fieldName, fieldValue) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.setDataValueAsInt(fieldName, fieldValue, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

const setDataValueAsAddress = (agreementAddr, fieldName, fieldValue) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.setDataValueAsAddress(fieldName, fieldValue, (err) => {
    if (err) reject(err);
    else resolve();
  });
});

/* **********************************
 *       AGREEMENT DATA GETTERS
 ********************************** */

const getDataValueAsBool = (agreementAddr, fieldName) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.getDataValueAsBool(fieldName, (err, data) => {
    if (err) return reject(err);
    return resolve({
      name: global.hexToString(fieldName),
      value: data.raw[0].valueOf(),
    });
  });
});

const getDataValueAsString = (agreementAddr, fieldName) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.getDataValueAsString(fieldName, (err, data) => {
    if (err) return reject(err);
    return resolve({
      name: global.hexToString(fieldName),
      value: data.raw[0].valueOf(),
    });
  });
});

const getDataValueAsUint = (agreementAddr, fieldName) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.getDataValueAsUint(fieldName, (err, data) => {
    if (err) return reject(err);
    return resolve({
      name: global.hexToString(fieldName),
      value: parseInt(data.raw[0].valueOf(), 10),
    });
  });
});

const getDataValueAsInt = (agreementAddr, fieldName) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.getDataValueAsInt(fieldName, (err, data) => {
    if (err) return reject(err);
    return resolve({
      name: global.hexToString(fieldName),
      value: parseInt(data.raw[0].valueOf(), 10),
    });
  });
});

const getDataValueAsAddress = (agreementAddr, fieldName) => new Promise((resolve, reject) => {
  const agreement = contracts.getContract(global.__abi, CONTRACT_ACTIVE_AGREEMENT, agreementAddr);
  agreement.getDataValueAsAddress(fieldName, (err, data) => {
    if (err) return reject(err);
    return resolve({
      name: global.hexToString(fieldName),
      value: data.raw[0].valueOf(),
    });
  });
});

/* **********************************
 *     ACTIVITY IN-DATA GETTERS
 ********************************** */

const getActivityInDataAsBool = (userAddr, activityInstanceId, dataMappingId) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .getActivityInDataAsBool(activityInstanceId, dataMappingId, contracts.BpmService(), (err, data) => {
      if (err) return reject(err);
      return resolve(data.raw[0].valueOf());
    });
});

const getActivityInDataAsString = (userAddr, activityInstanceId, dataMappingId) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .getActivityInDataAsString(activityInstanceId, dataMappingId, contracts.BpmService(), (err, data) => {
      if (err) return reject(err);
      return resolve(data.raw[0].valueOf());
    });
});

const getActivityInDataAsBytes32 = (userAddr, activityInstanceId, dataMappingId) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .getActivityInDataAsBytes32(activityInstanceId, dataMappingId, contracts.BpmService(), (err, data) => {
      if (err) return reject(err);
      return resolve(data.raw[0].valueOf());
    });
});

const getActivityInDataAsUint = (userAddr, activityInstanceId, dataMappingId) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .getActivityInDataAsUint(activityInstanceId, dataMappingId, contracts.BpmService(), (err, data) => {
      if (err) return reject(err);
      return resolve(data.raw[0].valueOf());
    });
});

const getActivityInDataAsInt = (userAddr, activityInstanceId, dataMappingId) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .getActivityInDataAsInt(activityInstanceId, dataMappingId, contracts.BpmService(), (err, data) => {
      if (err) return reject(err);
      return resolve(data.raw[0].valueOf());
    });
});

const getActivityInDataAsAddress = (userAddr, activityInstanceId, dataMappingId) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .getActivityInDataAsAddress(activityInstanceId, dataMappingId, contracts.BpmService(), (err, data) => {
      if (err) return reject(err);
      return resolve(data.raw[0].valueOf());
    });
});

/* **********************************
 *     ACTIVITY OUT-DATA SETTERS
 ********************************** */

const setActivityOutDataAsBool = (userAddr, activityInstanceId, dataMappingId, value) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .setActivityOutDataAsBool(activityInstanceId, dataMappingId, value, contracts.BpmService(), (err) => {
      if (err) return reject(err);
      return resolve();
    });
});

const setActivityOutDataAsString = (userAddr, activityInstanceId, dataMappingId, value) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .setActivityOutDataAsString(activityInstanceId, dataMappingId, value, contracts.BpmService(), (err) => {
      if (err) return reject(err);
      return resolve();
    });
});

const setActivityOutDataAsBytes32 = (userAddr, activityInstanceId, dataMappingId, value) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .setActivityOutDataAsBytes32(activityInstanceId, dataMappingId, value, contracts.BpmService(), (err) => {
      if (err) return reject(err);
      return resolve();
    });
});

const setActivityOutDataAsUint = (userAddr, activityInstanceId, dataMappingId, value) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .setActivityOutDataAsUint(activityInstanceId, dataMappingId, value, contracts.BpmService(), (err) => {
      if (err) return reject(err);
      return resolve();
    });
});

const setActivityOutDataAsInt = (userAddr, activityInstanceId, dataMappingId, value) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .setActivityOutDataAsInt(activityInstanceId, dataMappingId, value, contracts.BpmService(), (err) => {
      if (err) return reject(err);
      return resolve();
    });
});

const setActivityOutDataAsAddress = (userAddr, activityInstanceId, dataMappingId, value) => new Promise((resolve, reject) => {
  contracts
    .WorkflowUserAccount(userAddr)
    .setActivityOutDataAsAddress(activityInstanceId, dataMappingId, value, contracts.BpmService(), (err) => {
      if (err) return reject(err);
      return resolve();
    });
});

/* **********************************
 *            UTILS
 ********************************** */

const getAgreementValidParameters = agreementAddr => new Promise((resolve, reject) => {
  const queryStr = 'select ap.parameter_key, ap.parameterType from AGREEMENTS ag ' +
    `join ARCHETYPE_PARAMETERS ap on ag.archetype = ap.address where ag.address = '${agreementAddr}';`;
  contracts.cache.db.all(queryStr, (err, data) => {
    if (err) return reject(err);
    return resolve(data.map(_field => Object.assign(_field, { name: global.hexToString(_field.parameter_key) })));
  });
});

const getArchetypeValidParameters = archetypeAddr => new Promise((resolve, reject) => {
  const queryStr = `select ap.parameter_key, ap.parameterType from ARCHETYPE_PARAMETERS ap where ap.address = '${archetypeAddr}';`;
  contracts.cache.db.all(queryStr, (err, data) => {
    if (err) return reject(err);
    return resolve(data.map(_field => Object.assign(_field, { name: global.hexToString(_field.parameter_key) })));
  });
});

agreementDataSetters[`${PARAM_TYPE.BOOLEAN}`] = setDataValueAsBool;
agreementDataSetters[`${PARAM_TYPE.STRING}`] = setDataValueAsString;
agreementDataSetters[`${PARAM_TYPE.NUMBER}`] = setDataValueAsUint;
agreementDataSetters[`${PARAM_TYPE.DATE}`] = setDataValueAsUint;
agreementDataSetters[`${PARAM_TYPE.DATETIME}`] = setDataValueAsUint;
agreementDataSetters[`${PARAM_TYPE.MONETARY_AMOUNT}`] = setDataValueAsUint;
agreementDataSetters[`${PARAM_TYPE.USER_ORGANIZATION}`] = setDataValueAsAddress;
agreementDataSetters[`${PARAM_TYPE.CONTRACT_ADDRESS}`] = setDataValueAsAddress;
agreementDataSetters[`${PARAM_TYPE.SIGNING_PARTY}`] = setDataValueAsAddress;

agreementDataGetters[`${PARAM_TYPE.BOOLEAN}`] = getDataValueAsBool;
agreementDataGetters[`${PARAM_TYPE.STRING}`] = getDataValueAsString;
agreementDataGetters[`${PARAM_TYPE.NUMBER}`] = getDataValueAsUint;
agreementDataGetters[`${PARAM_TYPE.DATE}`] = getDataValueAsUint;
agreementDataGetters[`${PARAM_TYPE.DATETIME}`] = getDataValueAsUint;
agreementDataGetters[`${PARAM_TYPE.MONETARY_AMOUNT}`] = getDataValueAsUint;
agreementDataGetters[`${PARAM_TYPE.USER_ORGANIZATION}`] = getDataValueAsAddress;
agreementDataGetters[`${PARAM_TYPE.CONTRACT_ADDRESS}`] = getDataValueAsAddress;
agreementDataGetters[`${PARAM_TYPE.SIGNING_PARTY}`] = getDataValueAsAddress;

activityInDataGetters[`${DATA_TYPES.BOOLEAN}`] = getActivityInDataAsBool;
activityInDataGetters[`${DATA_TYPES.STRING}`] = getActivityInDataAsString;
activityInDataGetters[`${DATA_TYPES.BYTES32}`] = getActivityInDataAsBytes32;
activityInDataGetters[`${DATA_TYPES.UINT}`] = getActivityInDataAsUint;
activityInDataGetters[`${DATA_TYPES.INT}`] = getActivityInDataAsInt;
activityInDataGetters[`${DATA_TYPES.ADDRESS}`] = getActivityInDataAsAddress;

activityOutDataSetters[`${DATA_TYPES.BOOLEAN}`] = setActivityOutDataAsBool;
activityOutDataSetters[`${DATA_TYPES.STRING}`] = setActivityOutDataAsString;
activityOutDataSetters[`${DATA_TYPES.BYTES32}`] = setActivityOutDataAsBytes32;
activityOutDataSetters[`${DATA_TYPES.UINT}`] = setActivityOutDataAsUint;
activityOutDataSetters[`${DATA_TYPES.INT}`] = setActivityOutDataAsInt;
activityOutDataSetters[`${DATA_TYPES.ADDRESS}`] = setActivityOutDataAsAddress;


module.exports = {
  agreementDataSetters,
  agreementDataGetters,
  activityOutDataSetters,
  activityInDataGetters,
  getAgreementValidParameters,
  getArchetypeValidParameters,
};
