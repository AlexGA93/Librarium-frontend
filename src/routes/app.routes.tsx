import { Collection } from '@/pages/private/Collection/Collection';
import { PrivateLayout } from '@/pages/private/layout/PrivateLayout';
import { Login } from '@/pages/public/auth/Login/Login';
import { Register } from '@/pages/public/auth/Register/Register';
import { PublicLayout } from '@/pages/public/layout/PublicLayout';
import { Welcome } from '@/pages/public/welcome/Welcome';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RequireAuth } from './Guards/RequireAuth/RequireAuth';

// * lazy load
const Profile = lazy(() => import("@/pages/private/Profile/Profile"));
const BookPage = lazy(() => import("@/pages/private/BookPage/BookPage"))

export const routes = createBrowserRouter([
    // layout publico
    {
        path: '/',
        element: (
            <PublicLayout />),
        // children
        children: [
            // ruta por defecto: welcome
            {
                index: true,
                element: <Welcome />
            },
            // auth/login
            {
                path: '/auth/login',
                element: <Login />
            },
            // auth/register
            {
                path: '/auth/register',
                element: <Register />
            },
        ]
    },
    // layout privado
    {
        path: '/private',
        // * envolvemos el elemento del layout en el componente guarda para redireccionar en caso de estar autenticado
        element: (
            <RequireAuth>
                <PrivateLayout />
            </RequireAuth>
        ),
        // children - Dashbaord, Perfil, Nuevo / Edicion
        children: [
            // ruta por defecto: collection
            {
                index: true,
                element: <Collection />
            },
            // perfil
            {
                path: 'profile',
                element: <Profile />
            },
            // book
            {
                path: 'book/:id',
                element: <BookPage />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
]);
