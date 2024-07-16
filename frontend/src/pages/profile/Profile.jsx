import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import apiClient from '@/lib/api';
import { colors, getColor } from '@/lib/utils';
import { setUserInfo } from '@/Redux/Slices/authSlice';
import {
  ADD_PROFILE_IMAGE_ROUTE,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from '@/utils/constant';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageVersion, setImageVersion] = useState(0);

  useEffect(() => {
    if (userInfo && userInfo.profileSetup) {
      setFirstName(userInfo.firstName || '');
      setLastName(userInfo.lastName || '');
      setSelectedColor(userInfo.color || 0);
    }
    if (userInfo && userInfo.image) {
      const imageUrl = `${HOST}/${encodeURIComponent(userInfo.image)}`;
      setImage(imageUrl);
    }

  }, [userInfo, imageVersion]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error('First name is required');
      return false;
    }
    if (!lastName) {
      toast.error('Last name is required');
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          dispatch(setUserInfo(response.data.user));
          toast.success('Profile updated successfully');
          navigate('/chat');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate('/chat');
    } else {
      toast.error('Please SetUp Profile');
    }
  };

  const uploadFileHandler = () => {
    fileInputRef.current.click();
  };

  const uploadChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile-image', file);
      try {
        const response = await apiClient.post(
          ADD_PROFILE_IMAGE_ROUTE,
          formData,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200 && response.data.profileImage) {
          dispatch(
            setUserInfo({ ...userInfo, image: response.data.profileImage })
          );
          toast.success('Profile image updated successfully');
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Failed to upload file');
      }
    }
  };

  const deleteFileHandler = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(setUserInfo({ ...userInfo, image: null }));
        toast.success(response.data.message);
        setImage(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#1b1c24] h-screen flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 max-w-screen-md w-full">
        <div>
          <IoArrowBack
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={handleNavigate}
          />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:h-48 md:w-48 text-5xl border flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.charAt(0)
                    : userInfo && userInfo.email
                    ? userInfo.email.charAt(0)
                    : ''}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                onClick={image ? deleteFileHandler : uploadFileHandler}
                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer"
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={uploadChangeHandler}
              name="profile-image"
              accept=".png ,.jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email.."
                type="email"
                disabled
                value={userInfo?.email || ''}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={` ${color} cursor-pointer w-8 h-8 rounded-full transition-all duration-100 ${
                    selectedColor === index
                      ? 'outline outline-white/80 outline-3'
                      : ''
                  } `}
                  onClick={() => setSelectedColor(index)}
                >
                  {selectedColor === index && (
                    <div className="w-full h-full rounded-full bg-white/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            onClick={saveChanges}
            className="h-12 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
