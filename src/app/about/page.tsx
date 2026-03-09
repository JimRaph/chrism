'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FaHistory, FaUsers, FaHeart, FaImages, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// Team members data
const teamMembers = [
  {
    name: 'Capt. Solomon Okon',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974',
    bio: 'Visionary leader with over 10 years in the oil & gas and maritime industries.',
  },
  {
    name: 'Mrs. Esther Okon',
    role: 'Legal and Compliance',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976',
    bio: 'Overseeing operations and strategic partnerships across all divisions.',
  },
  {
    name: 'Mrs. Esther something',
    role: 'Accountant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976',
    bio: 'Overseeing operations and strategic partnerships across all divisions.',
  },
  {
    name: 'Mr. First Bank',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070',
    bio: 'Engineering expert ensuring operational excellence in all our facilities.',
  },
  {
    name: 'Mr. Utibe Jimmy',
    role: 'Manager of Station 1',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974',
    bio: 'Veteran captain managing our vessel fleet and cadet training programs.',
  },
  {
    name: 'Mr. Jimmy Esang',
    role: 'CEO and Head of IT',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974',
    bio: 'Veteran captain managing our vessel fleet and cadet training programs.',
  },
];

// Gallery images
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=500', alt: 'Oil Refinery' },
  { src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=500', alt: 'Filling Station' },
  { src: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=500', alt: 'Tanker Vessel' },
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=500', alt: 'Maritime Training' },
  { src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=500', alt: 'LPG Plant' },
  { src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=500', alt: 'Team at Work' },
];

// CSR initiatives
const csrInitiatives = [
  {
    title: 'Community Health Outreach',
    description: 'Free medical checkups and health awareness campaigns in local communities.',
  },
  {
    title: 'Youth Empowerment',
    description: 'Scholarships and vocational training for underprivileged youth.',
  },
  {
    title: 'Environmental Conservation',
    description: 'Tree planting initiatives and clean energy advocacy programs.',
  },
];

export default function AboutPage() {
  const historyRef = useRef(null);
  const teamRef = useRef(null);
  const csrRef = useRef(null);
  const galleryRef = useRef(null);

  const historyInView = useInView(historyRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const csrInView = useInView(csrRef, { once: true, margin: '-100px' });
  const galleryInView = useInView(galleryRef, { once: true, margin: '-100px' });

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-[var(--color-slate-deep)] overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-slate-deep)] via-transparent to-[var(--color-slate-deep)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 mb-6 font-[var(--font-heading)]">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover the journey of Chrism Oil Nig Ltd, from our humble beginnings to becoming 
              a multi-sector powerhouse in Nigeria&apos;s oil & gas and maritime industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company History */}
      <section ref={historyRef} className="py-20 lg:py-28 bg-[var(--color-off-white)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={historyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <FaHistory className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-[var(--color-primary)] font-semibold uppercase tracking-wider text-sm">
                  Our History
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-slate-deep)] mb-6 font-[var(--font-heading)]">
                Building a Legacy of <span className="text-gradient">Excellence</span>
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Chrism Oil Nig Ltd was founded with a vision to provide reliable energy solutions 
                  to Nigerian communities. What began as a single filling station has grown into a 
                  comprehensive energy and maritime services company.
                </p>
                <p>
                  Over the years, we have expanded our operations to include multiple LPG distribution 
                  plants, serving thousands of households with clean cooking gas. Our commitment to 
                  quality and safety has earned us the trust of regulatory bodies and customers alike.
                </p>
                <p>
                  Our entry into the maritime sector marked a new chapter in our growth story. 
                  Today, we operate modern oil tanker vessels and provide world-class cadet training 
                  programs, contributing to Nigeria&apos;s maritime workforce development.
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { year: '2009', event: 'Company Founded' },
                  { year: '2014', event: 'First LPG Plant' },
                  { year: '2018', event: 'Maritime Division' },
                  { year: '2023', event: 'Fleet Expansion' },
                ].map((item, index) => (
                  <div
                    key={item.year}
                    className="px-4 py-2 bg-white rounded-lg shadow-sm border-l-4 border-[var(--color-primary)]"
                  >
                    <p className="text-[var(--color-primary)] font-bold">{item.year}</p>
                    <p className="text-sm text-gray-600">{item.event}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={historyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2069"
                  alt="Chrism Oil Operations"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-3xl font-bold font-[var(--font-heading)]">15+</p>
                  <p className="text-sm">Years</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section ref={teamRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                <FaUsers className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-slate-deep)] mb-4 font-[var(--font-heading)]">
              Meet Our <span className="text-gradient">Leadership</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team brings together decades of expertise in oil & gas operations, 
              maritime services, and business management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-slate-deep)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social links on hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors">
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors">
                      <FaEnvelope className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-slate-deep)] font-[var(--font-heading)]">
                  {member.name}
                </h3>
                <p className="text-[var(--color-primary)] font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Section */}
      <section ref={csrRef} className="py-20 lg:py-28 bg-[var(--color-slate-deep)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={csrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center">
                <FaHeart className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[var(--font-heading)]">
              Chrism in the <span className="text-gradient">Community</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We believe in giving back to the communities that have supported our growth. 
              Our CSR initiatives focus on health, education, and environmental sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {csrInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 40 }}
                animate={csrInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[var(--color-primary)]/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-heading)]">
                  {initiative.title}
                </h3>
                <p className="text-gray-400">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 lg:py-28 bg-[var(--color-off-white)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                <FaImages className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-slate-deep)] mb-4 font-[var(--font-heading)]">
              Our <span className="text-gradient">Gallery</span>
            </h2>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid"
              >
                <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={index % 2 === 0 ? 400 : 300}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-slate-deep)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
