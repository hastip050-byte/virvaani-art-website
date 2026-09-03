'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { ProjectCard } from '@/components/Cards';

type Project = {
  id: string;
  title: string;
  sector: string;
  location: string;
  image: string;
  summary: string;
  year: string;
  detail: string;
  scope: string[];
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 useEffect(() => {
  async function loadProjects() {
    try {
      const response = await fetch('/api/projects');

      if (!response.ok) {
        throw new Error('Failed to load projects');
      }

      const data = await response.json();

      console.log('PROJECTS:', data);

      setProjects(data);
    } catch (error) {
      console.error('PROJECT LOAD ERROR:', error);
      setError('Unable to load projects.');
    } finally {
      setLoading(false);
    }
  }

  loadProjects();
}, []);

  const cats = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.sector))),
  ];

  const shown =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.sector === filter);

  return (
    <>
      <Header />

      <PageHero
        eyebrow="Project Showcase"
        title="FROM CONCEPT TO FINISHED WALL."
        desc="A growing portfolio across schools, Anganwadi centres, public infrastructure and private-sector spaces."
        image="/images/selected-modern-01.jpg"
      />

      <main>
        <section className="section">
          <div className="container">

            <div className="filter-row">
              {cats.map((category) => (
                <button
                  type="button"
                  className={
                    filter === category
                      ? 'filter active'
                      : 'filter'
                  }
                  key={category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {loading && (
              <div className="projects-grid">
                <p>Loading projects...</p>
              </div>
            )}

            {!loading && error && (
              <div className="projects-grid">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && shown.length === 0 && (
              <div className="projects-grid">
                <p>No projects found.</p>
              </div>
            )}

            {!loading && !error && shown.length > 0 && (
              <div className="projects-grid">
                {shown.map((project) => (
                  <ProjectCard
                    key={project.id}
                    p={project}
                  />
                ))}
              </div>
            )}

          </div>
        </section>
      </main>

      
    <Footer />
    </>
  );
}