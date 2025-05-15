"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Masonry from 'react-masonry-css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

// Sample gallery items with more metadata
const galleryItems = [
  {
    id: 1,
    title: 'Legion Formation',
    description: 'Members demonstrating the famous Roman testudo (tortoise) formation at the Annual Roman Festival.',
    category: 'formations',
    image: 'https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg',
    date: 'June 2024',
    location: 'Hyde Park, London',
    photographer: 'Marcus Aurelius',
    tags: ['formation', 'shield', 'demonstration', 'festival'],
    likes: 245,
    views: 1200,
  },
  {
    id: 2,
    title: 'Authentic Armor',
    description: 'A detailed view of our historically accurate lorica segmentata (segmented armor) worn by legionaries.',
    category: 'equipment',
    image: 'https://images.pexels.com/photos/5599613/pexels-photo-5599613.jpeg',
    date: 'May 2024',
    location: 'S.C.E.A.R. Workshop',
    photographer: 'Julius Caesar',
    tags: ['armor', 'equipment', 'historical', 'detail'],
    likes: 189,
    views: 980,
  },
  {
    id: 3,
    title: 'School Demonstration',
    description: 'Educational demonstration at Westfield Academy, showcasing Roman military techniques to students.',
    category: 'education',
    image: 'https://images.pexels.com/photos/6499182/pexels-photo-6499182.jpeg',
    date: 'April 2024',
    location: 'Westfield Academy',
    photographer: 'Claudius Maximus',
    tags: ['education', 'demonstration', 'students', 'teaching'],
    likes: 156,
    views: 850,
  },
  {
    id: 4,
    title: 'Training Session',
    description: 'Members practicing with gladius and scutum during our weekly training session.',
    category: 'training',
    image: 'https://images.pexels.com/photos/5599609/pexels-photo-5599609.jpeg',
    date: 'March 2024',
    location: 'Training Grounds',
    photographer: 'Titus Pullo',
    tags: ['training', 'weapons', 'practice', 'skills'],
    likes: 178,
    views: 920,
  },
  {
    id: 5,
    title: 'Museum Exhibition',
    description: 'S.C.E.A.R. members participating in the "Rome: Empire of Power" exhibition.',
    category: 'events',
    image: 'https://images.pexels.com/photos/5599612/pexels-photo-5599612.jpeg',
    date: 'February 2024',
    location: 'National History Museum',
    photographer: 'Lucius Vorenus',
    tags: ['museum', 'exhibition', 'display', 'history'],
    likes: 201,
    views: 1100,
  },
  {
    id: 6,
    title: 'Auxiliary Reenactment',
    description: 'Members portraying Roman auxiliary units from the eastern provinces of the empire.',
    category: 'reenactment',
    image: 'https://images.pexels.com/photos/5599592/pexels-photo-5599592.jpeg',
    date: 'January 2024',
    location: 'Roman Festival',
    photographer: 'Gaius Marius',
    tags: ['auxiliary', 'reenactment', 'costume', 'festival'],
    likes: 167,
    views: 890,
  },
  {
    id: 7,
    title: 'Standard Bearers',
    description: 'Our dedicated signiferi carrying the legion standards during a ceremonial march.',
    category: 'reenactment',
    image: 'https://images.pexels.com/photos/5599588/pexels-photo-5599588.jpeg',
    date: 'December 2023',
    location: 'City Center',
    photographer: 'Scipio Africanus',
    tags: ['standards', 'ceremony', 'march', 'tradition'],
    likes: 198,
    views: 950,
  },
  {
    id: 8,
    title: 'Summer Camp',
    description: 'Young history enthusiasts learning about Roman military life at our annual summer camp.',
    category: 'education',
    image: 'https://images.pexels.com/photos/5599590/pexels-photo-5599590.jpeg',
    date: 'August 2023',
    location: 'Summer Camp Grounds',
    photographer: 'Cato the Elder',
    tags: ['camp', 'youth', 'learning', 'summer'],
    likes: 234,
    views: 1150,
  },
];

const categories = [
  'All',
  'reenactment',
  'formations',
  'equipment',
  'education',
  'training',
  'events',
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'views', label: 'Most Viewed' },
];

const breakpointColumns = {
  default: 4,
  1536: 3,
  1280: 3,
  1024: 2,
  768: 2,
  640: 1
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const filteredAndSortedItems = galleryItems
    .filter((item) => {
      const matchesSearch = (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section with Parallax */}
      <motion.section 
        className="relative h-[50vh] min-h-[400px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/5599589/pexels-photo-5599589.jpeg"
            alt="Gallery Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore our collection of photographs documenting Roman reenactments, 
              educational events, and historical demonstrations.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Filters Section */}
      <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-sm border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8" ref={containerRef}>
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          ) : filteredAndSortedItems.length > 0 ? (
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {filteredAndSortedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div
                    className="group cursor-pointer relative overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-muted-foreground text-lg mb-4">
                No images match your search criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSortBy('newest');
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredAndSortedItems.findIndex(item => item.id === selectedImage.id);
                const prevIndex = (currentIndex - 1 + filteredAndSortedItems.length) % filteredAndSortedItems.length;
                setSelectedImage(filteredAndSortedItems[prevIndex]);
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <motion.div
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="bg-black/50 p-6 rounded-b-lg">
                <h2 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-white/90 mb-4">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span>{selectedImage.date}</span>
                  <span>•</span>
                  <span>{selectedImage.location}</span>
                  <span>•</span>
                  <span>Photo by {selectedImage.photographer}</span>
                  <span>•</span>
                  <span>{selectedImage.likes} likes</span>
                  <span>•</span>
                  <span>{selectedImage.views} views</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedImage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredAndSortedItems.findIndex(item => item.id === selectedImage.id);
                const nextIndex = (currentIndex + 1) % filteredAndSortedItems.length;
                setSelectedImage(filteredAndSortedItems[nextIndex]);
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}