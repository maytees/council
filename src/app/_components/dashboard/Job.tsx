"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { BookmarkPlus, Flag, MoreVertical, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type JobProps = {
  id: string;
  name: string;
  shortDesc: string;
  company: string;
  icon: string;
  applicationUrl: string;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
};

const Job = ({ id, name, shortDesc, company, icon, applicationUrl, showDelete, onDelete }: JobProps) => {
  const deleteJob = api.jobs.deleteJob.useMutation();

  const handleDelete = async () => {
    if (!onDelete) return;
    try {
      await deleteJob.mutateAsync({ jobId: id });
      onDelete(id);
    } catch (error: unknown) {
      console.error('Failed to delete job:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="flex h-auto w-full flex-col justify-between rounded-2xl border px-3 py-3 shadow-md hover:cursor-pointer md:my-2 md:h-[16rem] md:w-[40rem] md:px-5 md:py-4">
      <div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 flex-row items-start justify-between">
            <div className="flex flex-row gap-2">
              <Link href={`/company/${id}`}>
                <Image
                  src={icon}
                  alt={company}
                  className="h-12 w-12 rounded-full md:h-[50px] md:w-[50px]"
                  height={50}
                  width={50}
                />
              </Link>
              <div className="flex flex-col items-start">
                <Link href={`/jobs/${id}`} className="hover:underline">
                  <h1 className="text-lg font-bold md:text-xl">{name}</h1>
                </Link>
                <Link href={`/company/${id}`} className="hover:underline">
                  <h2 className="text-sm font-normal text-muted-foreground md:text-base">
                    {company}
                  </h2>
                </Link>
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
        <div className="text-sm text-muted-foreground">
          {shortDesc}
        </div>
      </div>
      <div className="mt-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0 md:mt-0">
        <p className="text-xs font-light text-muted-foreground md:text-sm">
          Posted recently
        </p>
        <div className="flex w-full flex-row items-end justify-end gap-2 sm:w-auto md:gap-3">
          {showDelete && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="px-3"
            >
              Delete
            </Button>
          )}
          <Button variant="link" asChild>
            <Link href={`/company/${id}`}>Contact</Link>
          </Button>
          <Button asChild>
            <Link href={applicationUrl} target="_blank">
              Apply
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
