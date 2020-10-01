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
      currentTab: 'items',
      pageNum: 1,
      maxPage: 1
    };

    this.getItemReviews = this.getItemReviews.bind(this);
    this.getShopReviews = this.getShopReviews.bind(this);
    this.onPaginate = this.onPaginate.bind(this);
    this.onSwitchTabs = this.onSwitchTabs.bind(this);
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

  onPaginate(move) {
    console.log(this.state.pageNum);
    if (move === 'prev') {
      this.setState({ pageNum: this.state.pageNum - 1 })
    } else if (move === 'next') {
      this.setState({ pageNum: this.state.pageNum + 1})
    } else if (move === 'first') {
      this.setState({ pageNum: 1 })
    } else if (move === 'last') {
      this.setState({ pageNum: this.state.maxPage })
    }
  }

  onSwitchTabs(key) {
    let maxPage = key === 'items' ?
      Math.ceil(this.state.itemReviews.length / 5) :
      Math.ceil(this.state.shopReviews.length / 5);
    this.setState({ currentTab: key, maxPage });
  }

  componentDidMount() {
    this.getItemReviews()
    this.getShopReviews()
  }

  render() {
    let page = this.state.pageNum;
    let max = this.state.maxPage;

    return (
    <TabContainer defaultActiveKey="items" transition={false} onSelect={this.onSwitchTabs}>
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
      <Pagination >
        <Pagination.Prev
          onClick={() => this.onPaginate('prev')}
          disabled={page === 1} />
        <Pagination.Item
          onClick={() => this.onPaginate('first')}
          active={page === 1} >{1}
        </Pagination.Item>

        {page <= 2 && <Pagination.Item active={page === 2}>{2}</Pagination.Item>}
        <Pagination.Ellipsis disabled />
        {page > 2 && page < (max - 1) && <Pagination.Item active={page > 2 && page < (max - 1)}>{page}</Pagination.Item>}
        {page > 2 && page < (max - 1) && <Pagination.Ellipsis disabled />}
        {page >= (max - 1) && <Pagination.Item active={page === (max - 1)}>{max - 1}</Pagination.Item>}

        <Pagination.Item
          onClick={() => this.onPaginate('last')}
          active={page === max} >{max}
        </Pagination.Item>
        <Pagination.Next onClick={() => this.onPaginate('next')} disabled={page === max}/>
      </Pagination>
    </TabContainer>
  )}
}

export default ReviewList;
