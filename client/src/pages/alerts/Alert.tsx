import React from 'react';
import { useRecoilState } from 'recoil';
import { Alert as IAlert } from '../../@types';
import { alertsNotificationState } from '../../recoil/alerts/atoms';

export default function Alert({ alert }: { alert: IAlert }) {
  const [notificationDate] = useRecoilState(alertsNotificationState);
  return (
    <div>
      <div
        className={`paste ${
          notificationDate < new Date(alert.date) ? 'new-alert' : ''
        }`}
      >
        <div className="paste__props">
          <div className="paste__name">{alert.name}</div>
          <div className="paste--footer">
            <div className="paste__from">
              {alert.keywords.map((keyword) => (
                <span key={keyword.name}>{keyword.name}</span>
              ))}
            </div>
            <div>{new Date(alert.date).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
