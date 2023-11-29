import styled from "styled-components";

export const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 60px 0px 60px 0px;
    gap: 24px;
    text-transform: capitalize;
  `,
  TitleContainer: styled.div`
    display: flex;
    justify-content: center;

    h1 {
      color: #22c55e;
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
    padding: 24px 0 0 0;
    min-width: 100%;
    height: 100%;
    flex-shrink: 0;
    scroll-snap-align: center;
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    justify-content: space-evenly;
    
    img {
      width: 220px;
      object-fit: cover;
      border-radius: 10px;
    }
  `,

  Button: styled.button`
    width: 70%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #22c55e;
    background-color: white;
    color: #22c55e;
    font-weight: bold;
    font-size: 16px;

    &:hover {
      background-color: #22c55e;
      color: white;
      cursor: pointer;
    }
  `,
  Table: styled.table`
    text-align: justify;
    width: 70%;
  `
};
