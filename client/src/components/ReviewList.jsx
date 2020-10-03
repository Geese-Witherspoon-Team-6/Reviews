import React from 'react';
import $ from 'jquery';

import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Review from './Review.jsx';
import ReviewPagination from './ReviewPagination.jsx';
import ReviewHeader from './ReviewHeader.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.itemId,
      itemReviews: [],
      shopReviews: [],
      currentTab: 'items',
      pageNum: 1,
      maxPage: 1,
      sort: 'rec'
    };

    this.getItemReviews = this.getItemReviews.bind(this);
    this.getShopReviews = this.getShopReviews.bind(this);
    this.onPaginate = this.onPaginate.bind(this);
    this.onSwitchTabs = this.onSwitchTabs.bind(this);
    this.clickHelpful = this.clickHelpful.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  getItemReviews(sort) {
    $.get(`/api/item-reviews/${this.state.id}/${sort}`)
      .done((reviews) => {
        this.setState({ itemReviews: reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  getShopReviews(sort) {
    $.get(`/api/store-reviews/${this.state.id}/${sort}`)
      .done((reviews) => {
        this.setState({ shopReviews: reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  onPaginate(move) {
    if (move === 'prev') {
      this.setState({ pageNum: this.state.pageNum - 1 })
    } else if (move === 'next') {
      this.setState({ pageNum: this.state.pageNum + 1})
    } else if (!move.target.innerHTML.includes('span')) {
      this.setState({ pageNum: Number(move.target.innerHTML) })
    }
  }

  onSwitchTabs(key) {
    document.getElementById(`${key}-tab`).style.borderBottom = '2px solid black';
    document.getElementById(`${key}-tab`).style.marginBottom = '-2px';

    let maxPage;
    if (key === 'items') {
      maxPage = Math.ceil(this.state.itemReviews.length) / 5;
      document.getElementById(`shop-tab`).style.borderColor = 'rgba(34, 34, 34, 0.15)';
    } else {
      maxPage = Math.ceil(this.state.shopReviews.length) / 5;
      document.getElementById(`items-tab`).style.borderColor = 'rgba(34, 34, 34, 0.15)';
    }

    this.setState({ currentTab: key, pageNum: 1, maxPage });
  }

  sortBy(sort, e) {
    this.getItemReviews(sort);
    this.getShopReviews(sort);
    this.setState({ sort })
  }

  clickHelpful(e) {
    e.target.style.display = 'none';
    document.getElementById(`${e.target.id}-thanks`).style.display = 'inline';
    $.ajax({
      url: `/api/helpful-review/${e.target.id}`,
      method: 'PATCH'
    })
    .done((changed) => {
      console.log(`Review helpful count updated to ${changed.helpful}`)
    })
    .fail((err) => {
      console.log('Request failed')
    })
  }

  componentDidMount() {
    this.getItemReviews('rec')
    this.getShopReviews('rec')
  }

  render() {
    let start = (this.state.pageNum - 1) * 5;
    let end = start + 5;
    return (
    <div>
    {/* <h2 id="reviews-count">{this.state.shopReviews.length} Reviews </h2> */}
    <ReviewHeader reviews={this.state.shopReviews} />
    <TabContainer activeKey={this.state.currentTab} transition={false}>

      <Nav id="review-nav" onSelect={this.onSwitchTabs}>
        <Nav.Item id="items-tab" as="button">
          <Nav.Link eventKey="items">Reviews for this item {this.state.itemReviews.length}</Nav.Link>
        </Nav.Item>
        <Nav.Item id="shop-tab" as="button">
          <Nav.Link eventKey="shop">Reviews for this shop {this.state.shopReviews.length}</Nav.Link>
        </Nav.Item>
      </Nav>

      <Container fluid>
        <Row className="justify-content-end">
          <Dropdown className="sort-by" onSelect={this.sortBy}>
            <Dropdown.Toggle id="dropdown-sort-by">
              Sort by: {this.state.sort === 'rec' ? 'Recommended' : 'Newest'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="rec">Recommended</Dropdown.Item>
              <Dropdown.Item eventKey="new">Newest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Row>
          <TabContent>
            <TabPane eventKey="items">
              {this.state.itemReviews.slice(start, end).map((review, idx) =>
              <Review
                review={review}
                clickReviewPhoto={this.props.clickReviewPhoto}
                clickHelpful={this.clickHelpful}
                key={idx} />)}
            </TabPane>
            <TabPane eventKey="shop">
              {this.state.shopReviews.slice(start, end).map((review, idx) =>
                <Review
                  review={review}
                  clickReviewPhoto={this.props.clickReviewPhoto}
                  clickHelpful={this.clickHelpful}
                  key={idx} />)}
            </TabPane>
          </TabContent>

          <ReviewPagination
            page={this.state.pageNum}
            max={this.state.maxPage}
            onPaginate={this.onPaginate}
          />
        </Row>
      </Container>
    </TabContainer>
    </div>
  )}
}

export default ReviewList;
