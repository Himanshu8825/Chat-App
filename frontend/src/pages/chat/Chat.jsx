import { ChatContainer, ContactContainer, EmptyContainer } from '@/Index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chat = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      toast('Please setup profile to continue...');
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  return (
    <div className=" flex h-screen  text-white overflow-hidden">
      <ContactContainer />
      {selectedChatType === 'undefined' ? (
        <EmptyContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
