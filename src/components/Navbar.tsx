import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center h-full">
          <Logo variant="default" linkTo="/" className="group-hover:scale-105 transition-transform" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/jobs") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/about") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
