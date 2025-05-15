"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    quote: "S.C.E.A.R. has transformed how our students engage with Roman history. Their demonstrations bring the past to life in ways textbooks simply cannot.",
    author: "Dr. Maria Collins",
    role: "History Professor, University of Oxford"
  },
  {
    id: 2,
    quote: "Joining S.C.E.A.R. connected me with passionate individuals who share my love for Roman history. The training and events are meticulously researched and incredibly immersive.",
    author: "Thomas Harding",
    role: "Member since 2018"
  },
  {
    id: 3,
    quote: "Our museum exhibition on Roman military life was enhanced tremendously by S.C.E.A.R.'s contributions. Their attention to historical detail is unmatched.",
    author: "Jonathan Pierce",
    role: "Curator, National History Museum"
  },
  {
    id: 4,
    quote: "The educational workshops provided by S.C.E.A.R. were engaging and informative. Our students were captivated by the authentic demonstrations and hands-on activities.",
    author: "Sarah Mitchell",
    role: "Headteacher, Westfield Academy"
  },
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-none bg-muted/50 p-6">
                <CardContent className="pt-6">
                  <Quote className="h-10 w-10 text-primary/30 mb-4" />
                  <p className="text-lg italic mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index === activeIndex 
                  ? "bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;