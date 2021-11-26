import React from "react";

import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";

const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="footer-row">
          <div className="logo-images">
            <a href="https://github.com/jorgeHerrando" target="_blank">
              <img className="github-logo" alt="github" src={github} />
            </a>
            <a
              href="https://www.linkedin.com/in/jorgeherrando/"
              target="_blank"
            >
              <img className="linkedin-logo" alt="linkedin" src={linkedin} />
            </a>
          </div>

          <div>© 2021 Jorge Herrando | Fullstack Developer</div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
