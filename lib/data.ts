export type Service = { id:string; title:string; short:string; image:string; tags:string[]; number:string; detail:string; deliverables:string[] };
export type Project = { id:string; title:string; sector:string; location:string; image:string; summary:string; year:string; detail:string; scope:string[] };

// Client-provided artwork images are intentionally assigned one-to-one.
// The same image is not reused between Services, Gallery or Products.
export const services: Service[] = [
 {id:'educational-murals',number:'01',title:'3D Educational Wall Painting',short:'Immersive learning murals that turn large walls into visual teaching surfaces.',image:'/client-images/DSC_0524.JPG',tags:['3D Art','Learning','Schools'],detail:'A knowledge-led mural centred on music, culture and visual storytelling, suitable for educational spaces where the wall itself becomes part of the learning experience.',deliverables:['Theme and subject planning','Wall-wise composition','Perspective and depth treatment','On-site artist execution','Final detailing and quality review']},
 {id:'classroom-art',number:'02',title:'Classroom Wall Painting',short:'Age-appropriate scenes and storytelling designed for everyday classrooms.',image:'/client-images/DSC_0514.JPG',tags:['Classrooms','Kids','Storytelling'],detail:'A colourful school facade using movement, characters and nature to create a more energetic and welcoming environment for children.',deliverables:['Classroom visual planning','Character and scene artwork','Colour composition','On-site painting','Touch-up and handover']},
 {id:'educational-murals-2',number:'03',title:'Educational Murals',short:'Large-format murals for libraries, corridors, campuses and institutional spaces.',image:'/client-images/DSC_0518.JPG',tags:['Murals','Culture','Learning'],detail:'A story-led educational mural combining a natural setting, teacher-led learning and cultural imagery for a memorable institutional wall.',deliverables:['Story and subject mapping','Large-format artwork','Wall preparation guidance','Artist team execution','Finishing and documentation']},
 {id:'school-wall-art',number:'04',title:'School Wall Art',short:'Complete school visual programs from concept to coordinated on-site execution.',image:'/client-images/DSC_0528.JPG',tags:['Schools','Campus','Beautification'],detail:'A complete school frontage transformed with colourful architecture, characters and decorative visual elements to create a strong first impression.',deliverables:['Campus visual audit','Wall-by-wall concepts','Colour and theme system','Multi-artist execution','Final quality inspection']},
 {id:'anganwadi',number:'05',title:'Anganwadi & Community Art',short:'Friendly, colourful environments designed around early learning and community use.',image:'/client-images/DSC_0574.JPG',tags:['Anganwadi','Community','Children'],detail:'A child-friendly outdoor wall environment using bright colours and playful visual elements to make a community learning space feel approachable and positive.',deliverables:['Early-learning theme selection','Child-friendly visual language','Interior and exterior concepts','Artist execution','Final clean-up and handover']},
 {id:'public-art',number:'06',title:'Public Space & Bridge Art',short:'High-impact civic artwork for public structures and high-visibility spaces.',image:'/client-images/DSC_0603.JPG',tags:['Public Art','Civic','Large Scale'],detail:'A dark, high-contrast space-themed wall treatment demonstrating how a large public surface can become a strong visual landmark.',deliverables:['Site measurement and planning','Public-facing concept','Large-format execution','Multi-zone coordination','Finishing and inspection']},
 {id:'commercial',number:'07',title:'Private Sector Creative Art',short:'Distinctive visual installations for offices, hospitality, institutions and brands.',image:'/client-images/DSC_0639.JPG',tags:['Commercial','Interior','Culture'],detail:'An interior visual environment combining framed cultural artwork, maps and wall graphics to create a richer visitor and learning experience.',deliverables:['Space understanding','Creative concept options','Artwork and layout planning','Artist-led execution','Final presentation']},
 {id:'large-scale',number:'08',title:'Large Scale Art Execution',short:'Artist-led execution built for consistency, quality and demanding timelines.',image:'/client-images/DSC_0651.JPG',tags:['Multi-site','Team','Execution'],detail:'A completed educational environment showing the value of coordinated artist execution across a full campus rather than treating each wall as an isolated graphic.',deliverables:['Execution planning','Artist allocation','Daily quality coordination','Multi-location consistency','Completion tracking']},
 {id:'communication-art',number:'09',title:'Communication & Awareness Art',short:'Visual storytelling that communicates messages clearly across public and institutional spaces.',image:'/client-images/DSC_0548.JPG',tags:['Awareness','Messaging','Public'],detail:'A public-facing awareness wall using simple characters, nature and written messaging to communicate clearly in an everyday school environment.',deliverables:['Message and audience mapping','Visual communication concept','Wall-wise composition','On-site execution','Final review and documentation']}
];

