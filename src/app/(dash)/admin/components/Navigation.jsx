import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, Plus, LayoutDashboard, UserPlus, Settings, LogOut, Menu, X, Flame } from 'lucide-react';
import { Outfit } from 'next/font/google';
import { getCookie, deleteCookie } from 'cookies-next';
import toast from 'react-hot-toast';

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on component mount and when cookies change
  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie("authFruition");
      setIsAuthenticated(!!token);
      
      // Redirect to login if not authenticated and trying to access admin pages
      if (!token && pathname.startsWith('/admin') && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    };
    
    checkAuth();
    
    // You could add an event listener for cookie changes if needed
    // This is just an example approach
    const intervalId = setInterval(checkAuth, 5000);
    
    return () => clearInterval(intervalId);
  }, [pathname, router]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    deleteCookie('authFruition', { path: '/' });
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    router.push('/admin/login');
  };

  const navLinks = [
    { href: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { href: '/admin/add-car/new', icon: <Plus size={18} />, label: 'Add Car' },
    { href: '/admin/featured-listing', icon: <Flame size={18} />, label: 'Featured Listing' },
    { href: '/admin/create-admin', icon: <UserPlus size={18} />, label: 'Create Admin' },
    { href: '/admin/create-category', icon: <Settings size={18} />, label: 'Create Category' }
  ];

  const isActive = (path) => pathname === path;

  // Show nothing if not authenticated
  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  return (
    <nav className={`bg-white border-b shadow-sm sticky top-0 z-50 ${outfit.className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-2 group">
            <Car size={24} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Car Management</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-200 ${
                isActive(link.href) 
                  ? 'text-blue-600 font-semibold bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-200 text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pb-2 space-y-2 border-t pt-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div 
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive(link.href) 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}
            
            {/* Logout Button for Mobile */}
            <div 
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;