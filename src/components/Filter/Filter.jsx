import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { selectFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      <input
        type="text"
        value={filter}
        name="filter"
        onChange={handleFilterChange}
        placeholder="Find contacts by name"
      />
    </>
  );
};
