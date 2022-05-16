import { gql, GraphQLClient } from "graphql-request"
import Image from "next/image";


export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    Headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })

  const query = gql`
    {
      characters {
        id
        name
        slug
        picture {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(query)
  const characters = data.characters

  return {
    props: {
      characters,
    }
  }
}

const Home = ({ characters }) => {
  console.log(characters)
  return (         
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12' >
          {characters.map((character, index) =>  
            <div key={index} className='col-span-1 lg:col-span-8' >
              <div>
                <h1 >
                {character.name}
                </h1>
                <Image
                  src={character.picture.url}
                  alt="Picture of ${character.name}"
                  width={500}
                  height={500}
                />
              </div>
            
            
            </div>
          )}
        
    </div>   
  )
}

export default Home;