'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { logout, checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, setUser, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await checkSession();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Ігноруємо помилки мережі для навігації
        if (error.message !== 'Network Error') {
          clearAuth();
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [setUser, clearAuth]);

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
      // Навіть при помилці виходимо локально
      clearAuth();
      router.push('/sign-in');
    }
  };

  if (isLoading) {
    return (
      <li className={css.navigationItem}>
        <span className={css.loading}>Loading...</span>
      </li>
    );
  }

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" className={css.navigationLink}>
          Register
        </Link>
      </li>
    </>
  );
}