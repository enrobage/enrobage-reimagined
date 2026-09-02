import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="mesh-bg flex min-h-screen items-center justify-center px-6">
      <div className="container-x flex flex-col items-center text-center">
        <span
          className="font-display font-bold leading-none gradient-text-logo"
          style={{ fontSize: "clamp(5rem, 18vw, 11rem)" }}
          aria-hidden="true"
        >
          404
        </span>
        <h1 className="heading-section text-logo-navy mt-2 mb-3">Page not found</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-md mb-8">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn-ombre group">
          Back to Home
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
