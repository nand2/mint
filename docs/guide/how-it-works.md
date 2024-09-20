# How It Works

Mint is an opinionated protocol to enable artists to create, manage and sell
their collections on Ethereum, in an open yet self-controlled environment.

Creators deploy collection contracts via a Mint Factory.

Creators mint artifacts on these collections. The base implementation encourages
storing artifacts fully onchain, but creators are free to store
their art however they like.

Minted artifacts are open to be collected for 24 hours after creation.

Prices are tied 1:1 to the network (gas) cost of a mint on Ethereum.
50% of the proceeds go to the artist, 50% is burned as per the rules
of the Ethereum network. Creators can support the artist by minting
multiple of the token, which decreases this ratio in favor of the
artist.

There are no limits as to how many tokens can be purchased.

Artists can register custom renderer contracts for each token they create,
encouraging custom & novel ways to resolve and display their art.

An open source set of UI components and website building blocks enable
developers to host interfaces through which one can interact with the protocol
or artists to create their own self-owned websites to sell their art.