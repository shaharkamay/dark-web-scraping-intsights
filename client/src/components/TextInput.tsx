import React from 'react';

export default function TextInput({
  inputState,
  setInputState,
  name,
}: {
  inputState: string;
  setInputState: (inputState: string) => void;
  name: string;
}) {
  return (
    <div className={name}>
      <input
        type="text"
        placeholder={`${name}...`}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
        value={inputState}
      />
    </div>
  );
}
