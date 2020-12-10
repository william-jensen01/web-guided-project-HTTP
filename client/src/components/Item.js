import React from 'react';
import { Route, NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';

import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';

function Item(props) {
  const { push } = useHistory();
  // same as:
  // const history = useHistory();
  // const push = history.push;
  const item = props.items.find(
    thing => `${thing.id}` === props.match.params.id
  );

  if (!props.items.length || !item) {
    return <h2>Loading item data...</h2>;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    // call axios
    axios.delete(`http://localhost:3333/items/${item.id}`)
    .then(res => {
      console.log('Item.js : handleDelete : ', res)
      // update app state
      props.setItems(res.data);
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="item-wrapper">
      <div className="item-header">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} />
        </div>
        <div className="item-title-wrapper">
          <h2>{item.name}</h2>
          <h4>${item.price}</h4>
        </div>
      </div>
      <nav className="item-sub-nav">
        <NavLink exact to={`/item-list/${item.id}`}>
          the story
        </NavLink>
        <NavLink to={`/item-list/${item.id}/shipping`}>shipping</NavLink>
      </nav>
      <Route
        exact
        path="/item-list/:id"
        render={props => <ItemDescription {...props} item={item} />}
      />
      <Route
        path="/item-list/:id/shipping"
        render={props => <ItemShipping {...props} item={item} />}
      />
      <button className="md-button" onClick={() => push(`/update-item/${item.id}`)}>
        Edit
      </button>
      <button className="md-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Item;
