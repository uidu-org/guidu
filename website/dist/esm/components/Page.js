import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
var containerWidth = {
  small: '480px',
  medium: '640px',
  large: '980px'
};
var PageContainer = styled.main.withConfig({
  displayName: "Page__PageContainer",
  componentId: "qzrb1e-0"
})(["\n  max-width: ", ";\n  margin: 2rem auto;\n  padding: 0 2rem;\n"], function (p) {
  return containerWidth[p.width] ? containerWidth[p.width] : containerWidth.medium;
});
export default PageContainer;
export var Title = styled.h1.withConfig({
  displayName: "Page__Title",
  componentId: "qzrb1e-1"
})(["\n  margin-bottom: 1em;\n"]);
export var Section = styled.section.withConfig({
  displayName: "Page__Section",
  componentId: "qzrb1e-2"
})(["\n  margin-top: 3em;\n\n  p {\n    line-height: 1.4em;\n  }\n"]);
export var Intro = styled.p.withConfig({
  displayName: "Page__Intro",
  componentId: "qzrb1e-3"
})(["\n  font-size: ", "px;\n  font-weight: 300;\n  line-height: 1.4em;\n"], math.multiply(gridSize, 2));