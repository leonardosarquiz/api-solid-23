import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

//  postgresql://docker:docker@localhost:5430/new-api-solid-pg?schema=public

function genereteDatabaseURL(schema: string) {

  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>(<unknown>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()


    console.log(genereteDatabaseURL(schema))

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
})