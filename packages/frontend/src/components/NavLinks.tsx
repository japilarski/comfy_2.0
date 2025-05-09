import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userState } from '../features';
import React from 'react';

type LinkType = {
  id: number;
  url: string;
  text: string;
  authorized?: boolean;
};

const links: LinkType[] = [
  { id: 1, url: '/', text: 'strona główna' },
  { id: 2, url: 'about', text: 'o nas' },
  { id: 3, url: 'products', text: 'oferta' },
  // { id: 4, url: 'cart', text: 'koszyk' },
  // { id: 5, url: 'checkout', text: 'checkout', authorized: true },
  // { id: 6, url: 'orders', text: 'orders', authorized: true },
];

export const NavLinks = () => {
  const user = useSelector((state: { userState: userState }) => state.userState.user);

  return (
    <>
      {links.map((link) => {
        if (link.authorized && !user) return null;
        return (
          <li key={link.id}>
            <NavLink to={link.url}>{link.text}</NavLink>
          </li>
        );
      })}
    </>
  );
};
