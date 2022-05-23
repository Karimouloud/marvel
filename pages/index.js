import Link from "next/link";
import Image from 'next/image';
import { Header } from "../components/layout/Header"
import Head from "next/head";
import { GraphQLClient } from 'graphql-request';

const url = process.env.ENDPOINT;
const graphcms = new GraphQLClient(url, {
    Headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
})

export async function getStaticProps() { 
  const { characters } = await graphcms.request(
    `
      query Characters
        {
          characters {
            id
            slug
            name
            description
            powerGrid
            intelligence
            strength
            speed
            durability
            energyProjection
            fightingSkills
            picture {
              url
            }
          }         
        }
    `       
  );

  return {
    props: {
      characters
    }
  }
      
}

export default function Home({ characters }) {
  console.log(characters)
  return (
    <>
      
      <Head>
        <title>Marvel</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header/>
      <main>
        
          <h1>
            CHARACTERS
          </h1>
          <div>
            {characters.map((character) => {
            return (
              <div key={character.id}>   
                <h2>{character.name}</h2>
                <Image
                src={character.picture.url}
                alt={character.name}
                width={60}
                height={60}
                />
                <Link href={`/wiki/${character.slug}`} >
                      <a> 
                          <h3>Wiki</h3>
                      </a>
                </Link>
                <Link href={`/powergrid/${character.slug}`} >
                      <a> 
                      <h3>Power Grid</h3>
                      </a>
                </Link>
                <Link href={`/gallery/${character.slug}`} >
                      <a> 
                      <h3>Gallery</h3>
                      </a>
                </Link>
                      
              </div> 
            )}
            )}
          </div>
          
        
      </main>
    </>
  );
}