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
import UserChat from './components/user-chat/UserChat';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useEffect } from 'react';
import PaymentSuccess from './components/payment-success/PaymentSuccess';
import PaymentFail from './components/payment-fail/PaymentFail';

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
  }, [localStorage.getItem("userID")]);

  const setupWebSocketConnection = () => {
    const socket = new SockJS('http://localhost:8080/ws');
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
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-fail" element={<PaymentFail />} />
              <Route path="/garage" element={<Garage />} />
              <Route path="/posts" element={<Posts />} />
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
