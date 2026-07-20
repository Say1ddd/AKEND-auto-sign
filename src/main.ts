import { setup } from './setup.ts'

async function main() {
  try {
    await setup()
  }
  catch (e) {
    console.error(`Initialization Error: ${e}`)
  }
}

main()
