import AuthNavigation from '../AuthNavigation/AuthNavigation';
// ... інші імпорти

export default function Header() {
  return (
    <header>
      {/* Інша розмітка хедера */}
      <nav>
        <ul>
          {/* Інші посилання */}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}