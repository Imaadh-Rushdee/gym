import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="wrap">
        <nav className="site-nav">
          <Link to="/" className="logo" onClick={close} aria-label="The Core 2.0 home">
            <span className="logo-mark">C</span>
            <span className="logo-type">THE CORE <b>2.0</b></span>
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>

          <div className={`nav-links ${open ? "open" : ""}`}>
            <a href="/#about" onClick={close}>About</a>
            <a href="/#facilities" onClick={close}>Facilities</a>
            <a href="/#memberships" onClick={close}>Memberships</a>
            <a href="/#reviews" onClick={close}>Reviews</a>
            <a href="/#contact" onClick={close}>Contact</a>
            <Link to="/login" onClick={close}>Staff</Link>
          </div>

          <a href="/#trial" className="btn btn-primary btn-sm desktop-cta">BOOK A TRIAL</a>
        </nav>
      </div>
    </header>
  );
}
