const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// https://github.com/airbnb/enzyme#installation
Enzyme.configure({ adapter: new Adapter() });
