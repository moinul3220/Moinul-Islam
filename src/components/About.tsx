import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';

export default function About() {
  const infoItems = [
    { icon: <User size={18} />, label: 'Full Name', value: 'Moinul Islam' },
    { icon: <Calendar size={18} />, label: 'Experience', value: 'Student / Junior Designer' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Dhaka, Bangladesh' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+880 1XXX-XXXXXX' },
    { icon: <Mail size={18} />, label: 'Email', value: 'moinulofficial24@gmail.com' },
    { icon: <GraduationCap size={18} />, label: 'Learning At', value: 'As-Sunnah Skill Development Institute' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt="Moinul Islam"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
            </div>
            {/* Accent box */}
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl hidden md:block shadow-2xl">
              <div className="text-4xl font-bold mb-1">ASDI</div>
              <div className="text-xs uppercase tracking-widest font-medium opacity-80">Skill Institute Student</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">
                Passionating about visual <span className="text-blue-600">Storytelling</span>.
              </h2>
              
              <div className="space-y-6 text-slate-600 leading-relaxed mb-10">
                <p>
                   Hello! I am Moinul Islam, a dedicated student at As-Sunnah Skill Development Institute. I am currently honing my skills in Video Editing and Graphic Design to help brands tell their stories effectively.
                </p>
                <p>
                  I believe that good design is not just about making things look pretty, but about solving problems and communicating messages clearly. My journey into the creative world started with a curiosity for how videos are crafted and how visual identity shapes our perception of brands.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                {infoItems.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="text-blue-600 mt-1">{item.icon}</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.label}</div>
                      <div className="text-sm font-semibold text-slate-800">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
