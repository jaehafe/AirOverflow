import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeStation: {
    pageNo: 1,
    numOfRows: 100,
    stationName: '종로구',
    dataTerm: 'DAILY',
  },
};

const apDataSlice = createSlice({
  name: 'sido',
  initialState,
  reducers: {
    setStationData: (state, action) => {
      state.activeStation.stationName = action.payload?.stationName;
      state.activeStation.dataTerm = action.payload?.dataTerm;
    },
  },
});

export const { setStationData } = apDataSlice.actions;

export default apDataSlice.reducer;
