import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { LogIn, LogOut, Trash2, Mail, Phone, Calendar, User, Briefcase, DollarSign, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  deadline: string;
  message: string;
  createdAt: any;
}

export default function Admin() {
  const { user, login, logout, isAdmin, loading } = useFirebase();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
        setMessages(msgs);
        setFetching(false);
      }, (err) => {
        console.error("Admin fetch error:", err);
        setFetching(false);
      });
      return unsub;
    }
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-6 text-center">
        <div className="max-w-md mx-auto bg-slate-50 p-12 rounded-[2rem] border border-slate-100 shadow-xl">
          <LogIn size={48} className="mx-auto mb-6 text-blue-600" />
          <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
          <p className="text-slate-500 mb-8">Please sign in with your Google account to access the dashboard.</p>
          <button 
            onClick={login}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center space-x-2"
          >
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-6 text-center">
        <div className="max-w-md mx-auto bg-red-50 p-12 rounded-[2rem] border border-red-100 shadow-xl">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-slate-600 mb-8">You do not have administrative privileges. Your email: {user.email}</p>
          <button 
            onClick={logout}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">Dashboard</h2>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Contact Messages</h1>
        </div>
        <button 
          onClick={logout}
          className="flex items-center space-x-2 text-slate-500 hover:text-red-500 transition-colors font-bold text-sm uppercase tracking-widest"
        >
          <span>Logout</span>
          <LogOut size={18} />
        </button>
      </div>

      {fetching ? (
        <div className="text-center py-20 text-slate-400">Fetching messages...</div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {messages.length === 0 ? (
              <p className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">No messages yet.</p>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group"
                >
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="absolute top-8 right-8 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-4">
                      <div className="flex items-center space-x-3">
                        <User size={18} className="text-blue-600" />
                        <span className="font-bold text-slate-900">{msg.name}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-500 text-sm">
                        <Mail size={16} />
                        <span>{msg.email}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-500 text-sm">
                        <Phone size={16} />
                        <span>{msg.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-400 text-xs">
                        <Calendar size={14} />
                        <span>{msg.createdAt?.toDate().toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="md:col-span-1 space-y-4">
                      <div className="flex items-center space-x-3 text-sm">
                        <Briefcase size={16} className="text-slate-400" />
                        <span className="font-semibold">{msg.service}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <DollarSign size={16} className="text-slate-400" />
                        <span>Budget: {msg.budget || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <Clock size={16} className="text-slate-400" />
                        <span>Deadline: {msg.deadline || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <div className="bg-slate-50 p-4 rounded-xl text-slate-600 text-sm italic border border-slate-100 min-h-[100px]">
                        "{msg.message}"
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
