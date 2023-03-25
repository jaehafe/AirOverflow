import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSido: { pageNo: 1, sidoName: '서울', numOfRows: 100, stationName: '' },
};

const sidoSlice = createSlice({
  name: 'sido',
  initialState,
  reducers: {
    setSidoName: (state, action) => {
      state.activeSido.sidoName = action.payload.sidoName;
      state.activeSido.stationName = action.payload.stationName;
    },
  },
});

export const { setSidoName } = sidoSlice.actions;

export default sidoSlice.reducer;
