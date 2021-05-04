import React from 'react';
import {
  childrenFunctionInterface,
  UserInterface,
  isLogin,
  role,
} from '../constants/interfaces';
import Cookies from 'js-cookie';
import {
  getUser,
  login as loginFunc,
  forget as forgetFunc,
} from '../apis/auth';
import Api from '../apis/api';
import {
  Output,
  JobInterface,
  SettingInterface,
} from './../constants/interfaces';

interface AuthContextInterface {
  isLogin: isLogin;
  loading: boolean;
  user: UserInterface | undefined;
  roles: [role] | undefined;
  job: JobInterface | undefined;
  settings: SettingInterface | undefined;
  setUser?: any;
  setJob?: any;
  login?(email: string, password: string): Promise<Output>;
  logout?(): Promise<LogoutOutput>;
  forget?(email: string): Promise<Output>;
}

interface LogoutOutput {
  status: string;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  isLogin: 'PENDING',
  loading: true,
  user: undefined,
  roles: undefined,
  job: undefined,
  settings: undefined,
});

export const AuthProvider: React.FC<childrenFunctionInterface> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<UserInterface | undefined>(undefined);
  const [isLogin, setIsLogin] = React.useState<isLogin>('PENDING');
  const [roles, setRoles] = React.useState<[role] | undefined>(undefined);
  const [job, setJob] = React.useState<JobInterface | undefined>(undefined);
  const [settings, setSettings] = React.useState<SettingInterface | undefined>(
    undefined
  );

  React.useEffect(() => {
    async function loadUserFromCookies() {
      if (Cookies.get('token')) {
        Api.defaults.headers.Authorization = Cookies.get('token');
        await getUser().then(async (res) => {
          if (res.status === 'SUCCESS' && res.user) {
            setUser(res.user);
            setRoles(res.user.role);
            setJob(res.job);
            setSettings(res.settings);
            setIsLogin('TRUE');
          } else if (res.status === 'LOGOUT') {
            await logout().then(async (res) => {
              if (res.status === 'SUCCESS') {
                props.history?.push('/login');
              }
            });
          } else {
            loadUserFromCookies();
          }
        });
      } else {
        setIsLogin('FALSE');
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string): Promise<Output> => {
    var data: Output = { status: 'FAILED' };
    await loginFunc(email, password).then(async (res) => {
      if (res.status === 'SUCCESS' && res.token && res.user) {
        Cookies.set('token', res.token);
        Api.defaults.headers.Authorization = res.token;
        setUser(res.user);
        setRoles(res.user.role);
        setJob(res.job);
        setSettings(res.settings);
        setIsLogin('TRUE');
        data = { status: 'SUCCESS' };
      } else {
        data = { status: 'FAILED' };
      }
    });
    return data;
  };
  const forget = async (email: string): Promise<Output> => {
    var data: Output = { status: 'FAILED' };
    await forgetFunc(email).then(async (res) => {
      if (res.status === 'SUCCESS') {
        data = { status: 'SUCCESS' };
      } else {
        data = { status: 'FAILED' };
      }
    });
    return data;
  };
  const logout = async (): Promise<Output> => {
    delete Api.defaults.headers.Authorization;
    Cookies.remove('token');
    setUser(undefined);
    setIsLogin('FALSE');
    return {
      status: 'SUCCESS',
    };
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        loading,
        roles,
        user,
        job,
        settings,
        setUser,
        setJob,
        login,
        logout: logout,
        forget: forget,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  React.useContext<AuthContextInterface>(AuthContext);
