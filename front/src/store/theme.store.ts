import {
	create,
} from 'zustand'

import { LOCAL_STORAGE_KEYS } from '../common/constants/local-storage-keys.constant';
import { THEMES } from '../common/constants/themes';

interface IThemeState {
	theme: THEMES;
	setTheme: (newTheme: THEMES) => () => void
}

export const useTheme = create<IThemeState>((set,) => {
	return {
		theme:            (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME,) as THEMES | undefined) ?? THEMES.LIGHT,
		setTheme: 		  (newTheme: THEMES,): () => void => {
			return (): void => {
				set(() => {
					return {
						theme: newTheme,
					}
				},)

				localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, newTheme,)
			}
		},
	}
},)