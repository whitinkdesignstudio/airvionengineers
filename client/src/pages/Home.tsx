import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, Phone, MessageCircle, Award, Users, Zap, Shield, Wrench, Clock, CheckCircle, Star, ChevronRight, Gauge, Droplets, Wind, Lightbulb, MapPin, Mail, Facebook, Linkedin, Instagram, Download, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

/**
 * AIRVION ENGINEERS - PREMIUM HVAC WEBSITE
 * Design Philosophy: Engineering Elegance - Apple-inspired industrial design
 * Color Scheme: Teal/Cyan (#0891b2) from Airvion logo, Deep Charcoal (#1f2937)
 * Typography: Poppins (headings), Inter (body)
 * Animation: Smooth parallax, section reveals, hover effects, animated counters
 */

// Animated Counter Component
const AnimatedCounter = ({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-600 font-medium text-sm md:text-base">{label}</p>
    </motion.div>
  );
};

// Product Card Component with Enhanced Design
const ProductCard = ({ title, description, image, features, icon: Icon }: any) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Card className="p-0 py-0 gap-0 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900">
          {!imgError ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 text-center">
              <Icon className="w-16 h-16 text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-bold text-lg text-white">{title}</p>
              <p className="text-xs text-cyan-200 mt-1">Airvion Commercial Systems</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed flex-grow">{description}</p>
          <div className="space-y-2 mb-6">
            {features.slice(0, 3).map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <Button
            onClick={() => window.open(`https://wa.me/919428913898?text=Hello%20Airvion%20Engineers,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(title)}.`, '_blank')}
            className="w-full bg-primary hover:bg-teal-700 text-white gap-2 mt-auto"
          >
            <MessageCircle className="w-4 h-4" />
            Inquire on WhatsApp
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, image }: any) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.3 }}
    className="group h-full"
  >
    <Card className="p-0 py-0 gap-0 border border-cyan-200 hover:border-primary hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden bg-white rounded-2xl">
      {/* 100% Visible Feature Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={image || '/images/hero_hvac_building.png'}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content Body */}
      <div className="p-5 md:p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{description}</p>
        <Button
          onClick={() => window.open(`https://wa.me/919428913898?text=Hello%20Airvion%20Engineers,%20I%20would%20like%20to%20get%20service%20for%20${encodeURIComponent(title)}.`, '_blank')}
          className="w-full bg-primary hover:bg-teal-700 text-white gap-2 mt-4 text-sm font-bold py-2.5 shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          Get Service
        </Button>
      </div>
    </Card>
  </motion.div>
);

