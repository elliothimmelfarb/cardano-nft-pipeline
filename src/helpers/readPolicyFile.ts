import { PolicyId, Script } from 'https://deno.land/x/lucid@0.8.2/mod.ts'
import { getCollectionFileName } from './getCollectionFileName.ts'

export const readPolicyFile = async (): Promise<{
  policyId: PolicyId
  policyScript: Script
}> => {
  const fileData = await Deno.readFile(
    `${Deno.cwd()}/outputs/metadata/${getCollectionFileName()}_policy.json`,
  )
  return JSON.parse(new TextDecoder().decode(fileData))
}
