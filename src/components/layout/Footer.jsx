import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Newspaper className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">BlogSphere</span>
            </div>
            <p className="text-gray-400">
              A space to express, connect, and share ideas with the world. Dive into stories that inspire.
            </p>
            <div className="flex space-x-4 mt-4">
              {[Twitter, Facebook, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-gray-700 hover:bg-blue-500 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Login', path: '/login' },
                { name: 'Register', path: '/register' },
                { name: 'Create Post', path: '/create-post' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2 inline-block">Categories</h3>
            <ul className="space-y-2">
              {['Technology', 'Travel', 'Food', 'Lifestyle', 'Business'].map((cat, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2 inline-block">Contact Us</h3>
            <p className="text-gray-400 mb-2">Have questions or feedback?</p>
            <a
              href="mailto:contact@blog.com"
              className="text-blue-400 hover:text-blue-300 transition-all"
            >
              contact@blog.com
            </a>
            <p className="text-sm text-gray-500 mt-4">We reply within 24 hours.</p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p className="text-sm">&copy; {currentYear} BlogSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
