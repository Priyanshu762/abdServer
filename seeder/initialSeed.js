import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Service from "../models/Service.js";
import Package from "../models/Package.js";
import Testimonial from "../models/Testimonial.js";
import GalleryItem from "../models/GalleryItem.js";

dotenv.config();

const initialServices = [
  {
    title: "Birthday Balloon Decoration at Home",
    slug: "birthday-balloon-decoration-varanasi",
    description:
      "Transform your living room or bedroom into a magical birthday party space. Perfect for 1st birthdays, kids cartoon themes, husband/wife surprises, and milestone birthdays in Varanasi.",
    icon: "gift",
    priceRange: "₹1,499 - ₹4,500",
    features: [
      "100+ Pastel & Chrome Latex Balloons",
      "Happy Birthday LED or Foil Banner",
      "Floor Floating Clusters & Ribbon Drops",
      "Warm Fairy Lights String",
      "Free On-Site Setup in Varanasi",
    ],
    image: "/images/balloon-birthday.jpg",
    order: 1,
  },
  {
    title: "Romantic Anniversary & Room Surprise",
    slug: "anniversary-balloon-decoration-varanasi",
    description:
      "Specializing in romantic room surprises, 1st & 25th wedding anniversaries, and candlelit proposals in Varanasi homes, Airbnbs, and luxury hotel rooms (Taj Ganges, Ramada, Clark, Radisson).",
    icon: "heart",
    priceRange: "₹1,999 - ₹6,000",
    features: [
      "Heart-shaped Balloon Arch / Canopy",
      "Fresh Rose Petal Pathway & Bed Heart",
      "50+ Floating Helium/Air Balloons",
      "LED Tea-Light Glass Candles",
      "Romantic Custom Name Neon Sign",
    ],
    image: "/images/balloon-anniversary.jpg",
    order: 2,
  },
  {
    title: "Welcome Baby & Baby Shower (Godh Bharai)",
    slug: "baby-shower-decoration-varanasi",
    description:
      "Celebrate the arrival of your little one with soft cloud-like organic pastel balloons. Tailored for baby welcome home surprises, hospital room returns, and traditional Godh Bharai ceremonies.",
    icon: "baby",
    priceRange: "₹2,499 - ₹7,000",
    features: [
      "Baby Boy / Baby Girl Pastel Cloud Garland",
      "Cute Plush Teddy Bear & Cradle Decor",
      "'Welcome Baby' or 'Oh Baby' Script Neon",
      "Curved Archway / Backdrop Panel",
      "Soft Ambient Floor Lighting",
    ],
    image: "/images/balloon-hero.jpg",
    order: 3,
  },
  {
    title: "Ring Ceremony & Engagement (Roka) Decor",
    slug: "ring-ceremony-decoration-varanasi",
    description:
      "Grand statement stages and photo backdrops for Roka and Ring ceremonies in Varanasi banquet halls, hotel lawns, and private residence terraces.",
    icon: "sparkles",
    priceRange: "₹3,499 - ₹12,000",
    features: [
      "7ft Circular Metallic Gold Halo Ring",
      "Organic Chrome Champagne & White Balloons",
      "Artificial Floral / Pampas Integration",
      "Warm White Neon 'Better Together' Sign",
      "Dual Floor Spotlights",
    ],
    image: "/images/balloon-anniversary.jpg",
    order: 4,
  },
  {
    title: "Terrace & Rooftop Night Party Setup",
    slug: "terrace-party-decoration-varanasi",
    description:
      "Make the most of Varanasi's cool evenings with atmospheric rooftop celebrations. Engineered with wind-resistant frames, glowing string fairy lights, and bold balloon columns.",
    icon: "sunset",
    priceRange: "₹2,999 - ₹8,000",
    features: [
      "Heavy-Base Windproof Balloon Arches",
      "Overhead Canopy Fairy Light Net",
      "Cake Table Dressing & Backdrop",
      "Color Theme Customized to Night View",
      "Dedicated On-Site Coordination",
    ],
    image: "/images/balloon-birthday.jpg",
    order: 5,
  },
  {
    title: "Car Boot Surprise & Same-Day Urgent Decor",
    slug: "car-boot-surprise-varanasi",
    description:
      "Need a surprise tonight or within the next 2 hours? Our rapid response styling team decorates car boots or arrives urgently anywhere in Varanasi for midnight surprises.",
    icon: "zap",
    priceRange: "₹1,799 - ₹4,000",
    features: [
      "Car Trunk Organic Balloon Garland",
      "Glowing LED Letter Lights & Photos",
      "Helium Floating Balloons for Trunk Pop",
      "Surprise Midnight Time-Slot Delivery",
      "No Extra Urgent Delivery Fee",
    ],
    image: "/images/balloon-hero.jpg",
    order: 6,
  },
];

