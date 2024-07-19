import apiClient from '@/lib/api';
import { getColor } from '@/lib/utils';
import { setUserInfo } from '@/Redux/Slices/authSlice';
import { HOST, LOGOUT_USER } from '@/utils/constant';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { FiEdit2 } from 'react-icons/fi';
import { IoPowerSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProfileInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);


  const logOurtHandler = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_USER,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(setUserInfo(null));
        navigate('/auth');
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex xl:justify-start justify-center items-center gap-6 px-6 pt-2 w-full bg-[#2a2b33]">
      <div className="flex justify-center items-center">
        <div className=" w-12 h-10 relative">
          <Avatar className="h-10 w-10  rounded-full  overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`uppercase h-10 w-10  text-lg border flex items-center justify-center rounded-full  ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.charAt(0)
                  : userInfo && userInfo.email
                  ? userInfo.email.charAt(0)
                  : ''}
              </div>
            )}
          </Avatar>
        </div>
        <div className=" font-medium ">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ''}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                onClick={() => navigate('/profile')}
                className=" text-purple-500 text-xl font-medium"
              />
            </TooltipTrigger>
            <TooltipContent className=" bg-[#1c1b1e] border-none text-white px-4 py-2 rounded-lg cursor-pointer">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                onClick={logOurtHandler}
                className=" text-red-500 text-xl font-medium"
              />
            </TooltipTrigger>
            <TooltipContent className=" bg-[#1c1b1e] border-none text-white px-4 py-2 rounded-lg cursor-pointer">
              Log-out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
