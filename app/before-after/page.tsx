 'use client';
import {useEffect,useState} from 'react';import Header from '@/components/Header';import Footer from '@/components/Footer';import PageHero from '@/components/PageHero';
type BA={id:string;title:string;before:string;after:string;detail:string};
export default function BeforeAfter(){const [items,setItems]=useState<BA[]>([]);useEffect(() => {
  fetch('/api/before-after')
    .then(r => r.json())
    .then(setItems)
    .catch(() => setItems([]));
}, []);
return <><Header/><PageHero eyebrow="Transformation" title="BEFORE / AFTER." desc="See how blank, ordinary surfaces can become purposeful visual environments." image="/images/selected-modern-01.jpg"/><main><section className="section"><div className="container ba-grid">{items.map(x=><article className="ba-card" key={x.id}><div className="ba-images"><div><small>BEFORE</small><img src={x.before} alt={`${x.title} before`}/></div><div><small>AFTER</small><img src={x.after} alt={`${x.title} after`}/></div></div><h3>{x.title}</h3><p>{x.detail}</p></article>)}</div></section></main><Footer/></>}
