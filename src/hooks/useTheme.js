import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

function useTheme() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggleTheme];
}

export default useTheme;
