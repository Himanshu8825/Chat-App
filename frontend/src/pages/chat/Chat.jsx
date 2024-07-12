import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  return <div>Chat</div>;
};

export default Chat;
