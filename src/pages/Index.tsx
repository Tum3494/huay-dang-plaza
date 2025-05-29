
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';
import AdminPanel from '../components/AdminPanel';
import { Post, Comment } from '../types';
import { toast } from 'sonner';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'เลขเด็ด' | 'สถิติ' | 'admin'>('เลขเด็ด');
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Mock initial data
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'เลขเด็ดงวดนี้ 16/01/2567',
        content: 'เลขเด็ดประจำงวด: 123, 456, 789\n\nวิเคราะห์จากแนวทางหวยออนไลน์และสถิติย้อนหลัง\nแนะนำให้ซื้อ 2 ตัวล่าง และ 3 ตัวบน\n\nขอให้โชคดี! 🍀',
        category: 'เลขเด็ด',
        authorId: '1',
        author: 'admin',
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        likes: 15,
        shares: 8,
        views: 156,
        likedBy: []
      },
      {
        id: '2',
        title: 'สถิติหวยออก 5 งวดล่าสุด',
        content: 'งวด 16/01/67: 123456\nงวด 01/01/67: 987654\nงวด 16/12/66: 456789\nงวด 01/12/66: 321654\nงวด 16/11/66: 789123\n\nวิเคราะห์: เลข 1, 2, 3 ออกบ่อย ควรติดตาม!',
        category: 'สถิติ',
        authorId: '1',
        author: 'admin',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        likes: 23,
        shares: 12,
        views: 234,
        likedBy: []
      }
    ];

    const mockComments: Comment[] = [
      {
        id: '1',
        postId: '1',
        authorId: '2',
        author: 'member1',
        content: 'ขอบคุณครับ เลขดีมาก!',
        createdAt: new Date(Date.now() - 1000 * 60 * 15),
        likes: 3,
        likedBy: []
      },
      {
        id: '2',
        postId: '2',
        authorId: '3',
        author: 'member2',
        content: 'สถิตินี้น่าสนใจมาก ขอบคุณที่แชร์ข้อมูล',
        createdAt: new Date(Date.now() - 1000 * 60 * 45),
        likes: 5,
        likedBy: []
      }
    ];

    setPosts(mockPosts);
    setComments(mockComments);
  }, []);

  const createPost = (title: string, content: string) => {
    if (!user || user.role !== 'admin') {
      toast.error('เฉพาะ Admin เท่านั้นที่สามารถสร้างกระทู้ได้');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      category: activeTab as 'เลขเด็ด' | 'สถิติ',
      authorId: user.id,
      author: user.username,
      createdAt: new Date(),
      likes: 0,
      shares: 0,
      views: 0,
      likedBy: []
    };

    setPosts([newPost, ...posts]);
    toast.success('สร้างกระทู้สำเร็จ!');
  };

  const likePost = (postId: string) => {
    if (!user || user.role === 'guest') return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(user.id);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== user.id)
            : [...post.likedBy, user.id]
        };
      }
      return post;
    }));
  };

  const sharePost = (postId: string) => {
    if (!user || user.role === 'guest') return;

    setPosts(posts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
    toast.success('แชร์กระทู้แล้ว!');
  };

  const addComment = (postId: string, content: string) => {
    if (!user || user.role === 'guest') return;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      authorId: user.id,
      author: user.username,
      content,
      createdAt: new Date(),
      likes: 0,
      likedBy: []
    };

    setComments([...comments, newComment]);
    toast.success('แสดงความคิดเห็นแล้ว!');
  };

  const likeComment = (commentId: string) => {
    if (!user || user.role === 'guest') return;

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const isLiked = comment.likedBy.includes(user.id);
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          likedBy: isLiked 
            ? comment.likedBy.filter(id => id !== user.id)
            : [...comment.likedBy, user.id]
        };
      }
      return comment;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    setComments(comments.filter(comment => comment.postId !== postId));
    toast.success('ลบกระทู้แล้ว');
  };

  const deleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    toast.success('ลบความคิดเห็นแล้ว');
  };

  // Increment view count when user views posts
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(currentPosts => 
        currentPosts.map(post => ({
          ...post,
          views: post.views + Math.floor(Math.random() * 3)
        }))
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredPosts = activeTab === 'admin' ? posts : posts.filter(post => post.category === activeTab);
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <Header />
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdmin={isAdmin}
      />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'admin' && isAdmin ? (
          <AdminPanel
            posts={posts}
            comments={comments}
            onDeletePost={deletePost}
            onDeleteComment={deleteComment}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            {isAdmin && activeTab !== 'admin' && (
              <CreatePostForm
                category={activeTab}
                onSubmit={createPost}
              />
            )}
            
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    ยังไม่มีกระทู้ใน{activeTab}
                  </h3>
                  <p className="text-gray-500">
                    {isAdmin ? 'คุณสามารถสร้างกระทู้แรกได้เลย!' : 'รอ Admin สร้างกระทู้ใหม่'}
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    comments={comments.filter(comment => comment.postId === post.id)}
                    onLike={likePost}
                    onShare={sharePost}
                    onComment={addComment}
                    onCommentLike={likeComment}
                    onDeletePost={isAdmin ? deletePost : undefined}
                    onDeleteComment={isAdmin ? deleteComment : undefined}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gradient-to-r from-cyan-800 to-blue-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-yellow-300 mb-2">🎰 ทางนี้หวยดัง 🎰</h2>
          <p className="text-cyan-200">แหล่งรวมเลขเด็ดและสถิติหวยที่น่าเชื่อถือ</p>
          <div className="mt-4 text-sm text-cyan-300">
            <p>© 2024 ทางนี้หวยดัง - สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
