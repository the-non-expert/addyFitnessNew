<!-- src/routes/blogs/[slug]/+page.svelte -->
<script>
    import { marked } from 'marked';
    import { getRelatedBlogs } from '$lib/stores/BlogData';

    export let data;
    const { blog } = data;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    $: relatedPosts = getRelatedBlogs(blog.slug, blog.tags);
    $: htmlContent = marked(blog.content);
</script>

<svelte:head>
    <title>{blog.title} | AddyFitness Blog</title>
    <meta name="description" content={blog.summary} />
</svelte:head>

<article class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
    <!-- Header -->
    <header class="text-center mb-16">
        <div class="flex flex-wrap justify-center gap-2 mb-6">
            {#each blog.tags as tag}
                <span class="px-4 py-1.5 bg-gray-50 text-gray-600 text-xs tracking-wide font-medium rounded-full">
                    {tag}
                </span>
            {/each}
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
        </h1>
        
        <time 
            class="text-gray-500 font-medium"
            datetime={blog.publishedDate}
        >
            {formatDate(blog.publishedDate)}
        </time>
    </header>

    <!-- Content -->
    <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#F41952] prose-a:no-underline hover:prose-a:text-[#F41952]/80">
        {@html htmlContent}
    </div>

    <!-- Related Posts -->
    {#if relatedPosts.length > 0}
        <div class="mt-20 pt-12 border-t border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {#each relatedPosts as post}
                    <a 
                        href="/blogs/{post.slug}"
                        class="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300
                               border border-gray-100 hover:border-gray-200 p-6"
                    >
                        <div class="flex flex-wrap gap-2 mb-3">
                            {#each post.tags.slice(0, 2) as tag}
                                <span class="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
                                    {tag}
                                </span>
                            {/each}
                        </div>

                        <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F41952] transition-colors">
                            {post.title}
                        </h3>
                        
                        <p class="text-gray-600 line-clamp-2">
                            {post.summary}
                        </p>
                    </a>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Back Link -->
    <div class="mt-16 text-center">
        <a 
            href="/blogs"
            class="inline-flex items-center text-[#F41952] font-semibold hover:text-[#F41952]/80 transition-colors"
        >
            <svg 
                class="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
            </svg>
            Back to all articles
        </a>
    </div>
</article>