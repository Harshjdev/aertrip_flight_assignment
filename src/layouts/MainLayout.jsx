import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Header
        origin="Mumbai (BOM)"
        destination="Kolkata (CCU)"
        date="Sun, 17 Oct 2021"
        passengers="1 Adult · Economy"
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
