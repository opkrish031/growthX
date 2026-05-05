export default function BlogCardSkeleton() {
  return (
    <div className="bg-[#0E0E1A] border border-[#6C63FF]/15 rounded-2xl overflow-hidden h-full flex flex-col animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="aspect-video bg-[#6C63FF]/5" />

      {/* Card Body Skeleton */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="bg-[#6C63FF]/5 h-5 w-16 rounded-full" />
          <div className="bg-[#6C63FF]/5 h-5 w-20 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="bg-[#6C63FF]/5 h-6 w-full rounded" />
          <div className="bg-[#6C63FF]/5 h-6 w-3/4 rounded" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 flex-1">
          <div className="bg-[#6C63FF]/5 h-4 w-full rounded" />
          <div className="bg-[#6C63FF]/5 h-4 w-full rounded" />
          <div className="bg-[#6C63FF]/5 h-4 w-2/3 rounded" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-auto pt-4 border-t border-[#6C63FF]/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#6C63FF]/5" />
            <div className="bg-[#6C63FF]/5 h-3 w-20 rounded" />
          </div>
          <div className="bg-[#6C63FF]/5 h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
