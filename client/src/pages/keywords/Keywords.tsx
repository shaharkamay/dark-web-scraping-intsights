import React, { FormEventHandler, useState } from 'react';
import TextInput from '../../components/TextInput';
import '../../assets/styles/keywords.scss';
import { useRecoilState } from 'recoil';
import { keywordsState } from '../../recoil/keywords/atoms';
import { sendKeyword } from '../../network/axios';

const Keywords = () => {
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useRecoilState(keywordsState);
  const handleAddKeyword: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!keywords.includes(keyword)) {
      setKeywords((keywords) => [...keywords, keyword]);
      await sendKeyword(keyword);
    }
    setKeyword('');
  };
  return (
    <div className="container keywords">
      <form
        id="add-keyword-form"
        className="add-keyword-form"
        onSubmit={handleAddKeyword}
      >
        <TextInput
          inputState={keyword}
          setInputState={setKeyword}
          name="add-keyword"
        />
        <button type="submit" className="default--button">
          Add Keyword
        </button>
      </form>
      {keywords.map((keyword) => (
        <div key={keyword}>{keyword}</div>
      ))}
    </div>
  );
};

export default Keywords;
