import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  FileText,
  User,
  Bell,
  Search,
  Home,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: ReactNode;
  menuItems: MenuItem[];
  role: "user" | "partner" | "admin";
}

const DashboardLayout = ({ children, menuItems, role }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ----- Auth (để hiện đúng tên/ảnh sau khi cập nhật hồ sơ)
  const { user } = useAuth();
  const [u, setU] = useState(user);

  useEffect(() => {
    const refresh = async () => {
      const { data } = await supabase.auth.getUser();
      setU(data.user ?? null);
    };
    refresh();
  }, [user]);

  const meta: any = u?.user_metadata || {};
  const displayName =
    meta.full_name ||
    meta.name ||
    [meta.given_name, meta.family_name].filter(Boolean).join(" ") ||
    u?.email ||
    "";
  const avatarUrl = meta.avatar_url || meta.picture || "";
  const initials = (() => {
    const name = displayName || "U";
    const parts = name.trim().split(/\s+/);
    if (!parts.length) return "U";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  })();

  const isActive = (path: string) => location.pathname === path;

  const getRoleName = () => {
    switch (role) {
      case "user":
        return "Sinh viên";
      case "partner":
        return "Đối tác";
      case "admin":
        return "Quản trị viên";
    }
  };

  const goProfile = () => navigate(`/dashboard/${role}/profile`);
  const goSettings = () => navigate(`/dashboard/${role}`);
  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <span className="text-sm font-bold text-primary-foreground">H</span>
          </div>
          <span className="font-semibold">HBCSV</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
            {getRoleName()}
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : ""
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-border p-4">
          <Link to="/">
            <Button variant="outline" className="w-full justify-start">
              <Home className="mr-3 h-4 w-4" />
              Về trang chính
            </Button>
          </Link>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-border bg-background md:hidden">
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <span className="text-sm font-bold text-primary-foreground">H</span>
                </div>
                <span className="font-semibold">HBCSV</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <div className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                {getRoleName()}
              </div>
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <Button
                        variant={isActive(item.path) ? "secondary" : "ghost"}
                        className={`w-full justify-start ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : ""
                        }`}
                      >
                        <Icon className="mr-3 h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-border p-4">
              <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <Home className="mr-3 h-4 w-4" />
                  Về trang chính
                </Button>
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 shadow-sm md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search bar (giữ để tránh import thừa) */}
            <div className="hidden md:flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm..." className="w-72" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* User dropdown — cập nhật theo Supabase */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline max-w-[160px] truncate">
                    {displayName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goProfile}>
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={goSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
