import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const ReviewPagination = ({ page, max, onPaginate }) => {
  return (<Pagination>
    <Pagination.Prev
      onClick={() => onPaginate('prev')}
      disabled={page === 1} />

    <div className="d-inline-flex" onClick={onPaginate}>
    <Pagination.Item active={page === 1} >{1} </Pagination.Item>

    {(max < 5 || page <= 2) && max >= 2 &&
      <Pagination.Item active={page === 2} >{2} </Pagination.Item>}
    {max < 5 && max >= 3 &&
      <Pagination.Item active={page === 3}>{3}</Pagination.Item>}
    {max < 5 && max >= 4 &&
      <Pagination.Item active={page === 4}>{4}</Pagination.Item>}
    {max > 4 &&
      <Pagination.Ellipsis disabled />}
    {page > 2 && page < (max - 1) && max > 4 &&
      <Pagination.Item active={page > 2 && page < (max - 1)}>{page}</Pagination.Item>}
    {page > 2 && page < (max - 1) && max > 4 &&
      <Pagination.Ellipsis disabled />}
    {page >= (max - 1) && max > 4 &&
      <Pagination.Item active={page === (max - 1)}>{max - 1}</Pagination.Item>}

    {max > 4 &&
      <Pagination.Item active={page === max} >{max} </Pagination.Item>}
    </div>

    <Pagination.Next
      onClick={() => onPaginate('next')}
      disabled={page === max} />
  </Pagination>)
}

export default ReviewPagination;
