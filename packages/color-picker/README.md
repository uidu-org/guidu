# uidu inputs

Get the AMD module located at `uidu-inputs.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'UiduInputs': 'uidu-inputs'
  }
});

require(['react', 'UiduInputs'], function(React, UiduInputs) {

  React.render(React.createElement(UiduInputs), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
