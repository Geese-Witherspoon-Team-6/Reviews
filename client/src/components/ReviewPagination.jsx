import React from 'react';
import { PaginationStyled } from '../styled-components.jsx';

const ReviewPagination = ({ page, max, onPaginate }) => {
  return (<PaginationStyled>
    <PaginationStyled.Prev
      onClick={() => onPaginate('prev')}
      disabled={page === 1} />

    <div className="d-inline-flex" onClick={onPaginate}>
    <PaginationStyled.Item active={page === 1} >{1} </PaginationStyled.Item>

    {(max < 5 || page <= 2) && max >= 2 &&
      <PaginationStyled.Item active={page === 2} >{2} </PaginationStyled.Item>}
    {max < 5 && max >= 3 &&
      <PaginationStyled.Item active={page === 3}>{3}</PaginationStyled.Item>}
    {max < 5 && max >= 4 &&
      <PaginationStyled.Item active={page === 4}>{4}</PaginationStyled.Item>}
    {max > 4 &&
      <PaginationStyled.Ellipsis disabled />}
    {page > 2 && page < (max - 1) && max > 4 &&
      <PaginationStyled.Item active={page > 2 && page < (max - 1)}>{page}</PaginationStyled.Item>}
    {page > 2 && page < (max - 1) && max > 4 &&
      <PaginationStyled.Ellipsis disabled />}
    {page >= (max - 1) && max > 4 &&
      <PaginationStyled.Item active={page === (max - 1)}>{max - 1}</PaginationStyled.Item>}

    {max > 4 &&
      <PaginationStyled.Item active={page === max} >{max} </PaginationStyled.Item>}
    </div>

    <PaginationStyled.Next
      onClick={() => onPaginate('next')}
      disabled={page === max} />
  </PaginationStyled>)
}

export default ReviewPagination;
