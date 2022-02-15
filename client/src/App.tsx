import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { themeState } from './recoil/theme/atom';
import { SOCKET_URL } from './network/axios';
import { pastesState } from './recoil/pastes/atoms';
import io, { Socket } from 'socket.io-client';
import { Alert } from './@types';
import Dashboard from './pages/dashboard/Dashboard';
import Keywords from './pages/keywords/Keywords';
import Alerts from './pages/alerts/Alerts';
import { alertsNotificationState } from './recoil/alerts/atoms';

function App() {
  const [, setPastes] = useRecoilState(pastesState);
  const [theme] = useRecoilState(themeState);
  const [notificationDate] = useRecoilState(alertsNotificationState);

  const socketRef = useRef<Socket>() as { current: Socket };

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
      path: '/socket',
    });

    socketRef.current.on('connect', () => {
      console.log('Socket Has Connected');
      socketRef.current.emit('left-alerts', { date: notificationDate });
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket Has Been Disconnected');
    });

    socketRef.current.on('pastes', (pastes) => {
      setPastes(pastes);
    });

    socketRef.current.on('alerts', (alerts: Alert[]) => {
      if (alerts.length > 0) {
        if (Notification.permission === 'granted') {
          const notification = new Notification(
            `New alerts (${alerts.length})`,
            {
              body: 'You have got new alerts, check it out!',
              icon: './favicon.ico',
            }
          );
          notification.onclick = () => {
            window.location.href = `/alerts?date=${
              alerts[alerts.length - 1].date
            }`;
          };
        }
      }
    });
  }, []);

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route key="/" path="/" element={<Dashboard />} />
            <Route key="keywords" path="/keywords" element={<Keywords />} />
            <Route
              key="alerts"
              path="/alerts"
              element={<Alerts socket={socketRef.current} />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
