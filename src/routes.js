import React from 'react';

const Home = React.lazy(() => import('./views/home/Home'));

const routes = [
  { path: '/home', exact: true, name: 'Library Home', element: Home },
];
export default routes;
