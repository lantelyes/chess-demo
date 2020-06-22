import styled from 'styled-components';

const BoardStartMessage = styled.div`
  width: 400px;
  height: 400px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  text-align: center;

  @media (max-width: 400px) {
    width: 308px;
    height: 308px;
    font-size: 28px;
  }
`;

export default BoardStartMessage;
