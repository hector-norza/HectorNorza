import { motion } from 'framer-motion';
import {
  // EnvelopeIcon,
  // Remove unused imports:
  // PhoneIcon,
  // MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import {
  trackFormSubmission,
  trackExternalLinkClick,
} from '../utils/analytics';
import { useContrastColors } from '../hooks/useContrastColors';

export default function Contact() {
  const colors = useContrastColors();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Enhanced focus management for accessibility
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      // Announce the status change and focus the status message
      const statusElement = document.getElementById('form-status');
      if (statusElement) {
        statusElement.focus();
        statusElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [submitStatus]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create mailto link
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Hello Hector,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
      );
      const mailtoLink = `mailto:hnorza@proton.me?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      // Track successful form submission - fix function call
      trackFormSubmission('contact');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-24 scroll-mt-24 transition-colors duration-300 ${colors.background.primary}`}
    >
      {/* Background decorations */}
      <div className="absolute left-0 top-1/4 w-1/3 h-2/3 bg-gradient-to-r from-primary/5 to-transparent -z-10"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-secondary/5 rounded-full -z-10 translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${colors.heading}`}
          >
            Let's Connect
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${colors.body}`}
          >
            I'm always excited to discuss new opportunities, collaborate on
            projects, or simply chat about product management, community
            building, and responsible AI. Let's start a conversation!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3
                className={`text-2xl font-bold mb-6 transition-colors duration-300 ${colors.heading}`}
              >
                Get in Touch
              </h3>
              <p
                className={`leading-relaxed mb-8 transition-colors duration-300 ${colors.body}`}
              >
                Whether you're looking to discuss a potential collaboration,
                need advice on product strategy, or want to explore how we can
                build better communities together, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {/* LinkedIn */}
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <h4
                    className={`font-semibold transition-colors duration-300 ${colors.heading}`}
                  >
                    LinkedIn
                  </h4>
                  <a
                    href="https://www.linkedin.com/in/norza/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackExternalLinkClick(
                        'https://www.linkedin.com/in/norza/'
                      )
                    }
                    className={`transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ${colors.interactive}`}
                    aria-label="Visit Hector's LinkedIn profile (opens in new tab)"
                  >
                    linkedin.com/in/norza
                  </a>
                </div>
              </motion.div>

              {/* X (Twitter) */}
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
                  </svg>
                </div>
                <div>
                  <h4
                    className={`font-semibold transition-colors duration-300 ${colors.heading}`}
                  >
                    X (Twitter)
                  </h4>
                  <a
                    href="https://x.com/hectorOnCloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackExternalLinkClick('https://x.com/hectorOnCloud')
                    }
                    className={`transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ${colors.interactive}`}
                    aria-label="Follow Hector on X (formerly Twitter) (opens in new tab)"
                  >
                    @hectorOnCloud
                  </a>
                </div>
              </motion.div>

              {/* Substack */}
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                  </svg>
                </div>
                <div>
                  <h4
                    className={`font-semibold transition-colors duration-300 ${colors.heading}`}
                  >
                    Substack
                  </h4>
                  <a
                    href="https://hectornorza.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackExternalLinkClick(
                        'https://hectornorza.substack.com/'
                      )
                    }
                    className={`transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ${colors.interactive}`}
                    aria-label="Subscribe to Hector's newsletter on Substack (opens in new tab)"
                  >
                    hectornorza.substack.com
                  </a>
                </div>
              </motion.div>

              {/* Medium */}
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                </div>
                <div>
                  <h4
                    className={`font-semibold transition-colors duration-300 ${colors.heading}`}
                  >
                    Medium
                  </h4>
                  <a
                    href="https://medium.com/@hectornorza"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackExternalLinkClick('https://medium.com/@hectornorza')
                    }
                    className={`transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded ${colors.interactive}`}
                    aria-label="Read Hector's articles on Medium (opens in new tab)"
                  >
                    medium.com/@hectornorza
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Additional CTA */}
            <div
              className={`p-6 rounded-xl border transition-colors duration-300 ${colors.background.secondary} ${colors.border}`}
            >
              <h4
                className={`font-semibold mb-2 transition-colors duration-300 ${colors.heading}`}
              >
                Quick Response Time
              </h4>
              <p
                className={`text-sm transition-colors duration-300 ${colors.body}`}
              >
                I typically respond to emails within 24-48 hours. For urgent
                matters, feel free to reach out via LinkedIn for a quicker
                response.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl shadow-xl transition-colors duration-300 ${colors.background.card} border ${colors.border}`}
          >
            <h3
              className={`text-2xl font-bold mb-6 transition-colors duration-300 ${colors.heading}`}
            >
              Send a Message
            </h3>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <motion.div
                id="form-status"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center space-x-3 transition-colors duration-300 ${
                  submitStatus === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}
                role="alert"
                aria-live="polite"
                tabIndex={-1}
              >
                {submitStatus === 'success' ? (
                  <CheckCircleIcon
                    className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <ExclamationCircleIcon
                    className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      submitStatus === 'success'
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? 'Message prepared successfully!'
                      : 'There was an error preparing your message.'}
                  </p>
                  <p
                    className={`text-sm ${
                      submitStatus === 'success'
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? 'Your email client should have opened with the message ready to send.'
                      : 'Please try again or contact me directly at hello@hectornorza.com'}
                  </p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${colors.secondary}`}
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : colors.border
                  } ${colors.background.primary} ${colors.body} ${colors.placeholder}`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p
                    id="name-error"
                    role="alert"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${colors.secondary}`}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : colors.border
                  } ${colors.background.primary} ${colors.body} ${colors.placeholder}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${colors.secondary}`}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={
                    errors.subject ? 'subject-error' : undefined
                  }
                  className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                    errors.subject
                      ? 'border-red-500 focus:ring-red-500'
                      : colors.border
                  } ${colors.background.primary} ${colors.body} ${colors.placeholder}`}
                  placeholder="What would you like to discuss?"
                />
                {errors.subject && (
                  <p
                    id="subject-error"
                    role="alert"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${colors.secondary}`}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={
                    errors.message ? 'message-error' : 'message-help'
                  }
                  className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : colors.border
                  } ${colors.background.primary} ${colors.body} ${colors.placeholder}`}
                  placeholder="Tell me about your project, idea, or how we can collaborate..."
                />
                <p
                  id="message-help"
                  className={`mt-1 text-sm transition-colors duration-300 ${colors.body}`}
                >
                  Minimum 10 characters required
                </p>
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
                aria-label={
                  isSubmitting ? 'Preparing message...' : 'Send message'
                }
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Preparing Message...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>

            {/* Form Footer */}
            <div className={`mt-6 pt-6 border-t text-center ${colors.border}`}>
              <p
                className={`text-sm transition-colors duration-300 ${colors.body}`}
              >
                By sending a message, you agree to be contacted via email
                regarding your inquiry.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
