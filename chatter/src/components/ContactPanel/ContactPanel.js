import React, { useState, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';

import cx from 'classnames';
import './_contact-panel.scss';

export default function ContactPanel() {
  const [minimised, setMinimised] = useState(Boolean(localStorage.getItem('minimised')));
  const { currentUser, users } = useContext(SocketContext);
  const user = users.find(({id}) => id === currentUser)

  const onClick = () => {
    // Remember user preference
    localStorage.setItem('minimised', minimised ? '' : 'true');

    setMinimised(!minimised);
  };

  return (
    <div className={cx('contact-panel', { 'contact-panel--minimised': minimised })}>
      <div className="contact-panel__header">
        <i className="mdi mdi-exit-to-app contact-panel__toggle" onClick={onClick} />
        <div className="contact-panel__header__profile">
          <div className="contact-panel__header__profile__picture"><i className="fas fa-comment-dots"/></div>
          <h1>{user?.name}</h1>
        </div>
      </div>
      <div className="contact-panel__body">
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Email</p>
          <p className="contact-panel__body__value">{user?.email}</p>
        </div>
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Phone</p>
          <p className="contact-panel__body__value">{user?.phone}</p>
        </div>
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Labels</p>
          <div className="contact-panel__body__labels">
            {user?.labels.map(label => (<p>{label}<i className="fas fa-times" /></p>))}
          </div>
        </div>
        <div className="contact-panel__body__block">
          <p className="contact-panel__body__label">Attachments</p>
          <div className="contact-panel__body__attachments">
            <p><i className="fas fa-paperclip" />Dataset.csv</p>
            <p><i className="far fa-image" />bot_face.jpg</p>
          </div>
          <p className="contact-panel__body__link">View All</p>
        </div>
        <button className="contact-panel__body__edit-btn">Edit Contact</button>
      </div>
    </div>
  );
}