// Projects are intentionally NOT seeded into the public site.
// Admin users create and manage projects from the Admin dashboard.
export const projects: Project[] = [];

// Exactly ten curated gallery images. None are used by the service or product sets above.
export const galleryItems = [
 {id:'gallery-01',name:'School Entrance & Identity',image:'/client-images/DSC_0498.JPG',desc:'A school entrance brought to life with a colourful identity treatment.',detail:'Entrance-focused artwork where colour, lettering and visual storytelling work together to make the first arrival experience more welcoming.'},
 {id:'gallery-02',name:'School Front Visual Story',image:'/client-images/DSC_0500.JPG',desc:'A broad school frontage combining educational messaging and decorative artwork.',detail:'A facade composition that balances institutional information with hand-painted colour and visual character.'},
 {id:'gallery-03',name:'Learning Facade',image:'/client-images/DSC_0511.JPG',desc:'A blue-toned educational facade with illustrated storytelling.',detail:'A large exterior wall using characters, nature and learning imagery to make school architecture more engaging.'},
 {id:'gallery-04',name:'Campus Storytelling Wall',image:'/client-images/DSC_0522.JPG',desc:'A school building transformed with a continuous visual theme.',detail:'A wide facade treatment designed to connect multiple architectural surfaces through one consistent visual language.'},
 {id:'gallery-05',name:'Cultural Heritage Scene',image:'/client-images/DSC_0534.JPG',desc:'A detailed heritage-inspired mural for a strong public visual statement.',detail:'A richly illustrated cultural scene showing how traditional stories and large-scale painted surfaces can work together.'},
 {id:'gallery-06',name:'Science & Discovery Wall',image:'/client-images/DSC_0550.JPG',desc:'A science-led mural bringing curiosity and discovery into architecture.',detail:'A wall composition combining a human portrait, rocket imagery and a landscape to create a discovery-focused visual story.'},
 {id:'gallery-07',name:'Playground Environment',image:'/client-images/DSC_0579.JPG',desc:'A colourful outdoor play area integrated into the campus environment.',detail:'A large playground reference where equipment, open space and campus colour create a lively environment for children.'},
 {id:'gallery-08',name:'Interactive Learning Room',image:'/client-images/DSC_0590.JPG',desc:'An active classroom environment supported by visual learning artwork.',detail:'An interior classroom setting where illustrated walls support a group learning experience and add energy to the room.'},
 {id:'gallery-09',name:'Alphabet Learning Room',image:'/client-images/DSC_0647.JPG',desc:'A full learning wall system built around colourful educational graphics.',detail:'A classroom environment using alphabet, numbers, objects and bold colour blocks to create an immersive early-learning space.'},
 {id:'gallery-10',name:'Sports & Teamwork Mural',image:'/client-images/DSC_0661.JPG',desc:'A sports-focused artwork celebrating movement, teamwork and activity.',detail:'A dynamic sports scene designed to bring movement and physical activity into the visual identity of a school or community space.'}
];

export const productImages = [
 '/client-images/DSC_0587.JPG',
 '/client-images/DSC_0611.JPG',
 '/client-images/DSC_0625.JPG',
 '/client-images/DSC_0640.JPG',
 '/client-images/DSC_0653.JPG',
 '/client-images/DSC_0658.JPG'
];

export const themes = [
{name:'School Campus Stories',image:'/client-images/DSC_0518.JPG',desc:'Facades, identity, storytelling',detail:'Colourful school environments, campus stories and visual identity-led artwork.'},
 {name:'Nature & Community',image:'/client-images/DSC_0616.JPG',desc:'Outdoor learning, greenery',detail:'Nature, play and community themes for welcoming outdoor spaces.'},
 {name:'Culture & Heritage',image:'/client-images/DSC_0535.JPG',desc:'Tradition, identity, history',detail:'Heritage-inspired artwork and cultural stories adapted to large architectural surfaces.'},
{name:'Early Learning',image:'/client-images/DSC_0653.JPG',desc:'Children, colour, discovery',detail:'Friendly visual environments designed around children, early learning and school identity.'},
 {name:'Science & Discovery',image:'/client-images/DSC_0626.JPG',desc:'STEM, knowledge, curiosity',detail:'Science-led visual stories for classrooms, labs and learning corridors.'},
 {name:'Visual Learning Systems',image:'/client-images/DSC_0660.JPG',desc:'Interactive walls, graphics',detail:'Immersive classroom artwork combining information, colour and visual discovery.'}
];

export const stats = [
 {value:'150+',label:'art projects completed in one district'},
 {value:'40+',label:'districts reached through expanded operations'},
 {value:'09',label:'commercial art capabilities'},
 {value:'1 TEAM',label:'artist-led execution from concept to handover'}
];
