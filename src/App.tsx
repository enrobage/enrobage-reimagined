import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GradientHoverTracker } from "@/components/GradientHoverTracker";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Products from "./pages/Products.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import GlobalPresence from "./pages/GlobalPresence.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import Support from "./pages/Support.tsx";
import SupportDetail from "./pages/SupportDetail.tsx";


const queryClient = new QueryClient();

const BlogRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/insights/${slug}`} replace />;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GradientHoverTracker />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
