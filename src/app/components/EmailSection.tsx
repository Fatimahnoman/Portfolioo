"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm sm:text-base";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        "service_8s27cfu",
        "template_zmwg26h",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "mAZEUVOXBqTcW-54y"
      );
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-[#0e0e0e] py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-indigo-500/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-teal-500/5 rounded-full filter blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4 text-xs sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-300">Get In Touch</span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-500"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact Me
          </motion.h2>

          <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto px-2">
            Feel free to reach out if you have a project idea, want to collaborate,
            or just say hello. I&apos;m always open to new opportunities.
          </p>
        </motion.div>

        {/* Status Message */}
        {(submitStatus === "success" || submitStatus === "error") && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 sm:p-6 border rounded-xl text-center ${submitStatus === 'success' ? 'bg-green-500/20 border-green-500/50' : 'bg-red-500/20 border-red-500/50'}`}
          >
            {submitStatus === "success" ? (
              <>
                <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-300 text-sm sm:text-base">Thank you for your message. I will get back to you soon.</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-red-400 mb-2">Failed to send message.</h3>
                <p className="text-gray-300 text-sm sm:text-base">Please try again later or email me directly.</p>
              </>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Let&apos;s Connect</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                I&apos;m currently available for freelance work, full-time positions, and interesting projects. 
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <motion.div 
                className="flex items-start gap-3 sm:gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-600/20 to-teal-600/20 border border-indigo-500/30 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                  <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Email</h4>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=fatimahnoman452@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-xs sm:text-sm break-all"
                  >
                    fatimahnoman452@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-3 sm:gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                  <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Phone</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Available upon request</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-3 sm:gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-teal-600/20 to-indigo-600/20 border border-teal-500/30 flex items-center justify-center group-hover:border-teal-500 transition-colors">
                  <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Location</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Karachi, Pakistan</p>
                </div>
              </motion.div>
            </div>

            {/* Quick Email Button */}
            <div className="pt-4 sm:pt-6">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-600/20 to-teal-600/20 border border-indigo-500/50 rounded-xl text-white hover:from-indigo-600/30 hover:to-teal-600/30 transition-all duration-300 text-sm sm:text-base"
              >
                <EnvelopeIcon className="h-5 w-5" />
                Email Me Directly
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8 border-t border-white/10">
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Follow Me</h4>
              <div className="flex gap-3 sm:gap-4">
                <motion.a
                  href="https://x.com/noman62987"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300 text-xs sm:text-sm"
                >
                  X
                </motion.a>
                <motion.a
                  href="https://github.com/Fatimahnoman"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all duration-300 text-xs sm:text-sm"
                >
                  GH
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="group">
                  <label className="block text-gray-400 text-xs sm:text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={inputClasses}
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-400 text-xs sm:text-sm mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs sm:text-sm mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs sm:text-sm mb-2">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  required
                  className={`${inputClasses} resize-none`}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-teal-500 hover:to-indigo-600 transition-all duration-300 text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Opening Email...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-gray-500 text-xs text-center">
                💡 Clicking Send will open your email app with the message pre-filled
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
