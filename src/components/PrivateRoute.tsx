import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react';
import Loading from './Loading';

type PrivateRouteProps = {
    children: JSX.Element;
    adminOnly?: boolean;
};

export default function PrivateRoute({ children, adminOnly = false }: PrivateRouteProps) {
    const { user, loading } = useAuth();

    if (loading) return <Loading />;
    if (!user) return <Navigate to="/login" replace />;

    if (adminOnly && user.role !== 'admin') {
        // Redirige a otra página si el usuario no es admin
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
