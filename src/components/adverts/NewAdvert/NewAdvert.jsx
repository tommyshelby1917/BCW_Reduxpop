import React, { useState, Fragment } from 'react';
import Layout from '../../layout/Layout';
import { newPostApi } from '../service';
import { Redirect, useHistory } from 'react-router';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';

import Button from '../../common/Button/Button';
import FormField from '../../common/FormField/FormField';
import SelectTags from '../../common/SelectTags/SelectTags';

import './NewAdvert.css';

function NewAdvert() {
  const history = useHistory();
  const formData = new FormData();
  const [createdPostId, setCreatedPostId] = useState('');

  const [value, setValue] = useState({
    name: '',
    sale: false,
    tags: [],
    price: 0,
  });

  const [error, setError] = useState(null);

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

  const handlePhoto = (event) => {
    formData.set('photo', event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const [key, valor] of Object.entries(value)) {
      formData.append(key, valor);
    }

    try {
      const createdPost = await newPostApi(formData);
      setCreatedPostId(createdPost.id);
    } catch (error) {
      if (error.status === 401) {
        return history.push('/login');
      }
      setError(error.message);
    }
  };

  const validate =
    value.name !== '' && value.tags.length > 0 && value.price > 0;

  if (createdPostId) {
    return <Redirect to={`/adverts/${createdPostId}`} />;
  }

  return (
    <Layout title="Do you want to create an advert?">
      <Fragment>
        <div className="createNew-container">
          <form onSubmit={handleSubmit}>
            <FormField
              type="text"
              name="name"
              label="Name: "
              className="newAdvert-field"
              value={value.name}
              onChange={handleChange}
            ></FormField>
            <FormField
              type="checkbox"
              name="sale"
              label="On sale: "
              className="newAdvert-field"
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
              name="price"
              label="Price: "
              className="newAdvert-field"
              value={value.price}
              onChange={handleChange}
            ></FormField>
            <FormField
              type="file"
              name="photo"
              label="Put a photo: "
              onChange={handlePhoto}
            />
            <Button
              className="createpost-button"
              disabled={!validate}
              type="submit"
            >
              Create advert!
            </Button>
          </form>
          {error && <ErrorMessage error={error} />}
        </div>
      </Fragment>
    </Layout>
  );
}

export default NewAdvert;
