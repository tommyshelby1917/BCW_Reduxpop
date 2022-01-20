import React, { useEffect } from 'react';

import Button from '../Button/Button';

import { useSelector, useDispatch } from 'react-redux';
import { loadAllTags } from '../../../store/actions';
import { getTags } from '../../../store/selectors';

import './SelectTags.css';

// const GetTags = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const tags = await requestTagsToAPI();
//       setData(tags);
//     }
//     fetchData();
//   }, []);

//   return data;
// };

// const CallData = () => {
//   const tags = GetTags();
//   return tags;
// };

function SelectTags({ click }) {
  const dispatch = useDispatch();
  const collectedTags = useSelector(getTags);

  useEffect(() => {
    dispatch(loadAllTags());
  }, [dispatch]);

  return (
    <div>
      {collectedTags &&
        collectedTags.map((e) => (
          <Button key={e.toString()} onClick={click} type="button">
            {e}
          </Button>
        ))}
    </div>
  );
}

export default SelectTags;
