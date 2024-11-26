import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import RequireAuth from './components/RequireAuth';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/verify',
    element: lazy(() => import('./views/auth/signin/CustomerDetails'))
  },
  
  {
    path: '*',
    layout: AdminLayout,
    guard: RequireAuth,
    routes: [
      {
        exact: 'true',
        path: '/verify',
        element: lazy(() => import('./views/auth/signin/CustomerDetails'))
      },
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/pos',
        element: lazy(() => import('./views/pos'))
      },
      {
        exact: 'true',
        path: '/Inventory',
        element: lazy(() => import('./views/Inventory'))
      },
      {
        exact: 'true',
        path: '/Accounts',
        element: lazy(() => import('./views/Accounts'))
      },
      {
        exact: 'true',
        path: '/Production',
        element: lazy(() => import('./views/Production'))
      },
      {
        exact: 'true',
        path: '/Article',
        element: lazy(() => import('./views/Article'))
      },
     
      {
        exact: 'true',
        path: '/Settings',
        element: lazy(() => import('./views/Settings'))
      },
      {
        exact: 'true',
        path: '/CompanyTotalSale',
        element: lazy(() => import('./views/CompanyTotalSales'))
      },
      {
        exact: 'true',
        path: '/SaleTrendofCompany',
        element: lazy(() => import('./views/SaleTrend'))
      },
      {
        exact: 'true',
        path: '/SalebyPaymentMode',
        element: lazy(() => import('./views/SaleByPaymentMode'))
      },
      {
        exact: 'true',
        path: '/BranchSale',
        element: lazy(() => import('./views/BranchSale'))
      },
      {
        exact: 'true',
        path: '/TotalCustomerServed',
        element: lazy(() => import('./views/TotalCustomerServed'))
      },
      {
        exact: 'true',
        path: '/CategoryWiseSale',
        element: lazy(() => import('./views/CategoryWiseSale'))
      },
      {
        exact: 'true',
        path: '/SalePersonWiseSale',
        element: lazy(() => import('./views/SalesPersonWiseSale'))
      },
      {
        exact: 'true',
        path: '/SupplierWiseSale',
        element: lazy(() => import('./views/SupplierWiseSale'))
      },
      {
        exact: 'true',
        path: '/AverageBasketSale',
        element: lazy(() => import('./views/AverageBasketSale'))
      },
      {
        exact: 'true',
        path: '/Sale-ROIReport',
        element: lazy(() => import('./views/SaleROIReport'))
      },
      {
        exact: 'true',
        path: '/Logout',
        element: lazy(() => import('./views/Logout'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
