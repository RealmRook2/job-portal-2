import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

interface LogoProps {
  variant?: "default" | "compact" | "full";
  showText?: boolean;
  className?: string;
  linkTo?: string;
}

const Logo = ({ variant = "default", showText = true, className = "", linkTo }: LogoProps) => {
  const logoContent = (
    <div className={`flex items-center ${className}`}>
      {/* ACE Logo Image */}
      <img
        src={logoImage}
        alt="ACE FINS TECH"
        className={`${variant === "compact" ? "h-12" : variant === "full" ? "h-24" : "h-12"} w-auto object-contain`}
        style={{
          imageRendering: 'auto',
          WebkitImageRendering: 'auto',
          filter: 'contrast(1.2) brightness(1.05)',
          maxHeight: '100%',
        }}
      />
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default Logo;

