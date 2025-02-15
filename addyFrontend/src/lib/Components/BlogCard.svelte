<!-- src/lib/components/BlogCard.svelte -->
<script>
    export let blog;

    console.log(blog)

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    $: excerpt = blog.summary.length > 150 
        ? `${blog.summary.slice(0, 150)}...` 
        : blog.summary;
</script>

<article 
    class="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 ease
           border border-gray-100 hover:border-gray-200 overflow-hidden"
>
    <div class="absolute inset-0 bg-gradient-to-br from-[#F41952]/5 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-500"></div>

    <div class="relative p-8 flex flex-col h-full">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
            {#each blog.tags.slice(0, 3) as tag}
                <span 
                    class="px-4 py-1.5 bg-gray-50 text-gray-600 text-xs tracking-wide font-medium rounded-full
                           hover:bg-[#F41952]/5 hover:text-[#F41952] transition-all duration-300"
                >
                    {tag}
                </span>
            {/each}
            {#if blog.tags.length > 3}
                <span class="px-3 py-1.5 text-gray-400 text-xs font-medium">
                    +{blog.tags.length - 3}
                </span>
            {/if}
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-gray-900 mb-4 leading-tight tracking-tight
                   group-hover:text-[#F41952] transition-colors duration-300">
            <a href="/blogs/{blog.slug}" class="block">
                {blog.title}
            </a>
        </h2>

        <!-- Summary -->
        <p class="text-gray-600 leading-relaxed mb-8 flex-grow">
            {excerpt}
        </p>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-6 border-t border-gray-100">
            <time 
                class="text-sm text-gray-500 font-medium" 
                datetime={blog.publishedDate}
            >
                {formatDate(blog.publishedDate)}
            </time>

            <a 
                href="/blogs/{blog.slug}"
                class="inline-flex items-center text-[#F41952] font-semibold text-sm 
                       hover:text-[#F41952]/80 transition-colors duration-300 group/link"
            >
                Read article
                <svg 
                    class="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </a>
        </div>
    </div>
</article>

<style>
    article {
        will-change: transform;
    }

    article:hover {
        transform: translateY(-2px);
    }
</style>