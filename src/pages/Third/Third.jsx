import React from 'react';
import { useAddStarMutation, useDeleteStarMutation } from '../../redux/features/starred';

function Third() {
  const [addStar, { isLoading: isAdding }] = useAddStarMutation();
  const [deleteStar, { isLoading: isDeleting }] = useDeleteStarMutation();
  return <div>Third</div>;
}

export default Third;
