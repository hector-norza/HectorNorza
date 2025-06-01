import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { RssIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Add this import
import { loadBlogPosts, type BlogPost } from '../utils/blogLoader';

export default function Blog() {
  const { isDarkMode } = useTheme(); // Use global theme

  // Simplified state declarations
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);

  // Load blog posts
  useEffect(() => {
    window.scrollTo(0, 0);

    loadBlogPosts()
      .then((posts) => {
        setBlogPosts(posts);
        setFilteredPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load blog posts:', error);
        setLoading(false);
      });
  }, []);

  // Simple search filtering
  useEffect(() => {
    let filtered = blogPosts;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [blogPosts, searchQuery]);

  // Reading progress tracker
  useEffect(() => {
    if (selectedPost) {
      const handleScroll = (e: Event) => {
        const element = e.target as HTMLElement;
        const progress =
          (element.scrollTop / (element.scrollHeight - element.clientHeight)) *
          100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      };

      const modalContent = document.querySelector('.modal-content');
      modalContent?.addEventListener('scroll', handleScroll);
      return () => modalContent?.removeEventListener('scroll', handleScroll);
    }
  }, [selectedPost]);

  // Set page title and meta description
  useEffect(() => {
    document.title = 'Blog - Hector Norzagaray';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Thoughts on product management, community building, and responsible AI development.'
      );
    }
  }, []);

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    setReadingProgress(0);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    setReadingProgress(0);
    document.body.style.overflow = 'unset';
  };

  const sharePost = async () => {
    if (selectedPost && navigator.share) {
      try {
        await navigator.share({
          title: selectedPost.title,
          text: selectedPost.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error in sharePost:', error);
        // Fallback to copying URL to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 animate-pulse border border-white/20">
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/4 mb-4"></div>
      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4 mb-3"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-full mb-2"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-2/3 mb-6"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-white to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                  Blog
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Thoughts on product management, community building, and the
                intersection of technology and human connection.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-white/50 backdrop-blur-sm py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 mb-16">
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-1/3 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-2/3 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
          : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20'
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative isolate overflow-hidden transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
            : 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span
                className={`text-transparent bg-clip-text transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600'
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800'
                }`}
              >
                Blog
              </span>
            </h1>
            <motion.p
              className={`text-lg max-w-3xl mx-auto leading-relaxed mb-8 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Thoughts on product management, community building, and
              technology.
            </motion.p>

            {/* Subscribe Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <RssIcon className="w-5 h-5" />
                Subscribe to RSS
              </a>

              <a
                href="https://blogtrottr.com/?subscribe=https://hectornorza.com/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-blue-500'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500'
                }`}
              >
                <EnvelopeIcon className="w-5 h-5" />
                Subscribe via Email
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div
        className={`backdrop-blur-sm py-12 sm:py-16 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl lg:mx-0 mb-8">
            <h2
              className={`text-2xl sm:text-3xl font-bold tracking-tight mb-3 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'
              }`}
            >
              Latest Posts
            </h2>
            <p
              className={`text-lg leading-7 max-w-2xl transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Discover insights, tutorials, and thoughts on building products.
            </p>
          </div>

          {/* Simple Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`block w-full pl-10 pr-4 py-3 border rounded-xl leading-5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-md transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800'
                    : 'bg-white/80 border-gray-200/50 text-gray-900 placeholder-gray-500 focus:bg-white'
                }`}
              />
            </div>

            {/* Blog Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`group relative rounded-2xl shadow-lg hover:shadow-xl border transition-all duration-500 overflow-hidden ${
                    isDarkMode
                      ? 'bg-gray-800/80 backdrop-blur-sm border-gray-700/50 hover:border-blue-500/50'
                      : 'bg-white/80 backdrop-blur-sm border-white/20 hover:border-blue-200/50'
                  }`}
                >
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center gap-x-2 text-xs mb-3">
                      <time
                        dateTime={post.date}
                        className={`font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      {post.readTime && (
                        <>
                          <span
                            className={`transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-600' : 'text-gray-300'
                            }`}
                          >
                            •
                          </span>
                          <span
                            className={`transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {post.readTime}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold leading-7 group-hover:text-blue-600 transition-colors duration-300 mb-3 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      <button
                        onClick={() => openPost(post)}
                        className="focus:outline-none text-left w-full focus:ring-2 focus:ring-blue-500/50 rounded-lg p-1 -m-1"
                      >
                        {post.title}
                      </button>
                    </h3>

                    {/* Excerpt */}
                    <p
                      className={`leading-relaxed text-sm mb-4 line-clamp-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <button
                      onClick={() => openPost(post)}
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-all duration-300 group/btn"
                    >
                      <span>Read more</span>
                      <svg
                        className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 via-purple-600/3 to-blue-800/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-center py-16"
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-gray-700 to-gray-800'
                : 'bg-gradient-to-br from-gray-100 to-gray-200'
            }`}
          >
            <svg
              className={`w-8 h-8 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3
            className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            No posts found
          </h3>
          <p
            className={`text-lg mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            Try a different search term.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Clear search
          </button>
        </motion.div>
      )}

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
              onClick={closePost}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="modal-content relative bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50"
            >
              {/* Header with Progress Bar */}
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50">
                <div className="w-full bg-gray-700 h-1">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>

                <div className="px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(selectedPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    {selectedPost.readTime && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-300 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {selectedPost.readTime}
                        </span>
                      </>
                    )}
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-300">
                      {Math.round(readingProgress)}% read
                    </span>
                  </div>
                  <button
                    onClick={closePost}
                    className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                  {selectedPost.title}
                </h1>

                {selectedPost.category && (
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300 ring-1 ring-inset ring-blue-500/30">
                      {selectedPost.category}
                    </span>
                  </div>
                )}

                <div className="prose prose-lg prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-300 prose-blockquote:text-gray-300 prose-blockquote:border-blue-500 prose-code:text-blue-400 prose-pre:bg-gray-800 prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none">
                  {selectedPost.htmlContent ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedPost.htmlContent,
                      }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {selectedPost.content}
                    </div>
                  )}
                </div>

                {/* Tags */}
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Sharing */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-700">
                  <span className="text-sm text-gray-400 font-medium">
                    Share this post:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={sharePost}
                      className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Share"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                      }
                      className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Copy link"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
