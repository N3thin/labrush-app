export type ServiceCategory = "Nails" | "Pedicure & Manicure" | "Hair Services" | "Hair Treatments" | "Body & Massage" | "Facials";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  maxPrice?: number;
  description: string;
};

export const serviceCategories = ["Nails", "Pedicure & Manicure", "Hair Services", "Hair Treatments", "Body & Massage", "Facials"] as const;

export const services: Service[] = [
  { id: "acrylics", name: "Acrylics (Tips)", category: "Nails", price: 4500, description: "Sculpted acrylic extensions, shaped and finished to your style." },
  { id: "gel-tips", name: "Gel Nail Tips", category: "Nails", price: 3000, description: "Lightweight extensions with a glossy, lasting gel finish." },
  { id: "stickons", name: "Stickons", category: "Nails", price: 2500, description: "A neat, polished set with a shape made just for you." },
  { id: "overlays", name: "Overlays", category: "Nails", price: 2500, description: "Strength and shine layered over your natural nails." },
  { id: "manicure-gel", name: "Manicure + Gel", category: "Nails", price: 1500, description: "A careful nail tidy finished with long-wear gel colour." },
  { id: "full-gel", name: "Full Gel", category: "Nails", price: 1000, description: "A smooth, glossy gel colour for a clean everyday look." },
  { id: "nail-art", name: "Nail Art", category: "Nails", price: 0, description: "Custom details and designs; final price depends on your design." },
  { id: "nail-fill", name: "Nail Fill", category: "Nails", price: 2000, maxPrice: 3000, description: "Refresh your set with a tidy fill and fresh finish." },
  { id: "normal-pedicure", name: "Normal Pedicure + Gel", category: "Pedicure & Manicure", price: 2500, description: "A restorative foot care ritual with a gel finish." },
  { id: "glow-pedicure", name: "Glow Pedicure", category: "Pedicure & Manicure", price: 3000, description: "A soothing exfoliating pedicure for soft, radiant feet." },
  { id: "signature-pedicure", name: "Signature Pedicure", category: "Pedicure & Manicure", price: 3500, description: "Our considered, full-service pedicure experience." },
  { id: "women-manicure", name: "Women's Manicure", category: "Pedicure & Manicure", price: 1500, maxPrice: 2000, description: "Nail shaping, cuticle care and a polished finish." },
  { id: "mens-manicure", name: "Men's Manicure", category: "Pedicure & Manicure", price: 1000, description: "Clean shaping and considered grooming for hands." },
  { id: "mens-pedicure", name: "Men's Pedicure", category: "Pedicure & Manicure", price: 1500, description: "Comfort-focused foot care and a clean finish." },
  { id: "plain-lines", name: "Plain Lines", category: "Hair Services", price: 1000, maxPrice: 1500, description: "Neat, classic lines braided with care." },
  { id: "ghanaian-lines", name: "Ghanaian Lines", category: "Hair Services", price: 2000, maxPrice: 3500, description: "Beautifully detailed lines with a refined finish." },
  { id: "braids", name: "Braids", category: "Hair Services", price: 2000, maxPrice: 3500, description: "Protective braiding tailored to your preferred style." },
  { id: "stitch", name: "Stitch", category: "Hair Services", price: 1500, maxPrice: 2500, description: "Precise stitch braids with clean, defined parts." },
  { id: "wash-blowdry", name: "Hair Wash & Blow Dry", category: "Hair Services", price: 1000, maxPrice: 1500, description: "A refreshing wash followed by a smooth blow dry." },
  { id: "crochet", name: "Crochet", category: "Hair Services", price: 2000, maxPrice: 3500, description: "A versatile protective style with a comfortable finish." },
  { id: "undo", name: "Undo", category: "Hair Services", price: 300, maxPrice: 500, description: "Careful take-down to help protect your natural hair." },
  { id: "weaving", name: "Weaving", category: "Hair Services", price: 2500, maxPrice: 3500, description: "A seamless weave installation, finished with care." },
  { id: "sister-locs-installation", name: "Sister Locs Installation", category: "Hair Services", price: 15000, maxPrice: 20000, description: "A careful Sister Locs installation tailored to your hair." },
  { id: "sister-locs-retouch", name: "Sister locs Retouch", category: "Hair Services", price: 3000, maxPrice: 4000, description: "A maintenance retouch to keep your Sister Locs neat." },
  { id: "affirm", name: "Affirm Treatment", category: "Hair Treatments", price: 3000, description: "A restorative treatment for hair that needs extra care." },
  { id: "loreal", name: "Loreal Treatment", category: "Hair Treatments", price: 3500, description: "A nourishing salon treatment for softer, healthier-looking hair." },
  { id: "other-treatment", name: "Other Treatment", category: "Hair Treatments", price: 1500, description: "Targeted hair care tailored to your needs." },
  { id: "ayurvedic", name: "Ayurvedic Treatments", category: "Hair Treatments", price: 2000, description: "A traditional botanical treatment for scalp and strands." },
  { id: "sister-locks", name: "Sister Locks - Installation", category: "Hair Treatments", price: 30000, maxPrice: 40000, description: "A considered Sister Locks installation; consultation recommended." },
  { id: "dreadlocks", name: "Dreadlocks Installation", category: "Hair Treatments", price: 3500, maxPrice: 4000, description: "Start your loc journey with a careful installation." },
  { id: "moroccan-scrub", name: "Moroccan Body Scrub", category: "Body & Massage", price: 3500, maxPrice: 4500, description: "An exfoliating body ritual for a smooth, renewed feel." },
  { id: "body-lightening", name: "Body Lightening", category: "Body & Massage", price: 3500, description: "A body care treatment; speak with our team about your goals." },
  { id: "scrub-massage", name: "Body Scrub & Massage", category: "Body & Massage", price: 3500, description: "A renewing scrub paired with a relaxing massage." },
  { id: "swedish", name: "Swedish Massage (60 mins)", category: "Body & Massage", price: 3500, description: "A flowing, full-body massage to ease everyday tension." },
  { id: "hot-stone", name: "Hot Stone Massage", category: "Body & Massage", price: 5500, description: "Warm stones and slow, soothing pressure for deep relaxation." },
  { id: "back-massage", name: "Back Massage", category: "Body & Massage", price: 2000, description: "Focused relief for a tired, tension-holding back." },
  { id: "deep-tissue", name: "Deep Tissue Massage (60 mins)", category: "Body & Massage", price: 5000, description: "Targeted pressure to release deeper muscular tension." },
  { id: "head-massage", name: "Head Massage", category: "Body & Massage", price: 1000, description: "A calming scalp and head massage to help you unwind." },
  { id: "classic-facial", name: "Classic / Simple Facial", category: "Facials", price: 2500, description: "A gentle cleanse and refresh for your skin." },
  { id: "deep-cleansing", name: "Deep Cleansing & Extraction", category: "Facials", price: 3000, description: "A thorough cleanse with careful pore care and extraction." },
  { id: "brightening", name: "Brightening Facial", category: "Facials", price: 3500, description: "A glow-boosting facial to leave skin looking refreshed." },
  { id: "anti-acne", name: "Anti-acne / Hydrating Facial", category: "Facials", price: 3000, description: "A targeted facial to soothe, hydrate and rebalance skin." },
];

export function formatPrice(service: Service) {
  if (service.price === 0) return "Price on consultation";
  const minimum = `KSh ${service.price.toLocaleString("en-KE")}`;
  return service.maxPrice ? `${minimum} – KSh ${service.maxPrice.toLocaleString("en-KE")}` : minimum;
}
