import styled from 'styled-components';
import { Select } from 'antd';

export const Container = styled.div`
  border: 1px solid;
  width: 100%;
  min-height: 100vh;
`;

export const SelectWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  color: var(--primary-color);
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

export const DataTermSelect = styled(Select)`
  width: 150px;
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
