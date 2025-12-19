
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PORTFOLIO_ITEMS, SERVICES } from './constants';
import { generateHealthBio } from './services/geminiService';

const App: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string>('https://picsum.photos/400/400?random=10');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiBio, setAiBio] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBio = useCallback(async () => {
    setIsGenerating(true);
    const bio = await generateHealthBio(
      "Dr. Elena Vance",
      "Interventional Cardiology",
      "15 years of experience at Johns Hopkins and research in heart genetics."
    );
    setAiBio(bio || '');
    setIsGenerating(false);
  }, []);

  useEffect(() => {
    generateBio();
  }, [generateBio]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <span className="text-2xl font-serif font-bold tracking-tight text-blue-900">Dr. Vance</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">About Me</a>
              <a href="#portfolio" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Portfolio</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <button 
                onClick={() => window.open('https://linkedin.com', '_blank')}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all font-medium"
              >
                LinkedIn <i className="fab fa-linkedin ml-1"></i>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 py-4 px-6 space-y-4 animate-fade-in-down">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-lg text-slate-700">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-lg text-slate-700">About</a>
            <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="block text-lg text-slate-700">Portfolio</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg text-slate-700">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Medical Professional</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight mb-6">
              Empowering Hearts, <br /> 
              <span className="italic text-blue-900">Enriching Lives.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
              Combining world-class clinical expertise with a deeply personalized approach to cardiovascular health.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-200">
                Book Consultation
              </a>
              <a href="#about" className="px-8 py-4 bg-white text-blue-900 border border-blue-900 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex flex-col items-center">
            <div className="relative group">
              <div className="w-64 h-64 md:w-96 md:h-96 rounded-3xl overflow-hidden border-8 border-white shadow-2xl relative z-10">
                <img 
                  src={profilePic} 
                  alt="Dr. Elena Vance" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-2xl -z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-600/10 rounded-full -z-0"></div>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 left-4 z-20 bg-white/90 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors border border-slate-200"
                title="Update Profile Photo"
              >
                <i className="fas fa-camera text-blue-600"></i>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            <div className="mt-8 flex space-x-6">
              <a href="https://linkedin.com" className="text-slate-400 hover:text-blue-700 text-2xl transition-colors"><i className="fab fa-linkedin"></i></a>
              <a href="https://instagram.com" className="text-slate-400 hover:text-pink-600 text-2xl transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com" className="text-slate-400 hover:text-blue-400 text-2xl transition-colors"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Core Specialties</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-50 group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <i className={`fas ${service.icon} text-2xl text-blue-600 group-hover:text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with AI Bio */}
      <section id="about" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://picsum.photos/800/1000?random=11" 
              alt="Surgery Room" 
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-blue-900 text-white p-10 rounded-3xl shadow-xl hidden md:block max-w-xs">
              <span className="text-4xl font-bold">15+</span>
              <p className="mt-2 text-blue-100 font-medium">Years of clinical excellence and groundbreaking research.</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8">Dedicated to Clinical Precision</h2>
            
            <div className="bg-slate-50 border-l-4 border-blue-600 p-8 rounded-r-2xl mb-8 relative">
              <h4 className="text-xs uppercase tracking-widest font-bold text-blue-600 mb-2">Professional Summary (AI-Enhanced)</h4>
              {isGenerating ? (
                <div className="flex items-center space-x-3 text-slate-500 italic">
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Synthesizing medical background...</span>
                </div>
              ) : (
                <p className="text-lg text-slate-700 leading-relaxed italic">
                  "{aiBio}"
                </p>
              )}
              <button 
                onClick={generateBio}
                className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <i className="fas fa-wand-magic-sparkles mr-2"></i> Regenerate AI Insights
              </button>
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Dr. Elena Vance is a board-certified Interventional Cardiologist specializing in minimally invasive structural heart procedures. Her journey began at the Mayo Clinic, followed by a fellowship at Johns Hopkins, where she led research in cardiovascular imaging. 
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-600"></i>
                </div>
                <span className="font-medium text-slate-800">Board Certified Interventional Cardiologist</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-600"></i>
                </div>
                <span className="font-medium text-slate-800">PhD in Cardiovascular Genetics</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-600"></i>
                </div>
                <span className="font-medium text-slate-800">Lead Investigator, Heart-Gen Alliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Professional Portfolio</h2>
              <p className="text-slate-600 max-w-xl">A glimpse into the milestones, research, and collaborative missions defining Dr. Vance's career.</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">All</button>
              <button className="px-6 py-2 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-bold hover:bg-slate-50">Research</button>
              <button className="px-6 py-2 bg-white text-slate-600 border border-slate-200 rounded-full text-sm font-bold hover:bg-slate-50">Surgical</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO_ITEMS.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[3/4]">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-2">{item.category}</span>
                    <h4 className="text-white font-bold text-xl">{item.title}</h4>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 -skew-x-12 transform origin-top translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8">Let's Connect</h2>
              <p className="text-slate-600 mb-12 leading-relaxed">
                Whether you're seeking a medical consultation, exploring a research partnership, or requesting a speaking engagement, please feel free to reach out.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <i className="fas fa-envelope text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <p className="text-slate-600">office@drvance.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <i className="fas fa-location-dot text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Primary Office</h4>
                    <p className="text-slate-600">Cardiology Dept, 5th Floor, St. Jude Medical Complex</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <i className="fas fa-phone text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Secretary</h4>
                    <p className="text-slate-600">+1 (555) 234-5678</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                    <input type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none">
                    <option>Consultation Inquiry</option>
                    <option>Speaking Engagement</option>
                    <option>Research Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent h-32 outline-none" placeholder="Your message here..."></textarea>
                </div>
                <button className="w-full py-5 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 flex items-center justify-center">
                  Send Message <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-slate-800 pb-16">
            <div>
              <span className="text-3xl font-serif font-bold text-white mb-4 block tracking-tight">Dr. Elena Vance</span>
              <p className="max-w-xs text-sm leading-relaxed">
                Interventional Cardiologist providing evidence-based, compassionate care for complex heart conditions.
              </p>
            </div>
            <div className="flex space-x-12">
              <div>
                <h5 className="text-white font-bold mb-6">Navigation</h5>
                <ul className="space-y-4 text-sm">
                  <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold mb-6">Social</h5>
                <ul className="space-y-4 text-sm">
                  <li><a href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://instagram.com" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="https://twitter.com" className="hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
            <p>© 2024 Dr. Elena Vance. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
