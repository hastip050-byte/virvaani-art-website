import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

const credits = [
  ['Primary school with wall writing and map.jpg','Educational wall / school reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Primary_school_with_wall_writing_and_map.jpg'],
  ['Anganwadi center.jpg','Real Anganwadi centre reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Anganwadi_center.jpg'],
  ['Agartala Railway Station Mural.jpg','Large institutional mural reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Agartala_Railway_Station_Mural.jpg'],
  ['Jamia Metro Mural.jpg','Large narrative institutional mural reference','CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Jamia_Metro_Mural.jpg'],
  ['ISRO Wall Graffiti(4).JPG','Science / technology mural reference','License shown on source page','https://commons.wikimedia.org/wiki/File:ISRO_Wall_Graffiti(4).JPG'],
  ['Mural wall painting (8278462509).jpg','Public / bridge mural reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Mural_wall_painting_(8278462509).jpg'],
  ['Cafe Mondegar bar with mural.JPG','Commercial mural / hospitality reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Cafe_Mondegar_bar_with_mural.JPG'],
  ['Mumbai - Sassoon Docks Urban Art Festival Building.jpg','Large-scale urban mural reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Mumbai_-_Sassoon_Docks_Urban_Art_Festival_Building.jpg'],
  ['Man with Mural - Along Ghats - Varanasi - Uttar Pradesh - India (12499218704).jpg','Artist / execution reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Man_with_Mural_-_Along_Ghats_-_Varanasi_-_Uttar_Pradesh_-_India_(12499218704).jpg'],
  ['Wall Paintings Ahmedabad.JPG','Indian public wall-art reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Wall_Paintings_Ahmedabad.JPG'],
  ['Traditional wall painting by villagers, near Katni, M.P., India.jpg','Community wall-art reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Traditional_wall_painting_by_villagers,_near_Katni,_M.P.,_India.jpg'],
  ['Wall mural 06.jpg','Hand-painted Indian mural reference','License shown on source page','https://commons.wikimedia.org/wiki/File:Wall_mural_06.jpg'],
];

export default function Credits(){return <><Header/><PageHero eyebrow="Image Credits" title="REFERENCE PHOTOGRAPHY." desc="Some new visual references are sourced from Wikimedia Commons. They are reference photographs, not VIRVAANI ART project claims." image="/images/wildlife-corridor.jpg"/><main><section className="section"><div className="container credits-grid">{credits.map(([name,desc,license,url])=><article className="credit-card" key={url}><span className="eyebrow">Reference Image</span><h3>{name}</h3><p>{desc}</p><small>{license}</small><a href={url} target="_blank" rel="noreferrer">View source ↗</a></article>)}</div></section></main><Footer/></>}
