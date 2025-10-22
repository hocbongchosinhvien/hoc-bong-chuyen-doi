import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Ẩn toàn bộ navbar khi ở trong dashboard
  const isDashboard = location.pathname.startsWith("/dashboard");
  if (isDashboard) return null;

  const navLinks = [
    { label: "Trang chủ", path: "/" },
    { label: "Cơ hội", path: "/opportunities" },
    { label: "Đối tác", path: "/partners" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const role =
    (user?.user_metadata as any)?.role ||
    (user?.app_metadata as any)?.role ||
    null;

  const displayName =
    (user?.user_metadata as any)?.name ||
    (user?.user_metadata as any)?.full_name ||
    user?.email ||
    "";

  const initials = (() => {
    if (!displayName) return "U";
    const parts = displayName.trim().split(/\s+/);
    if (!parts.length) return "U";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  })();

  const goToDashboard = () => {
    if (role === "admin") navigate("/dashboard/admin");
    else if (role === "partner") navigate("/dashboard/partner");
    else navigate("/dashboard/user");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <span className="text-xl font-bold text-primary-foreground">H</span>
            </div>
            <span className="hidden text-lg font-bold text-foreground sm:block">
              HBCSV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Chưa đăng nhập: hiện My List + Đăng nhập */}
            {!loading && !user && (
              <>
                <Link to="/my-list">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      3
                    </span>
                  </Button>
                </Link>

                <Link to="/login" className="hidden sm:block">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </Button>
                </Link>
              </>
            )}

            {/* Đã đăng nhập: ẩn My List + Đăng nhập, hiện Quay về Dashboard + chip user + Đăng xuất */}
            {!loading && user && (
              <div className="hidden items-center gap-2 sm:flex">
                <Button variant="outline" size="sm" onClick={goToDashboard}>
                  Quay về Dashboard
                </Button>

                <div className="flex items-center gap-2 rounded-full border px-2 py-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-xs font-semibold text-white">
                    {initials}
                  </div>
                  <span className="max-w-[160px] truncate text-sm font-medium">
                    {displayName}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {!loading && !user ? (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      goToDashboard();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Quay về Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Đăng xuất
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
