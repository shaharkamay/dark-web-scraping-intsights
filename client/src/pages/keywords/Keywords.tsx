import React, { FormEventHandler, useEffect, useState } from 'react';
import TextInput from '../../components/TextInput';
import '../../assets/styles/keywords.scss';
import { deleteKeyword, getKeywords, sendKeyword } from '../../network/axios';
import { Keyword } from '../../@types';

const Keywords = () => {
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  useEffect(() => {
    getKeywords().then((res) => {
      if (res) setKeywords(res);
    });
  }, []);

  const handleAddKeyword: FormEventHandler = async (e) => {
    e.preventDefault();
    if (keywords.findIndex((k) => k.name === keyword) === -1) {
      await sendKeyword(keyword);
      getKeywords().then((res) => {
        if (res) setKeywords(res);
      });
    }
    setKeyword('');
  };
  const handleDeleteKeyword = async (keyword: string) => {
    await deleteKeyword(keyword);
    const res = await getKeywords();
    if (res) setKeywords(res);
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
      <div className="keywords-list">
        {keywords.map((keyword) => (
          <div key={keyword.name} className="keyword">
            <div className="keyword-name">{keyword.name}</div>
            <button
              className="keyword-delete"
              onClick={async () => {
                handleDeleteKeyword(keyword.name);
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keywords;
