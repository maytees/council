import AvatarCircles from "@/components/ui/avatar-circles";
import { Button } from "@/components/ui/button";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import SlideText from "@/components/ui/slide-text";
import SlideWrapper from "@/components/ui/slide-wrapper";
import WordPullUp from "@/components/ui/word-pull-up";
import { Search } from "lucide-react";
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
    <div className="mt-28 flex min-h-96 w-screen flex-col items-center justify-end">
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:w-[29rem] md:text-5xl md:leading-[3rem]"
        words="Student opportunities powered with AI"
      />
      <SlideText
        delay={1}
        text="Council helps schools manage and share job opportunities with students.  Simple, organized, and effective."
        className="mt-4 text-center text-xl font-light text-black dark:text-white md:w-[29rem] md:text-xl"
      />
      <SlideWrapper delay={1.5} className="mt-5">
        <Button size={"lg"} asChild>
          <Link href={"/auth/signin"}>
            <Search className="" size={20} />
            Find your school
          </Link>
        </Button>
      </SlideWrapper>
      <SlideWrapper delay={2} className="mt-5">
        <AvatarCircles className="" numPeople={99} avatarUrls={avatars} />
      </SlideWrapper>
      <SlideText
        delay={2.5}
        direction="right"
        className="w-48 text-center text-sm font-extralight"
        text={"Join hundreds of other students using council"}
      />
      <SlideWrapper delay={3} className="relative mt-10 size-[60rem]">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
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