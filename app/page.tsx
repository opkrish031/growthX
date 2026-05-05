import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyUs from '@/components/WhyUs';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import { getAllPosts } from '@/lib/sanity';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

const Divider = () => (
  <div
    style={{
      height: '1px',
      background:
        'linear-gradient(to right, transparent, rgba(108,99,255,0.20), transparent)',
    }}
  />
);

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <Stats />
      <Divider />
      <section id="services">
        <Services />
      </section>
      <Divider />
      <section id="process">
        <Process />
      </section>
      <Divider />
      <WhyUs />
      <Divider />
      
      {/* Latest from the Blog Section */}
      <BlogSection />
      
      <Divider />
      {/* <section id="pricing">
        <Pricing />
      </section> */}
      <Divider />
      <FAQ />
      <Divider />
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </>
  );
}

async function BlogSection() {
  let latestPosts: any[] = [];
  try {
    const posts = await getAllPosts();
    latestPosts = posts.slice(0, 3);
  } catch (error) {
    console.error('Error fetching blog posts for home page:', error);
  }

  if (latestPosts.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#8B83FF] text-sm font-bold mb-4">
            FROM THE BLOG
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#F8F8FF] font-syne mb-6">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto">
            Expert tips on growing your brand and staying ahead in the Indian digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {latestPosts.map((post, i) => (
            <BlogCard key={post._id} post={post} index={i} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            href="/blog" 
            className="group relative px-8 py-3.5 bg-transparent border border-[#6C63FF] text-[#6C63FF] rounded-xl font-bold transition-all duration-300 hover:bg-[#6C63FF] hover:text-white flex items-center gap-2 overflow-hidden"
          >
            <span>View All Articles</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
