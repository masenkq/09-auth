import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      {/* Тут можна додати загальні елементи для auth маршрутів */}
      {children}
    </div>
  );
}