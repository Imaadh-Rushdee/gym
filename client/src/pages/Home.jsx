import Nav from "../components/Nav.jsx";
import TrialForm from "../components/TrialForm.jsx";
import { Link } from "react-router-dom";

const WA_NUMBER = "94751606842";
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=No.+73+2%2F1+Templers+Road+Dehiwala-Mount+Lavinia+10400+Sri+Lanka";

function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const BENEFITS = [
  { n: "01", title: "Train with purpose", body: "A focused environment for people who want to show up, work hard and improve." },
  { n: "02", title: "Flexible schedule", body: "Long weekday training hours make it easier to build fitness around work and study." },
  { n: "03", title: "Progress-driven", body: "Train toward strength, conditioning, physique and general fitness goals." },
  { n: "04", title: "Local community", body: "A Dehiwala fitness community built around consistency, effort and progress." },
];

const FACILITIES = [
  {
    title: "Strength Training",
    body: "Build a stronger foundation with a serious strength-focused training setup.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=1100&auto=format&fit=crop",
  },
  {
    title: "Free Weights",
    body: "Train with versatile equipment suited to progressive resistance workouts.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=85&w=1100&auto=format&fit=crop",
  },
  {
    title: "Conditioning",
    body: "Mix strength and conditioning work to build performance and everyday fitness.",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=85&w=1100&auto=format&fit=crop",
  },
];

const PLANS = [
  { name: "Monthly", desc: "A flexible option for getting started and building a consistent routine.", plan: "Monthly" },
  { name: "3 Months", desc: "A stronger commitment for members focused on steady progress.", plan: "3 Month", popular: true },
  { name: "Long-Term", desc: "For members who want to make training part of their lifestyle.", plan: "Long-Term" },
];

const REVIEWS = [
  { text: "A strong local reputation matters. This concept is designed to turn that reputation into more enquiries and visits.", name: "Google reputation", meta: "4.9 rating shown in public listings" },
  { text: "Clear membership information, trial enquiries and WhatsApp contact give interested visitors an easy next step.", name: "Built for conversion", meta: "Less friction from discovery to enquiry" },
  { text: "The platform can grow beyond marketing into member registration, attendance and staff workflows.", name: "More than a website", meta: "Digital platform concept" },
];

