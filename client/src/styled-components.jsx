import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Media from 'react-bootstrap/Media'
import styled from 'styled-components';

export const Star = styled.span`
  height: 18px;
  width: 18px;
  display: inline-block;
`

export const Header = styled.h2`
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 300;
  font-size: 26px;
  line-height: 42px;
  margin: 12px 0 0 0;
`

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
  }
`

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

export const DropToggleStyled = styled(Dropdown.Toggle)`
  {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    border-radius: 20px;
    float: right;
    background-color: white;
    color: black;
    border-color: transparent;
    padding: 10px 15px;
  }

  &:hover {
    float: right;
    background-color: whitesmoke;
    color: black;
    border-color: transparent;
    padding: 10px 15px;
  }

  #reviews &:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
    background-color: inherit;
    color: inherit;
    border-color: transparent;
  }
`

export const DropItemStyled = styled(Dropdown.Item)`
  &:active {
    background-color: whitesmoke;
    color: black;
  }
`

export const Helpful = styled.div`
  p {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
  }

  button {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    border-radius: 20px;
  }
`

export const ReviewStyled = styled(Media)`
  padding: 9px 9px 9px 0;
  font-weight: 300;
  font-size: 17px;
  margin-bottom: 20px;

  .user-icon {
    border-radius: 50%;
    margin-right: 12px;
  }

  .quiet-text {
    font-size: 14px;
    line-height: 18px;
    color: #595959 ;
    margin: 10px 0;
  }

  .link {
    text-decoration: underline;
    margin-right: 10px;
  }

  .review-body .col {
    padding-left: 0px;
    padding-right: 0px;
  }

  .review-body img {
    max-width: 100%;
    min-width: 80px;
    margin-left: 30px;
    border-radius: 10%;
  }

  .item-icon {
    border-radius: 10%;
    margin-right: 12px;
  }
`
