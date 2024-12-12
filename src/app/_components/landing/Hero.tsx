import AvatarCircles from "@/components/ui/avatar-circles";
import { Button } from "@/components/ui/button";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import SlideText from "@/components/ui/slide-text";
import SlideWrapper from "@/components/ui/slide-wrapper";
import WordPullUp from "@/components/ui/word-pull-up";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/160088005",
    profileUrl: "https://github.com/cooperg28",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/88842870",
    profileUrl: "https://github.com/maytees",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/178240637",
    profileUrl: "https://github.com/SrM609",
  },
];

const Hero = () => {
  return (
    <div className="relative mt-28 flex min-h-96 w-screen flex-col items-center justify-end z-10">
      <WordPullUp
        className="relative z-10 text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:w-[29rem] md:text-5xl md:leading-[3rem]"
        words="Student opportunities powered by AI"
      />
      <SlideText
        delay={0.5}
        text="Council helps schools manage and share job opportunities with students.  Simple, organized, and effective."
        className="relative z-10 mt-4 text-center text-xl font-light text-black dark:text-white md:w-[29rem] md:text-xl"
      />
      <SlideWrapper delay={0.8} className="relative z-10 mt-5">
        <Button size={"lg"} asChild>
          <Link href={"/auth/signin"}>
            Get started
            <ArrowRight />
          </Link>
        </Button>
      </SlideWrapper>
      <SlideWrapper delay={1} className="relative z-10 mt-5">
        <AvatarCircles className="" numPeople={99} avatarUrls={avatars} />
      </SlideWrapper>
      <SlideText
        delay={1}
        direction="right"
        className="relative z-10 w-48 text-center text-sm font-extralight"
        text={"Join hundreds of other students using council"}
      />
      <SlideWrapper
        delay={1}
        duration={1.5}
        className="relative z-10 mt-10 w-full max-w-[60rem] px-4 md:px-8"
      >
        <HeroVideoDialog
          className="block w-full dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden w-full dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </SlideWrapper>
    </div>
  );
};

export default Hero;
