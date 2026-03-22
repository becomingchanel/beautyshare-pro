import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REIGN — Premium Shopify Template | BeautyShare Pro",
  description:
    "REIGN is a premium Shopify template for raw hair vendors. Wine, lilac & cream palette with Miami glamour aesthetic. 8 pages including high-converting hair care guide.",
};

export default function ReignPage() {
  return (
    <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="/reign-wrapper.html"
        title="REIGN Template Preview"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </main>
  );
}
