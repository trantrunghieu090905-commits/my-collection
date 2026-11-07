import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MY COLLECTION — Chọn gu của bạn",
  description: "Không gian tuyển chọn thời trang và những món đồ đáng sở hữu."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
