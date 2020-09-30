import React from 'react';
import TabContainer from 'react-bootstrap/TabContainer';
import Nav from 'react-bootstrap/Nav'
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Review from './Review.jsx';

const ReviewList = ({ itemReviews, shopReviews, handleReviewClick }) => (
  <TabContainer defaultActiveKey="items" transition={false}>
    <Nav>
      <Nav.Item>
        <Nav.Link eventKey="items">Reviews for this item {itemReviews.length}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="shop">Reviews for this shop {shopReviews.length}</Nav.Link>
      </Nav.Item>
    </Nav>
    <TabContent>
      <TabPane eventKey="items">
        {itemReviews.map((review, idx) => <Review review={review} handleClick={handleReviewClick} key={idx} />)}
      </TabPane>
      <TabPane eventKey="shop">
        {shopReviews.map((review, idx) => <Review review={review} handleClick={handleReviewClick} key={idx} />)}
      </TabPane>
    </TabContent>
  </TabContainer>
)

export default ReviewList;
