import React from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../config/constant';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';
import Img from './style';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
    };
  }

  componentDidMount() {
    const { random, duration, banners } = this.props;
    this.id = setInterval(() => {
      const { current } = this.state;
      if (banners.length) {
        // eslint-disable-next-line max-len
        const newBanner = random ? getRandomNumber(banners.length) : getNextRoundRobin(banners.length, current);
        this.setState({ current: newBanner });
      }
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { altText, height, banners } = this.props;
    const { current } = this.state;
    const path = current ? PUBLIC_IMAGE_FOLDER + banners[current] : DEFAULT_BANNER_IMAGE;
    return (
      <Img src={path} alt={altText} height={height} />
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'DefaultBanner',
  banners: [],
  duration: 2000,
  height: 200,
  random: false,
};

export default Slider;
