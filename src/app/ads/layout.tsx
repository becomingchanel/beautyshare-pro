import AdsSidebar from '@/components/ads/AdsSidebar';

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdsSidebar />
      <main className="ml-64 min-h-screen">
        <div className="px-8 py-6">{children}</div>
      </main>
    </div>
  );
}
