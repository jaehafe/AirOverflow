import React, { useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function useAsyncNotify() {
  const asyncNotify = useCallback((myPromise, stationName) => {
    return toast.promise(
      myPromise,
      {
        loading: 'Loading',
        success: `${stationName} 즐겨찾기 저장 완료`,
        error: `error!`,
      },
      {
        style: {
          minWidth: '250px',
        },
      }
    );
  }, []);

  return { asyncNotify };
}

export function ToastContainer() {
  return <Toaster position="bottom-center" reverseOrder={true} />;
}
