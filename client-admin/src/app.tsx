import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading, SettingDrawer} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {getInfo as getMemberInfo} from '@/services/comm/Member';
import defaultSettings from '../config/defaultSettings';
import {getCurrentSession, setCurentSession} from '@/services/request';
import {getPubSetting, getSetting} from "@/services/comm/Setting";

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  currentSession?: CurrentSession;
  loading?: boolean;
  fetchSettings?: (includePerson: boolean) => Promise<Partial<LayoutSettings>>;
  fetchSession?: (currentSession: CurrentSession) => Promise<CurrentSession | undefined>;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {

  // 用户会话信息管理
  const fetchSession = async (currentSession?: CurrentSession) => {
    if (currentSession !== undefined) {
      setCurentSession(currentSession);
    }
    return getCurrentSession();
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const memberInfo = await getMemberInfo();
      return {...memberInfo};
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 加载系统配置
  const fetchSettings = async (includePerson?: boolean) => {
    const pubSettings = await getPubSetting();
    // 是否加载个人配置
    if (includePerson) {
      const personSettings = await getSetting();
      return {...defaultSettings, ...pubSettings, ...personSettings};
    }
    return {...defaultSettings, ...pubSettings};
  }

  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentSession = await fetchSession();
    const currentUser = await fetchUserInfo();
    const settings = await fetchSettings(true);
    return {
      fetchUserInfo,
      fetchSession,
      currentSession,
      currentUser,
      settings
    };
  }

  // 登录页面加载信息
  const settings = await fetchSettings();
  return {
    fetchUserInfo,
    fetchSession,
    settings
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.nickName,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
