import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './components/ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    let itemId = Number(location.pathname.split('/')[2]);

    this.state = {
      id: itemId,
      reviews: []
    };

    this.getItemReviews = this.getItemReviews.bind(this)
  }

  getItemReviews() {
    $.get(`/api/item-reviews/${this.state.id}`)
      .done((reviews) => {
        this.setState({ reviews })
      })
      .fail(() => {
        console.log('Request failed')
      })
  }

  componentDidMount() {
    this.getItemReviews()
  }

  render() {
    return (
      <div>
        <ReviewList reviews={this.state.reviews}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('reviews'))
