import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import toRefreshURL from '../../utils/toRefreshURL';

let RefreshImage = ({ src, ...rest }) => (
  <Image src={toRefreshURL(src)} {...rest} />
);

export default RefreshImage;
