import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Layout from '../../layout/Layout';
import FilterAdvert from '../FilterAdvert/FilterAdvert';

import { useDispatch, useSelector } from 'react-redux';
import { getAds } from '../../../store/selectors';
import { loadAllAdverts } from '../../../store/actions';

import './AdvertsPage.css';

const EmptyList = () => (
  <div className="emptylistContainer">
    <p>Create your first advert!</p>
    <Button as={Link} to="/adverts/new">
      New Advert
    </Button>
  </div>
);

function AdvertsPage() {
  const dispatch = useDispatch();
  const adverts = useSelector(getAds);

  const [showSearch, setShowSearch] = useState(false);

  function hideSearch() {
    setShowSearch(!showSearch);
    if (showSearch) {
      dispatch(loadAllAdverts());
    }
  }

  // Esto es el ciclo de vida del componente. Cuando se arranca hacemos lo siguiente.
  useEffect(() => {
    dispatch(loadAllAdverts());
  }, [dispatch]);

  return (
    <Layout title="Adverts">
      <div className="advertsPage">
        {adverts.length ? (
          <>
            <Button onClick={hideSearch}>
              {!showSearch ? 'Search 🔎' : 'See all adverts'}
            </Button>
            <div className="advertsList-main">
              {showSearch ? (
                <FilterAdvert />
              ) : (
                adverts.map(({ id, ...advert }) => (
                  <div key={id} className="advertList-item">
                    <Link className="linktoadvert" to={`/adverts/${id}`}>
                      <Fragment>
                        <div className="advertSaleContainer">
                          <h2>
                            {advert.sale ? 'I want sell!' : 'I want buy!'}
                          </h2>
                        </div>
                        <div className="advertTitleContainer">
                          <h2>{advert.name}</h2>
                        </div>
                        <div className="advertPriceContainer">
                          <h2>{advert.price}€</h2>
                        </div>
                        <div className="advertTagsContainer">
                          {advert.tags.map((e) => <h2 key={e}>{e}</h2>) || (
                            <p>This post doesn't have any tags</p>
                          )}
                        </div>
                      </Fragment>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
