import styled from 'styled-components';

export const StyledPoster = styled.div<{ poster: string }>`
  background-color: #eee;
  background-image: ${({ poster }) => `url(${poster})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const StyledPlayButton = styled.button`
  background: 0;
  border: 0;
  color: white;
  padding: 0;
  height: 3rem;
  left: 50%;
  margin-left: -1.5rem;
  margin-top: -1.5rem;
  opacity: 0.66;
  outline: 0;
  position: absolute;
  top: 50%;
  transition: opacity 200ms;
  width: 3rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 100%;

  &:hover {
    opacity: 1;
  }
`;
