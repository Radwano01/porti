import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const sections = [
  {
    title: "Privacy Policy",
    content: `We value your privacy. Any personal data you provide is collected solely for improving your experience on our platform. 
    We do not share your information with third parties without your consent.`,
  },
  {
    title: "Information Collection",
    content: `We may collect your name, email, usage data, and cookies to optimize the platform and provide tailored services. 
    All data is stored securely and encrypted.`,
  },
  {
    title: "Use of Data",
    content: `Your data helps us improve functionality, customize content, and provide better support. 
    We never sell or trade your personal information.`,
  },
  {
    title: "Security Measures",
    content: `We use industry-standard security practices including HTTPS, encryption, and secure servers to protect your data. 
    However, no method of transmission is completely secure.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy occasionally. Changes will be posted on this page with an updated date. 
    Please review this page periodically.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="relative w-full min-h-screen bg-[#05060f] text-white font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold">
          Privacy & Policy
        </h1>
      </motion.section>

      {/* Accordion Sections */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="bg-[#11121a] p-6 rounded-xl shadow-lg cursor-pointer hover:bg-[#1a1b27] transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <motion.footer
        className="w-full py-8 text-center text-gray-400 border-t border-gray-700 mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </motion.footer>
    </div>
  );
}
