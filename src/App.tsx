import { motion, AnimatePresence } from 'motion/react';
import { Camera, Code2, Rocket, Server, Github, Globe, Zap, Layers, X, Loader2, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { supabase } from './lib/supabase';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{ name: name }]);

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setName('');
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting to Supabase:', error);
      setErrorMsg(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">Headshot Crew</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60 tracking-wide uppercase">
            <a href="#tools" className="hover:text-white transition-colors">The Stack</a>
            <a href="#value" className="hover:text-white transition-colors">Why AI?</a>
            <a href="#deploy" className="hover:text-white transition-colors">Deployment</a>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-200 transition-colors uppercase tracking-wide"
          >
            Join Workshop
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-display tracking-wide leading-[0.9] mb-8 uppercase mt-8">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Ridiculous</span><br />
              Websites.
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed mb-16 font-light">
              Stop settling for boring templates. Learn how to leverage Google AI Studio, Antigravity, and Agent Skills to generate custom, high-end photography portfolios in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-16 sm:gap-12 items-center pl-0 sm:pl-8 mt-24">
              {/* Orbiting Text + Glowing Button */}
              <div className="relative flex items-center justify-center">
                {/* Glowing Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative inline-flex overflow-hidden rounded-full p-[3px] z-10 hover:scale-105 transition-transform duration-300 peer group focus:outline-none"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#ef4444_100%)]" />
                  <span className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#050505] text-white font-bold rounded-full text-lg transition-all group-hover:bg-red-950/40 uppercase tracking-wide w-full h-full">
                    Save Your Seat <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </button>

                {/* Orbiting Text */}
                <div className="absolute w-[240px] h-[240px] animate-[spin_15s_linear_infinite] pointer-events-none peer-hover:animate-[spin_4s_linear_infinite]" style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.6))' }}>
                  <svg viewBox="0 0 300 300" className="w-full h-full">
                    <path id="textPath" d="M 150, 150 m -110, 0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0" fill="none" />
                    <text className="text-[13.5px] font-bold uppercase tracking-[0.22em] fill-red-500">
                      <textPath href="#textPath" startOffset="0%">
                        EXCLUSIVE MASTERCLASS • 12 MAR 26 AT 4PM EST • EXCLUSIVE MASTERCLASS •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              <a href="#tools" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full text-lg transition-all border border-white/10 uppercase tracking-wide z-10 flex items-center justify-center hover:scale-105">
                View Curriculum
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-10 border-y border-white/10 bg-white/5 overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-16 items-center"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              <span className="text-2xl font-display uppercase text-white/40">Zero Code</span>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-2xl font-display uppercase text-white/40">Custom Animations</span>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-2xl font-display uppercase text-white/40">AI Generated</span>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-2xl font-display uppercase text-white/40">High Performance</span>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-2xl font-display uppercase text-white/40">Vercel Hosted</span>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-2xl font-display uppercase text-white/40">GitHub Versioned</span>
              <span className="w-2 h-2 rounded-full bg-red-500" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* The Stack Section */}
      <section id="tools" className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">The AI Stack</h2>
            <h3 className="text-4xl md:text-5xl font-display tracking-wide uppercase">Your New Superpowers.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "Google AI Studio",
                desc: "Harness the power of Gemini to draft site copy, brainstorm layouts, and structure your portfolio content, no coding required."
              },
              {
                icon: <Layers className="w-8 h-8" />,
                title: "Antigravity",
                desc: "Create smooth, gravity-defying animations and interactions that make your headshots pop off the screen."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Agent Skills",
                desc: "Leverage Claude's reasoning to generate clean code, debug layout issues, and build custom site features that go beyond any template."
              }
            ].map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: 2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-colors group cursor-default shadow-xl"
                style={{ perspective: 1000 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-red-500 transition-all">
                  {tool.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{tool.title}</h4>
                <p className="text-white/60 leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section id="value" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-display tracking-wide uppercase leading-[0.9] mb-8">
                Stand Out <br />
                <span className="text-white/30">Or Fade Out.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "No More Cookie-Cutter", desc: "Your photography is unique. Your website should be too. Break free from the same 3 templates everyone else uses." },
                  { title: "Lightning Fast", desc: "Build a fully custom, high-performance website in hours, not weeks. Let AI do the heavy lifting." },
                  { title: "Total Control", desc: "You own the code. No monthly platform fees, no restrictive builders. Just pure, clean code." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 h-auto bg-red-500 rounded-full" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5"
            >
              <img
                src="https://picsum.photos/seed/headshot/800/800?grayscale"
                alt="Photography Portfolio"
                className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

              {/* Floating UI Elements */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-sm text-white/80">AI Generation Complete</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-red-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Deployment Section */}
      <section id="deploy" className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4">Modern Hosting</h2>
          <h3 className="text-4xl md:text-5xl font-display tracking-wide uppercase mb-16">Deploy Like a Pro.</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-10 rounded-3xl bg-[#050505] border border-white/10 flex flex-col items-center text-center">
              <Github className="w-16 h-16 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Store in GitHub</h4>
              <p className="text-white/60">Keep your code safe, track changes, and never lose your work. We'll show you how to set up your repository in 2 clicks.</p>
            </div>

            <div className="p-10 rounded-3xl bg-[#050505] border border-white/10 flex flex-col items-center text-center">
              <Globe className="w-16 h-16 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Host on Vercel</h4>
              <p className="text-white/60">Deploy your site globally in seconds. Enjoy blazing fast load times and automatic SSL certificates, usually for free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-display tracking-wide uppercase mb-8">
            Ready to upgrade <br /> your web presence?
          </h2>
          <p className="text-xl text-white/60 mb-12 font-light">
            Join the workshop and learn how to build the portfolio your photography deserves.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-5 bg-white text-black font-bold rounded-full text-xl hover:bg-gray-200 transition-all hover:scale-105 uppercase tracking-wide"
          >
            Register Now
          </button>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="py-8 border-t border-white/10 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Headshot Crew AI Workshop. All rights reserved.</p>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-red-500/20 blur-[60px] pointer-events-none" />

              <button
                onClick={() => !isSubmitting && setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                <h3 className="text-3xl font-display uppercase tracking-wide mb-2">Join the Crew</h3>
                <p className="text-white/60 mb-8">Enter your name to secure your spot in the AI Web Workshop.</p>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">You're In!</h4>
                    <p className="text-white/60">We've added you to the list.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Peter Hurley"
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all disabled:opacity-50"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!name.trim() || isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl py-4 transition-all uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-red-600 mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Secure My Spot'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
