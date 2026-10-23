"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { formatPrice, Service, serviceCategories, services } from "@/data/services";

const phone = "254720477375";

const faqs = [
  {
    question: "Where can I find LABRUSH?",
    answer: "We are on Olenguruone Road in Kileleshwa, Nairobi. Use the map below for directions, or WhatsApp us and our team will help you find us.",
  },
  {
    question: "Do you accept walk-ins?",
    answer: "Walk-ins are welcome when space allows. Booking ahead is the best way to secure your preferred service and time.",
  },
  {
    question: "Which payment methods do you accept?",
    answer: "We accept M-Pesa and other payment methods at the salon. Please confirm the available options with our team when booking.",
  },
  {
    question: "Can I book more than one service?",
    answer: "Absolutely. Add each service to your booking and share your preferred date and time. We will confirm the schedule with you on WhatsApp.",
  },
];

function whatsappLink(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function ServiceCard({
  service,
  selected,
  onToggle,
}: {
  service: Service;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="service-card">
      <div className="service-card__topline">
        <span className="service-card__category">{service.category}</span>
        <span className="service-card__spark"><Sparkles size={15} strokeWidth={1.5} /></span>
      </div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className="service-card__bottom">
        <span className="service-price">{formatPrice(service)}</span>
        <button className={`add-button ${selected ? "is-selected" : ""}`} onClick={onToggle} aria-label={`${selected ? "Remove" : "Add"} ${service.name}`}>
          {selected ? <Check size={16} /> : <Plus size={16} />}
          <span>{selected ? "Added" : "Add to booking"}</span>
        </button>
      </div>
    </motion.article>
  );
}

function BookingModal({
  selected,
  onClose,
  onSelectionChange,
}: {
  selected: string[];
  onClose: () => void;
  onSelectionChange: (id: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const chosen = services.filter((service) => selected.includes(service.id));
  const today = new Date().toISOString().slice(0, 10);
  const message = [
    "Hello LABRUSH! I'd like to request a booking.",
    `Name: ${name}`,
    `Phone: ${clientPhone}`,
    `Services: ${chosen.map((service) => `${service.name} (${formatPrice(service)})`).join(", ")}`,
    `Preferred date: ${date}`,
    `Preferred time: ${time}`,
    notes ? `Special requests: ${notes}` : "",
  ].filter(Boolean).join("\n");
  const canContinue = step === 1 ? chosen.length > 0 : step === 2 ? Boolean(date && time) : step === 3 ? Boolean(name.trim() && clientPhone.trim()) : true;

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }}>
        <div className="modal-head">
          <div><span className="eyebrow">A little time for you</span><h2 id="booking-title">Book your visit</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close booking"><X size={19} /></button>
        </div>
        <div className="step-indicator" aria-label={`Step ${step} of 4`}>
          {[1, 2, 3, 4].map((value) => <span key={value} className={step >= value ? "active" : ""} />)}
          <small>Step {step} of 4</small>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} className="modal-content" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
            {step === 1 && <>
              <h3>Choose your services</h3><p className="modal-hint">Select one or more. We’ll confirm final details with you.</p>
              <div className="booking-service-list">{services.map((service) => <button key={service.id} className={`booking-service ${selected.includes(service.id) ? "chosen" : ""}`} onClick={() => onSelectionChange(service.id)}><span className="check-box">{selected.includes(service.id) && <Check size={13} />}</span><span className="booking-service__name">{service.name}<small>{service.category}</small></span><span className="booking-service__price">{formatPrice(service)}</span></button>)}</div>
            </>}
            {step === 2 && <>
              <h3>When shall we expect you?</h3><p className="modal-hint">Choose a preferred date and time. We’ll confirm availability on WhatsApp.</p>
              <label className="field-label">Preferred date<input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} /></label>
              <label className="field-label">Preferred time<select value={time} onChange={(event) => setTime(event.target.value)}><option value="">Select a time</option>{["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            </>}
            {step === 3 && <>
              <h3>How can we reach you?</h3><p className="modal-hint">Your details help our team follow up and confirm your visit.</p>
              <label className="field-label">Your name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" autoComplete="name" /></label>
              <label className="field-label">Phone number<input value={clientPhone} onChange={(event) => setClientPhone(event.target.value)} placeholder="07XX XXX XXX" inputMode="tel" autoComplete="tel" /></label>
              <label className="field-label">Special requests <span className="optional">Optional</span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Anything you'd like us to know?" rows={3} /></label>
            </>}
            {step === 4 && <>
              <div className="summary-mark"><Check size={20} /></div><h3>Your visit, at a glance</h3><p className="modal-hint">Send this request to our team. Your appointment is confirmed once we reply.</p>
              <div className="summary-details"><p><strong>{name}</strong><span>{clientPhone}</span></p><p><strong>Services</strong><span>{chosen.map((service) => service.name).join(", ")}</span></p><p><strong>Preferred time</strong><span>{date} · {time}</span></p>{notes && <p><strong>Requests</strong><span>{notes}</span></p>}</div>
              <a className="button button--dark button--full" href={whatsappLink(message)} target="_blank" rel="noreferrer">Confirm booking via WhatsApp <ArrowRight size={16} /></a>
            </>}
          </motion.div>
        </AnimatePresence>
        {step < 4 && <div className="modal-actions"><button className="text-button" onClick={() => step === 1 ? onClose() : setStep(step - 1)}>{step === 1 ? "Cancel" : "Back"}</button><button className="button button--dark" disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></button></div>}
      </motion.div>
    </div>
  );
}

export default function SalonExperience() {
  const [activeCategory, setActiveCategory] = useState<(typeof serviceCategories)[number]>("Nails");
  const [serviceQuery, setServiceQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const filteredServices = useMemo(() => {
    const query = serviceQuery.trim().toLocaleLowerCase();
    return services.filter((service) => {
      if (!query) return service.category === activeCategory;
      return `${service.name} ${service.category} ${service.description}`.toLocaleLowerCase().includes(query);
    });
  }, [activeCategory, serviceQuery]);
  const chosen = services.filter((service) => selected.includes(service.id));
  const minTotal = chosen.reduce((total, service) => total + service.price, 0);
  const maxTotal = chosen.reduce((total, service) => total + (service.maxPrice ?? service.price), 0);
  const hasConsultation = chosen.some((service) => service.price === 0);

  function toggleService(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Salon enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(`${form.get("message")}\n\nName: ${form.get("name")}\nPhone: ${form.get("phone")}`);
    window.location.href = `mailto:labrushhairsnailsandspa@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <div className="announcement"><span>KELESHWA, NAIROBI</span><span className="announcement-dot">✦</span><span>YOUR BEAUTY, OUR PRIORITY</span><a href="tel:+254720477375">0720 477 375</a></div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="LABRUSH home"><span className="wordmark__main">LABRUSH</span><span className="wordmark__sub">NAILS <i>•</i> HAIR <i>•</i> SPA</span></a>
        <nav className={mobileMenuOpen ? "nav-links nav-links--open" : "nav-links"}>
          <a onClick={() => setMobileMenuOpen(false)} href="#services">Services</a><a onClick={() => setMobileMenuOpen(false)} href="#experience">The experience</a><a onClick={() => setMobileMenuOpen(false)} href="#visit">Visit us</a>
        </nav>
        <button className="button button--header" onClick={() => setBookingOpen(true)}>Book a visit <ArrowRight size={15} /></button>
        <button className="mobile-menu-button" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}</button>
      </header>

      <section className="hero" id="home">
        <div className="hero__image" />
        <div className="hero__shade" />
        <div className="hero__content">
          <span className="hero-kicker"><span /> A MOMENT THAT'S JUST YOURS</span>
          <h1>Where beauty<br />meets <em>relaxation.</em></h1>
          <p>Thoughtful beauty rituals, a softer pace, and a little more you.</p>
          <div className="hero__actions"><button className="button button--gold" onClick={() => setBookingOpen(true)}>Book your moment <ArrowRight size={16} /></button><a className="hero__secondary" href="#services">Explore services <ArrowDown size={14} /></a></div>
        </div>
        <div className="hero__note"><span className="hero__note-line" /><span>LOOK GOOD <i>•</i> FEEL GOOD <i>•</i> BE YOU</span></div>
        <div className="hero__count">01 <span>/</span> 03</div>
      </section>

      <section className="intro-strip" id="experience"><span className="eyebrow">THE LABRUSH FEELING</span><p>Beauty that feels like <em>coming back to yourself.</em></p><span className="intro-strip__caption">NAILS · HAIR · WELLNESS</span></section>

      <section className="services-section section-wrap" id="services">
        <div className="section-heading"><div><span className="eyebrow">A RITUAL FOR EVERY YOU</span><h2>Find your <em>feel-good.</em></h2></div><p>From a fresh set to a full reset, make space for the care you deserve.</p></div>
        <div className="service-tools"><div className="service-controls"><label className="service-category-select"><span className="sr-only">Service category</span><select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value as (typeof serviceCategories)[number])}>{serviceCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label><label className="service-search"><Search size={15} aria-hidden="true" /><span className="sr-only">Search services</span><input type="search" value={serviceQuery} onChange={(event) => setServiceQuery(event.target.value)} placeholder="Search services" /></label></div><span className="service-count">{filteredServices.length} SERVICES</span></div>
        <motion.div layout className="service-grid">{filteredServices.map((service) => <ServiceCard key={service.id} service={service} selected={selected.includes(service.id)} onToggle={() => toggleService(service.id)} />)}</motion.div>
        {filteredServices.length === 0 && <p className="service-empty" role="status">No services found. Try a different search.</p>}
        {selected.length > 0 && <motion.aside className="estimate-bar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="estimate-bar__items"><span className="estimate-count">{selected.length}</span><div><strong>{chosen.map((service) => service.name).join(" · ")}</strong><small>Estimated total</small></div></div>
          <div className="estimate-bar__total"><strong>{hasConsultation ? "From " : ""}KSh {minTotal.toLocaleString("en-KE")}{maxTotal !== minTotal ? ` – ${maxTotal.toLocaleString("en-KE")}` : ""}</strong><small>{hasConsultation ? "Nail art confirmed after consultation" : "Final price confirmed at salon"}</small></div>
          <button className="button button--dark" onClick={() => setBookingOpen(true)}>Continue booking <ArrowRight size={16} /></button>
          <button className="estimate-remove" onClick={() => setSelected([])} aria-label="Clear selected services"><X size={17} /></button>
        </motion.aside>}
      </section>

      <section className="quote-band"><span className="quote-band__ornament">“</span><p>Where beauty meets <em>relaxation.</em></p><span>YOUR BEAUTY, OUR PRIORITY</span></section>

      <section className="visit-section section-wrap" id="visit">
        <div className="visit-copy"><span className="eyebrow">COME AS YOU ARE</span><h2>Your next little <em>escape.</em></h2><p>Find us in the heart of Kileleshwa. We’ll have a warm welcome and a little time set aside just for you.</p><div className="visit-details"><div><span className="visit-icon"><MapPin size={17} /></span><p><strong>Find the salon</strong><span>Olenguruone Road, Kileleshwa<br />Nairobi, Kenya</span></p></div><div><span className="visit-icon"><Clock3 size={17} /></span><p><strong>Opening hours</strong><span>Monday to Saturday: 9:00 AM–10:00 PM<br />Sunday: Booked appointments only</span></p></div></div><div className="contact-actions"><a className="button button--dark" href="tel:+254720477375"><Phone size={15} /> Call the salon</a><a className="button button--outline" href={whatsappLink("Hello LABRUSH! I'd like to ask about booking a visit.")} target="_blank" rel="noreferrer">WhatsApp us <ArrowRight size={15} /></a></div><div className="social-links"><a href="https://www.instagram.com/labrushhairnailsandspa/" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a><a href="https://www.tiktok.com/@labrushhairnailsa" target="_blank" rel="noreferrer">TikTok <ArrowRight size={13} /></a><a href="mailto:labrushhairsnailsandspa@gmail.com">Email <ArrowRight size={13} /></a></div></div>
        <div className="map-frame"><iframe title="Map showing LABRUSH Hair Nails & Spa in Nairobi" src="https://maps.google.com/maps?q=LaBrush%20Hair%20Nails%20%26%20Spa%2C%20Nairobi&t=&z=17&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="map-label" href="https://maps.app.goo.gl/rpMxwLTX2euzSzKF8" target="_blank" rel="noreferrer"><MapPin size={15} /> KILELESHWA, NAIROBI <ArrowRight size={13} /></a></div>
      </section>

      <section className="faq-section"><div className="faq-inner"><div><span className="eyebrow">GOOD TO KNOW</span><h2>A few little <em>details.</em></h2><p>Anything else on your mind? <a href={whatsappLink("Hello LABRUSH! I have a question.")} target="_blank" rel="noreferrer">We’re one message away.</a></p></div><div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={faq.question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><ChevronDown size={17} /></button><AnimatePresence initial={false}>{openFaq === index && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{faq.answer}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>

      <section className="contact-section section-wrap"><div><span className="eyebrow">LET'S GET IN TOUCH</span><h2>We’d love to <em>hear from you.</em></h2></div><form className="contact-form" onSubmit={submitContact}><div className="contact-form__row"><label className="field-label">Your name<input name="name" required placeholder="Name" /></label><label className="field-label">Phone number<input name="phone" required inputMode="tel" placeholder="07XX XXX XXX" /></label></div><label className="field-label">What can we help with?<textarea name="message" required rows={3} placeholder="Tell us a little about it..." /></label><button className="button button--dark" type="submit">Send an email <ArrowRight size={16} /></button></form></section>

      <footer className="site-footer"><a className="wordmark wordmark--footer" href="#home"><span className="wordmark__main">LABRUSH</span><span className="wordmark__sub">NAILS <i>•</i> HAIR <i>•</i> SPA</span></a><span className="footer-tagline">LOOK GOOD <i>•</i> FEEL GOOD <i>•</i> BE YOU</span><span className="copyright">© {new Date().getFullYear()} LABRUSH BEAUTY. NAIROBI, KENYA.</span></footer>

      <AnimatePresence>{isBookingOpen && <BookingModal selected={selected} onClose={() => setBookingOpen(false)} onSelectionChange={toggleService} />}</AnimatePresence>
    </main>
  );
}