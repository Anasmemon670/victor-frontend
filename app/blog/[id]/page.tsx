"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { blogPosts, featuredPost } from "@/data/blogPosts";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion } from "motion/react";

export default function BlogPostDetail() {
    const params = useParams();
    const router = useRouter();

    // Combine all posts to search
    const allPosts = [featuredPost, ...blogPosts];
    const post = allPosts.find((p) => p.id.toString() === params?.id);

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <p>Post not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </button>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <header className="mb-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Data */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image - Reduced Size */}
                    <div className="relative h-64 md:h-80 w-full max-w-2xl mx-auto rounded-2xl overflow-hidden mb-12 border border-slate-800 shadow-xl">
                        <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                        {/* Using dangerouslySetInnerHTML assuming content is trusted static HTML from our data file */}
                        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                    </div>
                </motion.article>
            </div>
        </div>
    );
}
