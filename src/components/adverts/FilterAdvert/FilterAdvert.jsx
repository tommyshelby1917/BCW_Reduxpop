import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Button from '../../common/Button/Button';
import FormField from '../../common/FormField/FormField';
import SelectTags from '../../common/SelectTags/SelectTags';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';

import { useDispatch, useSelector } from 'react-redux';
import { getAds, getErrors } from '../../../store/selectors';
import { filterAdverts, iuResetError } from '../../../store/actions';

import './FilterAdvert.css';

function FilterAdvert() {
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector(getErrors);
  const [searched, setSearched] = useState(false);

  const adverts = useSelector(getAds);
  const [value, setValue] = useState({
    name: '',
    sale: false,
    tags: [],
    priceMin: 0,
    priceMax: 0,
  });

  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleTags = (event) => {
    let tags = value.tags;
    const selected = event.target.textContent;

    tags.includes(selected)
      ? (tags = tags.filter((e) => e !== selected))
      : tags.push(selected);

    setValue((prevState) => ({
      ...prevState,
      tags,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let params = '';
    const name = value.name;
    const sale = value.sale;
    const priceMin = value.priceMin;
    const priceMax = value.priceMax;
    let tags = value.tags;
    let tagsParams = '';

    priceMin > 0 && priceMax >= priceMin
      ? (params = `name=${name}&sale=${sale}&price=${priceMin}&price=${priceMax}`)
      : (params = `name=${name}&sale=${sale}`);

    switch (tags.length) {
      case 1:
        tagsParams = `&tags=${tags[0]}`;
        break;
      case 2:
        tagsParams = `&tags=${tags[0]}&tags=${tags[1]}`;
        break;
      case 3:
        tagsParams = `&tags=${tags[0]}&tags=${tags[1]}&tags=${tags[2]}`;
        break;
      case 4:
        tagsParams = `&tags=${tags[0]}&tags=${tags[1]}&tags=${tags[2]}&tags=${tags[3]}`;
        break;
      default:
        break;
    }

    params = `${params}${tagsParams}`;

    try {
      dispatch(filterAdverts(params));
      setSearched(true);
    } catch (err) {
      console.log('me ha caido un errorazo!');
      // if (err.status === 401) {
      //   return history.push('/login');
      // }
    }
  };

  if (value.priceMin > value.priceMax) {
    setValue((prevState) => ({
      ...prevState,
      priceMax: value.priceMin,
    }));
  }

  return (
    <div className="filteradvert-container">
      <div className="filteradvert-form-container">
        <h2>What are you looking for?</h2>
        <form className="filterform" onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="name"
            label="Name "
            className="filterAdvert-field"
            value={value.name}
            onChange={handleChange}
            required
          ></FormField>
          <FormField
            type="checkbox"
            name="sale"
            label="On sale "
            className="filterAdvert-field"
            value={value.sale}
            onChange={handleChange}
          ></FormField>
          <SelectTags click={handleTags} />
          {value.tags.length > 0 && (
            <div className="selectedtags-container">
              <p>Tags filter selected:</p>
              {value.tags.map((e) => (
                <p key={e} className="selectedtag">
                  {e}
                </p>
              ))}
            </div>
          )}
          <FormField
            type="number"
            name="priceMin"
            label="Price min. "
            className="filterAdvert-field"
            value={value.priceMin}
            onChange={handleChange}
          ></FormField>
          <FormField
            type="number"
            name="priceMax"
            label="Price max. "
            className="filterAdvert-field"
            value={value.priceMax}
            onChange={handleChange}
          ></FormField>
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="results-container">
        {!error ? (
          searched && (
            <>
              <div>Results: {adverts.length} founded</div>
              <div className="advertsList-main">
                {adverts.map(({ id, ...advert }) => (
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
                ))}
              </div>
            </>
          )
        ) : (
          <h2 className="search-animate">
            We dont found any advert. Try again!
          </h2>
        )}
      </div>
    </div>
  );
}

export default FilterAdvert;
