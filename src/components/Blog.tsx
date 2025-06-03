import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import BlogList from './blog/BlogList';
import BlogPost from './blog/BlogPost';
import { useContrastColors } from '../hooks/useContrastColors';
import { trackBlogView } from '../utils/analytics'; // ← This should work now

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const colors = useContrastColors();

  const handlePostSelect = (slug: string) => {
    setSelectedPost(slug);
    
    // Track blog post view to GA ID: G-VPC78XB0H1
    trackBlogView(slug, `Blog Post: ${slug}`);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen transition-colors duration-300 ${colors.background.page}`}
    >
      {/* Navbar */}
      <Navbar />
      
      {/* Blog Content */}
      <main>
        {selectedPost ? (
          <BlogPost slug={selectedPost} onBack={handleBackToBlog} />
        ) : (
          <BlogList onPostSelect={handlePostSelect} />
        )}
      </main>
    </motion.div>
  );
}