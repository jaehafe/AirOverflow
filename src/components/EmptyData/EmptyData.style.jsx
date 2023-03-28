import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: var(--division); */
  /* width: 120vh; */
  /* min-height: 100vh; */
  gap: 30px;
`;
export const Title = styled.h1`
  font-size: 40px;
`;
export const HeroIMG = styled.div`
  width: 500px;
`;
export const Button = styled.button`
  border: 1px solid;
  padding: 20px 30px;
  border-radius: 10px;
  font-size: 20px;

  background-color: var(--off-white);

  &:hover,
  &:active {
    background-color: #fff;
  }
`;
