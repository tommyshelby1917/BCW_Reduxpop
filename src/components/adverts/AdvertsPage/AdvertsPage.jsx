import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getLastestAdverts } from '../service';

import Button from '../../common/Button/Button';
import Layout from '../../layout/Layout';
import FilterAdvert from '../FilterAdvert/FilterAdvert';

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
  const [adverts, setAdverts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // Esto es el ciclo de vida del componente. Cuando se arranca hacemos lo siguiente.
  useEffect(() => {
    getLastestAdverts().then((adverts) => setAdverts(adverts));
  }, []); // Como hay una array vacia, solo se arranca una vez

  return (
    <Layout title="Adverts">
      <div className="advertsPage">
        {adverts.length ? (
          <>
            <Button onClick={() => setShowSearch(!showSearch)}>
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
