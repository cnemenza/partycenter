import jwt_decode from 'jwt-decode';

const getJwtInfo = (access_token: string | undefined): any => {
  if (access_token !== undefined) {
    const userInfo = jwt_decode(access_token);
    return userInfo;
  }

  return null;
};

export { getJwtInfo };
