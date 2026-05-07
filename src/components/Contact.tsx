import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, User, DollarSign, Clock, MessageSquare, Briefcase } from 'lucide-react';
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      budget: formData.get('budget') as string,
      deadline: formData.get('deadline') as string,
      message: formData.get('message') as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'messages'), data);
      setStatus('success');
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again.');
      setStatus('error');
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Info Side */}
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">Get In Touch</h2>
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">Let's work on your next project.</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email Me</div>
                    <div className="text-lg font-semibold text-slate-800">moinulofficial24@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Call / WhatsApp</div>
                    <div className="text-lg font-semibold text-slate-800">+880 1XXX-XXXXXX</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</div>
                    <div className="text-lg font-semibold text-slate-800">Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>

              {/* Decorative Card */}
              <div className="bg-slate-900 p-8 rounded-3xl text-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <MessageSquare size={120} />
                </div>
                <h4 className="text-xl font-bold mb-4 relative z-10">Available for Freelance</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">
                  I'm currently accepting new projects. Let's discuss how I can help you achieve your goals.
                </p>
                <div className="flex -space-x-2 relative z-10">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                    +12
                  </div>
                </div>
                <div className="mt-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Trusted by local clients
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 md:p-16 rounded-[2rem] border border-slate-100 shadow-sm"
            >
              {status === 'success' ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                  <p className="text-slate-500">Thank you for reaching out. I will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <User size={14} className="mr-2" /> Full Name
                      </label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <Mail size={14} className="mr-2" /> Email Address
                      </label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <Phone size={14} className="mr-2" /> Phone / WhatsApp
                      </label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="+880 1XXX XXXXXX"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Service */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <Briefcase size={14} className="mr-2" /> Service Needed
                      </label>
                      <select 
                        name="service"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                      >
                        <option>Video Editing</option>
                        <option>Graphic Design</option>
                        <option>Social Media Kit</option>
                        <option>Full Identity Design</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Budget */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <DollarSign size={14} className="mr-2" /> Estimated Budget
                      </label>
                      <input 
                        name="budget"
                        type="text" 
                        placeholder="e.g. $100 - $500"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Deadline */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <Clock size={14} className="mr-2" /> Deadline
                      </label>
                      <input 
                        name="deadline"
                        type="text" 
                        placeholder="e.g. 2 Weeks"
                        className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                      <MessageSquare size={14} className="mr-2" /> Message
                    </label>
                    <textarea 
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:bg-slate-800 transition-all shadow-xl disabled:bg-slate-400"
                  >
                    <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                    <Send size={18} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
