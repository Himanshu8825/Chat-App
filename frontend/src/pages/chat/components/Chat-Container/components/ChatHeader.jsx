import { getColor } from '@/lib/utils';
import { closeChat } from '@/Redux/Slices/chatSlice';
import { HOST } from '@/utils/constant';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

const ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);

  const handleCloseChat = () => {
    dispatch(closeChat());
  };

  return (
    <div className="h-[12vh] border-b-2 border-[#2f303b] flx items-center justify-center px-20">
      <div className="flex justify-cente items-center gap-5 w-full justify-between">
        <div className="flex justify-center items-center  pt-4">
          <div className="w-12 h-10 relative">
            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`uppercase h-10 w-10 text-lg border flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.charAt(0)
                    : selectedChatData && contact.email
                    ? selectedChatData.email.charAt(0)
                    : ''}
                </div>
              )}
            </Avatar>
          </div>
          <div className="poppins-medium text-lg">
            {selectedChatType === 'contact' && selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
            onClick={handleCloseChat}
          >
            <RiCloseFill className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
