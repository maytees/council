import DotPattern from "@/components/ui/dot-pattern";
import Bento from "./_components/landing/Bento";
import Hero from "./_components/landing/Hero";
import Pricing from "./_components/landing/Pricing";

const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center">
      <div className="absolute -top-20 h-screen w-full overflow-hidden">
        <div className="bg-gradient-radial absolute inset-0 from-transparent via-transparent to-background" />
        <DotPattern
          width={16}
          height={16}
          cx={1}
          cy={1}
          cr={1}
          className="-z-50"
          radial={true}
          fadeOut={true}
        />
      </div>
      <Hero />
      <Bento />
      <Pricing />
    </div>
  );
};

export default LandingPage;
