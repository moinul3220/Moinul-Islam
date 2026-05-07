import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PORTFOLIO } from '../constants';
import { ExternalLink, PlayCircle, ImageIcon } from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState<'All' | 'Video' | 'Design' | 'Practice'>('All');

  const filteredItems = filter === 'All' ? PORTFOLIO : PORTFOLIO.filter(item => item.category === filter);

  const categories: ('All' | 'Video' | 'Design' | 'Practice')[] = ['All', 'Video', 'Design', 'Practice'];

  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">My Creations</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Portfolio & Practice Work</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    {item.category === 'Video' ? (
                      <PlayCircle className="text-white w-16 h-16" />
                    ) : (
                      <ImageIcon className="text-white w-16 h-16" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                        {item.category}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 tracking-tight">{item.title}</h4>
                    </div>
                    <a href={item.link || "#"} className="text-slate-400 hover:text-blue-600 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No items found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
