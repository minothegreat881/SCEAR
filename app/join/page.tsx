"use client";

import { useState } from 'react';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Info, Loader2, Sword, PenTool, Users, School, Plane } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const membershipFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }).optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Postal code must be at least 4 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  membershipType: z.enum(["standard", "student", "family", "supporter"]),
  interests: z.array(z.string()).nonempty({
    message: "Please select at least one area of interest.",
  }),
  experience: z.string().optional(),
  howHeard: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

const interestOptions = [
  { id: "reenactment", label: "Reenactment & Living History" },
  { id: "research", label: "Historical Research" },
  { id: "crafting", label: "Equipment Crafting & Maintenance" },
  { id: "education", label: "Educational Presentations" },
  { id: "events", label: "Event Organization" },
];

const howHeardOptions = [
  "Search Engine",
  "Social Media",
  "Friend or Family",
  "Event or Demonstration",
  "Museum or Historical Site",
  "Educational Institution",
  "Other",
];

const expectationCards = [
  {
    title: "Training",
    description: "Systematic instruction in the art of Roman combat.",
    icon: <Sword className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg",
  },
  {
    title: "Craft Skills",
    description: "Learn hands-on crafting skills to produce your own gear for performances and other events.",
    icon: <PenTool className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/5599613/pexels-photo-5599613.jpeg",
  },
  {
    title: "Performances",
    description: "Showcase your newly acquired knowledge and skills in living-history fencing and combat demonstrations.",
    icon: <Users className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/6499182/pexels-photo-6499182.jpeg",
  },
  {
    title: "Workshops",
    description: "We design educational programs (workshops) for children and youth, sharing our expertise with the wider public.",
    icon: <School className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/5599612/pexels-photo-5599612.jpeg",
  },
  {
    title: "Visit to Rome",
    description: "We've already made two trips to celebrate Natale di Roma and are gearing up to go again.",
    icon: <Plane className="h-12 w-12" />,
    image: "https://images.pexels.com/photos/5599592/pexels-photo-5599592.jpeg",
  },
];

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const form = useForm<z.infer<typeof membershipFormSchema>>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      membershipType: "standard",
      interests: [],
      experience: "",
      howHeard: "",
      agreeTerms: false,
    },
  });

  function onSubmit(values: z.infer<typeof membershipFormSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Membership application submitted successfully!", {
        description: "We'll be in touch soon to confirm your membership details.",
      });
      setIsSubmitting(false);
      form.reset();
    }, 1500);
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Join S.C.E.A.R.</h1>
            <p className="text-muted-foreground text-lg">
              Become part of our community dedicated to the authentic reenactment and education of Roman military history. 
              Members gain access to training, events, equipment, and a network of passionate historians.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What to Expect</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Join our passionate community and immerse yourself in the fascinating world of Roman history through various engaging activities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expectationCards.map((card, index) => (
              <Card 
                key={index}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500",
                      hoveredCard === index && "scale-110"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Member Benefits</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Training & Skill Development</h3>
                    <p className="text-muted-foreground">
                      Regular training sessions with experienced reenactors to learn authentic Roman military techniques, formations, and historical context.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Event Participation</h3>
                    <p className="text-muted-foreground">
                      Opportunities to participate in public demonstrations, reenactments, living history events, and educational presentations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Equipment & Resources</h3>
                    <p className="text-muted-foreground">
                      Access to shared equipment, guidance on creating authentic gear, and our extensive library of historical research materials.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community & Networking</h3>
                    <p className="text-muted-foreground">
                      Connect with fellow history enthusiasts, researchers, educators, and craftspeople who share your passion for Roman history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image 
                src="https://images.pexels.com/photos/5599591/pexels-photo-5599591.jpeg"
                alt="S.C.E.A.R. members at a reenactment event" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Apply for Membership</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Complete the form below to apply for membership. Once submitted, we'll review your application 
            and contact you with further information.
          </p>

          <div className="max-w-3xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.smith@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+44 123 456 7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="London" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="SW1A 1AA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United Kingdom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Membership Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Membership Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="membershipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membership Type</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a membership type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard Membership</SelectItem>
                              <SelectItem value="student">Student Membership</SelectItem>
                              <SelectItem value="family">Family Membership</SelectItem>
                              <SelectItem value="supporter">Supporter Membership</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Areas of Interest</FormLabel>
                          <FormDescription>
                            Select all areas that interest you.
                          </FormDescription>
                        </div>
                        {interestOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Experience (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about any previous experience with historical reenactment, research, or related activities."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="howHeard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you hear about us?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {howHeardOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Terms & Conditions */}
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I agree to the terms and conditions, including the code of conduct and safety guidelines.
                        </FormLabel>
                        <FormDescription>
                          By checking this box, you confirm that the information provided is accurate and that you will abide by S.C.E.A.R.'s rules and guidelines.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="bg-muted/30 p-4 rounded-lg flex items-start space-x-3">
                  <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Once your application is submitted, we'll review it and contact you to arrange payment and welcome you to S.C.E.A.R. 
                    The review process typically takes 3-5 business days.
                  </p>
                </div>
                
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}