import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Coffee, Store, Star, Users, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Agoo, La Union",
  description: "Discover the best places to eat in Agoo, La Union.",
};

const pillars = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Local Discovery",
    description:
      "We partner with hometown chefs, family-run eateries, and passionate food entrepreneurs to make sure every corner of Agoo is represented.",
  },
  {
    icon: <Store className="h-6 w-6" />,
    title: "Verified Guides",
    description:
      "Our team personally visits restaurants, photographs dishes, and verifies details to keep every listing accurate and inspiring.",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Community Reviews",
    description:
      "Diners share honest reviews, food photos, and ratings so you can make confident choices for every craving and occasion.",
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    title: "Cafe & Lifestyle",
    description:
      "From beachside cafes to quiet study nooks, we highlight places where food, culture, and community meet.",
  },
];

const stats = [
  { label: "Restaurants Listed", value: "150+" },
  { label: "Verified Reviews", value: "2,300+" },
  { label: "Local Partners", value: "75" },
  { label: "Happy Diners", value: "18K+" },
];

const timeline = [
  {
    year: "2019",
    title: "Local Food Map",
    description: "Started as a passion project mapping beloved carinderias.",
  },
  {
    year: "2021",
    title: "Verified Guides",
    description: "Launched restaurant verification and community reviews.",
  },
  {
    year: "2023",
    title: "Regional Expansion",
    description: "Added partner towns around La Union with curated stories.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pt-32 pb-24">
          <div className="absolute inset-0">
            <Image
              src="/images/image2.jpeg"
              alt="Agoo culinary scene"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative container mx-auto space-y-6 text-center text-white">
            <p className="text-sm tracking-[0.3em] text-white uppercase">
              Rooted in Agoo, La Union
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              A curated lens into Agoo&apos;s culture, chefs, and flavors.
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/80">
              We document every kitchen, sari-sari grill, neighborhood cafe, and
              seaside diner that shapes the culinary heartbeat of our town.
              Here, food is a love letter—and we make sure it&apos;s delivered
              beautifully.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-green-600">
                <Link href="/restaurants">Explore Restaurants</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white backdrop-blur-lg"
              >
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background px-4 py-16">
          <div className="container mx-auto grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-primary text-sm tracking-[0.3em] uppercase">
                Our Purpose
              </p>
              <h2 className="text-3xl font-bold">Why this guide exists</h2>
              <p className="text-muted-foreground text-lg">
                Agoo&apos;s restaurants are often passed down between
                generations, with recipes protected like heirlooms. We created
                this platform to amplify their voices, tell their stories, and
                welcome new diners to their tables. Every profile honors a
                craft; every review is a reflection of real community
                experiences.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-muted/40 border-none">
                  <CardContent className="space-y-1 p-6">
                    <p className="text-3xl font-semibold">8</p>
                    <p className="text-muted-foreground text-sm">
                      Barangays actively featured
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/40 border-none">
                  <CardContent className="space-y-1 p-6">
                    <p className="text-3xl font-semibold">36</p>
                    <p className="text-muted-foreground text-sm">
                      Dish spotlights published monthly
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative h-[380px] overflow-hidden rounded-2xl border">
              <Image
                src="/images/adobo.jpg"
                alt="Food storytellers documenting Agoo's dishes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-muted/30 px-4 py-16">
          <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 shadow-sm"
              >
                <p className="text-primary text-4xl font-semibold">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="container mx-auto space-y-12">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <p className="text-primary text-sm tracking-[0.3em] uppercase">
                Our Pillars
              </p>
              <h2 className="text-3xl font-bold">Crafted with authenticity</h2>
              <p className="text-muted-foreground text-lg">
                Every listing, photo, and review is earned. We do more than
                aggregate data—we gather stories, talk to owners, and experience
                every meal the way our neighbors do.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {pillars.map((pillar, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="space-y-4 p-6">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                      {pillar.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{pillar.title}</h3>
                      <p className="text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/20 px-4 py-16">
          <div className="container mx-auto grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-primary text-sm tracking-[0.3em] uppercase">
                Behind the Guide
              </p>
              <h2 className="text-3xl font-bold">
                How we curate Agoo&apos;s table
              </h2>
              <p className="text-muted-foreground">
                Our small editorial team and volunteer community spend their
                weekends tasting halo-halo under nipa huts, interviewing seafood
                vendors at dawn, and photographing chefs plating their
                signatures. It&apos;s a labor of love, and we approach it with
                the care that our hometown deserves.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-background rounded-xl border p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Users className="text-primary h-5 w-5" />
                    <p className="text-sm font-medium">
                      Editorial Collaborations
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Working with culinary students, tourism offices, and
                    cultural historians.
                  </p>
                </div>
                <div className="bg-background rounded-xl border p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <ScrollText className="text-primary h-5 w-5" />
                    <p className="text-sm font-medium">Heritage Stories</p>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Documenting recipes, dialect names, and origins of beloved
                    dishes.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-background space-y-6 rounded-2xl p-8 shadow-lg">
              <p className="text-primary text-sm tracking-[0.3em] uppercase">
                Timeline
              </p>
              <h3 className="text-2xl font-semibold">
                From notebook to digital guide
              </h3>
              <div className="space-y-6">
                {timeline.map((item) => (
                  <div
                    key={item.year}
                    className="border-primary/40 border-l-2 pl-6"
                  >
                    <p className="text-primary text-sm tracking-[0.3em] uppercase">
                      {item.year}
                    </p>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="from-primary/10 bg-gradient-to-r to-green-100 px-4 py-16">
          <div className="container mx-auto flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold">
              Bring your story to the table.
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              If you&apos;re a restaurant owner, chef, or devoted regular with a
              story to tell, we&apos;d love to feature you. Help us keep
              Agoo&apos;s culinary legacy thriving.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-green-600" size="lg">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/restaurants">Browse the Guide</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
