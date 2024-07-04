import React, { useContext, useMemo } from 'react';
import cx from 'classnames';
import { SocketContext } from '../../context/SocketContext'
import UserProfile from '../../common/components/UserProfile/UserProfile';
import './_user-list.scss';

function User({ icon, name, lastActive, isOnline, id, color }) {
  const { currentUser, setCurrentUser, messages } = useContext(SocketContext);

  const lastMessages = useMemo(() => {
    return messages.filter(({to}) => !to).reduce((acc, curr) => {
      acc[curr.from] = curr.message;
      return acc;
    }, {})
  }, [messages])
  
  return (
    <div className={`user-list__users__user${id === currentUser ? ' active' : ''}${ !id ? ' offline' : ''}`} onClick={() => { id && setCurrentUser(id) }}>
      
      <UserProfile icon={icon} name={name} color={color} />
      <div className="user-list__users__user__right-content">
        <div className="user-list__users__user__title">
          <p>{name}</p>
          <p className={cx({ 'user-list__users__user__online': isOnline })}>
            {isOnline ? 'Online' : lastActive}
          </p>
        </div>
        <p>{lastMessages[id]}</p>
      </div>
    </div>
  );
}

export default function UserList() {
  const { users, userData } = useContext(SocketContext);
  
  return (
    <div className="user-list">
      <div className="user-list__header">
        <div className="user-list__header__left">
          <p>All Messages</p>
          <i className="fas fa-chevron-down" />
        </div>
        <i className="fas fa-cog" />
      </div>
      <div className="user-list__users">
        {users.filter((user) => user.id !== userData?.id).map(user => <User key={user.name} {...user} />)}
      </div>
    </div>
  );
}
