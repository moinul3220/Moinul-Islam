import { motion } from 'motion/react';
import { EDUCATION } from '../constants';
import { Briefcase, Calendar } from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">Acedemic Path</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Education & Certifications</h3>
          </div>

          <div className="relative border-l border-slate-200 ml-4 py-4 space-y-12">
            {EDUCATION.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-10"
              >
                {/* Timeline Dot */}
                <span className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
                
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 items-start flex flex-col md:flex-row md:justify-between transition-hover hover:border-blue-200 transition-colors">
                  <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-bold text-slate-900 mb-2 truncate max-w-xs md:max-w-md">{edu.degree}</h4>
                    <div className="flex items-center text-slate-500 text-sm mb-4">
                      <Briefcase size={14} className="mr-2" />
                      <span>{edu.institution}</span>
                    </div>
                    {edu.description && (
                      <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest whitespace-nowrap">
                    <Calendar size={14} className="mr-2" />
                    <span>{edu.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
