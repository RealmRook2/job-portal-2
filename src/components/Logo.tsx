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
    <div className={`flex flex-col items-start gap-0.5 ${className}`}>
      {/* ACE Logo Image */}
      <div className="flex items-center">
        <img
          src={logoImage}
          alt="ACE FINS TECH"
          className={`${variant === "compact" ? "h-14" : variant === "full" ? "h-24" : "h-16"} w-auto object-contain`}
          style={{
            imageRendering: 'auto',
            WebkitImageRendering: 'auto',
            filter: 'contrast(1.2) brightness(1.05)',
          }}
        />
      </div>
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

