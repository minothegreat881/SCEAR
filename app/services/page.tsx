"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sword, Award, PenTool, School, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample services data
const services = [
  {
    id: 'reenactment',
    title: 'Reenactment & Demonstrations',
    icon: <Sword className="h-10 w-10" />,
    description: 'Authentic Roman military reenactments for events and educational programs.',
    features: [
      'Authentic battle formations and tactics',
      'Full encampment with period-accurate tents and equipment',
      'Interactive demonstrations for public engagement',
      'Scalable from small displays to large-scale events',
    ],
    image: 'https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg',
    cta: 'Request a Demonstration',
    link: '/contact?service=reenactment',
  },
  {
    id: 'training',
    title: 'Training Workshops',
    icon: <Award className="h-10 w-10" />,
    description: 'Hands-on training in Roman military techniques, equipment, and historical context.',
    features: [
      'Beginner to advanced skill development',
      'Tactical formations and maneuvers',
      'Equipment handling and maintenance',
      'Historical context and cultural significance',
    ],
    image: 'https://images.pexels.com/photos/5599613/pexels-photo-5599613.jpeg',
    cta: 'Join a Workshop',
    link: '/events?category=workshop',
  },
  {
    id: 'research',
    title: 'Research & Consulting',
    icon: <PenTool className="h-10 w-10" />,
    description: 'Historical research, consulting, and advisory services for media, academia, and museums.',
    features: [
      'Academic research partnerships',
      'Museum exhibition consulting',
      'Film and media production advisory',
      'Historical accuracy verification',
    ],
    image: 'https://images.pexels.com/photos/6499182/pexels-photo-6499182.jpeg',
    cta: 'Consult with Us',
    link: '/contact?service=research',
  },
  {
    id: 'education',
    title: 'Educational Programs',
    icon: <School className="h-10 w-10" />,
    description: 'Engaging educational programs for schools, universities, and cultural institutions.',
    features: [
      'Age-appropriate curriculum alignment',
      'Interactive learning experiences',
      'Artifact handling and displays',
      'Classroom presentations and workshops',
    ],
    image: 'https://images.pexels.com/photos/5599612/pexels-photo-5599612.jpeg',
    cta: 'Book a Program',
    link: '/contact?service=education',
  },
  {
    id: 'events',
    title: 'Event Support',
    icon: <CalendarDays className="h-10 w-10" />,
    description: 'Full-service support for historical events, festivals, and themed experiences.',
    features: [
      'Event planning and coordination',
      'Vendor and participant management',
      'Authentic atmosphere creation',
      'Public engagement activities',
    ],
    image: 'https://images.pexels.com/photos/5599592/pexels-photo-5599592.jpeg',
    cta: 'Plan Your Event',
    link: '/contact?service=events',
  },
];

// Testimonials for each service type
const testimonials = {
  reenactment: {
    quote: "S.C.E.A.R.'s demonstration was the highlight of our Roman festival. The authenticity and professionalism impressed everyone, from casual visitors to history professors.",
    author: "Eleanor Matthews",
    role: "Events Director, Historical Museum of London",
  },
  training: {
    quote: "The training workshops provide an incredible immersive experience. In just a few sessions, I went from complete novice to confidently participating in formations.",
    author: "James Richardson",
    role: "Member since 2022",
  },
  research: {
    quote: "The research team at S.C.E.A.R. provided invaluable insights for our documentary series. Their attention to historical detail elevated the entire production.",
    author: "Victoria Henderson",
    role: "Producer, Historical Documentaries Ltd",
  },
  education: {
    quote: "Our students were completely captivated by the educational program. They're still talking about what they learned months later - it truly made history come alive.",
    author: "Dr. Robert Campbell",
    role: "Head of History, Westfield Academy",
  },
  events: {
    quote: "The team's support in organizing our Living History Weekend was exceptional. Their expertise made the difference between a good event and an outstanding one.",
    author: "Thomas Wilson",
    role: "Cultural Director, City Council",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-muted-foreground text-lg">
              S.C.E.A.R. offers a range of historical services, from authentic reenactments to educational 
              programs and research consulting. Explore our offerings below.
            </p>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={services[0].id} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-4xl">
                {services.map((service) => (
                  <TabsTrigger key={service.id} value={service.id}>
                    <span className="hidden md:inline">{service.title}</span>
                    <span className="md:hidden">{service.id.charAt(0).toUpperCase() + service.id.slice(1, 4)}...</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {service.icon}
                      </div>
                      <h2 className="text-3xl font-bold">{service.title}</h2>
                    </div>
                    
                    <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild>
                      <Link href={service.link}>
                        {service.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    
                    {/* Testimonial */}
                    <Card className="mt-8 bg-muted/50 border-none">
                      <CardContent className="pt-6">
                        <blockquote className="italic text-muted-foreground mb-4">
                          "{testimonials[service.id as keyof typeof testimonials].quote}"
                        </blockquote>
                        <div>
                          <p className="font-semibold">
                            {testimonials[service.id as keyof typeof testimonials].author}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonials[service.id as keyof typeof testimonials].role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="order-1 lg:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              From initial consultation to delivery, we ensure a seamless experience that meets your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: 1,
                title: "Consultation",
                description: "We start with a detailed discussion to understand your specific requirements and goals.",
              },
              {
                step: 2,
                title: "Planning",
                description: "Our team develops a tailored proposal including timeline, resources, and detailed activities.",
              },
              {
                step: 3,
                title: "Preparation",
                description: "We prepare all necessary equipment, materials, and coordinate our team of specialists.",
              },
              {
                step: 4,
                title: "Delivery",
                description: "Our team delivers the service with professional standards and historical accuracy.",
              },
            ].map((item) => (
              <Card key={item.step} className="border-none">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Bring Roman History to Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to discuss how S.C.E.A.R. can meet your historical reenactment, 
            educational, or consulting needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/events">View Our Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}