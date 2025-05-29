
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Post, Comment, User } from '../types';
import { Trash2, UserX, UserCheck } from 'lucide-react';

interface AdminPanelProps {
  posts: Post[];
  comments: Comment[];
  onDeletePost: (postId: string) => void;
  onDeleteComment: (commentId: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  posts,
  comments,
  onDeletePost,
  onDeleteComment,
}) => {
  const [activeSection, setActiveSection] = useState<'posts' | 'comments' | 'users'>('posts');

  // Mock users data for admin panel
  const mockUsers: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '2',
      username: 'member1',
      email: 'member1@example.com',
      role: 'member',
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '3',
      username: 'member2',
      email: 'member2@example.com',
      role: 'member',
      isActive: false,
      createdAt: new Date()
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-l-4 border-l-red-500">
        <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
          <CardTitle className="text-red-800 flex items-center space-x-2">
            <span>⚙️</span>
            <span>ระบบจัดการ Admin</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex space-x-2 mb-6">
            <Button
              onClick={() => setActiveSection('posts')}
              variant={activeSection === 'posts' ? 'default' : 'outline'}
              className={activeSection === 'posts' ? 'bg-red-600' : ''}
            >
              จัดการกระทู้
            </Button>
            <Button
              onClick={() => setActiveSection('comments')}
              variant={activeSection === 'comments' ? 'default' : 'outline'}
              className={activeSection === 'comments' ? 'bg-red-600' : ''}
            >
              จัดการความคิดเห็น
            </Button>
            <Button
              onClick={() => setActiveSection('users')}
              variant={activeSection === 'users' ? 'default' : 'outline'}
              className={activeSection === 'users' ? 'bg-red-600' : ''}
            >
              จัดการสมาชิก
            </Button>
          </div>

          {activeSection === 'posts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">กระทู้ทั้งหมด ({posts.length})</h3>
              {posts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">ยังไม่มีกระทู้</p>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{post.title}</h4>
                      <div className="flex items-center space-x-3 mt-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-gray-600">โดย: {post.author}</span>
                        <span className="text-sm text-gray-500">👀 {post.views} ครั้ง</span>
                        <span className="text-sm text-gray-500">❤️ {post.likes}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => onDeletePost(post.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === 'comments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">ความคิดเห็นทั้งหมด ({comments.length})</h3>
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">ยังไม่มีความคิดเห็น</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start justify-between bg-gray-50 p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-800">{comment.author}</span>
                        <span className="text-sm text-gray-500">❤️ {comment.likes}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                    </div>
                    <Button
                      onClick={() => onDeleteComment(comment.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === 'users' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">สมาชิกทั้งหมด ({mockUsers.length})</h3>
              {mockUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-800">{user.username}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <Badge variant={user.isActive ? 'default' : 'outline'}>
                        {user.isActive ? 'ใช้งานได้' : 'ถูกระงับ'}
                      </Badge>
                    </div>
                  </div>
                  {user.role !== 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className={user.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}
                    >
                      {user.isActive ? (
                        <>
                          <UserX className="h-4 w-4 mr-2" />
                          ระงับ
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-2" />
                          เปิดใช้
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
