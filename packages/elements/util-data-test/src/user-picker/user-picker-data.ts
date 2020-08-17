declare var require: {
  <T>(path: string): T;
};

const userPickerData = require('../json-data/user-picker-data.json') as any; // User from @uidu/user-picker

export default userPickerData;
