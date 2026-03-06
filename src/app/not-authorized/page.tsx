import Link from 'next/link';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default function NotAuthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <ShieldX className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-3 text-gray-500">
          You don&apos;t have permission to access this page.
          If you believe this is an error, please contact support.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange hover:text-orange-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
