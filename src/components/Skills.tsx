import { motion } from 'motion/react';
import { SKILLS } from '../constants';

export default function Skills() {
  const categories = ['Video Editing', 'Graphic Design', 'Tools'];

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">Technical Stack</h2>
          <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Expertise & Proficiency</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {categories.map((cat, catIdx) => (
            <motion.div 
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm"
            >
              <h4 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">{cat}</h4>
              <div className="space-y-8">
                {SKILLS.filter(s => s.category === cat).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-slate-700 tracking-tight">{skill.name}</span>
                      <span className="text-xs font-medium text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
