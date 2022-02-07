import React from 'react';
import { Link } from 'react-router-dom';

function Item({ linkName, link }: Record<string, string>) {
  return (
    <li className="nav__item">
      <Link className="nav__link" to={link}>
        {linkName}
      </Link>
    </li>
  );
}

export default Item;
