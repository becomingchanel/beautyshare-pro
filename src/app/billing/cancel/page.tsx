import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function BillingCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-lavender-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Changed your mind?
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            No problem! We'd love to help you get started with BeautyShare Pro. Your checkout has been cancelled and no charges have been made.
          </p>

          {/* Features Highlight */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-8 mb-10 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">BeautyShare Pro includes:</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                Professional product pricing and cost calculators
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                Real-time profit margin analysis
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                Business analytics and performance tracking
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                Inventory management tools
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                Priority support for your beauty business
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 w-full sm:w-auto"
              >
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button 
                size="lg"
                variant="outline"
                className="px-8 w-full sm:w-auto flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-8">
            Have questions? Contact our support team at support@beautyshare.com
          </p>
        </div>
      </div>
    </div>
  );
}
