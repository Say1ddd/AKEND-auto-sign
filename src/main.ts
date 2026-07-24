import { setup } from './setup.ts'

async function main() {
  try {
    await setup()
  }
  catch (e) {
    throw new Error(`Initialization Error: ${e}`)
  }
}

main()
