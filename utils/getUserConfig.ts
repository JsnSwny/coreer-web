export const getUserConfig = () => {
  const userToken = localStorage.getItem('token');

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${userToken}`,
    },
  };
};