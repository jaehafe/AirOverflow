import React, { useState } from 'react';
import * as S from './Counter.style';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} from '../redux/features/countSlice';

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  const [amount, setAmount] = useState(0);

  const handleIncrease = () => {
    dispatch(incrementByAmount(Number(amount)));
  };

  const handleDecrease = () => {
    dispatch(decrementByAmount(Number(amount)));
  };

  const resetAll = () => {
    setAmount(0);
    dispatch(reset());
  };

  return (
    <S.Container>
      <S.Counter>Counter {count}</S.Counter>
      <S.Plus onClick={() => dispatch(increment())}>plus</S.Plus>
      <S.Minus onClick={() => dispatch(decrement())}>minus</S.Minus>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <div>
        <button onClick={handleIncrease}>Add Amount</button>
        <button onClick={resetAll}>Reset</button>
        <button onClick={handleDecrease}>빼기</button>
      </div>

      <h1>안녕하세요 이재하입니다.</h1>
      <h2>안녕하세요 이재하입니다.</h2>
      <h3>안녕하세요 이재하입니다.</h3>
      <h4>안녕하세요 이재하입니다.</h4>
      <h5>안녕하세요 이재하입니다.</h5>
      <h6>안녕하세요 이재하입니다.</h6>
      <p>p 안녕하세요 이재하입니다.</p>
      <div>div 안녕하세요 이재하입니다.</div>
      <span>span안녕하세요 이재하입니다.</span>
    </S.Container>
  );
}

export default Counter;
