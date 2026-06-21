import React from 'react';
import { motion } from 'framer-motion';
import FeaturedPostCard from './featured-post-card';
import LatestPostCard from './latest-post-card';
import { Post } from '../types/post-type';

interface BlogFeedProps {
  type: 'featured' | 'latest';
  isLoading?: boolean;
}

const BlogFeed: React.FC<BlogFeedProps> = ({ type, isLoading }) => {
  // Mock data - replace with actual API call
  const posts: Post[] = [
    {
      id: '1',
      title: 'Hidden Gems of Bali',
      excerpt: 'Discover the secret beaches and temples of Bali...',
      category: 'Beach',
      image: '/api/placeholder/400/300',
      date: '2024-01-15',
      author: 'Sarah Wanderer',
    },
    // Add more posts
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-xl" />
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          {type === 'featured' ? (
            <FeaturedPostCard post={post} />
          ) : (
            <LatestPostCard post={post} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default BlogFeed;
