'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    clientType: 'individual',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase.from('orders').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          client_type: formData.clientType,
          message: formData.message,
          order_type: 'contact',
          status: 'pending',
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        clientType: 'individual',
        message: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us via phone.');
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-off-white">

      <section className="bg-slate-deep py-16 lg:py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Have questions about our services or need to place a bulk order? We are here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          

          <div className="space-y-6 lg:col-span-1">
            {/* phone */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                <FaPhone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-deep text-lg mb-1">Call Us</h3>
                <p className="text-gray-500 text-sm mb-3">Mon-Fri from 8am to 6pm</p>
                <a href="tel:+2348012345678" className="text-primary font-bold hover:underline">
                  +234 801 234 5678
                </a>
              </div>
            </motion.div>


            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 text-secondary">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-deep text-lg mb-1">Email Us</h3>
                <p className="text-gray-500 text-sm mb-3">For inquiries and support</p>
                <a href="mailto:info@chrismoil.com" className="text-secondary font-bold hover:underline">
                  info@chrismoil.com
                </a>
              </div>
            </motion.div>


            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-deep text-lg mb-1">Visit Us</h3>
                <p className="text-gray-500 text-sm mb-2">Our Locations:</p>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li className="font-medium">• Chrism Oil Filling Station, Lagos</li>
                  <li className="font-medium">• LPG Gas Plant 1, Lekki</li>
                  <li className="font-medium">• LPG Gas Plant 2, Mainland</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* contact form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10 lg:col-span-2 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-slate-deep mb-6 ">
                Send us a Message
              </h2>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                >
                  <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600 mb-6">
                    Thank you for contacting Chrism Oil. We have received your message and will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="+234..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Type</label>
                    <div className="flex space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="clientType"
                          value="individual"
                          checked={formData.clientType === 'individual'}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-gray-700">Individual</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="clientType"
                          value="business"
                          checked={formData.clientType === 'business'}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-gray-700">Business / Corporate</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center space-x-2">
                       <FaExclamationCircle />
                       <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-linear-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-(--color-primary)/30 transition-all transform hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
            
  
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0 translate-x-1/3 -translate-y-1/3" />
          </motion.div>
        </div>
      </div>

      {/* map */}
      <section className="h-96 w-full bg-gray-200 relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6300185970265!2d3.453696374046187!3d6.441469324112267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cc280e7539%3A0x6a04870c5678822!2sLekki%20Phase%201%2C%20Lekki%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1706612345678!5m2!1sen!2sng" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </section>
    </div>
  );
}
