import React from 'react';
import Image from 'next/image';
import { GraphQLClient } from 'graphql-request';
import { Header } from '../../components/layout/Header';
const url = process.env.ENDPOINT;
const graphcms = new GraphQLClient(url, {
    Headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
})

export async function getStaticProps({ params }) {  
  const { character } = await graphcms.request(
    `
    query Character($slug: String!) {
      character(where: { slug: $slug }) {
        id
        slug
        name
        gallery {
          url
          id
        }
        picture {
          url
        }
      }
    }  
    `,
    {
      slug: params.slug,
    }
  );      
    return {
      props: {
        character,
      }
    }
  }

export async function getStaticPaths() {
  const { characters } = await graphcms.request(
    `
    {
      characters {
        id
        slug
        name
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
        gallery {
          url
          id
        }
      }
    }
    `
  );

  return {
    paths: characters.map(({ slug }) => ({ 
      params: { slug },
    })),
    fallback: false,
  };
}



const Powergrid = ({ character }) => {
  console.log(character.gallery)
  const photos = character.gallery
  return (
    <>
      <Header/>
      <header>
        <h2>Gallery</h2>
        <Image
          src={character.picture.url}
          alt={character.name}
          width={60}
          height={60}
        />
        <h2>{character.name}</h2>
      </header>
      <main>
  
        {photos.map((photo) => (
          <Image 
            key={photo.id}
            src={photo.url}         
            alt={photo.id}
            width={200}
            height={200}
            objectFit="cover"
        />
        ))}
      </main>
      <div>
        
        
      </div>
    </>
  );
};
export default Powergrid;