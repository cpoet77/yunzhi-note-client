import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { getInfo as getMemberInfo } from '@/services/comm/Member';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
export { requestConfig as request } from '@/services/request';

const isDev = process.env.NODE_ENV === 'development';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  userSession?: UserSession,
  loading?: boolean;
  refreshUserSession?: (token: string, expired: Date, clear: boolean) => Promise<UserSession | undefined>;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {
  const USER_SESSION_STORAGE_KEY = '$uesrSession';

  // 刷新用户会话信息
  const refreshUserSession = async (token: string | null = null, expired: Date | null = null, clear: boolean = false) => {
    if (clear) {
      localStorage.removeItem(USER_SESSION_STORAGE_KEY);
      return undefined;
    }
    if (token && expired) {
      const session = { token, expired };
      localStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(session));
      return (session as UserSession);
    }
    const session = localStorage.getItem(USER_SESSION_STORAGE_KEY);
    return session ? (JSON.parse(session) as UserSession) : undefined;
  };

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const memberInfo = await getMemberInfo();
      return memberInfo as CurrentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const userSession = await refreshUserSession();
    const currentUser = await fetchUserInfo();
    return {
      refreshUserSession,
      fetchUserInfo,
      userSession,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    refreshUserSession,
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs" key="docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
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
