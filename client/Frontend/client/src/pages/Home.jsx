import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';
import { Calendar, User, Eye, ArrowRight } from 'lucide-react';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [featuredData, recentData] = await Promise.all([
          postService.getAllPosts(1, 3),
          postService.getAllPosts(1, 6)
        ]);
        setFeaturedPosts(featuredData.posts || []);
        setRecentPosts(recentData.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to MERN Blog</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing stories, technical insights, and creative ideas from our community of writers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/posts"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Posts
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Posts</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {post.featuredImage && (
                    <img
                      src={`http://localhost:5000/uploads/${post.featuredImage}`}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Calendar size={16} className="mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="mx-2">•</span>
                      <Eye size={16} className="mr-1" />
                      <span>{post.viewCount} views</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <User size={16} className="mr-1" />
                        <span>{post.author?.name}</span>
                      </div>
                      <Link
                        to={`/posts/${post._id}`}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Read More
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Recent Posts</h2>
            <Link
              to="/posts"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Posts
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt || post.content.substring(0, 120)}...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author?.name}</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <Link
                  to={`/posts/${post._id}`}
                  className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of writers and start sharing your ideas with the world.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;