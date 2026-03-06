import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export default function BillingSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-lavender-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Confetti-style decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-32 right-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-lavender rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
        </div>

        <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse" />
              <CheckCircle2 className="w-24 h-24 text-orange-500 relative" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to BeautyShare Pro!
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Your subscription is now active. Let's get you started with your beauty business.
          </p>

          {/* Checklist */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-8 mb-10 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Here's what's next:</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  <strong>Complete your profile</strong> - Add your business information and product photos
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  <strong>Set up your inventory</strong> - Add your beauty products with costs and pricing
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  <strong>Use the calculators</strong> - Calculate launch costs, profit margins, and pricing
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  <strong>Track your analytics</strong> - Monitor your business performance and growth
                </span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <Link href="/dashboard">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8"
            >
              Go to Dashboard
            </Button>
          </Link>

          <p className="text-gray-500 text-sm mt-6">
            Your subscription has been confirmed. Check your email for a receipt.
          </p>
        </div>
      </div>
    </div>
  );
}
