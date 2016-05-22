import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Image = ({ thumbnail, circle, rounded, ...rest }) => {
  let cx = classNames({
    'img-rounded': rounded,
    'img-circle': circle,
    'img-thumbnail': thumbnail,
  });
  return (
    <img className={cx} {...rest} />
  );
};

Image.propTypes = {
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  thumbnail: PropTypes.bool,
};

export default Image;
