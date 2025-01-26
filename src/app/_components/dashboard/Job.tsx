import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BookmarkPlus, Flag, MoreVertical, Share2 } from "lucide-react";
import Image from "next/image";

export type JobType = {
  name: string;
  desc: string;
  company: string;
  icon: string;
};

const Job = ({ name, desc, company, icon }: JobType) => {
  return (
    <div className="my-3 md:my-5 flex h-auto md:h-[16rem] w-full md:w-[40rem] flex-col justify-between rounded-2xl border px-3 md:px-5 py-3 md:py-4 shadow-md hover:cursor-pointer">
      <div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-1 flex-row justify-between items-start">
            <div className="flex flex-row gap-2">
              <Image
                src={icon}
                alt={company}
                className="rounded-full w-12 h-12 md:w-[50px] md:h-[50px]"
                height={50}
                width={50}
              />
              <div className="flex flex-col items-start">
                <h1 className="text-lg md:text-xl font-bold">{name}</h1>
                <h2 className="text-sm md:text-base font-normal text-muted-foreground">
                  {company}
                </h2>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save Job
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Job
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Flag className="mr-2 h-4 w-4" />
                  Report Job Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="my-2" />
        <div>
          <p className="text-sm md:text-base font-light">{desc}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mt-3 md:mt-0">
        <p className="text-xs md:text-sm font-light text-muted-foreground">
          148k+ have applied
        </p>
        <div className="flex flex-row items-end justify-end gap-2 md:gap-3 w-full sm:w-auto">
          <Button variant={"link"} className="text-sm md:text-base">Contact</Button>
          <Button className="text-sm md:text-base">Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
