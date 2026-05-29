import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata = {
  title: "StudyNook",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" className="h-full"
    >
      <body className="flex flex-col min-h-screen bg-[#FBF8F3] text-[#2E1A0F] antialiased">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};