const initialPackages = [
  {
    name: "Simple Room Surprise",
    price: "₹1,499",
    description: "A lovely surprise setup for your bedroom, hotel room, or cozy family gathering.",
    features: [
      "100+ Pastel & Metallic Balloons",
      "Floor Floating Clusters & Ribbon Drops",
      "Happy Birthday / Anniversary Foil Banner",
      "Warm LED Fairy Lights String",
      "Free Delivery Across Varanasi",
      "Choose Any 2 Balloon Colors",
    ],
    popular: false,
    color: "purple",
    order: 1,
  },
  {
    name: "Grand Balloon Arch Setup",
    price: "₹2,999",
    description: "Our bestseller! A grand balloon arch with a curved or round frame and a bright glowing neon sign.",
    features: [
      "350+ Modern Organic Balloon Garland",
      "Arched Backdrop or Round Golden Ring",
      "Glowing LED Script Neon Sign ('Happy Birthday', etc.)",
      "Floor Spotlight for Bright Photos",
      "Dried Pampas & Flower Accents",
      "Full On-Site Setup by Our Decorators",
      "Zero Wall Damage Guarantee",
    ],
    popular: true,
    color: "pink",
    order: 2,
  },
  {
    name: "Grand Stage & Hall Setup",
    price: "₹5,499",
    description: "A luxury multi-backdrop stage setup for grand birthday milestones, baby showers, and family gatherings.",
    features: [
      "550+ Luxury Multi-Sized Balloons",
      "Dual Backdrop Panels & Arches",
      "Light-Up Marquee Numbers or Custom Neon",
      "Cake Pedestal Stand Included",
      "Flower Plumes & Greenery Accents",
      "2 Dedicated On-Site Stylists",
      "Priority VIP Booking Slot",
    ],
    popular: false,
    color: "gradient",
    order: 3,
  },
];

const initialTestimonials = [
  {
    name: "Pooja & Rohan Mishra",
    event: "1st Birthday & Welcome Baby Setup (Cantonment, Varanasi)",
    rating: 5,
    comment:
      "Affordable Balloon Decoration transformed our living room into an ethereal pastel dream. The organic matte balloon arch looked like something straight out of an international magazine. All our guests were asking for their number!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    date: "Recently",
    order: 1,
  },
  {
    name: "Dr. Vikramaditya Singh",
    event: "25th Silver Wedding Anniversary (Sigra, Varanasi)",
    rating: 5,
    comment:
      "The golden halo ring with candlelit glassware was breathtaking. The team arrived promptly 3 hours before the party, decorated quietly and with immaculate cleanliness. Highly recommended for luxury styling at very reasonable rates.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    date: "1 month ago",
    order: 2,
  },
  {
    name: "Ananya Upadhyay",
    event: "Surprise Proposal & Engagement (Lanka / BHU Road, Varanasi)",
    rating: 5,
    comment:
      "The champagne and rose gold balloon installation with warm fairy lights exceeded every expectation. The aesthetics were so classy, far better than conventional shiny balloon vendors in Varanasi. Thank you for making our night magical!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop",
    date: "2 weeks ago",
    order: 3,
  },
];

