import React, { useEffect, useState } from 'react';
import { Alert as IAlert } from '../../@types';
import '../../assets/styles/alerts.scss';
import { getAlerts } from '../../network/axios';
import Alert from './Alert';

const Alerts = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    getAlerts().then((res) => {
      if (res) setAlerts(res);
    });
  }, []);

  return (
    <div className={`dashboard container`}>
      {/* <Pagination pastes={alerts} setPastes={setPastes} /> */}
      {alerts &&
        alerts.map((alert, i) => (
          <div key={alert.id} className={`paste-container`}>
            <hr />
            <Alert alert={alert} />
            {i === alerts.length - 1 && <hr />}
          </div>
        ))}
    </div>
  );
};

export default Alerts;