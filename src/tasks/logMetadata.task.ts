import { createMetadata } from '../metadata/createMetadata.ts'

const metadata = createMetadata('[debugPolicyId]')

console.log('\n')
console.log('Debug Assets:\n', metadata.assets)
console.log('\n')
console.log(
  'Debug Metadata Stringified:\n',
  JSON.stringify(metadata.metadata, null, 2),
)
