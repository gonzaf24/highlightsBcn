import { SettingsIcon } from 'assets/icons';
import { BarPage } from 'modules/bar/pages';
import { EntretainmentPage } from 'modules/entretainment/pages';
import { FoodPage } from 'modules/food/pages';
import { HomePage, LoginPage, RecoveryPage, RegisterPage } from 'modules/home/pages';
import { MapLocationsPage } from 'modules/mapLocations/pages';
import { SettingsPage } from 'modules/settings/pages';
import { TopsPage } from 'modules/tops/pages';

const paths = {
  login: '/login',
  register: '/register',
  recovery: '/passwordreset',
  settings: '/settings',
  home: '/',
  food: '/food',
  bar: '/bar',
  entretainment: '/entretainment',
  tops: '/tops',
  mapLocations: '/mapLocations',
};

const sections = {
  login: {},
  register: {},
  recovery: {},
  settings: {},
  home: {},
  food: {},
  bar: {},
  entretainment: {},
  tops: {},
  mapLocations: {},
};

const routes = {
  login: {
    path: paths.login,
    title: 'routing.login',
    Component: LoginPage,
    isDisabled: false,
    isProtected: false,
  },
  register: {
    path: paths.register,
    title: 'routing.register',
    Component: RegisterPage,
    isDisabled: false,
    isProtected: false,
  },
  recovery: {
    path: paths.recovery,
    title: 'routing.recovery',
    Component: RecoveryPage,
    isDisabled: false,
    isProtected: false,
  },
  settings: {
    path: paths.settings,
    title: 'routing.settings',
    Component: SettingsPage,
    isDisabled: false,
    isProtected: true,
    Icon: SettingsIcon,
  },
  home: {
    path: paths.home,
    title: 'routing.home',
    Component: HomePage,
    isDisabled: false,
    isProtected: false,
  },
  food: {
    path: paths.food,
    title: 'routing.food',
    Component: FoodPage,
    isDisabled: false,
    isProtected: false,
  },
  bar: {
    path: paths.bar,
    title: 'routing.bar',
    Component: BarPage,
    isDisabled: false,
    isProtected: false,
  },
  entretainment: {
    path: paths.entretainment,
    title: 'routing.entretainment',
    Component: EntretainmentPage,
    isDisabled: false,
    isProtected: false,
  },
  tops: {
    path: paths.tops,
    title: 'routing.tops',
    Component: TopsPage,
    isDisabled: false,
    isProtected: false,
  },
  mapLocations: {
    path: paths.mapLocations,
    title: 'routing.mapLocations',
    Component: MapLocationsPage,
    isDisabled: false,
    isProtected: false,
  },
};

const sidebarRoutes = {
  settings: routes.settings,
};

const publicRoutes = {
  login: routes.login.path,
  register: routes.register.path,
  recovery: routes.recovery.path,
  home: routes.home.path,
  food: routes.food.path,
  bar: routes.bar.path,
  entretainment: routes.entretainment.path,
  tops: routes.tops.path,
  mapLocations: routes.mapLocations.path,
};

const commonRoutes = {
  home: routes.home,
};

const routingConfig = {
  paths,
  sections,
  routes,
  commonRoutes,
  sidebarRoutes,
  publicRoutes,
};

export default routingConfig;
export {
  paths,
  routes,
  sections,
  sidebarRoutes,
};
