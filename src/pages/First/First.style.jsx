import styled from 'styled-components';
import { Select } from 'antd';

export const Container = styled.div`
  position: relative;
`;

export const HeaderSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* width: 400px; */
  padding: 20px;
  /* height: 60px; */
  z-index: 2;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid;
  border-radius: 20px;
  opacity: 0.6;
  &:hover,
  &:active {
    opacity: 1;
  }

  & h3 {
  }
`;
export const SelectWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
export const SidoSelect = styled(Select)`
  width: 200px;
  height: 44px;
  text-align: left;

  /* & div.ant-select-selector {
    border-color: ${({ theme, isfill }) =>
    isfill ? theme.gray500 : theme.gray200} !important;
  } */

  &.half {
    width: 50%;
    margin: 0 4px;
  }

  & > div {
    height: 100% !important;
    font-weight: 400;

    & span {
      margin-top: 6px;
    }
  }
`;

export const StationNameSelect = styled(Select)`
  width: 300px;
  height: 44px;
  text-align: left;

  /* & div.ant-select-selector {
    border-color: ${({ theme, isfill }) =>
    isfill ? theme.gray500 : theme.gray200} !important;
  } */

  &.half {
    width: 50%;
    margin: 0 4px;
  }

  & > div {
    height: 100% !important;
    font-weight: 400;

    & span {
      margin-top: 6px;
    }
  }
`;
