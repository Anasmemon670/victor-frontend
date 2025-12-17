"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { blogAPI } from "@/lib/api";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export default function BlogPostDetail() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!params?.id) return;

            try {
                setLoading(true);
                setError(null);
                const response = await blogAPI.getById(params.id as string);
                setPost(response.post);
            } catch (err: any) {
                console.error('Error fetching blog post:', err);
                setError(err.response?.data?.error || 'Failed to load blog post');
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [params?.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error || 'Post not found'}</p>
                    <button
                        onClick={() => router.push('/blog')}
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 py-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/blog')}
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
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Data */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featuredImage && (
                        <div className="relative h-64 md:h-80 w-full max-w-2xl mx-auto rounded-2xl overflow-hidden mb-12 border border-slate-800 shadow-xl">
                            <ImageWithFallback
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                    </div>
                </motion.article>
            </div>
        </div>
    );
}
