import { ChatContainer, ContactContainer, EmptyContainer } from '@/Index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      toast('Please setup profile to continue...');
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  return (
    <div className=' flex h-screen  text-white overflow-hidden'>
      {/* <div className="px-6 py-2 mt-8 bg-slate-400 rounded-lg w-20 ml-8">
        <Link to="/profile">Profile</Link>
      </div> */}
      <ContactContainer />
      {/* <EmptyContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  );
};

export default Chat;
