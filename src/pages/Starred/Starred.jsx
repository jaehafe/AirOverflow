import React from 'react';
import * as S from './Starred.style';
import { useCookies } from 'react-cookie';

function Starred() {
  const [cookie] = useCookies(['airoverflow']);

  return <div>123</div>;
}

export default Starred;
