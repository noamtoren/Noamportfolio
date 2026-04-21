import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/app/components/Footer';

export function Contact() {
  return (
    <div className="absolute inset-0 overflow-auto pb-20">
      <div className="px-6 py-16 min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl mb-6 tracking-tight">
              Let's create something meaningful together
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              I'm always open to discussing new projects, design challenges, 
              or opportunities to collaborate.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="mb-20">
            <a href="mailto:noam.toren12@gmail.com" className="group w-full md:w-auto border-2 border-neutral-900 bg-neutral-900 text-white py-5 px-12 hover:bg-transparent hover:text-neutral-900 transition-all duration-300 text-lg flex items-center justify-center gap-3 inline-flex">
              <span>Send me an email</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Contact Methods */}
          <div className="space-y-12">
            <div className="border-t border-neutral-200 pt-12">
              <h2 className="text-sm uppercase tracking-wider text-neutral-400 mb-8">
                Connect
              </h2>
              <div className="space-y-6">
                <a 
                  href="mailto:noam.toren12@gmail.com" 
                  className="group flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors py-2"
                >
                  <div className="w-10 h-10 border border-neutral-300 rounded-full flex items-center justify-center group-hover:border-neutral-900 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg">noam.toren12@gmail.com</span>
                </a>
                <a 
                  href="#" 
                  className="group flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors py-2"
                >
                  <div className="w-10 h-10 border border-neutral-300 rounded-full flex items-center justify-center group-hover:border-neutral-900 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="text-lg">LinkedIn</span>
                </a>
                <a 
                  href="#" 
                  className="group flex items-center gap-4 text-neutral-700 hover:text-neutral-900 transition-colors py-2"
                >
                  <div className="w-10 h-10 border border-neutral-300 rounded-full flex items-center justify-center group-hover:border-neutral-900 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <span className="text-lg">GitHub</span>
                </a>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-12">
              <h2 className="text-sm uppercase tracking-wider text-neutral-400 mb-6">
                Availability
              </h2>
              <div className="space-y-3 text-lg text-neutral-600">
                <p>Currently based in San Francisco, CA</p>
                <p>Open to freelance projects and full-time opportunities</p>
                <p>Available for remote collaboration worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
