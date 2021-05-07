/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
import Image from 'next/image';

import Layout from '../../components/Layout';
import fetchFromCMS from '../../lib/service';

const ProjectItem = ({ project }) => {
  return (
    <Layout>
      <div className="row">
        <div className="project-image text-center mb-4">
          <div className="col-md-12">
            {project.image
            && (
            <Image
              src={project.image.name}
              width={1000}
              height={500}
            />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="project-content">
          <div className="col-md-12">
            <div className="project-headline text-center m-2">
              <h1>{project.Title}</h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const projects = await fetchFromCMS('projects');

  return {
    paths: projects.map((project) => ({
      params: {
        slug: project.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = await fetchFromCMS(`projects?slug=${params.slug}`);

  return {
    props: { project: project[0] },
    revalidate: 1,
  };
}
export default ProjectItem;
