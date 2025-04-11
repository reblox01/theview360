import './globals.css';
import { Inter } from 'next/font/google';
import ThemeRegistry from './components/ThemeRegistry';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The View 360 - Fine Dining Restaurant',
  description: 'Experience exceptional dining with panoramic views at The View 360. Book your table today for an unforgettable culinary journey.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeRegistry>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
