'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Filter,
  X,
  BookOpen,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Award,
  Zap,
  MessageCircle,
  Compass
} from 'lucide-react';

// Premium Blog Card Component
const BlogCard = ({ blog, index }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group relative">
      <Link href={`/user/blog/${blog.slug}`}>
        <div 
          className={`
            relative rounded-4xl overflow-hidden 
            transition-all duration-500 
            h-full 
            group
            flex flex-col
          `}
          style={{
            animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s both`,
          }}
        >
          {/* Premium Subtle Border */}
          <div className="absolute inset-0 rounded-4xl pointer-events-none z-10" />
          
          {/* Image Container - Full width with slight zoom on hover */}
          <div className="relative w-full overflow-hidden flex-shrink-0 rounded-4xl">
            <div className="relative h-62 sm:h-70 md:h-86">
              {blog.coverImageUrl ? (
                <>
                  <Image
                    src={blog.coverImageUrl}
                    alt={blog.coverImageAlt || blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-4xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 3}
                    quality={85}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-white/30" />
                </div>
              )}
            </div>
          </div>

          {/* Content - Only Date and Title */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col">
            {/* Date - Clean minimal style */}
            {blog.publishedAt && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2.5 tracking-wide">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            )}

            {/* Title - Clean and prominent */}
            <h3 className="font-semibold text-gray-800 text-lg sm:text-xl leading-snug line-clamp-2 pop transition-colors duration-300">
              {blog.title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Main Blog Page
export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const categoryParam = searchParams.get('category') || '';
        setSelectedCategory(categoryParam);
        
        const url = new URL('/api/blogs', window.location.origin);
        if (categoryParam) {
          url.searchParams.append('category', categoryParam);
        }
        url.searchParams.append('status', 'PUBLISHED');
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          const publishedBlogs = result.data.filter(b => b.status === 'PUBLISHED');
          setBlogs(publishedBlogs);
          setTotalPosts(publishedBlogs.length);
          
          const catMap = {};
          publishedBlogs.forEach(blog => {
            if (blog.category) {
              catMap[blog.category] = (catMap[blog.category] || 0) + 1;
            }
          });
          setCategories(
            Object.entries(catMap).map(([name, count]) => ({ name, count }))
          );
          
          const sorted = [...publishedBlogs].sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );
          setRecentPosts(sorted.slice(0, 5));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Something went wrong');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchParams]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [blogs, searchTerm]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-orange-500/20 animate-pulse"></div>
          </div>
          <p className="mt-6 text-gray-500 font-medium">Loading amazing stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block p-6 bg-white rounded-full shadow-xl mb-6">
            <span className="text-5xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Unable to load articles</h3>
          <p className="text-gray-500 max-w-md mx-auto">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-orange-500/30 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50 pop">
      {/* Hero Image - 80vh */}
      <div className="relative w-full h-[60vh] sm:h-[80vh] md:h-[100vh] overflow-hidden">
        <Image
          src="/images/blog2.png"
          alt="Blog Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Overlay */}
           <div className="absolute inset-0 bg-black/20" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-4 sm:px-6 py-2 rounded-full shadow-lg border border-white/30 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              Travel Blog
            </span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold text-white leading-tight max-w-4xl">
            Discover Amazing{" "}
            <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
              Travel Blogs
            </span>
          </h1>

          <p className="text-white/90 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-light">
            Explore inspiring travel tales, expert tips, and destination guides crafted by passionate travelers.
          </p>

          {/* Search Bar in Hero */}
          <div className="mt-6 sm:mt-8 max-w-xl mx-auto w-full px-4">
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl px-3 sm:px-4 py-2.5 sm:py-3">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for travel stories..."
                className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-700 placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

       <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 sm:h-16 md:h-20"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path
              d="M0,40 C360,120 720,0 1080,60 C1260,90 1380,70 1440,50 L1440,120 L0,120 Z"
              fill="#ffffff"
              opacity="1"
            />
          </svg>
        </div>
      </div>

      {/* Main Content - Starts below hero */}
      <div className="max-w-7xl mx-auto  -mt-4 sm:-mt-6 md:-mt-8 relative z-10 mb-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Filter Chips */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      router.push('/user/blog');
                    }}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                      !selectedCategory
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5'
                        : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200/50'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        router.push(`/user/blog?category=${encodeURIComponent(cat.name)}`);
                      }}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                        selectedCategory === cat.name
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5'
                          : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200/50'
                      }`}
                    >
                      {cat.name}
                      <span className="ml-1 text-xs opacity-70">({cat.count})</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Blog Grid - 2 columns */}
              {filteredBlogs.length > 0 ? (
                <>
                  <div className={`grid ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1'
                  } gap-4 sm:gap-6`}>
                    {paginatedBlogs.map((blog, index) => (
                      <BlogCard key={blog._id} blog={blog} index={index} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:shadow-lg border border-gray-200/50'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <div className="flex gap-1 sm:gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200/50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:shadow-lg border border-gray-200/50'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 sm:py-16 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50">
                  <div className="inline-block p-4 sm:p-6 bg-orange-50 rounded-full mb-3 sm:mb-4">
                    <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No articles found</h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    {searchTerm 
                      ? `No results for "${searchTerm}"` 
                      : 'Check back soon for new travel stories'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                {/* Search */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-4 sm:p-5 mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-orange-500" />
                    Search Articles
                  </h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-8 sm:pr-10 bg-orange-50/50 text-black border border-orange-100 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                    />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Recent Posts */}
                {recentPosts.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-4 sm:p-5">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      Recent Posts
                    </h4>
                    <div className="space-y-3">
                      {recentPosts.map((post) => (
                        <Link
                          key={post._id}
                          href={`/user/blog/${post.slug}`}
                          className="group block p-2 rounded-xl hover:bg-orange-50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                              {post.coverImageUrl ? (
                                <Image
                                  src={post.coverImageUrl}
                                  alt={post.title}
                                  width={56}
                                  height={56}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-orange-400">
                                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-semibold text-gray-700 group-hover:text-orange-600 transition-colors line-clamp-2">
                                {post.title}
                              </h5>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {formatDate(post.publishedAt)}
                              </p>
                            </div>
                            <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
           
        </div>
      </div>

      {/* Global Styles with Animations */}
      <style jsx global>{`
        /* Fade In Up Animation for Blog Cards */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Gradient Animation for Text */
        @keyframes gradient {
          0% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
          100% { 
            background-position: 0% 50%; 
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }

        /* Slide Up Animation for H1 */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Fade In for Badge */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Fade In with Delay for Description */
        @keyframes fadeInDelay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-delay {
          animation: fadeInDelay 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }

        /* Optional: Add hover effect to the gradient text */
        .animate-gradient:hover {
          animation-duration: 1.5s;
          filter: brightness(1.2);
          transition: filter 0.3s ease;
        }
      `}</style>
    </div>
  );
}

// Helper function for formatting date in sidebar
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}