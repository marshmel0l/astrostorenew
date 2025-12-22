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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl font-bold text-slate-900">404</div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="mb-8 text-lg text-slate-600">
            Sorry, the page you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg"
          >
            Return to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-slate-900">About</h3>
              <p className="mt-2 text-sm text-slate-600">
                Your ultimate destination for discovering and purchasing amazing
                games at unbeatable prices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Games
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Legal</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2024 GameHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
