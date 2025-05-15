import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  news: {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    slug: string;
  };
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <div className="relative aspect-[16/9] w-full">
        <Image 
          src={news.image} 
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardDescription>{news.date}</CardDescription>
        <CardTitle className="line-clamp-2">{news.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{news.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link 
          href={news.slug}
          className="flex items-center text-primary font-medium hover:underline"
        >
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;