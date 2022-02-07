import React from 'react';
import Item from './Item';

function List() {
  return (
    <ul className="nav__list row">
      <Item linkName="Dashboard" link="/" />
    </ul>
  );
}

export default List;
