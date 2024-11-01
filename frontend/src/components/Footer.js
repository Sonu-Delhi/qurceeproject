import React from 'react';
import { Link } from 'react-router-dom';
import { FaSquareFacebook, FaSquareInstagram, FaSquareTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 z-50 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <p className="text-sm">A-63 Naraina Industrial Area Phase-1, New Delhi-110028</p>
            <p className="text-sm">Email: sonuyadav885377@gmail.com</p>
            <p className="text-sm">Phone: +91 9125403859, +91 9315252382</p>

            {/* Social Media */}
            <div className="mt-3">
              <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-2">
                <Link to="https://facebook.com/" className="hover:text-blue-700 text-blue-600 text-2xl"><FaSquareFacebook /></Link>
                <Link to="https://www.twitter.com/" className="hover:text-blue-700 text-blue-600 text-2xl"><FaSquareTwitter /></Link>
                <Link to="https://www.instagram.com/" className="hover:text-blue-700 text-blue-600 text-2xl"><FaSquareInstagram /></Link>
                <Link to="https://www.linkedin.com/" className="hover:text-blue-700 text-blue-600 text-2xl"><FaLinkedin /></Link>
              </div>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping&delivery" className="hover:text-gray-400">Shipping and Delivery</Link></li>
              <li><Link to="/payment-security" className="hover:text-gray-400">Payment and Security</Link></li>
              <li><Link to="/furniture-care" className="hover:text-gray-400">Furniture Care</Link></li>
              <li><Link to="/warranty" className="hover:text-gray-400">Qurcee Warranty</Link></li>
              <li><Link to="/terms&conditions" className="hover:text-gray-400">Terms of Use</Link></li>
              <li><Link to="#" className="hover:text-gray-400">Free Furniture</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-gray-400">Home</Link></li>
              <li><Link to="#" className="hover:text-gray-400">Shop</Link></li>
              <li><Link to="#" className="hover:text-gray-400">About Us</Link></li>
              <li><Link to="#" className="hover:text-gray-400">Contact</Link></li>
            </ul>
          </div>
        

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-gray-400">Help Center</Link></li>
              <li><Link to="#" className="hover:text-gray-400">FAQs</Link></li>
              <li><Link to="#" className="hover:text-gray-400">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-gray-400">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Embedded Map */}
          <div className="">
              <h3 className="text-lg font-semibold mb-4">Our Location</h3>
              {/* <iframe
                src="https://maps.app.goo.gl/H7UBbTqMQ9oKoh4m7" 
                width="100%" 
                height="200" 
                frameBorder="0" 
                allowFullScreen 
                title="Company Location"
                aria-hidden="false"
                tabIndex="0">
              </iframe> */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14007.351735216978!2d77.12834328653625!3d28.63461899402177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d033b40000001%3A0x275b936a873df6fc!2sGulati%20Printers!5e0!3m2!1sen!2sin!4v1729618425902!5m2!1sen!2sin" width="100%" height="200" style={{border:"none"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          

        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Qurcee. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
