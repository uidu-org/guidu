import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledRow = styled.div<{ layout: string }>`
  ${tw`mb-4`}
  ${({ layout }) => layout === 'horizontal' && tw`flex`}
`;

export const StyledLabel = styled.label<{ layout: string }>`
  ${tw`block`}
  ${({ layout }) => (layout === 'horizontal' ? tw`w-3/12` : tw`mb-2`)}
`;
