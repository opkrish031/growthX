import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-[#080810] pt-24 pb-20">
      {/* Hero Skeleton */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <div className="w-40 h-8 bg-[#6C63FF]/5 rounded-full mb-6 animate-pulse" />
          <div className="w-3/4 max-w-2xl h-16 md:h-20 bg-[#6C63FF]/5 rounded-xl mb-6 animate-pulse" />
          <div className="w-1/2 max-w-lg h-6 bg-[#6C63FF]/5 rounded mb-12 animate-pulse" />
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
