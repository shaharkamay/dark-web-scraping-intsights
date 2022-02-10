import React from 'react';
import { useRecoilState } from 'recoil';
import '../../assets/styles/alerts.scss';
// import Pagination from '../../components/Pagination';
import { alertsState } from '../../recoil/alerts/atoms';
import Paste from '../dashboard/Paste';

const Alerts = () => {
  const [alerts] = useRecoilState(alertsState);
  return (
    <div className={`dashboard container`}>
      {/* <Pagination pastes={alerts} setPastes={setPastes} /> */}
      {alerts &&
        alerts.pastes.map((alert, i) => (
          <div key={alert.id} className={`paste-container`}>
            <hr />
            <Paste paste={alert} />
            {i === alerts.pastes.length - 1 && <hr />}
          </div>
        ))}
    </div>
  );
};

export default Alerts;