// Brand Logo Carousel Component using Real Partner Logos
const BrandCarousel = () => {
  const logoList = Array.from({ length: 14 }, (_, i) => `/images/logos/logo${i + 1}.png`);

  return (
    <div className="relative overflow-hidden py-10 bg-gradient-to-r from-slate-50 via-cyan-50/40 to-slate-50 border-y border-cyan-100/80">
      {/* Soft Vignette Edge Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
        className="flex gap-8 items-center whitespace-nowrap"
      >
        {[...logoList, ...logoList].map((logoSrc, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-48 h-28 bg-white rounded-xl border border-gray-200/90 shadow-sm flex items-center justify-center p-2 hover:shadow-lg hover:border-primary transition-all duration-300 group overflow-hidden"
          >
            <img
              src={logoSrc}
              alt={`Brand Logo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain p-1 scale-125 group-hover:scale-135 transition-transform duration-300"
              onError={(e) => {
                // Fallback handling
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Stats Section with Enhanced Design
const StatsSection = () => (
  <section className="py-12 md:py-16 bg-gradient-to-br from-cyan-50 via-white to-teal-50 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>

    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Track Record
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Proven expertise in delivering premium HVAC solutions across Gujarat
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
        <AnimatedCounter target={12} label="Years Experience" suffix="+" />
        <AnimatedCounter target={100} label="Corporate Clients" suffix="+" />
        <AnimatedCounter target={24} label="Support" suffix="/7" />
        <AnimatedCounter target={98} label="Customer Satisfaction" suffix="%" />
      </div>
    </div>
  </section>
);

// Why Airvion Section with Enhanced Design
const WhyAirvionSection = () => {
  const reasons = [
    { icon: Award, title: 'Certified Team', description: 'Industry-certified engineers with proven expertise in commercial HVAC systems', image: '/images/reasons/certified_team.png' },
    { icon: Zap, title: 'Fast Response', description: 'Quick turnaround on all service requests with 24/7 support availability', image: '/images/reasons/fast_response.png' },
    { icon: Shield, title: 'Reliable After Sales', description: 'Comprehensive support and maintenance for long-term system performance', image: '/images/reasons/after_sales.png' },
    { icon: Wrench, title: 'Single Point Solution', description: 'Sales, services, and support under one roof for convenience', image: '/images/reasons/single_point.png' },
    { icon: Clock, title: 'Annual Maintenance', description: 'Preventive care programs for optimal system performance', image: '/images/reasons/annual_maintenance.png' },
    { icon: Users, title: 'Across Gujarat', description: 'Serving commercial and industrial clients throughout the region', image: '/images/reasons/across_gujarat.png' },
  ];

  return (
    <section className="py-12 md:py-16 bg-white text-gray-900 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Airvion
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete HVAC solutions with premium engineering and exceptional service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <ServiceCard icon={reason.icon} title={reason.title} description={reason.description} image={reason.image} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ rating, text, author, company, role }: any) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="h-full"
  >
    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-gradient-to-br from-white to-cyan-50">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, j) => (
          <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed flex-grow italic">"{text}"</p>
      <div className="flex items-center gap-4 pt-4 border-t border-cyan-200">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-teal-600 rounded-full flex-shrink-0" />
        <div>
          <p className="font-bold text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">{role} at {company}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

// Interactive Contact Section with Unique Hero Banner & Consultation Form (No Grid)
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'VRF Systems', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number.');
      return;
    }

    const recipientEmail = 'dharmikmehta@airvionengineers.com';
    const subject = encodeURIComponent(`HVAC Consultation Inquiry - ${formData.name} (${formData.service})`);
    const body = encodeURIComponent(
      `Hello Airvion Engineers,

I would like to request a free HVAC consultation with the following details:

• Name: ${formData.name}
• Phone: ${formData.phone}
• Requirement / System Type: ${formData.service}
• Project Details / Message: ${formData.message || 'N/A'}

Please review my inquiry and contact me at your earliest convenience.

Thank you!`
    );

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    toast.success('Opening your email app with pre-filled inquiry details!');

    // Automatically open user's default email client
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="container">
        {/* Unique Feature Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-teal-950 via-primary to-cyan-950 text-white shadow-2xl overflow-hidden p-8 md:p-14 border border-cyan-500/20">
          {/* Architectural HVAC Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url('/images/hero_hvac_building.png')` }}
          />
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Heading & Contact Pills */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-cyan-200 text-xs font-semibold uppercase tracking-wider border border-white/20">
                <Shield className="w-4 h-4 text-cyan-300" />
                Gujarat's Trusted HVAC Engineering Partner
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Elevate Your Facility With Industrial-Grade HVAC Engineering
              </h2>

              <p className="text-lg text-cyan-100/90 leading-relaxed font-normal">
                Partner with Airvion Engineers for precision VRF, Chiller, AHU, and Ductable climate solutions. Connect with our senior specialists today for a complimentary technical evaluation and bespoke quote across Gujarat.
              </p>

              {/* Quick Contact Info Badges */}
              <div className="space-y-3 pt-2">
                {/* Official Email Card */}
                <motion.a
                  href="mailto:dharmikmehta@airvionengineers.com"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all text-white group"
                >
                  <div className="w-11 h-11 rounded-lg bg-cyan-400 text-teal-950 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-cyan-200 uppercase tracking-wider">Official Email</p>
                    <p className="text-base md:text-lg font-bold tracking-wide text-white truncate">dharmikmehta@airvionengineers.com</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cyan-300 ml-auto opacity-70 group-hover:opacity-100 flex-shrink-0" />
                </motion.a>

                {/* Direct Phone Card */}
                <motion.a
                  href="tel:+919428913898"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all text-white group"
                >
                  <div className="w-11 h-11 rounded-lg bg-teal-400 text-teal-950 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-teal-200 uppercase tracking-wider">Direct Hotline</p>
                    <p className="text-xl font-extrabold tracking-wide text-white">+91 94289 13898</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-teal-300 ml-auto opacity-70 group-hover:opacity-100 flex-shrink-0" />
                </motion.a>

                {/* WhatsApp Card */}
                <motion.a
                  href="https://wa.me/919428913898?text=Hello%20Airvion%20Engineers,%20I%20would%20like%20to%20inquire%20about%20HVAC%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all text-white group"
                >
                  <div className="w-11 h-11 rounded-lg bg-emerald-400 text-teal-950 flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-emerald-200 uppercase tracking-wider">Instant Chat</p>
                    <p className="text-xl font-extrabold tracking-wide text-white">WhatsApp Support</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-emerald-300 ml-auto opacity-70 group-hover:opacity-100 flex-shrink-0" />
                </motion.a>

                {/* Head Office Card */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-cyan-400 text-teal-950 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-cyan-200 uppercase tracking-wider">Head Office</p>
                      <p className="text-sm font-semibold text-white mt-0.5">Sun Avenue One, 404 4th Floor, Manekbag Shyam Road, Ahmedabad, Gujarat</p>
                      <p className="text-xs text-cyan-300 mt-2">Founder: <strong>Dharmik Mehta</strong> | Serving All Gujarat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Form Card */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white text-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl border border-cyan-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
                  <h3 className="text-2xl font-bold text-gray-900">Send Quick Inquiry</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Shah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 98980XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Requirement / System Type</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                    >
                      <option value="VRF Systems">VRF / VRV Systems</option>
                      <option value="Hi Wall Split AC">Hi Wall Split AC</option>
                      <option value="Cassette Systems">Cassette AC Systems</option>
                      <option value="Chiller System">Chiller System</option>
                      <option value="AHU System">AHU System</option>
                      <option value="Ductable System">Ductable System</option>
                      <option value="AMC & Service">Annual Maintenance (AMC) & Repair</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Project Details / Message (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your project area, location, or cooling requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-primary hover:bg-teal-700 text-white font-extrabold text-base rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-300 transform active:scale-95 mt-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Free Consultation'}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Technical Catalogues PDF Download Section
const CataloguesSection = () => {
  const pdfList = [
    {
      title: 'Airvion Engineers Corporate Profile',
      subtitle: 'Official Company Credentials, Projects & Capability Portfolio',
      file: '/pdf/AIRVION ENGINEERS PROFILE.pdf',
      size: '1.3 MB',
      featured: true,
      tag: 'Company Profile'
    },
    {
      title: 'Carrier & Toshiba Indoor Unit Master Catalogue',
      subtitle: 'Complete IDU System Specifications & Engineering Data',
      file: '/pdf/823_Carrier_ Toshiba- IDU Catalogue_07-07-2022.pdf',
      size: '4.4 MB',
      tag: 'Master Catalogue'
    },
    {
      title: 'Carrier Commercial Cassette Systems',
      subtitle: 'Presented Carrier Cassette Air Conditioners Guide',
      file: '/pdf/Carrier Presented-Carrier Cassette .pdf',
      size: '8.4 MB',
      tag: 'Cassette AC'
    },
    {
      title: 'Carrier Commercial Ducted Systems',
      subtitle: 'High Static Pressure Ducted Unit Technical Datasheet',
      file: '/pdf/Carrier Presented-Carrier Ducted.pdf',
      size: '12.3 MB',
      tag: 'Ducted Systems'
    },
    {
      title: 'Hi-Wall Commercial AC Catalogue (2026)',
      subtitle: 'Commercial & Residential Wall Mounted Air Conditioners',
      file: '/pdf/Catalogue_Hi wall_channel (2026).pdf',
      size: '934 KB',
      tag: 'Hi-Wall AC'
    },
    {
      title: 'Carrier Inverter Ducted Systems',
      subtitle: 'Energy Efficient Variable Speed Inverter Duct Solutions',
      file: '/pdf/Catalogue_Inverter Ducted.pdf',
      size: '1.3 MB',
      tag: 'Inverter Ducted'
    },
    {
      title: 'Toshiba Shibui Inverter Hi-Wall',
      subtitle: 'Premium Japanese Engineering Inverter Split Systems',
      file: '/pdf/Catalogue_Shibui Inverter Hi wall.pdf',
      size: '18.9 MB',
      tag: 'Toshiba Hi-Wall'
    },
    {
      title: 'Carrier CVRF Master Systems Catalogue',
      subtitle: 'Commercial VRF Air Conditioning & Heat Recovery Units',
      file: '/pdf/CVRF CATALOGUE.pdf',
      size: '5.9 MB',
      tag: 'VRF Systems'
    },
    {
      title: 'Toshiba Inverter Cassette Systems',
      subtitle: 'New Generation 360 Airflow Inverter Cassette AC',
      file: '/pdf/New Toshiba Inverter Cassette.pdf',
      size: '40.3 MB',
      tag: 'Toshiba Cassette'
    },
    {
      title: 'Toshiba 1-Way Compact Cassette',
      subtitle: 'Slim Profile 1-Way Ceiling Cassette Product Brochure',
      file: '/pdf/Product Catalogue_1 Way Cassette.pdf',
      size: '2.8 MB',
      tag: '1-Way Cassette'
    },
  ];

  return (
    <section id="catalogues" className="py-12 md:py-16 bg-gradient-to-br from-cyan-50/60 via-slate-50 to-teal-50/40 text-gray-900 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-100 text-teal-900 border border-cyan-300 inline-block mb-3">
            TECHNICAL DOCUMENTATION & BROCHURES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Download Product Catalogues
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access official Carrier & Toshiba HVAC product brochures, technical specifications, and Airvion company profile documentation.
          </p>
        </motion.div>

        {/* Featured Company Profile Card */}
        {pdfList.filter(p => p.featured).map((pdf, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-primary to-cyan-900 text-white border border-cyan-400/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-white text-primary uppercase">
                    {pdf.tag}
                  </span>
                  <span className="text-xs text-cyan-200 font-mono">{pdf.size}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{pdf.title}</h3>
                <p className="text-sm text-cyan-100/80 mt-1">{pdf.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href={pdf.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/25"
              >
                <ExternalLink className="w-4 h-4 text-white" />
                View PDF
              </a>
              <a
                href={pdf.file}
                download
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-cyan-50 text-teal-900 font-bold text-sm transition-all shadow-lg"
              >
                <Download className="w-4 h-4 text-teal-900" />
                Download PDF
              </a>
            </div>
          </motion.div>
        ))}

        {/* Grid of Catalog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pdfList.filter(p => !p.featured).map((pdf, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group p-5 rounded-2xl bg-white hover:bg-cyan-50/40 border border-cyan-200 hover:border-primary transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-50 text-teal-800 border border-cyan-200">
                    {pdf.tag}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{pdf.size}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {pdf.title}
                </h4>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2">
                  {pdf.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">
                <a
                  href={pdf.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
                  View
                </a>
                <a
                  href={pdf.file}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-primary hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Home Component
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      title: 'Hi Wall Split AC',
      description: 'Premium wall-mounted cooling solution for commercial, industrial, and residential spaces',
      image: '/images/products/split_ac.png',
      icon: Wind,
      features: ['Energy Efficient', 'Quiet Operation', 'Smart Controls', 'Easy Installation', 'Eco-Friendly Refrigerant']
    },
    {
      title: 'Cassette Systems',
      description: 'Ceiling-mounted units for seamless 360-degree integration',
      image: '/images/products/cassette_ac.png',
      icon: Droplets,
      features: ['Compact Design', 'Even Distribution', 'Aesthetic Appeal', 'Low Noise', 'Advanced Filtration']
    },
    {
      title: 'VRF Systems',
      description: 'Advanced variable refrigerant flow technology for multi-zone control',
      image: '/images/products/vrf_system.png',
      icon: Gauge,
      features: ['Multi-Zone Control', 'Energy Savings', 'Flexible Installation', 'Smart Zoning', 'Remote Monitoring']
    },
    {
      title: 'Chiller System',
      description: 'Industrial grade liquid chillers engineered for high-capacity cooling',
      image: '/images/products/chiller_system.png',
      icon: Shield,
      features: ['Industrial Capacity', 'Precise Temp Control', 'High Efficiency', 'Long Operational Life', '24/7 Continuous Duty']
    },
    {
      title: 'AHU System',
      description: 'Air Handling Units engineered for clean air circulation and climate control',
      image: '/images/products/ahu_system.png',
      icon: Zap,
      features: ['High Airflow Delivery', 'Advanced Filtration', 'Humidity Control', 'Energy Efficient Fan', 'Heavy Duty Casing']
    },
    {
      title: 'Ductable System',
      description: 'Concealed duct cooling systems engineered for large commercial spaces',
      image: '/images/products/ductable_ac.png',
      icon: Wrench,
      features: ['Concealed Design', 'High Static Pressure', 'Uniform Cooling', 'Low Power Consumption', 'Easy Maintenance Access']
    },
  ];

  const services = [
    { icon: Zap, title: 'Installation', description: 'Professional HVAC system installation and commissioning', image: '/images/services/installation.png' },
    { icon: Wrench, title: 'Maintenance', description: 'Annual contracts and preventive maintenance programs', image: '/images/services/maintenance.png' },
    { icon: Shield, title: 'Emergency Support', description: '24/7 breakdown services and quick repairs', image: '/images/services/emergency.png' },
    { icon: Lightbulb, title: 'HVAC Design', description: 'Expert consultancy and system design services', image: '/images/services/hvac_design.png' },
  ];

  const testimonials = [
    {
      rating: 5,
      text: 'Excellent service and professional team. They handled our complex HVAC installation with precision and expertise.',
      author: 'Rajesh Kumar',
      company: 'Tech Park Solutions',
      role: 'Facilities Manager'
    },
    {
      rating: 5,
      text: 'Outstanding support and quick response to our maintenance needs. Highly recommended for commercial projects.',
      author: 'Priya Sharma',
      company: 'Corporate Towers',
      role: 'Operations Head'
    },
    {
      rating: 5,
      text: 'Best HVAC service provider in Gujarat. Their expertise and reliability are unmatched in the industry.',
      author: 'Amit Patel',
      company: 'Industrial Manufacturing',
      role: 'Plant Manager'
    },
  ];

  const faqs = [
    {
      q: 'What HVAC systems do you offer?',
      a: 'We provide comprehensive HVAC solutions including split ACs, cassette systems, VRF systems, chillers, and AHUs for commercial and industrial applications. Each system is designed for optimal performance and energy efficiency.'
    },
    {
      q: 'Do you offer maintenance contracts?',
      a: 'Yes, we offer Annual Maintenance Contracts (AMC) with preventive maintenance, emergency support, and regular system audits. Our contracts ensure your systems operate at peak efficiency year-round.'
    },
    {
      q: 'What is your service coverage area?',
      a: 'We serve clients across Gujarat with professional installation, maintenance, and support services. Our team is equipped to handle projects of any scale.'
    },
    {
      q: 'How quickly can you respond to emergencies?',
      a: 'Our 24/7 support team ensures rapid response to breakdown calls with quick resolution. We prioritize emergency requests to minimize downtime.'
    },
    {
      q: 'Do you provide HVAC design consultancy?',
      a: 'Yes, our expert engineers provide comprehensive HVAC design consultancy for new installations and system upgrades. We analyze your requirements and recommend optimal solutions.'
    },
    {
      q: 'What brands do you work with?',
      a: 'We are authorized dealers and service partners for leading brands including Carrier and Toshiba, ensuring quality and reliability in every installation.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-teal-500 z-50"
        style={{ width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}
      />

      {/* Top Utility Contact Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="container flex flex-wrap items-center justify-between gap-3 mx-auto">
          <div className="flex items-center gap-4 md:gap-6">
            <a href="mailto:dharmikmehta@airvionengineers.com" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>dharmikmehta@airvionengineers.com</span>
            </a>
            <a href="tel:+919428913898" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hotline: +91 94289 13898</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
            <span>Founder: <strong className="text-white">Dharmik Mehta</strong></span>
            <span className="text-cyan-400 font-medium">Ahmedabad, Gujarat</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-40 transition-all duration-300" style={{
        backgroundColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        boxShadow: scrollY > 50 ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
      }}>
        <div className="container flex items-center justify-between h-20 pt-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center overflow-visible pt-1"
          >
            <a href="#" className="flex items-center overflow-visible">
              <img
                src="/images/airvion_logo.png"
                alt="Airvion Engineers"
                className="h-16 md:h-18 w-auto object-contain scale-[1.75] origin-left translate-y-1 hover:scale-[1.85] transition-transform duration-300"
              />
            </a>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-gray-700 hover:text-primary transition-colors font-medium">Products</a>
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors font-medium">Services</a>
            <a href="#catalogues" className="text-gray-700 hover:text-primary transition-colors font-medium">Catalogues</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors font-medium">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors font-medium">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = 'tel:+919428913898'}
              className="hidden sm:flex gap-2 border-primary text-primary hover:bg-cyan-50 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </Button>
            <Button
              size="sm"
              onClick={() => window.open('https://wa.me/919428913898?text=Hello%20Airvion%20Engineers,%20I%20would%20like%20to%20inquire%20about%20HVAC%20solutions.', '_blank')}
              className="bg-primary hover:bg-teal-700 text-white gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-gradient-to-b from-cyan-50/60 via-slate-50 to-white">
        {/* Architectural HVAC Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
          style={{ backgroundImage: `url('/images/hero_hvac_building.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              Powering Comfort Across Gujarat's Industries
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed max-w-2xl">
              Complete HVAC solutions under one roof. Premium sales, services, support, and expert consultancy for industrial and commercial projects across Gujarat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '#products'}
                className="bg-primary hover:bg-teal-700 text-white font-bold px-8 py-6 shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                Explore Solutions
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '#contact'}
                className="text-gray-900 border-gray-400 hover:bg-gray-100 font-bold px-8 py-6 cursor-pointer"
              >
                Get Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Product Range
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Premium HVAC systems designed for commercial and industrial applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-10 md:py-12 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Brands We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">

            </p>
          </motion.div>

          <BrandCarousel />
        </div>
      </section>

      {/* PDF Technical Catalogues Section */}
      <CataloguesSection />

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16 bg-gradient-to-br from-cyan-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive HVAC solutions covering every aspect of your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Why Airvion Section */}
      <WhyAirvionSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-16 bg-gradient-to-br from-cyan-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proven expertise serving commercial and industrial clients across Gujarat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 bg-white">
        <div className="container max-w-5xl mx-auto">
          {/* Top Brand Color Theme Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-gradient-to-r from-cyan-100/80 via-teal-50 to-cyan-50 rounded-2xl p-5 md:p-7 mb-6 shadow-sm border border-cyan-200/80"
          >
            <div>
              <span className="px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-900 border border-teal-400/80 rounded-full inline-block mb-2 uppercase bg-white/80">
                FAQS
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
          </motion.div>

          {/* Clean Line Accordion List matching reference design */}
          <div className="border-t border-b border-gray-300 divide-y divide-gray-300">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="py-6 md:py-7 px-2 cursor-pointer group transition-colors hover:bg-slate-50/50"
                onClick={() => setExpandedFAQ(expandedFAQ === i ? -1 : i)}
              >
                <div className="flex items-center justify-between gap-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                    {item.q}
                  </h3>
                  <div className={`w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${expandedFAQ === i ? 'bg-primary border-primary text-white rotate-90' : 'text-gray-600 group-hover:border-gray-800'}`}>
                    <ChevronRight className="w-5 h-5 transition-transform" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedFAQ === i ? 1 : 0,
                    height: expandedFAQ === i ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4 pr-12">
                    {item.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-[#0b132a] text-gray-400 py-12 border-t border-slate-800">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4 inline-block bg-[#0b132a] p-2.5 px-4 rounded-xl border border-cyan-500/20 shadow-md overflow-hidden">
                <img src="/images/airvion_logo.png" alt="Airvion Engineers" className="h-12 md:h-14 w-auto object-contain scale-[1.65] origin-center brightness-0 invert my-1" />
              </div>
              <p className="text-sm text-gray-500">Complete HVAC solutions for commercial excellence across Gujarat.</p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-gray-400"><strong>Founder:</strong> Dharmik Mehta</p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a href="mailto:dharmikmehta@airvionengineers.com" className="hover:text-white transition-colors">dharmikmehta@airvionengineers.com</a>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <a href="tel:+919428913898" className="hover:text-white transition-colors">Phone: +91 94289 13898</a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Hi Wall AC</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cassette Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">VRF Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chiller Systems</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Installation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HVAC Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Location</h4>
              <p className="text-sm text-gray-400 mb-4">Sun Avenue 1, 404 4th Floor, Manekbag Shyam Road, Ahmedabad</p>
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-gray-800/90 hover:bg-blue-600 text-gray-300 hover:text-white flex items-center justify-center border border-gray-700/80 transition-all duration-300 transform hover:-translate-y-1 shadow-md group"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-gray-800/90 hover:bg-cyan-600 text-gray-300 hover:text-white flex items-center justify-center border border-gray-700/80 transition-all duration-300 transform hover:-translate-y-1 shadow-md group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-gray-800/90 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-gray-300 hover:text-white flex items-center justify-center border border-gray-700/80 transition-all duration-300 transform hover:-translate-y-1 shadow-md group"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href="https://wa.me/919428913898"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-gray-800/90 hover:bg-emerald-600 text-gray-300 hover:text-white flex items-center justify-center border border-gray-700/80 transition-all duration-300 transform hover:-translate-y-1 shadow-md group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 Airvion Engineers. All rights reserved. | Premium HVAC Solutions for Commercial Excellence</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ bottom: '24px' }}
        animate={{ bottom: scrollY > 500 ? '96px' : '24px' }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open('https://wa.me/919428913898?text=Hello%20Airvion%20Engineers,%20I%20would%20like%20to%20inquire%20about%20HVAC%20solutions.', '_blank')}
        className="fixed right-6 md:right-8 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center z-30 transition-colors cursor-pointer border-2 border-white/20"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Sticky CTA Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: scrollY > 500 ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 shadow-2xl z-20 border-t-4 border-cyan-400"
      >
        <div className="container flex items-center justify-between">
          <div>
            <p className="font-bold">Get Expert HVAC Consultation</p>
            <p className="text-sm text-cyan-100">Speak with our specialists today</p>
          </div>
          <Button
            onClick={() => window.location.href = '#contact'}
            className="bg-white text-primary hover:bg-gray-100 font-semibold cursor-pointer"
          >
            Contact Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
