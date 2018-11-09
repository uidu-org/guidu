import React from 'react';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';
var Container = styled.div.withConfig({
  displayName: "Loading__Container",
  componentId: "sc-1489rhy-0"
})(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  height: 80vh;\n  justify-content: center;\n"]);

var Loading = function Loading(props) {
  return React.createElement(Container, null, React.createElement(Spinner, props));
};

Loading.defaultProps = {
  size: 'large'
};
export default Loading;