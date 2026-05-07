import { motion } from 'motion/react';
import { ArrowRight, Play, Layout } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
          alt="Creative Workspace"
          className="w-full h-full object-cover grayscale opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center space-x-2 mb-6">
            <span className="w-12 h-[1px] bg-blue-600"></span>
            <span className="text-blue-600 font-semibold tracking-widest text-xs uppercase">Available for Freelance</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold leading-tight tracking-tighter text-slate-900 mb-8">
            CREATIVE <br />
            <span className="text-outline text-transparent" style={{ WebkitTextStroke: '1px #0f172a' }}>DESIGNER</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
            I'm Moinul Islam, a student designer and editor based in Bangladesh. 
            Transforming ideas into visually stunning stories through Video Editing and Graphic Design.
          </p>

          <div className="flex flex-wrap gap-6">
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-900 text-white font-medium flex items-center space-x-2 rounded-full hover:bg-slate-800 transition-all shadow-xl"
            >
              <span>View Portfolio</span>
              <ArrowRight size={18} />
            </motion.a>

            <motion.div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-500">
                <Play size={16} fill="currentColor" />
                <span className="text-xs font-bold uppercase tracking-widest">Video Editing</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Layout size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Graphic Design</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Side Label */}
      <div className="hidden lg:block absolute right-12 bottom-24 -rotate-90 origin-right">
        <span className="text-slate-300 text-xs font-bold uppercase tracking-[0.5em]">Based in Bangladesh — 2026</span>
      </div>
    </section>
  );
}
