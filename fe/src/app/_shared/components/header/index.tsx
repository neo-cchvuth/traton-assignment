import { postLogout } from '@/redux/features/auth/reducers';
import { getUser } from '@/redux/features/user/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getToken } from '@/redux/utils/token';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Avatar from '../avatar';

import styles from './index.module.scss';

export default function Header() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userReducer.user);
  const router = useRouter();

  const logout = () => {
    dispatch(postLogout()).then(() => {
      router.push('/login');
    });
  };

  useEffect(() => {
    if (getToken()) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={styles.header}>
      {user && (
        <div className={styles['header__content']}>
          <div data-test="username">{user.username}</div>
          <Avatar seed={user.username} />
          <button data-test="logout" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
