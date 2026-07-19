import { init } from './init.ts'

async function main() {
  try {
    await init()
  }
  catch (e) {
    console.error(`Initialization Error: ${e}`)
  }
}

main()
