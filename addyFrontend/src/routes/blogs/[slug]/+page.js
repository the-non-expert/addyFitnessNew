import { error } from '@sveltejs/kit';
import { getBlogBySlug } from '$lib/stores/BlogData';

export function load({ params }) {
    const blog = getBlogBySlug(params.slug);
    
    if (!blog) {
        throw error(404, {
            message: 'Blog post not found'
        });
    }
    
    return {
        blog
    };
}