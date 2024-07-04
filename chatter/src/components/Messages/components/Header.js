import React, { useContext } from 'react';
import UserProfile from '../../../common/components/UserProfile';
import { SocketContext } from '../../../context/SocketContext';

export default function Header() {
  const { currentUser, users } = useContext(SocketContext);
  const user = users.find(({id}) => id === currentUser)
  return (
    <div className="messages__header">
      <div className="messages__header__left-content">
        <UserProfile {...user} />
        <div className="messages__header__left-content__text">
          <h1>{user?.name || ''} <div className="messages__header__online-dot" /></h1>
          <p>{user?.location || ''}</p>
        </div>
      </div>
      <div className="messages__header__right-content">
        <div className="messages__header__status">
          <i className="mdi mdi-eye-outline" />
          <p className="no-margin">{user?.userId || ''}</p>
        </div>
        <div className="messages__header__status">
          <i className="far fa-clock" />
          <p className="no-margin">{user?.lastActive || ''}</p>
        </div>
      </div>
    </div>
  );
}
