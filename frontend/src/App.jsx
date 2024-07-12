import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth, Chat, Profile } from './Index';
import { setLoading, setUserInfo } from './Redux/Slices/authSlice';
import apiClient from './lib/api';
import { GET_USER_INFO } from './utils/constant';

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = Boolean(userInfo);
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isAuthenticated = Boolean(userInfo);
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.user) {
          dispatch(setUserInfo(response.data.user));
        } else {
          dispatch(setUserInfo(undefined));
        }
      } catch (error) {
        dispatch(setUserInfo(undefined));
        console.error('Error fetching user data:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      dispatch(setLoading(false));
    }
  }, [userInfo, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default App;
