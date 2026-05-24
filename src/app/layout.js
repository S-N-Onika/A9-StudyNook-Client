import "./globals.css";
import Navbar from "../components/Navbar";
export const metadata = {
  title: "StudyNook",
};

export default function RootLayout({ children }) {
  return (
    <html
    lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
};
