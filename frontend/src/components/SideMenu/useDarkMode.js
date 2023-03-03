import { useState } from 'react';

export function useDarkMode() {
  const [theme, settheme] = useState('light');

  if (theme === 'dark') {
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.backgroundColor = '#191f24';
  } else {
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.backgroundColor = '#F2F2EE';
  }

  const toggleButton = () => {
    theme === 'light' ? settheme('dark') : settheme('light');
  };

  return [theme, toggleButton];
}
