import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import {
  trackFormSubmission,
  trackExternalLinkClick,
} from '../utils/analytics';
import { useTheme } from '../hooks/useTheme';

export default function Contact() {
  const { isDarkMode } = useTheme();
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
        // Force screen reader to announce the change
        statusElement.setAttribute('aria-live', 'assertive');
        setTimeout(() => {
          statusElement.setAttribute('aria-live', 'polite');
        }, 1000);
      }
    }
  }, [submitStatus]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name': {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2)
          return 'Name must be at least 2 characters';
        return '';
      }
      case 'email': {
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return 'Please enter a valid email address';
        return '';
      }
      case 'message': {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10)
          return 'Message must be at least 10 characters';
        return '';
      }
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      // Focus first field with error for accessibility
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.focus();
        errorElement.setAttribute('aria-invalid', 'true');
      }
      return;
    }

    try {
      // Track form submission for analytics
      trackFormSubmission('contact_form');

      // Create mailto link with form data
      const subject = encodeURIComponent(
        formData.subject || 'Contact from Portfolio'
      );
      const body = encodeURIComponent(
        `Hi Hector,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
      );
      const mailtoLink = `mailto:hnorza@proton.me?subject=${subject}&body=${body}`;

      // Open mailto in a new window instead of redirecting current page
      window.open(mailtoLink, '_self');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-24 sm:py-32 overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
          : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20'
      }`}
    >
      {/* Background decorations - Dark mode aware */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl -z-10 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
              Get in Touch
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
            <p className="text-lg md:text-xl leading-8 text-gray-600 dark:text-gray-200 transition-colors duration-300">
              I'm always excited to connect with fellow developers, product
              professionals, and community builders. Whether you want to discuss
              cloud development, product management, or community initiatives,
              let's chat!
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto transition-colors duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left column - Contact Form */}
            <div className="p-8 md:p-12">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-labelledby="contact-form-heading"
              >
                <h3
                  id="contact-form-heading"
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300"
                >
                  Send me a message
                </h3>

                {/* Live region for form status announcements */}
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="sr-only"
                  id="form-status"
                >
                  {isSubmitting && 'Preparing to send your message...'}
                  {submitStatus === 'success' &&
                    'Message prepared successfully! Your email client should open.'}
                  {submitStatus === 'error' &&
                    'There was an error preparing your message. Please try again.'}
                </div>

                {/* Form instructions for screen readers */}
                <div className="sr-only" id="form-instructions">
                  This contact form has 4 fields. Name and message are required.
                  After submitting, your email client will open with a
                  pre-filled message ready to send.
                </div>

                <fieldset
                  className="space-y-6"
                  aria-describedby="form-instructions"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 ${
                        errors.name
                          ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 ${
                        errors.email
                          ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                      placeholder="What would you like to discuss?"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={
                        errors.message ? 'message-error' : undefined
                      }
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 resize-none ${
                        errors.message
                          ? 'border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Tell me about your project, question, or just say hello!"
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-secondary hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                      {isSubmitting
                        ? 'Opening email client...'
                        : 'Send Message'}
                    </button>
                  </motion.div>
                </fieldset>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg transition-colors duration-300"
                  >
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      Your email client should open with the message ready to
                      send!
                    </p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg transition-colors duration-300"
                  >
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      Something went wrong. Please try again or contact me
                      directly.
                    </p>
                  </motion.div>
                )}
              </form>
            </div>

            {/* Right column - Contact Info */}
            <div className="p-8 md:p-12 bg-gray-50 dark:bg-gray-700/50 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">
                Let's Connect
              </h3>

              <div className="space-y-8">
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm transition-colors duration-300">
                    <EnvelopeIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-200 transition-colors duration-300">
                      Use the form to get in touch, or reach out directly for
                      urgent matters.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm transition-colors duration-300">
                    <GlobeAltIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Social Profiles
                    </h4>
                    <div className="mt-2 space-y-2">
                      <a
                        href="https://github.com/hector-norza"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-primary transition-colors duration-300"
                        onClick={() =>
                          trackExternalLinkClick(
                            'https://github.com/hector-norza'
                          )
                        }
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/norza/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-primary transition-colors duration-300"
                        onClick={() =>
                          trackExternalLinkClick(
                            'https://www.linkedin.com/in/norza/'
                          )
                        }
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                        </svg>
                        LinkedIn{' '}
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  Let's connect and collaborate!
                </h4>
                <p className="text-gray-600 dark:text-gray-200 transition-colors duration-300">
                  Whether you're interested in cloud development, product
                  management insights, or community building strategies, I'm
                  always open to meaningful conversations and new opportunities.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
