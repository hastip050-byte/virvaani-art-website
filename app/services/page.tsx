import Header from '@/components/Header'; import Footer from '@/components/Footer'; import PageHero from '@/components/PageHero'; import {ServiceCard} from '@/components/Cards'; import {prisma,ensureSeeded,parseJsonArray} from '@/lib/db';
export const dynamic='force-dynamic';
export default async function Services(){
 await ensureSeeded();
 const rows=await prisma.service.findMany({orderBy:{number:'asc'}});
 const services=rows.map(s=>({...s,tags:parseJsonArray(s.tags),deliverables:parseJsonArray(s.deliverables)}));
 return <><Header/><PageHero eyebrow="Our Services" title="ART SERVICES FOR EVERY KIND OF SPACE." desc="From educational walls to civic structures and commercial environments, VIRVAANI ART builds visual systems that belong to the space." image="/images/selected-modern-01.jpg"/><main><section className="section"><div className="container"><div className="cards-grid">{services.map(s=><div id={s.id} key={s.id}><ServiceCard s={s}/></div>)}</div></div></section></main><Footer/></>}
