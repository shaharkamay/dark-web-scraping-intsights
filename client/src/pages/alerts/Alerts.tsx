import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Socket } from 'socket.io-client';
import { Alert as IAlert } from '../../@types';
import '../../assets/styles/alerts.scss';
import { getAlerts } from '../../network/axios';
import { alertsNotificationState } from '../../recoil/alerts/atoms';
import { useQuery } from '../../utils/alerts/helpers';
import Alert from './Alert';

const Alerts = ({ socket }: { socket: Socket }) => {
  const query = useQuery();
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [notificationDate, setNotificationDate] = useRecoilState(
    alertsNotificationState
  );
  const date = query.get('date')
    ? new Date(query.get('date') as string)
    : notificationDate;

  useEffect(() => {
    getAlerts().then((res) => {
      if (res) setAlerts(res);
    });
    return () => {
      const date = new Date();
      setNotificationDate(date);
      socket.emit('left-alerts', { date });
    };
  }, []);

  return (
    <div className={`alerts container`}>
      {/* <Pagination pastes={alerts} setPastes={setPastes} /> */}
      {alerts &&
        alerts.map((alert, i) => (
          <div key={alert.id} className={`alerts-container`}>
            <hr />
            <Alert alert={alert} isNewAlert={date <= new Date(alert.date)} />
            {i === alerts.length - 1 && <hr />}
          </div>
        ))}
    </div>
  );
};

export default Alerts;
