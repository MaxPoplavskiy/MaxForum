import { Routes, Route } from 'react-router-dom';
import { Home } from '../modules/home/home.component';
import { useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../common/constants/local-storage-keys.constant';
import { THEMES } from '../common/constants/themes';
import { useTheme } from '../store/theme.store';

const AppRoutes = () => {
  const {
		setTheme,
	} = useTheme()

  useEffect(() => {
		const theme = (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME,) as THEMES | undefined) ?? THEMES.LIGHT

		setTheme(theme,)()
	}, [setTheme],)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
