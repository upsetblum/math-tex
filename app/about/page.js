'use client';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white px-5 md:px-12 lg:px-28 py-12">
        {/* Hero Section */}
        <div className="bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 mb-12 transform rotate-1">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-4 transform -rotate-1">
            Hi I&apos;m Youssef
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black transform -rotate-1">
            FULL-STACK DEVELOPER & CREATIVE CODER
          </p>
        </div>

        {/* About Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Personal Photo Card */}
          <div className="bg-cyan-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 transform rotate-2 hover:rotate-0 hover:shadow-[12px_12px_0px_0px_#000] hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="relative overflow-hidden border-3 border-black">
              <Image
                src="/portfolio.png"
                alt="Youssef profil - Full Stack Developer"
                width={300}
                height={256}
                className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300"></div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-black text-black group-hover:animate-pulse">
                THAT&apos;S ME!
              </h3>
              <p className="text-sm font-bold text-black mt-1">
                📸LOST IN THE CIVIVILSATION
              </p>
            </div>
          </div>
          <div className="bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 transform -rotate-1">
            <h2 className="text-3xl font-black mb-4 text-black">WHO AM I?</h2>
            <p className="text-lg font-bold text-black leading-relaxed">
              I&apos;m a passionate developer who loves creating digital experiences
              that make people smile. When I&apos;m not coding, you&apos;ll find me
              exploring new technologies and building cool stuff.
            </p>
          </div>
          <div className="bg-green-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 transform rotate-1">
            <h2 className="text-3xl font-black mb-4 text-black">WHAT I DO</h2>
            <p className="text-lg font-bold text-black leading-relaxed">
              I build full-stack applications using modern technologies. From
              React frontends to Node.js backends, I love bringing ideas to life
              through code.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-blue-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 mb-12 transform -rotate-1">
          <h2 className="text-4xl font-black mb-8 text-black text-center">
            MY ARSENAL
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'REACT',
              'NODE.JS',
              'MONGODB',
              'NEXT.JS',
              'TAILWINDCSS',
              'JAVASCRIPT',
              'GIT',
              'LaTex',
            ].map((skill, index) => (
              <div
                key={skill}
                className={`bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000] p-4 text-center transform ${
                  index % 2 === 0 ? 'rotate-2' : '-rotate-2'
                }`}
              >
                <span className="text-lg font-black text-black">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-8 text-black text-center">
            FEATURED WORK
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 transform rotate-1">
              <h3 className="text-2xl font-black mb-3 text-black">
                BLOG APPLICATION
              </h3>
              <p className="text-lg font-bold text-black mb-4">
                Full-stack blog platform with admin panel, CMS, built with
                Next.js and MongoDB from Scratch.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-black text-white px-3 py-1 font-bold text-sm">
                  NEXT.JS
                </span>
                <span className="bg-black text-white px-3 py-1 font-bold text-sm">
                  MONGODB
                </span>
                <span className="bg-black text-white px-3 py-1 font-bold text-sm">
                  TAILWIND
                </span>
              </div>
            </div>
            <div className="bg-purple-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 transform -rotate-1">
              <h3 className="text-2xl font-black mb-3 text-black">
                COMING SOON
              </h3>
              <p className="text-lg font-bold text-black mb-4">
                More exciting projects are on the way! Stay tuned for updates.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-black text-white px-3 py-1 font-bold text-sm">
                  MYSTERY
                </span>
                <span className="bg-black text-white px-3 py-1 font-bold text-sm">
                  TECH
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-orange-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 transform rotate-1">
          <h2 className="text-4xl font-black mb-6 text-black text-center">
            LET&apos;S CONNECT!
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000] px-6 py-3 font-black text-black hover:shadow-[8px_8px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all">
              EMAIL ME
            </button>
            <button className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000] px-6 py-3 font-black text-black hover:shadow-[8px_8px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all">
              LINKEDIN
            </button>
            <button className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_#000] px-6 py-3 font-black text-black hover:shadow-[8px_8px_0px_0px_#000] transform hover:-translate-x-1 hover:-translate-y-1 transition-all">
              GITHUB
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
