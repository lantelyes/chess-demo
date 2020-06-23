import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const Row = styled.div`
  display: flex;

  @media (max-width: 800px) {
    margin-bottom: 40px;
  }

  @media (max-width: 400px) {
    margin-bottom: 60px;
  }
`;

const RowText = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  max-width: 600px;
  margin-left: 20px;

  @media (max-width: 800px) {
    max-width: 250px;
  }

  @media (max-width: 400px) {
    max-width: 200px;
  }
`;

const KnightSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: 50px;
  height: 50px;
  color: Black;
  background-color: white;
  border: 4px solid black;
`;

const PrimaryMoveSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: 50px;
  height: 50px;
  color: white;
  background-color: #2e2e2e;
  border: 4px solid black;
`;

const SecondaryMoveSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: 50px;
  height: 50px;
  color: white;
  background-color: #696969;
  border: 4px solid black;
`;

const HelpContainer = styled.div`
  justify-content: space-between;
  width: 740px;
  margin-top: 40px;

  @media (max-width: 800px) {
    width: 400px;
  }

  @media (max-width: 400px) {
    width: 308px;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  height: 180px;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 800px) {
    height: auto;
  }
`;

const Help = () => {
  return (
    <HelpContainer>
      <Card id="legend" style={{ height: '100%', width: '100%' }}>
        <Card.Header as="h4">Legend</Card.Header>
        <Card.Body>
          <LegendContainer>
            <Row>
              <PrimaryMoveSquare>1</PrimaryMoveSquare>
              <RowText>
                This square represents every space the knight can move to from
                its current position, click on one of these squares to move the
                knight
              </RowText>
            </Row>
            <Row>
              <SecondaryMoveSquare>2</SecondaryMoveSquare>
              <RowText>
                This square represents every possible space the knight can move
                to from its current position after moving tiwce.
              </RowText>
            </Row>
            <Row>
              <KnightSquare>K</KnightSquare>
              <RowText>
                This square represents the space containing the knight, click on
                it to show its available moves
              </RowText>
            </Row>
          </LegendContainer>
        </Card.Body>
      </Card>
    </HelpContainer>
  );
};

export default Help;
