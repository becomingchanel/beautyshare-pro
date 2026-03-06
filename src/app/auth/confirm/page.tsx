import Link from 'next/link';
import { Crown, Mail, ArrowLeft } from 'lucide-react';

export default function ConfirmPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
          <Mail className="h-8 w-8 text-orange" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
        <p className="mt-3 text-gray-500">
          We&apos;ve sent a confirmation link to your email address.
          Click the link to verify your account and get started.
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-left">
          <h3 className="text-sm font-semibold text-gray-900">What happens next?</h3>
          <ol className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange">1</span>
              Confirm your email address
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange">2</span>
              Set up your $149/mo subscription
            </li>
            <li className="flex gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange">3</span>
              Access your dashboard and start selling
            </li>
          </ol>
        </div>

        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange hover:text-orange-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
