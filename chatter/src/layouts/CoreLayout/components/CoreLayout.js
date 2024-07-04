import React from 'react';
import ContactPanel from '../../../components/ContactPanel';
import UserList from '../../../components/UserList';
import Messages from '../../../components/Messages';
import IconBackground from './IconBackground';
import '../styles/_core-layout.scss';

export default function CoreLayout() {
  return (
    <div className="core">
      <IconBackground />
        <UserList />
        <Messages />
        <ContactPanel />
    </div>
  );
}
