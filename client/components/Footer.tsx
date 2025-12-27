import { Link } from "react-router-dom";
import { Gamepad2, Mail, MessageCircle, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">

      {/* FOOTER LINKS */}
      <div className="bg-[#0D1117] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* LOGO & ABOUT */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="text-purple-500">
                  <Gamepad2 size={28} />
                </div>
                <span className="text-xl font-bold text-white">AstroStore</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your trusted source for digital game keys and accounts. Instant delivery, 24/7 support.
              </p>
            </div>

            {/* UPGRADER */}
            <div>
              <h3 className="text-white font-semibold mb-4">AstroStore</h3>
              <ul className="space-y-2.5">
                <FooterLink href="/" label="Tariffs" />
                <FooterLink href="/" label="Game Boosters" />
                <FooterLink href="/" label="Game Catalog" />
                <FooterLink href="/" label="Systems" />
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2.5">
                <FooterLink href="/" label="Contacts" />
                <FooterLink href="/" label="Support" />
                <FooterLink href="/" label="Terms & Policies" />
                <FooterLink href="/" label="Agreements" />
              </ul>
            </div>

            {/* FOLLOW US */}
            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <SocialIcon icon={<MessageCircle size={18} />} href="#" />
                <SocialIcon icon={<Twitter size={18} />} href="#" />
                <SocialIcon icon={<Mail size={18} />} href="#" />
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-12 pt-8 border-t border-slate-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                Kabardino LLC OΠ 40001383827
                <br />
                Gorgoli, 1 basic district, Batumi, Adjara 6010
                <br />© 2025 AstroStore. All Rights Reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  🇬🇧 English
                </button>
                <button className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        to={href}
        className="text-slate-400 hover:text-white transition-colors text-sm"
      >
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-800/50 hover:bg-purple-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-700/50"
    >
      {icon}
    </a>
  );
}
