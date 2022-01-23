import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';

import Layout from '../../layout/Layout';
import Button from '../../common/Button/Button';
import ConfirmAction from '../../common/ConfirmAction/ConfirmAction';

import { useDispatch, useSelector } from 'react-redux';
import { loadSingle, deleteAdvert } from '../../../store/actions';
import { serveSingle, getIsLoading } from '../../../store/selectors';

import './AdvertSingle.css';

import noImage from '../../../public/images/noimage.jpeg';

function AdvertSingle() {
  const { advertId } = useParams();

  const dispatch = useDispatch();

  const advert = useSelector(serveSingle);

  const loading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(loadSingle(advertId));
  }, [dispatch, advertId]);

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

  const deletePost = function () {
    dispatch(deleteAdvert(advertId));
  };

  return (
    <Layout title="Advert">
      {loading || advert.length === 0 ? (
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      ) : (
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
      )}
    </Layout>
  );
}

export default AdvertSingle;
