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
        description
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
        description
        picture {
          url
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

const Character = ({ character }) => {
  return (
    <>
      <Header/>
      <main>

        <div>
          <Image
            src={character.picture.url}
            alt={character.name}
            width={60}
            height={60}
          />
          <h2>
            {character.name} 
          </h2>
        </div>         
        <div>
          {character.description} 
        </div>
      </main>
    </>
  );
};
export default Character;
