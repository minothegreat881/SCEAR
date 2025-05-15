import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
  };
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <Card className="card-hover overflow-hidden h-full flex flex-col">
      <CardHeader>
        <div className="mb-2">{feature.icon}</div>
        <CardTitle>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
      <CardFooter>
        <Link 
          href={feature.link}
          className="flex items-center text-primary font-medium hover:underline"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;