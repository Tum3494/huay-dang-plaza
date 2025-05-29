
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  isActive: boolean;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'เลขเด็ด' | 'สถิติ';
  authorId: string;
  author: string;
  createdAt: Date;
  likes: number;
  shares: number;
  views: number;
  likedBy: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
  likedBy: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
}
