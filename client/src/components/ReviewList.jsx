import React from 'react';
import $ from 'jquery';

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
import { NavStyled, DropToggleStyled, DropItemStyled } from '../styled-components.jsx';

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
    $.get(`http://localhost:3001/api/item-reviews/${this.state.id}/${sort}`)
      .done((reviews) => {
        this.setState({ itemReviews: reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  getShopReviews(sort) {
    $.get(`http://localhost:3001/api/store-reviews/${this.state.id}/${sort}`)
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
    <ReviewHeader reviews={this.state.shopReviews} />
    <TabContainer activeKey={this.state.currentTab} transition={false}>

      <NavStyled onSelect={this.onSwitchTabs}>
        <NavStyled.Item id="items-tab" as="button">
          <NavStyled.Link eventKey="items">Reviews for this item {this.state.itemReviews.length}</NavStyled.Link>
        </NavStyled.Item>
        <NavStyled.Item id="shop-tab" as="button">
          <NavStyled.Link eventKey="shop">Reviews for this shop {this.state.shopReviews.length}</NavStyled.Link>
        </NavStyled.Item>
      </NavStyled>

      <Container fluid>
        <Row className="justify-content-end">
          <Dropdown onSelect={this.sortBy}>
            <DropToggleStyled>
              Sort by: {this.state.sort === 'rec' ? 'Recommended' : 'Newest'}
            </DropToggleStyled>
            <Dropdown.Menu>
              <DropItemStyled eventKey="rec">Recommended</DropItemStyled>
              <DropItemStyled eventKey="new">Newest</DropItemStyled>
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
