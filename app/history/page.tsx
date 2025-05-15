"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sword, Shield, Book, Map, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const historicalTopics = [
  {
    id: 'xv-legio',
    title: 'XV Legio Apollinaris',
    subtitle: 'The Legion of Apollo',
    excerpt: 'Explore the history of one of Rome\'s most prestigious legions, from its formation under Augustus to its campaigns across the empire.',
    image: 'https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg',
    icon: <Sword className="h-6 w-6" />,
    date: '41/40 BC - 5th Century AD',
  },
  {
    id: 'rimska-armada',
    title: 'Rímska armáda a pomocné zbory',
    subtitle: 'The Structure of Roman Military Forces',
    excerpt: 'Discover the organization and evolution of the Roman army and its auxiliary units throughout the empire\'s history.',
    image: 'https://images.pexels.com/photos/5599613/pexels-photo-5599613.jpeg',
    icon: <Shield className="h-6 w-6" />,
    date: '1st Century BC - 5th Century AD',
  },
  {
    id: 'first-contact',
    title: 'First Contact with Roman Empire',
    subtitle: 'The Arrival of Rome in Central Europe',
    excerpt: 'Learn about the first interactions between Rome and the territories of modern Slovakia during the reign of Augustus.',
    image: 'https://images.pexels.com/photos/6499182/pexels-photo-6499182.jpeg',
    icon: <Book className="h-6 w-6" />,
    date: '6 AD',
  },
  {
    id: 'limes-romanus',
    title: 'Limes Romanus',
    subtitle: 'The Northern Frontier of Empire',
    excerpt: 'Explore the Roman frontier fortification system along the Danube and its significance for the region.',
    image: 'https://images.pexels.com/photos/5599612/pexels-photo-5599612.jpeg',
    icon: <Map className="h-6 w-6" />,
    date: '1st - 5th Century AD',
  },
];

export default function HistoryPage() {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src="https://images.pexels.com/photos/5599589/pexels-photo-5599589.jpeg"
          alt="Roman History"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Roman Military History</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Explore the fascinating history of Roman military presence in Central Europe, from the mighty legions to the frontier fortifications.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {historicalTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/history/${topic.id}`}>
                  <Card
                    className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
                    onMouseEnter={() => setHoveredTopic(topic.id)}
                    onMouseLeave={() => setHoveredTopic(null)}
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 text-white/80 mb-2">
                          {topic.icon}
                          <span className="text-sm">{topic.date}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">{topic.title}</h2>
                        <p className="text-white/80">{topic.subtitle}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">{topic.excerpt}</p>
                      <div className="flex items-center text-primary font-medium">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Roman Military Timeline</h2>
          <div className="max-w-4xl mx-auto">
            {[
              {
                year: '27 BC',
                title: 'Rise of the Roman Empire',
                description: 'Octavian becomes Augustus, establishing the Roman Empire and reforming the military system.',
              },
              {
                year: '6 AD',
                title: 'Pannonian War',
                description: 'Roman forces campaign against Pannonian tribes, establishing presence in Central Europe.',
              },
              {
                year: '9 AD',
                title: 'Battle of Teutoburg Forest',
                description: 'Major defeat leads to reinforcement of Danube frontier defenses.',
              },
              {
                year: '106 AD',
                title: 'Peak of Roman Power',
                description: 'Trajan\'s conquests bring the empire to its greatest territorial extent.',
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-grow w-0.5 bg-border mt-2" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xl font-bold">{event.year}</span>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}