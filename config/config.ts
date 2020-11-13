import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      name: 'test',
      path: '/test',
      component: './Test',
    },
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      wrappers: ['@/wrapper/loginGuard'],
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              name: 'dashboard',
              icon: 'dashboard',
              path: '/dashboard',
              component: './DashboardRender',
            },
            {
              name: 'management',
              icon: 'car',
              path: '/management',
              routes: [
                {
                  name: 'repertory',
                  path: '/management/repertory',
                  component: './Management/RepertoryRender',
                },
                {
                  name: 'createCar',
                  icon: 'smile',
                  hideInMenu: true,
                  path: '/management/createCar',
                  component: './Management/CreateCarRender',
                },
                {
                  name: 'propertySetting',
                  icon: 'smile',
                  path: '/management/propertysetting',
                  component: './Management/PropertySetting',
                  access: 'canVisitStoreProperty',
                },
              ],
            },
            {
              name: 'storeCreate',
              hideInMenu: true,
              path: '/stores/create',
              component: './Stores/CreateRender',
              access: 'canCreateStore',
            },
            {
              name: 'stores',
              icon: 'shop',
              path: '/stores',
              component: './Stores',
              access: 'canVisitStore',
            },
            {
              name: 'setting',
              icon: 'setting',
              path: '/setting',
              routes: [
                {
                  name: 'slide',
                  icon: 'smile',
                  path: '/setting/slide',
                  component: './SettingRender/SlideRender',
                },
                {
                  name: 'clause',
                  icon: 'smile',
                  path: '/setting/clause',
                  component: './SettingRender/ClauseRender',
                },
                {
                  name: 'fq',
                  icon: 'smile',
                  path: '/setting/fq',
                  component: './SettingRender/FqRender',
                },
                {
                  name: 'site',
                  icon: 'smile',
                  path: '/setting/site',
                  component: './SettingRender/SiteRender',
                },
                {
                  name: 'payNotices',
                  icon: 'smile',
                  path: '/setting/paynotices',
                  component: './SettingRender/PayNoticesPage',
                },
                {
                  name: 'coupons',
                  icon: 'smile',
                  path: '/setting/coupons',
                  component: './SettingRender/CouponsPage',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
