import React from 'react';
import useRoutes from '../../routes';

const Main = props => {
  const routes = useRoutes(props);
  return <main className="main">{routes}</main>;
};

export default Main;
