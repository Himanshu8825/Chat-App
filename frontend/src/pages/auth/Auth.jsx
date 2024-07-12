import Background from '@/assets/login2.png';
import Victory from '@/assets/victory.svg';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import apiClient from '@/lib/api';
import { setError, setLoading, setUserInfo } from '@/Redux/Slices/authSlice';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constant';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateSignup = () => {
    if (!email.length) {
      toast.error('Email is required');
      return false;
    }
    if (!password.length) {
      toast.error('Password is required');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const signupHandler = async () => {
    if (validateSignup()) {
      dispatch(setLoading(true));
      try {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );

        if (response) {
          toast.success(response.data.message);
          dispatch(setUserInfo(response.data.user));
          navigate('/profile');
        }
      } catch (error) {
        toast.error('Signup failed');
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error('Email is required');
      return false;
    }
    if (!password.length) {
      toast.error('Password is required');
      return false;
    }

    return true;
  };

  const loginHandler = async () => {
    if (validateLogin()) {
      dispatch(setLoading(true));
      try {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response) {
          toast.success(response.data.message);
          dispatch(setUserInfo(response.data.user));
          if (response.data.user.profileSetup) {
            navigate('/chat');
          } else {
            navigate('/profile');
          }
        }
      } catch (error) {
        toast.error('Login failed');
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[90vh] w-[80vw] bg-white border-2 border-white text-opacity-95 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center xl:pl-3">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory-Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>

          <div className="w-full flex justify-center items-start">
            <Tabs className="w-3/4" defaultValue="signup">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="login"
                >
                  Login
                </TabsTrigger>

                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="flex flex-col gap-5 mt-6">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6"
                  onClick={loginHandler}
                  disabled={loading}
                >
                  Login
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-5"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6"
                  onClick={signupHandler}
                  disabled={loading}
                >
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="Login-Background" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
