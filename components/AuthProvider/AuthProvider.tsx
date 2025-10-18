'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthProvider.module.css';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isChecking, setIsChecking] = useState(true);
  const { user, isAuthenticated, setUser, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsChecking(true);
        const userData = await checkSession();
        
        if (userData) {
          setUser(userData);
        } else {
          clearAuth();
          // Якщо користувач не авторизований і на приватній сторінці - редірект
          if (isPrivateRoute) {
            router.push('/sign-in');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearAuth();
        if (isPrivateRoute) {
          router.push('/sign-in');
        }
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [pathname, setUser, clearAuth, isPrivateRoute, router]);

  // Показуємо лоадер під час перевірки авторизації на приватних маршрутах
  if (isChecking && isPrivateRoute) {
    return (
      <div className={css.loaderContainer}>
        <div className={css.loader}>Loading...</div>
      </div>
    );
  }

  // Якщо користувач не авторизований і на приватному маршруті - не показуємо контент
  if (!isAuthenticated && isPrivateRoute) {
    return null;
  }

  return <>{children}</>;
}