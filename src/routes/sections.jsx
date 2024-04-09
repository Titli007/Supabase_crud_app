import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';


export const ProjectPage = lazy(() => import('src/pages/ProjectPage'));
export const EmployeePage = lazy(() => import('src/pages/EmployeePage'))
export const IndexPage = lazy(() => import('src/pages/app'));
export const CreateProjPage = lazy(() => import('src/pages/CreateProj'));
export const CreateEmpPage = lazy(() => import('src/pages/CreateEmpPage'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signUp'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'projects', element: <ProjectPage /> },
        { path: 'employees', element: <EmployeePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'createproject', element: <CreateProjPage /> },
        { path: 'addemployee', element: <CreateEmpPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
