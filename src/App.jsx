import { useState } from 'react';
import data from './data.json';

import Ticker from './components/molecules/Ticker.jsx';
import NavBar from './components/molecules/NavBar.jsx';
import ProjectModal from './components/molecules/ProjectModal.jsx';

import Hero from './components/sections/Hero.jsx';
import IndexBand from './components/sections/IndexBand.jsx';
import Work from './components/sections/Work.jsx';
import Stack from './components/sections/Stack.jsx';
import Experience from './components/sections/Experience.jsx';
import Education from './components/sections/Education.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/sections/Footer.jsx';

export default function App() {
  const [project, setProject] = useState(null);

  return (
    <>
      <div className="bg-arctic" />
      <div className="bg-grain" />
      <div className="bg-grid" />

      <Ticker items={data.ticker} />
      <NavBar {...data.nav} />

      <main>
        <Hero
          hero={data.hero}
          person={data.person}
          stats={data.stats}
          modelUrl={data.site.model}
        />
        <IndexBand index={data.index} />
        <Work work={data.work} onOpenProject={setProject} />
        <Stack stack={data.stack} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Contact contact={data.contact} />
      </main>
      <Footer footer={data.footer} />
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  );
}
