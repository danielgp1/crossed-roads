import './App.css';
import Welcome from './components/welcome-page/Welcome';
import Homepage from './components/homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './components/service/Service';
import Garage from './components/garage/Garage';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import PageNotFound from './components/page-not-found/PageNotFound';
import UserProvider from './contexts/UserContext';
import AvailableColorsProvider from './contexts/AvailableColorsContext';
import UserProfile from './components/user-profile/UserProfile';
import Posts from './components/posts/Posts';
import Stripe from './components/stripe/Stripe';
import UserChat from './components/user-chat/UserChat';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useEffect } from 'react';

const App = () => {

  let stompClient:Stomp.Client;

  useEffect(() => {
    setupWebSocketConnection();
    return () => {
      if (stompClient) {
        stompClient.send("/app/logout", {}, localStorage.getItem("userID")!);
        stompClient.disconnect(() => {
          console.log('Disconnected');
        });
      }
    }
  }, []);

  const setupWebSocketConnection = () => {
    const socket = new SockJS('http://10.16.6.25:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.send("/app/login", {}, localStorage.getItem("userID")!);
      console.log('Connected');
      startHeartbeat();
  }, (error) => {
      console.error('Stomp error:', error);
  });
};

  const startHeartbeat = () => {
    setInterval(() => {
        if (stompClient && stompClient.connected && localStorage.getItem("userID")) {
            stompClient.send("/app/heartbeat", {}, localStorage.getItem("userID")!);
        }
    }, 5000);
}


  return (
    <UserProvider>
      <AvailableColorsProvider>
        <Router>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route element={<ProtectedRoutes />} >
              <Route path="/" element={<Homepage />} />
              <Route path="/service" element={<Service />} />
              <Route path="/garage" element={<Garage />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/payment" element={<Stripe />} />
              <Route path="/users/:username" element={<UserProfile />} />
              <Route path="/chats/:friendid" element={<UserChat />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </AvailableColorsProvider>
    </UserProvider>
  );
};
export default App;
