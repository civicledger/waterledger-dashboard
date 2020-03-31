import React from 'react';

const notificationIcon = type => {
  switch(type) {
    case 'success': return <span className="text-green-200 bg-green-500 p-3"><i className="fal fa-check-circle fa-fw fa-lg"></i></span>;
    case 'error': return <span className="text-red-200 bg-red-500 p-3"><i className="fal fa-times-octagon fa-fw fa-lg"></i></span>;
    default: return <span className="text-blue-200 bg-blue-500 p-3"><i className="fal fa-exclamation-circle fa-fw fa-lg"></i></span>;
  }
}

const notificationItem = ({id, type = 'info', text}) => <li className="border rounded inline-flex mt-3 bg-gray-100 shadow" key={id}>
  {notificationIcon(type)}
  <span className="p-3 font-semibold">{text}</span>
</li>;

const Notifications = ({notifications}) => {
  if (!notifications.length) return '';

  return <ul className="inline-flex flex-col absolute right-0 mr-5 mb-5 items-end">
    {notifications.map(notificationItem)}
  </ul>
};

export default Notifications;