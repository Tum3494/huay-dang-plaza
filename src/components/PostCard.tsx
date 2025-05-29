
import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Heart, Share2, MessageCircle, Eye, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  comments: Comment[];
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onCommentLike: (commentId: string) => void;
  onDeletePost?: (postId: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  comments,
  onLike,
  onShare,
  onComment,
  onCommentLike,
  onDeletePost,
  onDeleteComment,
}) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && user) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const canInteract = user && user.role !== 'guest';
  const isAdmin = user?.role === 'admin';

  return (
    <Card className="mb-6 shadow-lg border-l-4 border-l-cyan-500 hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-cyan-800 text-xl mb-2">{post.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="font-medium">โดย: {post.author}</span>
              <span>{formatDistanceToNow(post.createdAt, { addSuffix: true, locale: th })}</span>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.views}</span>
              </div>
            </div>
          </div>
          {isAdmin && onDeletePost && (
            <Button
              onClick={() => onDeletePost(post.id)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>
        
        <div className="flex items-center space-x-4 mb-4 pt-4 border-t border-gray-200">
          <Button
            onClick={() => canInteract && onLike(post.id)}
            variant="ghost"
            size="sm"
            disabled={!canInteract}
            className={`flex items-center space-x-2 ${
              user && post.likedBy.includes(user.id) ? 'text-red-600' : 'text-gray-600'
            } ${!canInteract ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-600'}`}
          >
            <Heart className={`h-5 w-5 ${user && post.likedBy.includes(user.id) ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </Button>
          
          <Button
            onClick={() => canInteract && onShare(post.id)}
            variant="ghost"
            size="sm"
            disabled={!canInteract}
            className={`flex items-center space-x-2 ${
              !canInteract ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Share2 className="h-5 w-5" />
            <span>{post.shares}</span>
          </Button>
          
          <Button
            onClick={() => setShowComments(!showComments)}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{comments.length}</span>
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {canInteract && (
              <form onSubmit={handleComment} className="mb-4">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="แสดงความคิดเห็น..."
                  className="mb-2 border-cyan-200 focus:border-cyan-500"
                  rows={3}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="bg-cyan-600 hover:bg-cyan-700"
                  disabled={!commentText.trim()}
                >
                  โพสต์ความคิดเห็น
                </Button>
              </form>
            )}
            
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-cyan-800">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: th })}
                      </span>
                    </div>
                    {isAdmin && onDeleteComment && (
                      <Button
                        onClick={() => onDeleteComment(comment.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <Button
                    onClick={() => canInteract && onCommentLike(comment.id)}
                    variant="ghost"
                    size="sm"
                    disabled={!canInteract}
                    className={`flex items-center space-x-1 text-xs ${
                      user && comment.likedBy.includes(user.id) ? 'text-red-600' : 'text-gray-500'
                    } ${!canInteract ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-600'}`}
                  >
                    <Heart className={`h-3 w-3 ${user && comment.likedBy.includes(user.id) ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
