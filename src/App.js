import React from 'react';
import { AppRouter } from './router/AppRouter';
import AuthProvider from './Providers/AuthProvider';


export const App = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}