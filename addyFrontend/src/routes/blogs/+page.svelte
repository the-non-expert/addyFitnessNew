<!-- src/routes/blog/+page.svelte -->
<script>
    import BlogCard from '$lib/Components/BlogCard.svelte';
    import { blogs } from '$lib/stores/BlogData';
</script>

<!-- Main blog page container -->
<div class="max-w-[1400px] mx-auto px-4 sm:px-6 py-16">
    <!-- Blog title section -->
    <div class="text-center max-w-2xl mx-auto mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p class="text-lg text-gray-600">Expert insights on fitness, health, and wellness</p>
    </div>

    <!-- Two-column blog grid -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each blogs as blog}
            <BlogCard {blog} />
        {/each}
    </div>
</div>
