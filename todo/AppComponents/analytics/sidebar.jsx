import React from 'react';
import { BarChart2 } from 'react-feather';

export default match => ({
  icon: <BarChart2 className="mr-2" size={14} />,
  name: 'Analytics',
  children: [
    {
      path: `${match.url === '/' ? '' : match.url}/analytics`,
      name: 'Riepilogo',
    },
    {
      path: `${match.url === '/' ? '' : match.url}/analytics/performance`,
      name: 'Performance',
    },
    {
      path: `${match.url === '/' ? '' : match.url}/analytics/visitors`,
      name: 'Pubblico',
    },
    {
      path: `${match.url === '/' ? '' : match.url}/analytics/sources`,
      name: 'Acquisizione',
    },
  ],
});
