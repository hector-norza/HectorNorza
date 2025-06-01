import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BlogPost() {
  // Temporary hardcoded post for testing
  const post = {
    title: 'Test Blog Post',
    excerpt: 'This is a test excerpt',
    content: '<p>This is test content</p>',
    date: 'June 1, 2025',
    readTime: '5 min read',
    category: 'Test',
    tags: ['test', 'blog'],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {post.excerpt}
        </p>

        <div className="prose prose-lg dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}
