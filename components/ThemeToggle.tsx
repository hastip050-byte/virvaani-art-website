'use client';
import {useEffect,useState} from 'react';
export default function ThemeToggle(){
 const [dark,setDark]=useState(true);
 useEffect(()=>{const saved=localStorage.getItem('virvaani-theme'); const isDark=saved!=='light'; document.documentElement.classList.toggle('dark',isDark); setDark(isDark)},[]);
 function toggle(){const next=!dark; setDark(next); document.documentElement.classList.toggle('dark',next); localStorage.setItem('virvaani-theme',next?'dark':'light');}
 return <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark and light mode"><span>{dark?'☾':'☀'}</span><small>{dark?'Dark':'Light'}</small></button>
}
