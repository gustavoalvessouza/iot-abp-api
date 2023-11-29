import styled from "styled-components";

export const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 60px 0px 60px 0px;
    gap: 24px;
  `,
  TitleContainer: styled.div`
    display: flex;
    justify-content: center;

    h1 {
      color: #24fe00;
    }
  `,
  CardContainer: styled.div`
    display: flex;
    height: 100%;
    gap: 24px;
    padding: 24px;
    overflow: hidden;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  `,

  Card: styled.div`
    min-width: 100%;
    height: 100%;
    flex-shrink: 0;
    scroll-snap-align: center;
    border-radius: 8px;

    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  `,
};
