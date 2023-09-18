import DashboardLayout from '@/components/layout/dashboard/layout';
import { cookies } from 'next/headers';

function Layout({ children }: { children: React.ReactNode }) {
  const cookiesList = cookies();
  const auth_token = cookiesList.get('access_token');

  return <DashboardLayout authToken={auth_token?.value}>{children}</DashboardLayout>;
}

export default Layout;