export default function Home() {
  return (
    <div className="public-site">
      <Nav />

      <main>
        <section className="hero">
          <div className="hero-overlay" />
          <div className="wrap hero-inner">
            <div className="hero-copy reveal">
              <div className="eyebrow"><span /> DEHIWALA · SRI LANKA</div>
              <h1>BUILD YOUR<br /><span>STRONGEST</span><br />SELF.</h1>
              <p className="hero-lead">Train harder. Move better. Become stronger.</p>
              <p className="hero-desc">A modern fitness experience for people serious about becoming their best.</p>
              <div className="hero-actions">
                <a href="#trial" className="btn btn-primary">BOOK A TRIAL <span>↗</span></a>
                <a href="#facilities" className="btn btn-ghost">EXPLORE THE GYM</a>
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-stat">
                <span className="stat-label">PUBLIC RATING</span>
                <strong>4.9</strong>
                <span className="stars">★★★★★</span>
              </div>
              <div className="hero-panel-divider" />
              <div className="hero-stat">
                <span className="stat-label">LOCATION</span>
                <strong className="small">Templers Rd</strong>
                <span>Dehiwala</span>
              </div>
            </div>
          </div>
          <div className="hero-scroll">SCROLL TO DISCOVER <span>↓</span></div>
        </section>

        <section className="action-strip">
          <div className="wrap action-strip-inner">
            <div>
              <span className="kicker">READY TO START?</span>
              <h2>YOUR NEXT WORKOUT STARTS HERE.</h2>
            </div>
            <div className="action-strip-buttons">
              <a href="#trial" className="btn btn-dark">BOOK A TRIAL</a>
              <a href={waLink("Hi The Core 2.0, I'm interested in joining the gym. Could you send me your membership details?")} target="_blank" rel="noreferrer" className="btn btn-line-dark">WHATSAPP US</a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="wrap about-grid">
            <div>
              <div className="eyebrow"><span /> THE CORE 2.0</div>
              <h2 className="display-title">MORE THAN<br />JUST A GYM.</h2>
            </div>
            <div className="about-copy">
              <p className="large-copy">Training works best when the environment makes you want to come back.</p>
              <p>The Core 2.0 concept is built around a simple idea: make it easy for people in and around Dehiwala to discover the gym, understand their options and take the next step.</p>
              <div className="mini-facts">
                <div><strong>05:00</strong><span>Weekday opening</span></div>
                <div><strong>23:00</strong><span>Weekday closing</span></div>
                <div><strong>7 DAYS</strong><span>Weekly access</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="wrap">
            <div className="section-intro split-intro">
              <div>
                <div className="eyebrow"><span /> WHY THE CORE</div>
                <h2>BUILT FOR CONSISTENCY.</h2>
              </div>
              <p>A clean, direct fitness experience that helps members focus on the thing that matters most: showing up and making progress.</p>
            </div>
            <div className="benefit-grid">
              {BENEFITS.map((b) => (
                <article className="benefit-card" key={b.n}>
                  <span className="benefit-num">{b.n}</span>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                  <span className="benefit-arrow">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="facilities" className="facilities-section">
          <div className="wrap">
            <div className="section-intro">
              <div className="eyebrow"><span /> TRAINING</div>
              <h2>EVERYTHING YOU NEED<br />TO PUT IN THE WORK.</h2>
            </div>
            <div className="facility-grid">
              {FACILITIES.map((item, idx) => (
                <article className="facility-card" key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <div className="facility-gradient" />
                  <span className="facility-index">0{idx + 1}</span>
                  <div className="facility-copy">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="proposal-note">Facility imagery and final facility list should be replaced with The Core 2.0's approved photos and verified equipment details before launch.</p>
          </div>
        </section>

        <section id="memberships" className="membership-section">
          <div className="wrap">
            <div className="section-intro split-intro memberships-heading">
              <div>
                <div className="eyebrow"><span /> MEMBERSHIPS</div>
                <h2>CHOOSE YOUR<br />WAY TO TRAIN.</h2>
              </div>
              <p>No invented prices. Visitors can enquire directly so the gym always controls current rates, offers and availability.</p>
            </div>

            <div className="membership-grid">
              {PLANS.map((p) => (
                <article className={`membership-card ${p.popular ? "featured" : ""}`} key={p.name}>
                  {p.popular && <span className="popular-pill">MOST POPULAR</span>}
                  <span className="plan-label">MEMBERSHIP</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <ul>
                    <li>Membership enquiry</li>
                    <li>Direct WhatsApp contact</li>
                    <li>Current pricing confirmed by staff</li>
                  </ul>
                  <a href={waLink(`Hi The Core 2.0, I'm interested in your ${p.plan} membership. Could you send me the current price and details?`)} target="_blank" rel="noreferrer" className={p.popular ? "btn btn-primary wide" : "btn btn-outline wide"}>
                    ENQUIRE NOW <span>↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="trial" className="trial-section">
          <div className="wrap trial-grid">
            <div className="trial-copy">
              <div className="eyebrow"><span /> TRY THE EXPERIENCE</div>
              <h2>COME TRAIN<br />WITH US.</h2>
              <p>Interested in seeing the gym before deciding on a membership? Send a trial request and the team can confirm availability directly.</p>
              <div className="trial-points">
                <span>01 <b>Choose your preferred date</b></span>
                <span>02 <b>Tell us your fitness goal</b></span>
                <span>03 <b>Wait for staff confirmation</b></span>
              </div>
            </div>
            <div className="trial-form-shell">
              <TrialForm />
            </div>
          </div>
        </section>

        <section id="reviews" className="reviews-section">
          <div className="wrap">
            <div className="section-intro center-intro">
              <div className="eyebrow center"><span /> WHY THIS WORKS</div>
              <h2>TURN ATTENTION INTO ACTION.</h2>
              <p>This concept connects discovery, enquiry and gym operations in one simple experience.</p>
            </div>
            <div className="review-grid">
              {REVIEWS.map((review) => (
                <article className="review-card" key={review.name}>
                  <div className="quote-mark">“</div>
                  <p>{review.text}</p>
                  <div className="review-meta">
                    <strong>{review.name}</strong>
                    <span>{review.meta}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="system-section">
          <div className="wrap system-grid">
            <div>
              <div className="eyebrow"><span /> DIGITAL PLATFORM</div>
              <h2>NOT JUST A<br />MARKETING SITE.</h2>
              <p>The same platform can support member registration, staff login, attendance and check-in workflows as the business grows.</p>
            </div>
            <div className="system-list">
              <Link to="/join"><span>01</span><b>Member registration</b><em>↗</em></Link>
              <Link to="/login"><span>02</span><b>Staff access</b><em>↗</em></Link>
              <div><span>03</span><b>Attendance & check-in ready</b><em>+</em></div>
              <div><span>04</span><b>Lead management ready</b><em>+</em></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-image" />
          <div className="wrap contact-grid">
            <div className="contact-card">
              <div className="eyebrow"><span /> VISIT THE CORE</div>
              <h2>FIND YOUR<br />NEXT LEVEL.</h2>
              <div className="contact-details">
                <div><span>ADDRESS</span><p>No. 73, 2/1 Templers Road,<br />Dehiwala-Mount Lavinia 10400</p></div>
                <div><span>PHONE</span><p>+94 75 160 6842</p></div>
                <div><span>WEEKDAYS</span><p>05:00 — 23:00</p></div>
              </div>
              <div className="contact-actions">
                <a href="tel:+94751606842" className="btn btn-primary">CALL NOW</a>
                <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="btn btn-outline">GET DIRECTIONS</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="logo-mark">C</span>
              <div><strong>THE CORE <b>2.0</b></strong><span>TRAIN · PROGRESS · REPEAT</span></div>
            </div>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#facilities">Facilities</a>
              <a href="#memberships">Memberships</a>
              <a href="#trial">Book a Trial</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 The Core 2.0</span>
            <span>Concept website / digital platform proposal</span>
          </div>
        </div>
      </footer>

      <a
        href={waLink("Hi The Core 2.0, I'm interested in joining the gym. Could you send me your membership details?")}
        target="_blank"
        rel="noreferrer"
        className="floating-wa"
        aria-label="Chat on WhatsApp"
      >
        <span>WA</span>
        <b>CHAT WITH US</b>
      </a>
    </div>
  );
}
