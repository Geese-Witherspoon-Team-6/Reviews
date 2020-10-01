import React from 'react';
import $ from 'jquery';
import Nav from 'react-bootstrap/Nav'
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Review from './Review.jsx';
import ReviewPagination from './ReviewPagination.jsx';

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
    this.clickHelpful = this.clickHelpful.bind(this);
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
    if (move === 'prev') {
      this.setState({ pageNum: this.state.pageNum - 1 })
    } else if (move === 'next') {
      this.setState({ pageNum: this.state.pageNum + 1})
    } else if (!move.target.innerHTML.includes('span')) {
      this.setState({ pageNum: Number(move.target.innerHTML) })
    }
  }

  onSwitchTabs(key) {
    let maxPage = key === 'items' ?
      Math.ceil(this.state.itemReviews.length / 5) :
      Math.ceil(this.state.shopReviews.length / 5);
    this.setState({ currentTab: key, pageNum: 1, maxPage });
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
    this.getItemReviews()
    this.getShopReviews()
  }

  render() {
    let start = (this.state.pageNum - 1) * 5;
    let end = start + 5;
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
    </TabContainer>
  )}
}

export default ReviewList;
