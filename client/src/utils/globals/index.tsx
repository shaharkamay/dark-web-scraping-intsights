import React from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from '../../@types';
import Alerts from '../../pages/alerts/Alerts';
import Dashboard from '../../pages/dashboard/Dashboard';
import Keywords from '../../pages/keywords/Keywords';

export const routes: IRoute[] = [
  {
    name: 'Dashboard',
    path: '/',
    element: <Route key="/" path="/" element={<Dashboard />} />,
  },
  {
    name: 'Keywords',
    path: '/keywords',
    element: <Route key="keywords" path="/keywords" element={<Keywords />} />,
  },
  {
    name: 'Alerts',
    path: '/alerts',
    element: <Route key="alerts" path="/alerts" element={<Alerts />} />,
  },
];
