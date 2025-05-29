
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { User, Settings, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, login, logout, register } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginData.username, loginData.password);
    if (success) {
      setIsLoginOpen(false);
      setLoginData({ username: '', password: '' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(registerData.username, registerData.email, registerData.password);
    if (success) {
      setIsRegisterOpen(false);
      setRegisterData({ username: '', email: '', password: '' });
    }
  };

  return (
    <header className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-yellow-300 drop-shadow-lg">
              🔍 ส่องเลขเด็ด 🔍
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.username}</span>
                  {user.role === 'admin' && (
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                      ADMIN
                    </span>
                  )}
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  ออกจากระบบ
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      เข้าสู่ระบบ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>เข้าสู่ระบบ</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <Input
                        placeholder="ชื่อผู้ใช้"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="รหัสผ่าน"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <div className="text-sm text-gray-600">
                        <p>สำหรับ Admin: username = admin, password = 3494</p>
                        <p>สำหรับสมาชิก: ใส่ชื่อผู้ใช้และรหัสผ่านใดก็ได้</p>
                      </div>
                      <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                        เข้าสู่ระบบ
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                      สมัครสมาชิก
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>สมัครสมาชิก</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <Input
                        placeholder="ชื่อผู้ใช้"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="อีเมล"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                      <Input
                        type="password"
                        placeholder="รหัสผ่าน"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                      <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                        สมัครสมาชิก
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
