import React from 'react';
import $ from 'jquery';
import Nav from 'react-bootstrap/Nav'
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Pagination from 'react-bootstrap/Pagination';
import Review from './Review.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.itemId,
      itemReviews: [],
      shopReviews: [],
      pageNum: 0
    };

    this.getItemReviews = this.getItemReviews.bind(this);
    this.getShopReviews = this.getShopReviews.bind(this);
  }

  getItemReviews() {
    $.get(`/api/item-reviews/${this.state.id}`)
      .done((reviews) => {
        this.setState({ itemReviews: reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  getShopReviews() {
    $.get(`/api/store-reviews/${this.state.id}`)
      .done((reviews) => {
        this.setState({ shopReviews: reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  componentDidMount() {
    this.getItemReviews()
    this.getShopReviews()
  }

  render() {
    return (
    <TabContainer defaultActiveKey="items" transition={false}>
      <Nav>
        <Nav.Item>
          <Nav.Link eventKey="items">Reviews for this item {this.state.itemReviews.length}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="shop">Reviews for this shop {this.state.shopReviews.length}</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent>
        <TabPane eventKey="items">
          {/* {itemReviews.map((review, idx) => <Review review={review} handleClick={this.props.handleReviewClick} key={idx} />)} */}
          Items
        </TabPane>
        <TabPane eventKey="shop">
          {/* {shopReviews.map((review, idx) => <Review review={review} handleClick={this.props.handleReviewClick} key={idx} />)} */}
          Shop
        </TabPane>
      </TabContent>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis disabled />

        <Pagination.Item active>{12}</Pagination.Item>

        <Pagination.Ellipsis disabled />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </TabContainer>
  )}
}

// const ReviewList = ({ itemReviews, shopReviews, handleReviewClick }) => (
  // <TabContainer defaultActiveKey="items" transition={false}>
  //   <Nav>
  //     <Nav.Item>
  //       <Nav.Link eventKey="items">Reviews for this item {itemReviews.length}</Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link eventKey="shop">Reviews for this shop {shopReviews.length}</Nav.Link>
  //     </Nav.Item>
  //   </Nav>
  //   <TabContent>
  //     <TabPane eventKey="items">
  //       {itemReviews.map((review, idx) => <Review review={review} handleClick={handleReviewClick} key={idx} />)}
  //     </TabPane>
  //     <TabPane eventKey="shop">
  //       {shopReviews.map((review, idx) => <Review review={review} handleClick={handleReviewClick} key={idx} />)}
  //     </TabPane>
  //   </TabContent>
  // </TabContainer>
// )

export default ReviewList;
