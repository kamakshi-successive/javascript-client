import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'banners/default.png';
export const banners = ['cloud.jpg', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png'];

export const selectOptions = [
  {
    label: 'Cricket',
    value: 'Cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },
];

export const radioOptionsCricket = [
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Wicket Keeper',
    value: 'wicket Keeper',
  },
  {
    label: 'All rounder',
    value: 'all rounder',
  },
];

export const radioOptionsFootball = [
  {
    label: 'Defender',
    value: 'defender',
  },
  {
    label: 'Striker',
    value: 'striker',
  },
];

const schema = yup.object().shape(
  {
    name: yup.string().min(3, 'Please enter 3 characters').required('Your name is required'),
    sport: yup.string().required('Please select a sport'),
    position: yup.string().required().when('sport', {
      is: 'cricket' || 'football',
      then: yup.string().required('Position is a required field'),
    }),
  },
);

export { schema };
