import { cn } from "@/lib/utils";

export default function Icon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      className={cn("size-10", props.className)}
    >
      <foreignObject width="100%" height="100%" x="0" y="0">
        <div className="aspect-square">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[300px] bg-primary">
            <span className="h-[380px] w-[380px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="380"
                height="380"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-full w-full text-primary-foreground"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </span>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}
