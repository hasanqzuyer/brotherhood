import { TAppContext } from 'context/app/types';

export const createInitialState = (): TAppContext => ({
  routeName: '',
  user: null,
  influencer: null,
  currency: 'CHF',
  houseName: '',
  login: async (_x) => {},
  setRouteName: () => {},
  logout: () => {},
  role: 'USER',
  initialLoading: true,
  showMobileMenu: false,
  houseStatus: 0,
  applicationStatus: 0,
  notificationStatus: 0,
  userStatus: 0,
  handleMobileMenu: () => {},
  handleCurrencyChange: () => {},
  handleInfluencer: () => {},
  getMeData: async () => {},
  handleUserStatus: () => {},
  handleHouseStatus: () => {},
  setHouseName: () => {},
  handleApplicationStatus: () => {},
  handleNotificationStatus: () => {},
});
