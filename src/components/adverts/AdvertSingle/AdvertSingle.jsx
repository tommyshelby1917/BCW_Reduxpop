import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useParams, useHistory } from 'react-router';

import Layout from '../../layout/Layout';
import Button from '../../common/Button/Button';
import ConfirmAction from '../../common/ConfirmAction/ConfirmAction';

import { getSingleAdvert, deletePostApi } from '../service';

import './AdvertSingle.css';

import noImage from '../../../public/images/noimage.jpeg';

const useGetData = (getData) => {
  const history = useHistory();
  const [data, setData] = useState(null);

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch((error) => {
        if (error.status === 404) {
          return history.push('/404');
        }
      });

    return () => {};
  }, [getData, history]);

  return data;
};

const useAdvert = (advertId) => {
  const fixedGetAdvert = useCallback(
    () => getSingleAdvert(advertId),
    [advertId]
  );
  const advert = useGetData(fixedGetAdvert);
  return advert;
};

function AdvertSingle() {
  const history = useHistory();
  const { advertId } = useParams();
  const advert = useAdvert(advertId);
  const backend = process.env.REACT_APP_API_BASE_URL;

  const [displayConfirmation, setDisplayConfirmation] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const showDisplayConfirmation = () => {
    setDeleteMessage('Are you sure do you want to delete this post?');
    setDisplayConfirmation(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmation(false);
  };

  const deletePost = async function () {
    await deletePostApi(advertId);
    return history.push('/adverts');
  };

  return (
    <Layout title="Advert">
      <div className="singleAdvert-container">
        <div className="singleAdvert">
          {advert && (
            <Fragment>
              <div className="advertSaleContainer">
                <h2>{advert.sale ? 'I want sell!' : 'I want buy'}</h2>
              </div>
              <div className="advertTitleContainer">
                <h2>{advert.name}</h2>
              </div>
              <div className="advertPriceContainer">
                <h2>{advert.price}€</h2>
              </div>
              <div className="advertTagsContainer">
                {advert.tags ? (
                  advert.tags.map((e) => (
                    <p className="tag" key={e}>
                      {e}
                    </p>
                  ))
                ) : (
                  <p>'NO TAGS'</p>
                )}
              </div>
              <div className="advertImageContainer">
                <img
                  src={advert.photo ? `${backend}${advert.photo}` : noImage}
                  alt=""
                  width="200"
                />
              </div>
              <div className="deleteButton-container">
                <Button onClick={showDisplayConfirmation}>
                  Delete this post!
                </Button>
                {displayConfirmation && (
                  <ConfirmAction
                    message={deleteMessage}
                    action={deletePost}
                    hide={hideConfirmationModal}
                  />
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdvertSingle;
