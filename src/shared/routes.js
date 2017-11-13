import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/items",
    component: SearchPage,
    exact: true
  },
  {
    path: "/items/:id",
    component: ProductPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
];

export default routes;
