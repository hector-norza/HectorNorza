import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { trackPageView, trackEvent } from '../utils/analytics';
import LoadingSpinner from './LoadingSpinner';
import Markdown from 'react-markdown';
// Rehype plugins
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

// Define type for blog post
interface BlogPost {
  content: string;
  title: string;
  date: string;
  slug: string;
  readTime?: string;
  tags?: string;
  description?: string;
  [key: string]: string | undefined;
}

// Using any for markdown components to avoid complex type issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentProps = any;

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      
      try {
        const response = await fetch(`/posts/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Post not found: ${slug}`);
        }
        
        const content = await response.text();
        
        // Extract frontmatter metadata
        const frontmatterRegex = /---\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);
        
        if (match) {
          const frontmatter = match[1];
          const markdownContent = content.replace(frontmatterRegex, '').trim();
          
          // Parse frontmatter
          const metadata: Record<string, string> = {};
          frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim();
              metadata[key.trim()] = value;
            }
          });
          
          setPost({
            content: markdownContent,
            title: metadata.title || slug,
            date: metadata.date || 'Unknown date',
            slug,
            ...metadata
          });
        } else {
          setPost({
            content,
            title: slug,
            date: 'Unknown date',
            slug
          });
        }
        
        // Track page view
        trackPageView(window.location.href, `Blog Post: ${slug}`);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError((err as Error).message || 'Unknown error');
        setLoading(false);
      }
    }
    
    fetchPost();
  }, [slug]);
  
  const handleBackClick = () => {
    trackEvent('blog_navigation', 'Blog', 'back_to_blog_list');
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
          : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20'
      }`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 text-white'
          : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 text-gray-900'
      }`}>
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
        <button
          onClick={handleBackClick}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Blog
        </button>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
        : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20'
    }`}>
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <button
          onClick={handleBackClick}
          className={`flex items-center mb-8 px-4 py-2 rounded-lg transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Blog
        </button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/90 backdrop-blur-sm border border-gray-700/50' 
              : 'bg-white/95 backdrop-blur-sm border border-gray-200/50'
          }`}
        >
          <header className="mb-8">
            <h1 className={`text-3xl sm:text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              {post.date && (
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
              )}
              
              {post.readTime && (
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {post.readTime}
                </div>
              )}
              
              {post.tags && (
                <div className={`flex items-center text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <TagIcon className="w-4 h-4 mr-1" />
                  {post.tags}
                </div>
              )}
            </div>
            
            {post.description && (
              <p className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {post.description}
              </p>
            )}
          </header>
          
          <div className={`prose max-w-none transition-colors duration-300 ${
            isDarkMode ? 'prose-invert' : ''
          }`}>
            <Markdown
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                a: ({ node, ...props }: ComponentProps) => (
                  <a  
                    {...props} 
                    className="text-primary hover:text-primary-600 transition-colors duration-300"
                    target={props.href && String(props.href).startsWith('http') ? '_blank' : undefined}
                    rel={props.href && String(props.href).startsWith('http') ? 'noopener noreferrer' : undefined}
                  />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                img: ({ node, ...props }: ComponentProps) => (
                  <img  
                    {...props}
                    loading="lazy"
                    className="rounded-lg shadow-md my-8 max-w-full h-auto"
                  />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                pre: ({ node, ...props }: ComponentProps) => (
                  <pre
                    {...props}
                    className="rounded-lg overflow-auto p-4 my-6"
                  />
                )
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </motion.article>
      </div>
    </div>
  );
}