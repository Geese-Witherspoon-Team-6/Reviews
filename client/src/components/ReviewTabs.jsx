import React from 'react';

const ReviewTabs = ({ itemCount, shopCount, changeTabView }) => (
  <div onClick={changeTabView}>
    <button id="item-button">Reviews for this item {itemCount}</button>
    <button id="shop-button">Reviews for this shop {shopCount}</button>
  </div>
)

export default ReviewTabs;
