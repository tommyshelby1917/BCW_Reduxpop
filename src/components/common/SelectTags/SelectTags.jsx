import React, { useState, useEffect } from 'react';
import { requestTagsToAPI } from '../../adverts/service';

import Button from '../Button/Button';

import './SelectTags.css';

const GetTags = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tags = await requestTagsToAPI();
      setData(tags);
    }
    fetchData();
  }, []);

  return data;
};

const CallData = () => {
  const tags = GetTags();
  return tags;
};

function SelectTags({ click }) {
  const collectedTags = CallData();

  return (
    <div>
      {/* <select name="tags" multiple> */}
      {collectedTags.map((e) => (
        <Button key={e.toString()} onClick={click} type="button">
          {e}
        </Button>
        // <option key={e.toString()} value={e} onClick={}>
        //   {e}
        // </option>
      ))}
      {/* </select> */}
    </div>
  );
}

export default SelectTags;
