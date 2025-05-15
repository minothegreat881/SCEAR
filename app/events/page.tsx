"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { MapPin, Clock, Users, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// Dynamically import the Map components with ssr: false
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Sample events data
const events = [
  {
    id: '1',
    title: 'Roman Festival',
    start: '2025-06-15',
    end: '2025-06-17',
    description: 'Annual Roman festival featuring authentic reenactments, demonstrations, and activities.',
    location: 'Hyde Park, London',
    coordinates: [51.5073, -0.1657],
    category: 'festival',
    maxParticipants: 500,
    currentParticipants: 324,
    coordinator: 'Marcus Aurelius',
    image: 'https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg',
    equipment: ['Full Roman attire', 'Shield and sword (if participating in demonstrations)'],
    schedule: [
      { time: '10:00', activity: 'Opening Ceremony' },
      { time: '11:00', activity: 'Legion Formation Demonstration' },
      { time: '13:00', activity: 'Lunch Break' },
      { time: '14:00', activity: 'Public Participation Activities' },
      { time: '16:00', activity: 'Battle Reenactment' },
      { time: '18:00', activity: 'Closing Ceremony' },
    ],
  },
  {
    id: '2',
    title: 'Training Workshop',
    start: '2025-05-20',
    end: '2025-05-20',
    description: 'Intensive training session covering Roman military formations and tactics.',
    location: 'S.C.E.A.R. Headquarters',
    coordinates: [51.5074, -0.1276],
    category: 'training',
    maxParticipants: 30,
    currentParticipants: 18,
    coordinator: 'Julius Caesar',
    image: 'https://images.pexels.com/photos/5599613/pexels-photo-5599613.jpeg',
    equipment: ['Training tunic', 'Practice weapons (provided)', 'Water bottle'],
    schedule: [
      { time: '09:00', activity: 'Introduction and Safety Briefing' },
      { time: '10:00', activity: 'Basic Formations Training' },
      { time: '12:00', activity: 'Lunch Break' },
      { time: '13:00', activity: 'Advanced Tactics' },
      { time: '15:00', activity: 'Practice Scenarios' },
      { time: '16:00', activity: 'Debrief and Feedback' },
    ],
  },
  {
    id: '3',
    title: 'Educational Demonstration',
    start: '2025-07-10',
    end: '2025-07-10',
    description: 'Interactive demonstration of Roman military life for schools.',
    location: 'British Museum',
    coordinates: [51.5194, -0.1269],
    category: 'education',
    maxParticipants: 100,
    currentParticipants: 75,
    coordinator: 'Claudius Maximus',
    image: 'https://images.pexels.com/photos/6499182/pexels-photo-6499182.jpeg',
    equipment: ['None required for visitors'],
    schedule: [
      { time: '10:00', activity: 'Welcome and Introduction' },
      { time: '10:30', activity: 'Equipment Display' },
      { time: '11:30', activity: 'Military Demonstrations' },
      { time: '13:00', activity: 'Interactive Session' },
      { time: '14:30', activity: 'Q&A Session' },
    ],
  },
];

const categoryColors = {
  festival: 'bg-primary text-primary-foreground',
  training: 'bg-secondary text-secondary-foreground',
  education: 'bg-accent text-accent-foreground',
  demonstration: 'bg-muted text-muted-foreground',
};

// Create a Map component that only renders on client side
const Map = ({ events, onEventSelect }: { events: any[], onEventSelect: (event: any) => void }) => {
  if (typeof window === 'undefined') return null;

  return (
    <MapContainer
      center={[51.5074, -0.1276]}
      zoom={12}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={event.coordinates}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold mb-1">{event.title}</h3>
              <p className="text-sm mb-2">{event.location}</p>
              <p className="text-sm">{format(new Date(event.start), 'MMMM d, yyyy')}</p>
              <Button 
                size="sm" 
                className="mt-2 w-full"
                onClick={() => onEventSelect(event)}
              >
                View Details
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleEventClick = (info: any) => {
    const event = events.find(e => e.id === info.event.id);
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
            <p className="text-muted-foreground text-lg">
              Explore our upcoming events, from historical reenactments and festivals to training 
              workshops and educational demonstrations. Join us in bringing Roman history to life.
            </p>
          </div>
        </div>
      </section>

      {/* Map and Calendar Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <Card className="h-[600px] overflow-hidden">
              <Map events={events} onEventSelect={setSelectedEvent} />
            </Card>

            {/* Calendar */}
            <Card className="p-4">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={events}
                eventClick={handleEventClick}
                height="550px"
                eventClassNames={(arg) => {
                  const category = arg.event.extendedProps.category || 'default';
                  return [`cursor-pointer hover:opacity-80 transition-opacity`];
                }}
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedEvent(event)}>
                <div className="relative aspect-video">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className={categoryColors[event.category as keyof typeof categoryColors]}>
                        {event.category}
                      </Badge>
                      <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{format(new Date(event.start), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={categoryColors[selectedEvent.category as keyof typeof categoryColors]}>
                    {selectedEvent.category}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedEvent.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Event Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedEvent.currentParticipants}/{selectedEvent.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-muted-foreground" />
                    <span>Coordinator: {selectedEvent.coordinator}</span>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h4 className="font-semibold mb-3">Schedule</h4>
                  <div className="space-y-2">
                    {selectedEvent.schedule.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{item.time}</span>
                        <span className="text-muted-foreground">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h4 className="font-semibold mb-3">Required Equipment</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedEvent.equipment.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                    Close
                  </Button>
                  <Button>
                    Register Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}