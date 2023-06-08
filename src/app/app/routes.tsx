import React from 'react';

import dynamic from 'next/dynamic';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import PageActivate from '@/features/account/PageActivate';
import PagePassword from '@/features/account/PagePassword';
import PageProfile from '@/features/account/PageProfile';
import PageRegister from '@/features/account/PageRegister';
import PageResetPasswordConfirm from '@/features/account/PageResetPasswordConfirm';
import PageResetPasswordRequest from '@/features/account/PageResetPasswordRequest';
import { GuardAdmin } from '@/features/auth/GuardAdmin';
import { GuardAuthenticated } from '@/features/auth/GuardAuthenticated';
import { GuardPublicOnly } from '@/features/auth/GuardPublicOnly';
import { LoginModalInterceptor } from '@/features/auth/LoginModalInterceptor';
import PageLogin from '@/features/auth/PageLogin';
import PageLogout from '@/features/auth/PageLogout';
import PageDashboard from '@/features/dashboard/PageDashboard';
import { Layout } from '@/layout/Layout';
import { Loader } from '@/layout/Loader';

const PageInterventions = dynamic(
  () => import('@/features/interventions/PagesInterventions'),
  {
    loading: () => <Loader />,
  }
);

const PageInterventionCreate = dynamic(
  () => import('@/features/interventions/PageInterventionCreate'),
  {
    loading: () => <Loader />,
  }
);

const PageInterventionUpdate = dynamic(
  () => import('@/features/interventions/PageInterventionUpdate'),
  {
    loading: () => <Loader />,
  }
);

export const routes = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <>
        <Outlet />
        <LoginModalInterceptor />
      </>
    ),
    children: [
      {
        path: 'logout',
        element: <PageLogout />,
      },

      /**
       * Public Routes
       */
      {
        path: 'login',

        element: (
          <GuardPublicOnly>
            <PageLogin />
          </GuardPublicOnly>
        ),
      },
      {
        path: 'account',
        element: (
          <GuardPublicOnly>
            <Outlet />
          </GuardPublicOnly>
        ),
        children: [
          {
            path: 'activate',
            element: <PageActivate />,
          },
          {
            path: 'register',
            element: <PageRegister />,
          },
          {
            path: 'reset',
            element: <PageResetPasswordRequest />,
          },
          {
            path: 'finish',
            element: <PageResetPasswordConfirm />,
          },
        ],
      },

      /**
       * Authenticated Routes
       */
      {
        path: '',
        element: (
          <GuardAuthenticated>
            <Layout>
              <Outlet />
            </Layout>
          </GuardAuthenticated>
        ),
        children: [
          {
            path: '',
            element: <PageDashboard />,
          },
          {
            path: 'account',
            children: [
              {
                path: '',
                element: <Navigate to="profile" replace />,
              },
              {
                path: 'profile',
                element: <PageProfile />,
              },
              {
                path: 'password',
                element: <PagePassword />,
              },
            ],
          },
          /**
           * Admin Routes
           */
          {
            path: 'admin',
            element: (
              <GuardAdmin>
                <Outlet />
              </GuardAdmin>
            ),
            children: [
              {
                path: '',
                element: <Navigate to="interventions" replace />,
              },
              {
                path: 'interventions',
                children: [
                  { path: '', element: <PageInterventions /> },
                  { path: 'create', element: <PageInterventionCreate /> },
                  { path: ':id', element: <PageInterventionUpdate /> },
                ],
              },
            ],
          },
          { path: '*', element: <ErrorPage errorCode={404} /> },
        ],
      },
    ],
  },
  { path: '*', element: <ErrorPage errorCode={404} /> },
] satisfies RouteObject[];
