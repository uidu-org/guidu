import styled from 'styled-components';
import { borderRadius, colors, themed } from '@atlaskit/theme';
var Type = styled.span.withConfig({
  displayName: "Type",
  componentId: "oi9t8e-0"
})(["\n  background-color: ", ";\n  border-radius: ", "px;\n  color: ", ";\n  display: inline-block;\n  margin: 2px 0;\n  padding: 0 0.2em;\n"], themed({
  light: colors.P50,
  dark: colors.P500
}), borderRadius, themed({
  light: colors.P500,
  dark: colors.P50
}));
export var TypeMeta = styled(Type).withConfig({
  displayName: "Type__TypeMeta",
  componentId: "oi9t8e-1"
})(["\n  background-color: ", ";\n  color: ", ";\n"], themed({
  light: colors.N20,
  dark: colors.DN50
}), colors.subtleText);
export var StringType = styled(Type).withConfig({
  displayName: "Type__StringType",
  componentId: "oi9t8e-2"
})(["\n  background-color: ", ";\n  color: ", ";\n"], themed({
  light: colors.G50,
  dark: colors.G500
}), themed({
  light: colors.G500,
  dark: colors.G100
}));
export default Type;