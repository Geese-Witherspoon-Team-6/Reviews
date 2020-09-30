import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import ReviewList from './components/ReviewList.jsx';
import ReviewTabs from './components/ReviewTabs.jsx';
import PhotoCarousel from './components/PhotoCarousel.jsx';
import ModalCarousel from './components/ModalCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    let itemId = Number(location.pathname.split('/')[2]);

    this.state = {
      id: itemId,
      itemReviews: [],
      shopReviews: [],
      photoReviews: [],
      modalIdx: 0,
      modalShow: false,
      modalIsCarousel: true,
      view: 'item'
    };

    this.getItemReviews = this.getItemReviews.bind(this)
    this.getShopReviews = this.getShopReviews.bind(this)
    this.getPhotoReviews = this.getPhotoReviews.bind(this)
    this.changeTabView = this.changeTabView.bind(this)
    this.handleReviewClick = this.handleReviewClick.bind(this)
    this.modalHandleSelect = this.modalHandleSelect.bind(this)
    this.toggleModalShow = this.toggleModalShow.bind(this)
    this.carouselClick = this.carouselClick.bind(this)
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

  getPhotoReviews() {
    $.get(`/api/photo-reviews/${this.state.id}`)
      .done((reviews) => {
        // formatting for photo carousel
        var slides = [[], [], [], [], []];
        var i = 0;
        for (let slide of slides) {
          slides[i] = slide.concat(reviews.slice(i * 4, (i * 4) + 4));
          i++;
        }
        this.setState({ photoReviews: slides });
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  changeTabView(e) {
    var view = e.target.id === 'item-button' ? 'item' : 'shop';
    this.setState({ view });
  }

  handleReviewClick(e) {
    var reviews = this.state.photoReviews.flat();
    var modalIdx = reviews.indexOf(reviews.find((review) => review._id === e.target.id));
    this.setState({ modalIdx, modalIsCarousel: false, modalShow: true })
  }

  carouselClick(e) {
    this.setState({ modalIdx: Number(e.target.id), modalIsCarousel: true, modalShow: true });
  }

  modalHandleSelect(selectedIdx, e) {
    this.setState({ modalIdx: Number(selectedIdx) })
  }

  toggleModalShow() {
    this.setState({ modalShow: !this.state.modalShow })
  }

  componentDidMount() {
    this.getItemReviews()
    this.getShopReviews()
    this.getPhotoReviews()
  }

  render() {
    return (
      <div>
        <ReviewTabs
          itemCount={this.state.itemReviews.length}
          shopCount={this.state.shopReviews.length}
          changeTabView={this.changeTabView}/>
        <ReviewList
          reviews={this.state.view === 'item' ? this.state.itemReviews : this.state.shopReviews}
          handleReviewClick={this.handleReviewClick}/>
        <PhotoCarousel photos={this.state.photoReviews} carouselClick={this.carouselClick} />
        <ModalCarousel
          reviewIdx={this.state.modalIdx}
          reviews={ this.state.photoReviews.flat() }
          show={this.state.modalShow}
          isCarousel={this.state.modalIsCarousel}
          toggleShow={this.toggleModalShow}
          handleSelect={this.modalHandleSelect} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('reviews'))
