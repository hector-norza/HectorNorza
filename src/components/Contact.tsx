import { useState, useEffect } from 'react'; // ← ADD THIS LINE
import { motion } from 'framer-motion';
import { useContrastColors } from '../hooks/useContrastColors';
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  trackFormSubmission,
  trackContactAction,
} from '../utils/analytics'; // ← REMOVE trackExternalLinkClick since it doesn't exist

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'hector@yourEmail.com', // Replace with your actual email
    href: 'mailto:hector@yourEmail.com',
  },
  {
    icon: MapPinIcon,
    label: 'Location',
    value: 'Your City, Country', // Replace with your location
    href: null,
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+1 (555) 123-4567', // Replace with your phone (optional)
    href: 'tel:+15551234567',
  },
];

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
      <div className="absolute left-0 top-1/4 w-1/3 h-2/3 bg-gradient-to-r from-primary-500/5 to-transparent -z-10"></div>
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
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-6"></div>
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
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${colors.secondary} uppercase tracking-wide`}
                    >
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        onClick={() =>
                          trackContactAction(
                            `${info.label.toLowerCase()}_click`
                          )
                        } // ← ADD THIS - Tracks to G-VPC78XB0H1
                        className={`text-lg ${colors.heading} hover:text-primary-600 dark:hover:text-primary-400 transition-colors`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className={`text-lg ${colors.heading}`}>
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

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
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h4 className={`text-xl font-semibold ${colors.heading} mb-4`}>
                What I'm Looking For
              </h4>
              <ul className={`space-y-2 ${colors.body}`}>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Product Management opportunities
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Community building collaborations
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  AI ethics and responsible development discussions
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Speaking engagements and podcasts
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
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
                className={`w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-500/90 hover:to-secondary-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ${
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
