import React from "react";

function Footer() {
  return (
    <footer className="text-light">
      <div className="footer__center">
        <div>Joshua Ellis</div>
          <div className="footer__center__social-links d-inline-flex">
            <a
              href="https://github.com/jellis21"
              className="github"
              target="blank"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/joshua-ellis-cpcu-51180a32"
              className="linkedin"
              target="blank"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://facebook.com/joshua.ellis.338"
              className="facebook"
              target="blank"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
