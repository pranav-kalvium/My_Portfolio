const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5 mt-40">
      <div className="text-white-500 flex gap-2">
        <a
          className="flex gap-2"
          href="https://github.com/pranav-kalvium"
        >
          <p>Terms & Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </a>
      </div>

      <div className="flex gap-3">
        <a href="https://github.com/pranav-kalvium">
          <div className="social-icon">
            <img
              src="/assets/github.svg"
              alt="github"
              className="w-1/2 h-1/2"
            />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/pranav-prakash6410/">
          <div className="social-icon">
            <img
              src="/assets/linkedin.png"
              alt="linkedin"
              className="w-1/2 h-1/2"
            />
          </div>
        </a>
        <a href="https://www.instagram.com/not.stonesea/">
          <div className="social-icon">
            <img
              src="/assets/instagram.svg"
              alt="instagram"
              className="w-1/2 h-1/2"
            />
          </div>
        </a>
      </div>

      <p className="text-white-500">
        © 2025 Pranav Prakash. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
