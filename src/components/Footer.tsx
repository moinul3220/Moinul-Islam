import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div>
            <div className="text-2xl font-bold tracking-tighter mb-4">
              <span>MOINUL</span>
              <span className="text-blue-500">.ISLAM</span>
            </div>
            <p className="text-slate-400 max-w-xs text-sm">
              Helping businesses grow through creative video editing and high-quality graphic design.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-pink-600 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-700 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Moinul Islam. All rights reserved.</p>
          <a href="/admin" className="mt-4 md:mt-0 hover:text-white transition-colors">Admin Dashboard</a>
        </div>
      </div>
    </footer>
  );
}
