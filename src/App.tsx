import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GradientHoverTracker } from "@/components/GradientHoverTracker";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index.tsx";

// Every non-landing page is lazy so the homepage bundle stays small —
// About/GlobalPresence alone pull in three.js via react-globe.gl (~1.8MB).
const About = lazy(() => import("./pages/About.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const GlobalPresence = lazy(() => import("./pages/GlobalPresence.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Support = lazy(() => import("./pages/Support.tsx"));
const SupportDetail = lazy(() => import("./pages/SupportDetail.tsx"));


const queryClient = new QueryClient();

const BlogRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/insights/${slug}`} replace />;
};


const App = () => {
  useSmoothScroll();
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GradientHoverTracker />
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<><Navbar /><Index /><Footer /></>} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/global-presence" element={<GlobalPresence />} />
          <Route path="/insights" element={<Blog />} />
          <Route path="/insights/:slug" element={<BlogPost />} />
          <Route path="/blog" element={<Navigate to="/insights" replace />} />
          <Route path="/blog/:slug" element={<BlogRedirect />} />

          <Route path="/support" element={<Support />} />
          <Route path="/support/:slug" element={<SupportDetail />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
