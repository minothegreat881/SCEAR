import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewsCard from '@/components/home/news-card';
import FeatureCard from '@/components/home/feature-card';
import TestimonialCarousel from '@/components/home/testimonial-carousel';


export default function Home() {
  // Sample news data (would come from API/CMS in a real app)
  const newsItems = [
    {
      id: 1,
      title: 'Annual Roman Festival Announced',
      date: 'May 15, 2025',
      excerpt: 'Join us for a weekend of authentic Roman reenactments, food, and festivities.',
      image: '/images/news-1.jpg',
      slug: '/events/roman-festival-2025',
    },
    {
      id: 2,
      title: 'New Training Workshop Series',
      date: 'June 2, 2025',
      excerpt: 'Learn authentic Roman military techniques in our new 6-week workshop series.',
      image: '/images/news-2.jpg',
      slug: '/events/training-workshops-2025',
    },
    {
      id: 3,
      title: 'Educational Program for Schools',
      date: 'April 10, 2025',
      excerpt: 'S.C.E.A.R. launches new educational program for school visits.',
      image: '/images/news-3.jpg',
      slug: '/services/educational-programs',
    },
  ];

  // Features data
  const features = [
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: 'Join Our Community',
      description: 'Become part of a passionate group dedicated to Roman historical reenactment and educational activities.',
      link: '/join',
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: 'Attend Events',
      description: 'Participate in historical reenactments, workshops, and educational demonstrations throughout the year.',
      link: '/events',
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: 'Training Programs',
      description: 'Learn authentic Roman military techniques, formations, and historical context from experienced instructors.',
      link: '/services#training',
    },
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: 'Educational Resources',
      description: 'Access our library of historical resources, research materials, and educational content.',
      link: '/resources',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with video background */}
      <section className="hero-section">
        <video
          className="video-bg"
          src="/videos/rome.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="container mx-auto px-4 text-center hero-content">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            S.C.E.A.R.
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
            Societas civilis exercitus auxiliorumque Romanorum
          </p>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Dedicated to the authentic reenactment and education of Roman military history
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/join">Join Our Society</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              <Link href="/events">Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Experience Roman History</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              S.C.E.A.R. offers a range of activities and services for history enthusiasts, educators, and the public to engage with authentic Roman military history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image 
                src="/images/about-image.jpg" 
                alt="Roman legion reenactment" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2010, S.C.E.A.R. is dedicated to the historical accuracy and educational presentation of Roman military life. Our members meticulously research, recreate, and demonstrate Roman military techniques, equipment, and daily life.
              </p>
              <p className="text-muted-foreground mb-6">
                We collaborate with museums, schools, and cultural institutions to bring history to life through immersive exhibitions, workshops, and public demonstrations.
              </p>
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest News & Events</h2>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from members, educational partners, and event attendees about their experiences with S.C.E.A.R.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Become a member of S.C.E.A.R. and join us in preserving and sharing Roman history through authentic reenactment.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link href="/join">Become a Member</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}