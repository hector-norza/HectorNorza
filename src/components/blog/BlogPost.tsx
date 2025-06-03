import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useContrastColors } from '../../hooks/useContrastColors';
import { trackBlogInteraction } from '../../utils/analytics';
import { getBlogPost, parseContent, type BlogPost as BlogPostType } from '../../utils/blog';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

export default function BlogPost({ slug, onBack }: BlogPostProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const colors = useContrastColors();

  useEffect(() => {
    getBlogPost(slug).then((post: BlogPostType | undefined) => {
      if (post) {
        setPost(post);
        trackBlogInteraction('post_view', slug, post.title);
      }
      setLoading(false);
    });
  }, [slug]);

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

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className={`text-2xl font-bold mb-4 ${colors.heading}`}>
            Post Not Found
          </h1>
          <p className={`mb-6 ${colors.secondary}`}>
            The blog post you're looking for doesn't exist.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onClick={onBack}
        className={`
          inline-flex items-center mb-8 px-4 py-2 rounded-lg transition-all duration-300
          ${colors.background.card} ${colors.secondary} hover:bg-primary-100 dark:hover:bg-primary-900/50
          border ${colors.border}
        `}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Blog
      </motion.button>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
            {post.category}
          </span>
          <span className={`text-sm ${colors.secondary}`}>
            {post.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${colors.heading}`}>
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <time className={`text-sm ${colors.secondary}`}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.author && (
            <span className={`text-sm ${colors.secondary}`}>
              By {post.author}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className={`text-xs px-3 py-1 rounded-full ${colors.background.accent} ${colors.secondary}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.header>

      {/* Featured Image */}
      {post.imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 rounded-xl overflow-hidden"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`prose prose-lg max-w-none ${colors.body} prose-headings:${colors.heading} prose-links:text-primary-600 dark:prose-links:text-primary-400`}
        dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
      />
    </motion.article>
  );
}