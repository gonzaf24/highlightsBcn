import { SettingsIcon } from 'assets/icons';
import {
  BarPage, InstagrammablePage, RooftopsPage, SpeakeasyPage, TerracesPage,
} from 'modules/bar/pages';
import { EntertainmentPage, NightlifePage, RumbaFlamencoPage, TouristAttractionsPage } from 'modules/entertainment/pages';
import { EtnicalPage, FoodPage, TapasPage } from 'modules/food/pages';
import { HomePage, LoginPage, RecoveryPage, RegisterPage } from 'modules/home/pages';
import { MapLocationsPage } from 'modules/mapLocations/pages';
import { SettingsPage } from 'modules/settings/pages';
import { TopsPage } from 'modules/tops/pages';
import BuffetsPage from 'modules/tops/pages/BuffetsPage';
import BurgersPage from 'modules/tops/pages/BurgersPage';
import DesignPage from 'modules/tops/pages/DesignPage';
import TacosPage from 'modules/tops/pages/TacosPage';

const paths = {
  login: '/login',
  register: '/register',
  recovery: '/passwordreset',
  settings: '/settings',
  home: '/',
  food: '/food',
  bar: '/bar',
  entertainment: '/entertainment',
  tops: '/tops',
  mapLocations: '/mapLocations',
};

const foodPaths = {
  etnical: '/food/etnical',
  tapas: '/food/tapas',
};

const barPaths = {
  rooftops: '/bar/rooftops',
  speakeasy: '/bar/speakeasy',
  terraces: '/bar/terraces',
};

const entertainmentPaths = {
  nightlife: '/entertainment/nightlife',
  rumbaFlamenco: '/entertainment/rumbaFlamenco',
  touristAttractions: '/entertainment/touristAttractions',
};

const topsPaths = {
  buffets: '/tops/buffets',
  burgers: '/tops/burgers',
  design: '/tops/design',
  tacos: '/tops/tacos',
};

const sections = {
  login: {},
  register: {},
  recovery: {},
  settings: {},
  home: {},
  food: {},
  bar: {},
  entertainment: {},
  tops: {},
  mapLocations: {},
  etnical: {},
  tapas: {},
  rooftops: {},
  speakeasy: {},
  terraces: {},
  nightlife: {},
  rumbaFlamenco: {},
  touristAttractions: {},
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
  entertainment: {
    path: paths.entertainment,
    title: 'routing.entertainment',
    Component: EntertainmentPage,
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

const foodRoutes = {
  etnical: {
    path: foodPaths.etnical,
    title: 'routing.etnical',
    Component: EtnicalPage,
    isDisabled: false,
    isProtected: false,
  },
  tapas: {
    path: foodPaths.tapas,
    title: 'routing.tapas',
    Component: TapasPage,
    isDisabled: false,
    isProtected: false,
  },
};

const barRoutes = {
  terraces: {
    path: barPaths.terraces,
    title: 'routing.terraces',
    Component: TerracesPage,
    isDisabled: false,
    isProtected: false,
  },
  rooftops: {
    path: barPaths.rooftops,
    title: 'routing.rooftops',
    Component: RooftopsPage,
    isDisabled: false,
    isProtected: false,
  },
  speakeasy: {
    path: barPaths.speakeasy,
    title: 'routing.speakeasy',
    Component: SpeakeasyPage,
    isDisabled: false,
    isProtected: false,
  },
  instagrammable: {
    path: '/bar/instagrammable',
    title: 'routing.instagrammable',
    Component: InstagrammablePage,
    isDisabled: false,
    isProtected: false,
  },
};

const entertainmentRoutes = {
  nightlife: {
    path: entertainmentPaths.nightlife,
    title: 'routing.nightlife',
    Component: NightlifePage,
    isDisabled: false,
    isProtected: false,
  },
  rumbaFlamenco: {
    path: entertainmentPaths.rumbaFlamenco,
    title: 'routing.rumbaFlamenco',
    Component: RumbaFlamencoPage,
    isDisabled: false,
    isProtected: false,
  },
  touristAttractions: {
    path: entertainmentPaths.touristAttractions,
    title: 'routing.touristAttractions',
    Component: TouristAttractionsPage,
    isDisabled: false,
    isProtected: false,
  },
};

const topsRoutes = {
  buffets: {
    path: topsPaths.buffets,
    title: 'routing.buffets',
    Component: BuffetsPage,
    isDisabled: false,
    isProtected: false,
  },
  burgers: {
    path: topsPaths.burgers,
    title: 'routing.burgers',
    Component: BurgersPage,
    isDisabled: false,
    isProtected: false,
  },
  tacos: {
    path: topsPaths.tacos,
    title: 'routing.tacos',
    Component: TacosPage,
    isDisabled: false,
    isProtected: false,
  },
  design: {
    path: topsPaths.design,
    title: 'routing.design',
    Component: DesignPage,
    isDisabled: false,
    isProtected: false,
  },
};

const publicValidRoutes = {
  ...routes,
  ...foodRoutes,
  ...barRoutes,
  ...entertainmentRoutes,
  ...topsRoutes,
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
  entertainment: routes.entertainment.path,
  tops: routes.tops.path,
  mapLocations: routes.mapLocations.path,
  etnical: foodRoutes.etnical.path,
  tapas: foodRoutes.tapas.path,
  rooftops: barRoutes.rooftops.path,
  speakeasy: barRoutes.speakeasy.path,
  terraces: barRoutes.terraces.path,
  instagrammable: barRoutes.instagrammable.path,
  nightlife: entertainmentRoutes.nightlife.path,
  rumbaFlamenco: entertainmentRoutes.rumbaFlamenco.path,
  touristAttractions: entertainmentRoutes.touristAttractions.path,
  buffets: topsRoutes.buffets.path,
  burgers: topsRoutes.burgers.path,
  design: topsRoutes.design.path,
  tacos: topsRoutes.tacos.path,
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
  publicValidRoutes,
};

export default routingConfig;
export {
  barRoutes,
  entertainmentRoutes,
  foodRoutes,
  paths,
  publicValidRoutes,
  routes,
  sections,
  sidebarRoutes,
  topsRoutes,
};
