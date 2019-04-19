/**
 * Returns a string[] with trimmed strings from a delimited string as input
 * @param input
 * @param delimiter default is ','
 * @returns
 */
const getArrayFromString = (input, delimiter) => {
  const arr = input.split((delimiter || ','));
  return arr.map(elem => elem.trim());
};

/**
 * Converts the object's delimited string values trimmed string arrays.
 * This function is useful for reading properties files with keys like: key1 = foo1, foo2, foo17
 * @param settings
 * @returns
 */
const convertObjectValuesToArray = (settings) => {
  const obj = {};
  settings.forEach((key) => {
    obj[key] = getArrayFromString(settings[key]);
  });
  return obj;
};

/**
 * Returns the user friendly label of the Process Instance State.
 * Note that this mapping reflects the ProcessInstanceState enum in BpmRuntime.sol contract.
 * @param {integer representing the state of the process instance} state
 */
const getProcessInstanceStateLabel = (state) => {
  // {CREATED,ABORTED,ACTIVE,COMPLETED}
  if (parseInt(state, 10) === 0) return 'CREATED';
  if (parseInt(state, 10) === 1) return 'ABORTED';
  if (parseInt(state, 10) === 2) return 'ACTIVE';
  if (parseInt(state, 10) === 3) return 'COMPLETED';
  return '';
};

/**
 * Returns the user friendly label of the Activity Instance State.
 * Note that this mapping reflects the ActivityInstanceState enum in BpmRuntime.sol contract.
 * @param {integer representing the state of the activity instance} state
 */
const getActivityInstanceStateLabel = (state) => {
  // {CREATED,ABORTED,COMPLETED,INTERRUPTED,SUSPENDED}
  if (parseInt(state, 10) === 0) return 'CREATED';
  if (parseInt(state, 10) === 1) return 'ABORTED';
  if (parseInt(state, 10) === 2) return 'COMPLETED';
  if (parseInt(state, 10) === 3) return 'INTERRUPTED';
  if (parseInt(state, 10) === 4) return 'SUSPENDED';
  return '';
};

module.exports = {
  getArrayFromString,
  convertObjectValuesToArray,
  getProcessInstanceStateLabel,
  getActivityInstanceStateLabel,
};
