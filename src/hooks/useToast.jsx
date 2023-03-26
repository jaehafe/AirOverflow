// import React, { useCallback } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// export function useAsyncNotify() {
//   const asyncNotify = useCallback((myPromise, stationName) => {
//     return toast.promise(
//       myPromise,
//       {
//         loading: 'Loading',
//         success: `${stationName} 즐겨찾기 저장 완료`,
//         error: `error!`,
//       },
//       {
//         style: {
//           minWidth: '250px',
//         },
//       }
//     );
//   }, []);

//   return { asyncNotify };
// }

// export function ToastContainer() {
//   return <Toaster position="bottom-center" reverseOrder={true} />;
// }

import React, { useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function useAsyncToast() {
  const asyncToast = useCallback((resultPromise, data, messages) => {
    toast
      .promise(
        resultPromise,
        {
          loading: messages.loading,
          success: messages.success(data),
          error: (err) => messages.error(err),
        },
        {
          style: {
            marginLeft: '300px',
            minWidth: '250px',
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { asyncToast };
}

export function ToastContainer() {
  return <Toaster position="bottom-center" reverseOrder={true} />;
}
