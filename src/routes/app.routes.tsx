import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Collection } from '@/pages/private/Collection/Collection';
import { PrivateLayout } from '@/pages/private/layout/PrivateLayout';
import { Login } from '@/pages/public/auth/Login/Login';
import { Register } from '@/pages/public/auth/Register/Register';
import { PublicLayout } from '@/pages/public/layout/PublicLayout';
import { Welcome } from '@/pages/public/welcome/Welcome';

// * lazy load
const Profile = lazy(() => import("@/pages/private/Profile/Profile"));
const Book = lazy(() => import("@/pages/private/Book/Book"))

export const routes = createBrowserRouter([
    // layout publico
    {
        path: '/',
        element: <PublicLayout />,
        // children
        children: [
            // ruta por defecto: welcome
            {
                index: true,
                element: <Welcome />
            },
            // auth/login
            {
                path: '/login',
                element: <Login />
            },
            // auth/register
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    // layout privado
    {
        path: '/private',
        element: <PrivateLayout />,
        // children - Dashbaord, Perfil, Nuevo / Edicion
        children: [
            // ruta por defecto: collection
            {
                index: true,
                element: <Collection />
            },
            // perfil
            {
                path: 'profile/:name',
                element: <Profile />
            },
            // book
            {
                path: 'book/:id',
                element: <Book />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
]);
