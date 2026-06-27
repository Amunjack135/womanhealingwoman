import instagramLogo from '../assets/instagram.png';
import womanhealingwomanLogo from '../assets/womanhealingwoman.png';

const Footer = () => {
  return (
    <footer className="border-t px-6 lg:px-12 pt-8 pb-6">
      {/* Logo + social row */}
      <div className="flex items-center justify-between mb-10">
        <img
          src={womanhealingwomanLogo}
          className="h-24 w-auto"
          alt="Woman Healing Woman Foundation Logo"
        />
        <a
          href="https://www.instagram.com/womanhealingwoman/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={instagramLogo}
            className="h-12 w-12"
            alt="Instagram"
          />
        </a>
      </div>

      {/* Bottom row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p>© 2026 Woman Healing Woman Foundation. All rights reserved.</p>
        <p>Empowering Women, Healing Communities</p>
        <p className='leading-normal text-xs'>Woman Healing Woman Foundation is a registered 501(c)(3) tax-exempt nonprofit organization. Donations are tax-deductible to the extent permitted by law.</p>
      </div>
    </footer>
  );
};

export default Footer;