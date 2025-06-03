import { useState } from 'react';
import { useContrastColors } from '../hooks/useContrastColors';
import BlogList from '../components/blog/BlogList';
import BlogPost from '../components/blog/BlogPost';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const colors = useContrastColors();

  return (
    <div className={`min-h-screen ${colors.background.primary} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedPost ? (
          <BlogPost 
            slug={selectedPost} 
            onBack={() => setSelectedPost(null)} 
          />
        ) : (
          <BlogList onPostSelect={setSelectedPost} />
        )}
      </div>
    </div>
  );
}