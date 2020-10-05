import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';

export const Star = styled.span`
  height: 18px;
  width: 18px;
  display: inline-block;`

export const Header = styled.h2`
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 300;
  font-size: 26px;
  line-height: 42px;
  margin: 12px 0 0 0;`

export const PaginationStyled = styled(Pagination)`
  .page-link {
    position: relative;
    display: block;
    padding: .5rem .5rem;
    line-height: 1.25;
    color: black;
    background-color: whitesmoke;
    border: none;
  }

  .active .page-link  {
    background-color: #b9b9b9;
  }`

  export const NavStyled  = styled(Nav)`
    border-bottom: 2px solid rgba(34, 34, 34, 0.15);

    button {
      border: none;
      background-color: white;
    }

    a, a:hover {
      color: black;
      font-weight: 300;
    }

    #items-tab {
      border-bottom: 2px solid black;
      margin-bottom: -2px;
    }
  `
