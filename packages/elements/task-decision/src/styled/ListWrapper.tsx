import styled from 'styled-components';

const ListWrapper = styled.ol`
  /*
    Increasing specificity with double ampersand to ensure these rules take
    priority over the global styles applied to 'ol' elements.
  */
  && {
    list-style-type: none;
    padding-left: 0;
  }
`;

export default ListWrapper;
