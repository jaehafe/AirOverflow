import React from 'react';
import EmptyData from './EmptyData/EmptyData';
import { NotFoundProps } from '../utils/EmptyDataUtils';

function NotFound() {
  return <EmptyData props={NotFoundProps} />;
}

export default NotFound;
