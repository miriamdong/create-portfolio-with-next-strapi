import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import fetchFromCMS from '../lib/service';

export default function Home({ ProjectItems }) {
  return (
    <Layout>
      <div className="entries">
        <div className="row justify-content-start  ">
          {ProjectItems.map((project) => (
            <div className="col-md-6">
              <div className="entry mb-3">
                <Link as={`/project/${project.slug}`} href="/project/[id]">
                  <div className="main-image">
                    <Image
                      src={project.image.name}
                      width={600}
                      height={400}
                      alt={project.Title}
                    />
                    <h1>{project.Title}</h1>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const ProjectItems = await fetchFromCMS('projects');
  // eslint-disable-next-line no-console
  console.log(ProjectItems);
  return {
    props: { ProjectItems },
    revalidate: 1,
  };
}
