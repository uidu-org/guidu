import styled from 'styled-components';

// z-index is set to 200 for the main container to be above the dropzone which has z-index 100
export const EditorContainer = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
`;
EditorContainer.displayName = 'EditorContainer';
