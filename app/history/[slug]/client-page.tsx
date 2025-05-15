"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleContent {
  type: 'text' | 'image' | 'quote';
  content: string;
  url?: string;
  caption?: string;
  author?: string;
}

interface Article {
  title: string;
  subtitle: string;
  coverImage: string;
  date: string;
  location: string;
  strength: string;
  content: ArticleContent[];
}

interface ClientArticlePageProps {
  article: Article;
}

export default function ClientArticlePage({ article }: ClientArticlePageProps) {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={article.coverImage}
          alt={article.title}
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
              <Link href="/history">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to History
                </Button>
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-muted-foreground">{article.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Meta */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{article.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{article.strength}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {article.content.map((block, index) => {
              if (block.type === 'text') {
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="text-lg leading-relaxed"
                  >
                    {block.content}
                  </motion.p>
                );
              }
              if (block.type === 'image' && block.url) {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative aspect-video w-full overflow-hidden rounded-lg"
                  >
                    <Image
                      src={block.url}
                      alt={block.caption || ''}
                      fill
                      className="object-cover"
                    />
                    {block.caption && (
                      <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm">
                        {block.caption}
                      </p>
                    )}
                  </motion.div>
                );
              }
              if (block.type === 'quote') {
                return (
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="border-l-4 border-primary pl-6 py-4 my-8"
                  >
                    <p className="text-xl italic mb-2">{block.content}</p>
                    {block.author && (
                      <cite className="text-sm text-muted-foreground">— {block.author}</cite>
                    )}
                  </motion.blockquote>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}