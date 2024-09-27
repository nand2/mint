import { getAddress, encodeAbiParameters } from 'viem'
import hre from 'hardhat'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { toByteArray } from '@visualizevalue/mint-utils'
import { expect } from 'chai'
import { P5_HELLO_WORLD_HTML_URL, P5_HELLO_WORLD_IMG, P5_HELLO_WORLD_SCRIPT, P5_HELLO_WORLD_SCRIPT_URL } from './constants'
import { baseFixture, itemMintedFixture } from './fixtures'

// Need to test on mainnet fork for this to work...
// `FORK_MAINNET=true hh test test/P5Renderer.ts`
describe.skip('P5Renderer', () => {
  it('should expose the name an version', async () => {
    await loadFixture(baseFixture)

    const renderer = await hre.viem.deployContract('P5Renderer', [])

    expect(await renderer.read.name()).to.equal('P5 Renderer')
    expect(await renderer.read.version()).to.equal(1)
  })

  it('allows minting (and reading) artifacts', async () => {
    const { mint } = await loadFixture(itemMintedFixture)

    const p5Renderer = await hre.viem.deployContract('P5Renderer', [])

    await expect(mint.write.registerRenderer([p5Renderer.address]))
      .to.emit(mint, 'NewRenderer')
      .withArgs(getAddress(p5Renderer.address), 1n)

    const encodedArtifact = encodeAbiParameters(
      [ { type: 'string', name: 'image' }, { type: 'string', name: 'script' } ],
      [ P5_HELLO_WORLD_IMG, P5_HELLO_WORLD_SCRIPT ],
    )

    await expect(mint.write.create([
      'Hello World',
      '',
      toByteArray(encodedArtifact),
      1,
      19n,
    ])).to.be.fulfilled

    // @ts-ignore
    const dataURI = await mint.read.uri([2n], { gas: 1_000_000_000 })

    const json = Buffer.from(dataURI.substring(29), `base64`).toString()
    const data = JSON.parse(json)

    expect(data.image).to.equal(P5_HELLO_WORLD_IMG)
    expect(data.script_url).to.equal(P5_HELLO_WORLD_SCRIPT_URL)
    expect(data.animation_url).to.equal(P5_HELLO_WORLD_HTML_URL)
  })

})
