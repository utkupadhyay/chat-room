import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getChatRooms } from '../services/firebase';
import ChatRoom from './chatroom/ChatRoom';
import Landing from './landing/Landing';
import AvatarProvider from '../context/AvatarProvider';

export interface Channels {
  id: string;
  title: string;
}
const AuthenticatedApp = () => {
  const [channels, setChannels] = useState<Channels[]>([]);
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await getChatRooms();
        if (data) {
          setChannels(data as Channels[]);
        }
      } catch (e) {
        console.error('Failed to fetch');
      }
    };
    fetchChannels();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AvatarProvider>
                <Landing channels={channels} />
              </AvatarProvider>
            }
          />
          <Route
            path="/room/:id"
            element={
              <AvatarProvider>
                <ChatRoom channels={channels} />
              </AvatarProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AuthenticatedApp;
