import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ChatRoom } from './chatroom/ChatRoom';
import Landing from './landing/Landing';

const AuthenticatedApp = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room/:id" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AuthenticatedApp;
