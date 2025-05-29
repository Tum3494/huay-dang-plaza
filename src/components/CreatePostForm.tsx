
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface CreatePostFormProps {
  category: 'เลขเด็ด' | 'สถิติ';
  onSubmit: (title: string, content: string) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ category, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <Card className="mb-6 shadow-lg border-l-4 border-l-yellow-500">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardTitle className="text-cyan-800 flex items-center space-x-2">
          <span>✍️</span>
          <span>สร้างกระทู้ใหม่ - {category}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="หัวข้อกระทู้..."
            className="border-cyan-200 focus:border-cyan-500"
            required
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="เนื้อหากระทู้..."
            className="border-cyan-200 focus:border-cyan-500 min-h-[120px]"
            required
          />
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 font-medium"
            disabled={!title.trim() || !content.trim()}
          >
            ✨ เผยแพร่กระทู้
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
