# The Factory

The Factory contract serves two basic purposes. Deploying and resolving
creator collections.

## Deploying Collections

First, it's the entry point for artists, through which they can deploy their own
collections without complicated dev knowledge or setup.

```solidity
/// @notice Deploy a new Mint contract with the specified metadata.
function create(
    string memory name,
    string memory symbol,
    string memory description,
    bytes[] calldata image
) external returns (address) {
    Mint mint = new Mint();

    mint.init(name, symbol, description, image, baseRenderer, msg.sender);

    address mintAddress = address(mint);

    creatorCollections[msg.sender].push(mintAddress);

    emit Created(msg.sender, mintAddress);

    return mintAddress;
}
```

While this is the preferred method of collection deployment, there is also the
option to create a "Clone" of the base Mint contract, which makes
deployment significantly cheaper, but introduces a small overhead on every
interaction with the contract. If you expect more than a hundred mints on your
collection, we recommend to call `create` instead of `clone`.

```solidity
/// @notice Deploy a copy of the base Mint contract.
function clone(
    string memory name,
    string memory symbol,
    string memory description,
    bytes[] calldata image
) external returns (address) {
    address mintAddress = Clone.clone(baseImplementation);

    Mint(mintAddress).init(name, symbol, description, image, baseRenderer, msg.sender);

    creatorCollections[msg.sender].push(mintAddress);

    emit Created(msg.sender, mintAddress);

    return mintAddress;
}
```

## Resolving Collections

Second, the Factory serves as a repository storing which collections were created by
whom and making that information available to DAPPs.

If you look closely at the above snippets you can see that each call writes 
the created collection address to `creatorCollections[msg.sender]`.
Client side applications can use this to show all collections created
by artists by calling `getCreatorCollections(address creator)`.

```solidity
/// @notice Access created collections without the need for historical syncs.
function getCreatorCollections(address creator) external view returns (address[] memory) {
    return creatorCollections[creator];
}
```

## Factory ABI

```json
[
  "error ERC1167FailedCreateClone()",
  "event Created(address indexed ownerAddress, address contractAddress)",
  "function clone(string name, string symbol, string description, bytes[] image) returns (address)",
  "function create(string name, string symbol, string description, bytes[] image) returns (address)",
  "function getCreatorCollections(address creator) view returns (address[])",
  "function initialize(address mint, address renderer)",
  "function version() pure returns (uint256)"
]
```

## Factory Deployments

- Mainnet: [`0xd717Fe677072807057B03705227EC3E3b467b670`](https://etherscan.io/address/0xd717Fe677072807057B03705227EC3E3b467b670)
- Optimism [`0xF79BFf74CE07d3aaE21c3Bb1988e7BDb4E31ABeb`](https://optimistic.etherscan.io/address/0xF79BFf74CE07d3aaE21c3Bb1988e7BDb4E31ABeb#code)
- Sepolia: [`0x750C5a6CFD40C9CaA48C31D87AC2a26101Acd517`](https://sepolia.etherscan.io/address/0x750C5a6CFD40C9CaA48C31D87AC2a26101Acd517)
- Holesky: [`0x445654af956500b600AdC4c1897Cc587FD5E17BB`](https://holesky.etherscan.io/address/0x445654af956500b600AdC4c1897Cc587FD5E17BB)