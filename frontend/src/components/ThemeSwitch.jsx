import Switch from '@mui/material/Switch';
import useDarkTheme from '../useDarkTheme';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

const label = { inputProps: { 'aria-label': 'theme switch' } };

export default function ThemeSwitch() {
  const {isThemeDark, toggleTheme} = useDarkTheme();
 
  return (
    <div id='themeSwitch'>
      {isThemeDark?<LightModeIcon/>:<NightlightIcon/>}
      
      <Switch {...label}  onClick={toggleTheme}/>
    </div>
  );
}