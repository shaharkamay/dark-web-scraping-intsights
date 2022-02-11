import React from 'react';
import { Alert as IAlert } from '../../@types';

export default function Alert({ alert }: { alert: IAlert }) {
  return (
    <div>
      <div className="paste">
        <div className="paste__props">
          <div className="paste__name">{alert.name}</div>
          <div className="paste--footer">
            <div className="paste__from">
              <span>{alert.keyword?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
