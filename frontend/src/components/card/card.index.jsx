import { S } from "./card.styled";

const Card = ({ children, name }) => {
  return (
    <S.Container>
      <S.TitleContainer>
        <h1>Produtos</h1>
      </S.TitleContainer>
      <S.CardContainer>
        {}
        <S.Card>Diabo</S.Card>
        <S.Card>Diabo</S.Card>
      </S.CardContainer>
    </S.Container>
  );
};

export default Card;
