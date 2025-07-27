import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { User, MessageCircle, ThumbsUp, Share2, AlertCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. It may have been deleted or does not exist.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      setLiking(true);
      const response = await axios.put(`/api/posts/${id}/like`);
      setPost(response.data);
    } catch (err) {
      console.error('Error liking post:', err);
    } finally {
      setLiking(false);
    }
  };

  const hasLiked = post?.likes?.includes(user?._id);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!comment.trim()) return;
    try {
      setSubmittingComment(true);
      const response = await axios.post(`/api/posts/${id}/comments`, { content: comment });
      setPost(response.data);
      setComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-red-700">{error || 'Post not found'}</p>
          </div>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Return to home page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        <img 
          src={post.image || 'https://via.placeholder.com/1200x400?text=Blog+Post'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">{post.author?.name || 'Unknown Author'}</p>
                  <p className="text-sm text-gray-300">Author</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              <div className="flex flex-wrap items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <button 
                    onClick={handleLike}
                    disabled={liking}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                      hasLiked 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp className={`h-5 w-5 ${hasLiked ? 'fill-blue-700' : ''}`} />
                    <span>{post.likes?.length || 0}</span>
                  </button>

                  <button 
                    onClick={() => document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments?.length || 0}</span>
                  </button>

                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            <div id="comments-section" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>
              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded p-2 mb-2"
                  rows="3"
                  placeholder="Write your comment..."
                ></textarea>
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {submittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {post.comments && post.comments.length > 0 ? (
                post.comments.map((c) => (
                  <div key={c._id} className="mb-4 p-4 border rounded">
                    <div className="flex items-center mb-2">
                      <User className="h-5 w-5 mr-2" />
                      <span className="font-semibold">
                        {c.user?.name || 'Unknown User'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {formatDistanceToNow(new Date(c.createdAt))} ago
                      </span>
                    </div>
                    <p>{c.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
