import client from '../../api/client';

export const getLastestAdverts = () => {
  const url = '/api/v1/adverts';
  return client.get(url);
};

export const getFilteredAdverts = (params) => {
  const url = `/api/v1/adverts?${params}`;
  return client.get(url);
};

export const getSingleAdvert = (id) => {
  const url = `/api/v1/adverts/${id}?_expand=user`;
  return client.get(url);
};

export const deletePostApi = (id) => {
  const url = `/api/v1/adverts/${id}`;
  return client.delete(url, id);
};

export const requestTagsToAPI = () => {
  const url = '/api/v1/adverts/tags';
  return client.get(url);
};

export const newPostApi = (data) => {
  const url = '/api/v1/adverts';
  return client.post(url, data);
};
