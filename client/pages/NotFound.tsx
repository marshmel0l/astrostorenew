import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 animate-fade-in">
        <div className="text-center">
          <div className="mb-4 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            404
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-100">
            Page Not Found
          </h1>
          <p className="mb-8 text-lg text-slate-400">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/50 transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-950 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-100">
                About Astro Store
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Your ultimate destination for discovering and purchasing amazing
                games at unbeatable prices with shared accounts and offline
                mode.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Legal</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2024 Astro Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
