import React from 'react';
import { routes } from '../../../utils/globals';
import Item from './Item';

function List() {
  return (
    <ul className="nav__list row">
      {routes &&
        routes.map((route) => (
          <Item key={route.name} linkName={route.name} link={route.path} />
        ))}
    </ul>
  );
}

export default List;
