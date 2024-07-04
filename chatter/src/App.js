import React from 'react';
import CoreLayout from './layouts/CoreLayout';
import { SocketProvider } from './context/SocketContext'

export default function App() {
  return (
    <SocketProvider>
      <CoreLayout />
    </SocketProvider>
  );
}
