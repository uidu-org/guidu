import DashletCard from './components/DashletCard';
import DashletFooter from './components/DashletFooter';
import DashletHeader from './components/DashletHeader';
import DashletLoader from './components/DashletLoader';
import dashlets from './dashlets';

export { default as Dashlets, renderDashlet } from './components/Dashlets';
export * from './dashlets';
export * from './types';
export * from './utils';
export { DashletHeader, DashletFooter, DashletCard, DashletLoader };

export default dashlets;
