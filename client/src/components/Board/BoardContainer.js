import styled from 'styled-components';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 2px solid black;
  width: 404px;
  height: 404px;
  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 40px;
  }

  @media (max-width: 400px) {
    width: 308px;
    height: 308px;
  }
`;

export default BoardContainer;
