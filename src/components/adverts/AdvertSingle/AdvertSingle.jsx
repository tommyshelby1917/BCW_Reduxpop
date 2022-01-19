import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router';

import Layout from '../../layout/Layout';
import Button from '../../common/Button/Button';
import ConfirmAction from '../../common/ConfirmAction/ConfirmAction';

import { deletePostApi } from '../service';

import { useDispatch, useSelector } from 'react-redux';
import { loadSingle, deleteSingle } from '../../../store/actions';
import { serveSingle, errorSingle } from '../../../store/selectors';

import './AdvertSingle.css';

import noImage from '../../../public/images/noimage.jpeg';

// TODO: ¿Como implanto la redireccion al 404?

function AdvertSingle() {
  const history = useHistory();
  const { advertId } = useParams();

  const dispatch = useDispatch();

  const advert = useSelector(serveSingle);
  const error = useSelector(errorSingle);

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
