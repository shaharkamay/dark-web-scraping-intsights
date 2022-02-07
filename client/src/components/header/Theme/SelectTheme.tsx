import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../../../recoil/theme/atom';

function SelectTheme() {
  const [, setTheme] = useRecoilState(themeState);
  const [selectValue, setSelectValue] = useState(
    localStorage.getItem('theme') || 'theme-auto'
  );
  return (
    <select
      value={selectValue ? selectValue.split('-')[1] : 'auto'}
      className="select-theme"
      id="select-theme"
      onChange={(e) => {
        localStorage.setItem('theme', `theme-${e.target.value}`);
        setSelectValue(e.target.value);
        setTheme(`theme-${e.target.value}`);
      }}
    >
      <option value="auto">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}

export default SelectTheme;
