import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const ReviewPagination = ({ page, max, onPaginate }) => (
  <Pagination >
    <Pagination.Prev
      onClick={() => onPaginate('prev')}
      disabled={page === 1} />
    <Pagination.Item
      onClick={() => onPaginate('first')}
      active={page === 1} >{1}
    </Pagination.Item>

    {page <= 2 && <Pagination.Item active={page === 2}>{2}</Pagination.Item>}
    <Pagination.Ellipsis disabled />
    {page > 2 && page < (max - 1) && <Pagination.Item active={page > 2 && page < (max - 1)}>{page}</Pagination.Item>}
    {page > 2 && page < (max - 1) && <Pagination.Ellipsis disabled />}
    {page >= (max - 1) && <Pagination.Item active={page === (max - 1)}>{max - 1}</Pagination.Item>}

    <Pagination.Item
      onClick={() => onPaginate('last')}
      active={page === max} >{max}
    </Pagination.Item>
    <Pagination.Next onClick={() => onPaginate('next')} disabled={page === max}/>
  </Pagination>
)

export default ReviewPagination;
