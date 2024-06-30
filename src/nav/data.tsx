import Splash from '@pages/auth/splash';
import Favorite from '@pages/favorite';
import Home from '@pages/home';
import TabStack from './tabStack';
import Profile from '@pages/profile';
import Details from '@pages/details';

export const navdata = [
  {
    name: 'Splash',
    path: Splash,
  },
  {
    name: 'TabStack',
    path: TabStack,
  },
  {
    name: 'Details',
    path: Details,
  },
];
export const tabdata = [
  {
    name: 'Home',
    path: Home,
  },
  {
    name: 'Favorite',
    path: Favorite,
  },
  {
    name: 'Profile',
    path: Profile,
  },
];
