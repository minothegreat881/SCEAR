import { Metadata } from 'next';
import ClientArticlePage from './client-page';

// Historical articles data
const articles = {
  'xv-legio': {
    title: 'XV Legio Apollinaris',
    subtitle: 'The Legion of Apollo',
    coverImage: 'https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg',
    date: '41/40 BC - 5th Century AD',
    location: 'Pannonia, Cappadocia',
    strength: '5,000-6,000 men',
    content: [
      {
        type: 'text',
        content: 'The Legio XV Apollinaris was one of the four legions used by Octavian to confront Mark Antony and Cleopatra. After their defeat, the legion was stationed in Illyricum and participated in Tiberius\'s campaign against the Pannonians.',
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/5599588/pexels-photo-5599588.jpeg',
        caption: 'Roman legionaries in formation',
      },
      {
        type: 'text',
        content: 'The legion received its cognomen Apollinaris, "devoted to Apollo," from Apollo, the patron god of Augustus. This association reflected the divine connection claimed by Augustus and reinforced the legion\'s prestigious status.',
      },
      {
        type: 'quote',
        content: 'Under Nero, the XV Apollinaris fought in the Roman–Parthian War of 58–63, commanded by Gnaeus Domitius Corbulo.',
        author: 'Tacitus, Annals',
      },
    ],
  },
  'rimska-armada': {
    title: 'Rímska armáda a pomocné zbory',
    subtitle: 'The Structure of Roman Military Forces',
    coverImage: 'https://images.pexels.com/photos/5599613/pexels-photo-5599613.jpeg',
    date: '1st Century BC - 5th Century AD',
    location: 'Roman Empire',
    strength: 'Over 400,000 men',
    content: [
      {
        type: 'text',
        content: 'The Roman army was among the most successful military forces in history, enabling Rome to build and defend a huge empire that lasted for centuries.',
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/5599609/pexels-photo-5599609.jpeg',
        caption: 'Roman military equipment and formations',
      },
      {
        type: 'text',
        content: 'The army consisted of the legions, made up of Roman citizens, and auxiliary units drawn from the provinces and allied kingdoms. This combination provided both heavy infantry capability and specialized skills.',
      },
      {
        type: 'quote',
        content: 'The Roman army is an army of iron, disciplined by an iron discipline.',
        author: 'Josephus',
      },
    ],
  },
  'first-contact': {
    title: 'First Contact with Roman Empire',
    subtitle: 'The Arrival of Rome in Central Europe',
    coverImage: 'https://images.pexels.com/photos/6499182/pexels-photo-6499182.jpeg',
    date: '6 AD',
    location: 'Modern-day Slovakia',
    strength: 'Multiple Legions',
    content: [
      {
        type: 'text',
        content: 'The first documented contact between Rome and the territories of modern Slovakia occurred during the reign of Augustus, as Roman legions pushed northward along the Danube River.',
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/5599590/pexels-photo-5599590.jpeg',
        caption: 'Roman expansion into Central Europe',
      },
      {
        type: 'text',
        content: 'This contact marked the beginning of centuries of interaction, trade, and occasional conflict between Rome and the local Celtic and Germanic tribes.',
      },
      {
        type: 'quote',
        content: 'The Danube formed both a barrier and a highway for Roman influence into Central Europe.',
        author: 'Historical Record',
      },
    ],
  },
  'limes-romanus': {
    title: 'Limes Romanus',
    subtitle: 'The Northern Frontier of Empire',
    coverImage: 'https://images.pexels.com/photos/5599612/pexels-photo-5599612.jpeg',
    date: '1st - 5th Century AD',
    location: 'Danube River',
    strength: 'Multiple Fortifications',
    content: [
      {
        type: 'text',
        content: 'The Limes Romanus represented the border fortification system of the Roman Empire, with the Danube Limes being particularly significant for the region of modern Slovakia.',
      },
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/5599592/pexels-photo-5599592.jpeg',
        caption: 'Roman frontier fortifications',
      },
      {
        type: 'text',
        content: 'This defensive system included fortresses, watchtowers, and civilian settlements, creating a complex military and economic zone along the empire\'s frontier.',
      },
      {
        type: 'quote',
        content: 'The Limes was not just a military border but a complex economic and cultural interface between Rome and the barbaricum.',
        author: 'Archaeological Studies',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug: slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles];

  if (!article) {
    return <div>Article not found</div>;
  }

  return <ClientArticlePage article={article} />;
}