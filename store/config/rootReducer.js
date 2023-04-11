import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'
import { reducer as registerReducer } from '@/store/slices/register';
import { reducer as authenReducer } from '@/store/slices/authen';
import { reducer as userInfoReducer } from '@/store/slices/userinfo';

const registerPersistConfig = {
  keyPrefix: 'persist-',
  key: 'register',
  storage: storage,
  blacklist: ['isError', 'errorData', 'isSuccess', 'isLoading', 'SuccessData'],
};

const authenPersistConfig = {
    keyPrefix: 'persist-',
    key: 'authen',
    storage: storage,
    blacklist: ['isError', 'errorData'],
    // blacklist: ['token'],
    // whitelist: ['token'],
  };

  const userInfoPersistConfig = {
    keyPrefix: 'persist-',
    key: 'userInfo',
    storage: storage,
    blacklist: [],
    // blacklist: ['token'],
    // whitelist: ['token'],
  };


const rootReducer = combineReducers({
  authen: persistReducer(authenPersistConfig, authenReducer),
  register: persistReducer(registerPersistConfig, registerReducer),
  userInfo: persistReducer(userInfoPersistConfig, userInfoReducer),
});

export default rootReducer;