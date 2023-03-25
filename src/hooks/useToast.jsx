import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast(message, { icon: '😝' });
const asyncNotify = (myPromise, messages = {}, config = {}) => {
  const { loading, success, error } = messages;

  return toast.promise(
    myPromise,
    {
      loading: loading || 'Loading',
      success: success || ((data) => `Successfully saved ${data.name}`),
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
