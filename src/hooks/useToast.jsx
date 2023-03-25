import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast(message, { icon: '😝' });

const asyncNotify = (myPromise, stationName, messages = {}, config = {}) => {
  const { loading, success, error } = messages;

  return toast.promise(
    myPromise,
    {
      loading: loading || 'Loading',
      success: () => `${stationName} 즐겨찾기 저장 완료`,
      error: error || ((err) => `This just happened: ${err.toString()}`),
    },
    {
      style: {
        minWidth: '250px',
      },
      ...config,
    }
  );
};

export function useToast() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}

export default useToast;

export { successNotify, errorNotify, asyncNotify };
