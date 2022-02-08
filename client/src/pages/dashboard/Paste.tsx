import React from 'react';
import { PasteWithEntities } from '../../@types';
import { getHslByAnalyzedWord } from '../../utils/pastes/helpers';

export default function Paste({ paste }: { paste: PasteWithEntities }) {
  return (
    <div>
      <div className="paste">
        <div className="paste__props">
          <div className="paste__name">{paste.title}</div>
          <div className="paste__prop">
            {paste.content.split(' ').map((word, i) => (
              <span
                key={`word-${i}`}
                style={{
                  color: getHslByAnalyzedWord(word.replace(/[^0-9a-z]/gi, '')),
                }}
              >
                {`${word} `}
              </span>
            ))}
          </div>
          <div className="paste--footer">
            <div className="paste__from">
              <span>{paste.author}</span>
              <span>{new Date(paste.date).toString()}</span>
            </div>
            <div className="paste__tags">
              {paste.entities &&
                paste.entities.map((entity, i) => (
                  <span key={`entity-${i}`}>
                    <span className="span--entity">{entity.atonicValue}</span>
                    <i></i>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
