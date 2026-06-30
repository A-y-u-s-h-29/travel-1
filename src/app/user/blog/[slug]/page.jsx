'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Link2,
  MessageCircle,
  Eye
} from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching blog with slug:', slug);
        const response = await fetch(`/api/blogs/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error(`Failed to fetch blog post (Status: ${response.status})`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        
        if (result.success && result.data) {
          setPost(result.data);
          setViewCount(result.data.views || 0);
        } else {
          throw new Error(result.error || 'Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const renderContent = () => {
    if (!post?.bodyJson) return null;
    
    try {
      let content = post.bodyJson;
      if (typeof content === 'string') {
        content = JSON.parse(content);
      }
      
      if (content.html) {
        return <div dangerouslySetInnerHTML={{ __html: content.html }} />;
      }
      
      if (content.blocks) {
        return content.blocks.map((block, index) => {
          switch (block.type) {
            case 'paragraph':
              return <p key={index} className="mb-4">{block.data.text}</p>;
            case 'header':
              const HeadingTag = `h${block.data.level}`;
              return <HeadingTag key={index} className="mt-8 mb-4 font-bold">{block.data.text}</HeadingTag>;
            case 'list':
              const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
              return (
                <ListTag key={index} className="mb-4 pl-6">
                  {block.data.items.map((item, idx) => (
                    <li key={idx} className="mb-1">{item}</li>
                  ))}
                </ListTag>
              );
            case 'image':
              return (
                <div key={index} className="relative w-full h-64 my-4">
                  <Image
                    src={block.data.file.url}
                    alt={block.data.caption || ''}
                    fill
                    className="object-cover rounded-lg"
                  />
                  {block.data.caption && (
                    <p className="text-center text-sm text-gray-500 mt-2">{block.data.caption}</p>
                  )}
                </div>
              );
            case 'quote':
              return (
                <blockquote key={index} className="border-l-4 border-orange-500 pl-4 my-4 italic">
                  <p>{block.data.text}</p>
                  {block.data.caption && (
                    <footer className="text-sm text-gray-500 mt-2">— {block.data.caption}</footer>
                  )}
                </blockquote>
              );
            default:
              return null;
          }
        });
      }
      
      if (typeof content === 'string') {
        return <p>{content}</p>;
      }
      
      return <pre>{JSON.stringify(content, null, 2)}</pre>;
    } catch (error) {
      console.error('Error rendering content:', error);
      return <p>Error rendering content</p>;
    }
  };

  // ── Loading State ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4" />
          <p className="text-gray-500 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  // ── Error State ──
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Article not found</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/user/blog">
              <button className="px-6 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium w-full">
                Browse all articles
              </button>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium w-full"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── No post ──
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No content available</h3>
          <Link href="/user/blog">
            <button className="mt-4 px-6 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Render ──
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mt-10 text-gray-500 hover:text-orange-600 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* ── Header ── */}
        <header className="mb-10">
          {/* Category badge */}
          {post.category && (
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            {post.authorName && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-400" />
                {post.authorName}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-400" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readingTimeMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-400" />
                {post.readingTimeMinutes} min read
              </span>
            )}
            {viewCount > 0 && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-orange-400" />
                {viewCount.toLocaleString()} views
              </span>
            )}
          </div>

          {/* Cover Image */}
          {post.coverImageUrl && (
            <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden bg-gray-100 mb-6 shadow-lg">
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Action bar */}
          <div className="flex flex-wrap items-center justify-between border-y border-gray-200 py-3 gap-3">
            <div className="flex items-center gap-2">
              {/* Like */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </button>

              {/* Bookmark */}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isBookmarked ? 'bg-orange-50 text-orange-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-orange-500' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Share */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all text-sm font-medium"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {showShareMenu && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)} />
                  <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[200px] z-20">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 rounded-xl transition-colors text-blue-600 text-sm font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">f</span>
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 rounded-xl transition-colors text-slate-700 text-sm font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">𝕏</span>
                      Twitter / X
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 rounded-xl transition-colors text-blue-700 text-sm font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">in</span>
                      LinkedIn
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      onClick={() => { handleShare('copy'); setShowShareMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-600 text-sm font-medium"
                    >
                      <Link2 className="w-4 h-4 flex-shrink-0" />
                      Copy link
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── Body Content ── */}
        <div className="prose prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:font-bold
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-ul:text-gray-700 prose-ol:text-gray-700
          prose-blockquote:border-orange-500 prose-blockquote:text-gray-600
          prose-img:rounded-xl prose-img:shadow-md
          prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded
        ">
          {renderContent()}
        </div>

        {/* ── Tags ── */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
              <Tag className="w-3.5 h-3.5" />
              Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  href={`/user/blog?tag=${tag}`}
                  className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm hover:bg-orange-100 hover:text-orange-600 transition-colors font-medium"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

     
      </article>
    </div>
  );
}