const initialGalleryItems = [
  {
    category: "birthday",
    title: "The Roman Arch Grand Entrance",
    description: "350+ organic matte cream & gold balloons framing an architectural archway in Varanasi.",
    image: "/images/balloon-hero.jpg",
    alt: "Grand organic balloon arch entrance for celebration in Varanasi",
    isFeatured: true,
    order: 1,
  },
  {
    category: "anniversary",
    title: "The Golden Halo Ring of Love",
    description: "Circular golden metallic ring with organic ivory & blush balloons, 100+ candles, and rose petals.",
    image: "/images/balloon-anniversary.jpg",
    alt: "Romantic circular golden ring balloon decoration in Varanasi",
    isFeatured: true,
    order: 2,
  },
  {
    category: "birthday",
    title: "The 'Celebrate' Architectural Niche",
    description: "White arch backdrop with luminous warm white neon script, caramel balloons, and pampas plumes.",
    image: "/images/balloon-birthday.jpg",
    alt: "Celebrate neon script arched birthday balloon setup in Varanasi",
    isFeatured: true,
    order: 3,
  },
  {
    category: "baby-shower",
    title: "Pastel Cloud Welcome Baby Setup",
    description: "Gentle powder blue and baby pink organic balloon cloud arch with plush teddy bear accents.",
    image: "/images/balloon-hero.jpg",
    alt: "Pastel organic balloon arch for baby shower and welcome baby in Varanasi",
    isFeatured: true,
    order: 4,
  },
  {
    category: "anniversary",
    title: "Candlelit Hotel Suite Makeover",
    description: "Romantic hotel room surprise with rose petals walkway, warm fairy lights, and ceiling ribbon drops.",
    image: "/images/balloon-anniversary.jpg",
    alt: "Candlelit romantic hotel room decoration in Varanasi Cantonment",
    isFeatured: true,
    order: 5,
  },
  {
    category: "birthday",
    title: "Midnight Car Boot Surprise",
    description: "Trunk-filled glowing fairy lights, chrome balloon clusters, and personalized photo clips.",
    image: "/images/balloon-birthday.jpg",
    alt: "Car boot midnight surprise balloon decoration in Varanasi",
    isFeatured: true,
    order: 6,
  },
];

export async function runAutoSeed(force = false) {
  try {
    // 1. Seed or Update Default Admin User
    const adminEmail = process.env.ADMIN_EMAIL || "admin@affordableballoons.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: process.env.ADMIN_NAME || "Admin",
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || "Admin@12345",
        role: "admin",
      });
      console.log(`[Seed] Initial Admin created: ${adminEmail}`);
    } else {
      console.log(`[Seed] Admin user verified: ${adminEmail}`);
    }

    // 2. Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0 || force) {
      if (force) await Service.deleteMany({});
      await Service.insertMany(initialServices);
      console.log(`[Seed] Seeded ${initialServices.length} Varanasi services.`);
    }

    // 3. Packages
    const packageCount = await Package.countDocuments();
    if (packageCount === 0 || force) {
      if (force) await Package.deleteMany({});
      await Package.insertMany(initialPackages);
      console.log(`[Seed] Seeded ${initialPackages.length} pricing packages.`);
    }

    // 4. Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0 || force) {
      if (force) await Testimonial.deleteMany({});
      await Testimonial.insertMany(initialTestimonials);
      console.log(`[Seed] Seeded ${initialTestimonials.length} Varanasi testimonials.`);
    }

    // 5. Gallery Items
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0 || force) {
      if (force) await GalleryItem.deleteMany({});
      await GalleryItem.insertMany(initialGalleryItems);
      console.log(`[Seed] Seeded ${initialGalleryItems.length} curated gallery items.`);
    }
  } catch (error) {
    console.error("[Seed] Seeding failed:", error.message);
  }
}

// Standalone execution: node seeder/initialSeed.js
if (process.argv[1] && process.argv[1].endsWith("initialSeed.js")) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI missing in .env");
    process.exit(1);
  }

  console.log(`Connecting to MongoDB Atlas...`);
  mongoose
    .connect(uri)
    .then(async () => {
      console.log("Connected to MongoDB Atlas!");
      await runAutoSeed(true); // force replace with our new content
      console.log("Seeding finished successfully!");
      process.exit(0);
    })
    .catch((err) => {
      console.error("MongoDB Atlas connection error:", err.message);
      process.exit(1);
    });
}
