import { BusinessRoleLoginFlow } from '@/components/auth/BusinessRoleLoginFlow';

export const metadata = {
  title: 'Sign In | RentallQ',
  description: 'Role-based access portal for RentallQ Business Owners, Managers, and Staff.',
};

export default function LoginPage() {
  return <BusinessRoleLoginFlow />;
}
