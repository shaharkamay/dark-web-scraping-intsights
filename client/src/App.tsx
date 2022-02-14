import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Routes, BrowserRouter } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { themeState } from './recoil/theme/atom';
import { routes } from './utils/globals';
import { SOCKET_URL } from './network/axios';
import { pastesState } from './recoil/pastes/atoms';
import io, { Socket } from 'socket.io-client';
import { Alert } from './@types';

function App() {
  const [, setPastes] = useRecoilState(pastesState);
  const [theme] = useRecoilState(themeState);

  const socketRef = useRef<Socket>();

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
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket Has Been Disconnected');
    });

    socketRef.current.on('pastes', (pastes) => {
      console.log(pastes);
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

    // source.onopen = () => {
    //   console.log('Connected to SSE');
    // };
    // source.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if ('pastes' in data) {
    //     setPastes(data.pastes);
    //     console.log(data);
    //   }
    //   if ('alerts' in data) {
    //     console.log(data.alerts);
    //     if (Notification.permission === 'granted') {
    //       new Notification('A new alert', {
    //         body: 'You have got a new alert, check it out!',
    //         icon: './favicon.ico',
    //       });
    //     }
    //   }
    // };
  }, []);

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>{routes && routes.map((route) => route.element)}</Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
