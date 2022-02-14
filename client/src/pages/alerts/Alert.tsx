import React from 'react';
import { Alert as IAlert } from '../../@types';

export default function Alert({
  alert,
  isNewAlert,
}: {
  alert: IAlert;
  isNewAlert: boolean;
}) {
  return (
    <div>
      <div className={`alert`}>
        <div className="alert__props">
          <div className="alert__props--header">
            <div className="alert__title">{alert.name}</div>
            {isNewAlert && <div className="new-alert">new</div>}
          </div>
          {/* <div className="alert__props--main"></div> */}
          <div className="alert__props--footer">
            <div className="alert-keywords">
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
