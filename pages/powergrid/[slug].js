import React from 'react';
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
  return (
    <>
      <Header/>
      <div>
        <h3>{character.powerGrid}</h3>
        {' '}
        <p>of</p>
        {' '}
        <h3>{character.name}</h3>
        <div>
          <div>
            <div>Intelligence</div><div>{character.intelligence}</div>
          </div>
          <div>
            <div>Strength</div><div>{character.strength}</div>
          </div>
          <div>
            <div>Speed</div><div>{character.speed}</div>
          </div>
          <div>
            <div>Durability</div><div>{character.durability}</div>
          </div>
          <div>
            <div>Energy Projection</div><div>{character.energyProjection}</div>
          </div>
          <div>
            <div>Fighting Skills</div><div>{character.fightingSkills}</div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Powergrid;