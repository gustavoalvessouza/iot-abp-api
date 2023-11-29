import styled, { keyframes } from "styled-components";

const rotation = keyframes`
0% {
transform: rotate(0);
}
100% {
transform: rotate(360deg);
}
`;

export const S = {
  Loader: styled.div`
    position: relative;
    width: 100px;
    height: 100px;

    &:before,
    &:after {
      content: "";
      border-radius: 50%;
      position: absolute;
      inset: 0;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3) inset;
    }

    &:after {
      box-shadow: 0 2px 0 #22c55e inset;
      animation: ${rotation} 1s linear infinite;
    }
  `,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  `,
};