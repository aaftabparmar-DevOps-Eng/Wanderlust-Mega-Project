import React, { useState, useEffect } from 'react';
import Hero from '../components/hero';
import BlogFeed from '../components/blog-feed';
import { motion } from 'framer-motion';
import { FaCompass, FaGlobe, FaMountain, FaBeach, FaCity, FaForest } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const categories = [
    { name: 'Adventure', icon: FaMountain, color: 'from-orange-500 to-red-500' },
    { name: 'Beach', icon: FaBeach, color: 'from-blue-500 to-cyan-500' },
    { name: 'City Life', icon: FaCity, color: 'from-purple-500 to-pink-500' },
    { name: 'Nature', icon: FaForest, color: 'from-green-500 to-emerald-500' },
    { name: 'Culture', icon: FaGlobe, color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-10 blur-3xl animate-pulse delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section - Enhanced */}
        <Hero />
      </motion.div>

      {/* Discover by Topic - New Enhanced Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover by Topic
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Explore stories from every corner of the world
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br ${category.color} p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
              <category.icon className="text-white text-4xl mb-3 mx-auto" />
              <h3 className="text-white font-semibold text-center text-sm">
                {category.name}
              </h3>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Posts - Enhanced */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              ✨ Featured Posts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Handpicked stories for your next adventure
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            View All →
          </motion.button>
        </div>
        <BlogFeed type="featured" isLoading={isLoading} />
      </section>

      {/* What's New - Latest Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              🔥 What's New?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Latest travel stories from our community
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            See All
          </motion.button>
        </div>
        <BlogFeed type="latest" isLoading={isLoading} />
      </section>
    </div>
  );
};

export default HomePage;
