import { ReactNode } from 'react';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div>
      {/* Тут можна додати загальні елементи для приватних маршрутів */}
      {children}
    </div>
  );
}