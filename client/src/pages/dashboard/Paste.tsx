import React from 'react';
import { Paste as IPaste } from '../../@types';

export default function Paste({ paste }: { paste: IPaste }) {
  return (
    <div className={`paste-container`}>
      <div className="paste">
        <div className="paste__props">
          <div className="paste__name">{paste.title}</div>
          <div className="paste__prop">{paste.content}</div>
          <div className="paste__from">
            <span>{paste.author}</span>
            <span>{new Date(paste.date).toString()}</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
