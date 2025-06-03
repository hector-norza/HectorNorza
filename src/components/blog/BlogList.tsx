import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useContrastColors } from '../../hooks/useContrastColors';
import { trackBlogInteraction } from '../../utils/analytics';
import { getAllBlogPosts, type BlogPost } from '../../utils/blog';

interface BlogListProps {
  onPostSelect: (slug: string) => void;
}

export default function BlogList({ onPostSelect }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const colors = useContrastColors();

  useEffect(() => {
    getAllBlogPosts().then((posts: BlogPost[]) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handlePostClick = (slug: string, title: string) => {
    trackBlogInteraction('post_click', slug, title);
    onPostSelect(slug);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    trackBlogInteraction('category_filter', category, `Category: ${category}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${colors.heading}`}>
          Blog
        </h1>
        <p className={`text-xl max-w-3xl mx-auto ${colors.secondary}`}>
          Insights on Azure AI, Product Management, and Developer Community Building
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : `${colors.background.card} ${colors.secondary} hover:bg-primary-100 dark:hover:bg-primary-900/50`
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => handlePostClick(post.slug, post.title)}
            className={`
              group cursor-pointer rounded-xl overflow-hidden transition-all duration-300
              ${colors.background.card} hover:shadow-lg hover:scale-[1.02]
              border ${colors.border} relative
            `}
          >
            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Featured
                </span>
              </div>
            )}

            {/* Image Placeholder (since we don't have real images) */}
            <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">{post.category}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category & Reading Time */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                  {post.category}
                </span>
                <span className={`text-sm ${colors.secondary}`}>
                  {post.readingTime} min read
                </span>
              </div>

              {/* Title */}
              <h2 className={`text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 ${colors.heading}`}>
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className={`text-sm mb-4 line-clamp-3 ${colors.secondary}`}>
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded ${colors.background.accent} ${colors.secondary}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Date */}
              <time className={`text-sm ${colors.secondary}`}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className={`text-lg ${colors.secondary}`}>
            No posts found in the "{selectedCategory}" category.
          </p>
        </motion.div>
      )}
    </div>
  );
}