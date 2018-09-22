# Encrypted blob storage
Being worked on by: Silas

## Updates
The first couple of versions of Hoard have been released and subsequently open-sourced here: https://github.com/monax/hoard

# Contents
[[_TOC_]]

## Problem definition
This is a scratch pad for scoping this piece of work.

This piece of work is about providing off-chain privacy for documents/blobs
in a flexible way so that they can be referred to and managed from smart 
contracts. This is encryption at rest not about on-chain privacy.

### Stories

#### User
As a Active Agreements platform user I want to upload a ____ document by _____ ...


### Notes
Things to understand: 
- Relation to nightsky/general on-chain privacy 
- Key issuance/revocation
- Encryption workload (where performed?)
- Client-encryption vs server encryption (who sees the plaintext
- Envelope encryption
- Encryption headers (plaintext and ciphertext hash)
- Signing and digest verification
- Burrows integration (snatives?)
- Content-addressed storage (IPFS, S3, generic backends?)
- Access grants on contract
- Indexing and searching of store
- Append only interface? deletion by removing content key? Or do we need hard delete?
- Auditing of access for billing?


## Design
The basic storage model is that of a block-based key-value store. Keys will be canonical string of the canonical hash of the value. The value will be the 'ciphertext' encrypted bytes of the 'plaintext' or content bytes. The bytes probably have arbitrary structure but maybe they will contain some header that is readable, which could include encryption metadata and possibly file metadata. This is an open question: self-describing files that may leak some information or completely opaque.

**Some notation**
```
p, k, x, y, etc are all just sentences in the language of byte strings

p := plaintext or content 

(C, C') := cipher consisting of encryption algorithm C and decryption algorithm C'

E(k, p) := plaintext symmetrically encrypted by key k (for some suitable pair of algorithm and key (E, k))

A(pub_key(R), p) := plaintext asymmetrically encrypted by public key pub_key(R) of some key-pair R

p := A'(priv_key(R), A(pub_key(R), p)) where A' is the associated decryption algorithm for the cipher (A, A')

Or just:
p = A'(R, A(R, p))

h(x) := hash of byte string x by some secure hash function h, with len(h(x)) = len(k) for keys k from some fixed-length key subspace
```

### Envelope encryption
The content will be symmetrically encrypted with a content key which is a cryptographic key unique to that piece of content. We could encrypt the same content with different content keys leading to a different ciphertexts. For deduplication and referential transparency it is probably a feature not to do so. 

The content key itself can then be encrypted symmetrically by a master key (residing on some HSM-backed service) or asymmetrically to be shared as an 'access grant' (see [Access grants]).

This 'envelope encryption', that is using an intermediate content-specific key to encrypt the content and then encrypting the content key has a few advantages:

1. A single compromised content key does not compromise multiple pieces of content.
2. You can encrypt the content key with multiple different (possibly asymmetric) keys and share them to different individuals without having to duplicate and re-encrypt the entire content.
3. You can push the heavy workload of encrypting/decrypting blobs 'to the edge' away from a centralised (i.e. expensive, possible bottleneck) ACL-based key service that just has to encrypt the much smaller content key.
4. You can 'effectively delete' a file by deleting its content key provided you are tracking all the content key copies without having to to delete every copy of the file from your highly replicated file storage and without having to delete all copies of a multi-use 'master' key.

#### Deterministic encryption
To go further we can fix the content key of a piece of content as being its own hash, so:

```
ciphertext := E(h(p), p)
```

This has the nice property of making the content key recoverable from the content and giving a deterministic content hash in the underlying content-addressed file store. The address of a plaintext is:

```
h(ciphertext) = h(E(h(p), p))
```

An implication of this deterministically derived content key is that a particular hash of the content itself becomes a secret which needs to be kept as secret as the file itself. So clients would need to make sure they did not transfer that particular hash of the content in the clear. In reality this should not be too much of a problem because it is usually better to use a non-cryptographically secure (faster) digest algorithm if you just wish to verify integrity (which is the other occasion you might want to ship hashes around, though in our context that is baked into the file storage system).

##### Risks
With a suitably pre-image resistance hash (say SHA2 or SHA3 family) this 'convergent encryption' can be used safely see: https://en.wikipedia.org/wiki/Convergent_encryption and https://crypto.stackexchange.com/questions/729/is-convergent-encryption-really-secure/731#731).

However it is 'by design' vulnerable to known plaintext attacks, and this includes partially known plaintexts for example a known text with only small unknown portions, like a form with an account number or password. Where the amount of secret (unknown) information is small and it is possible for an attacker to obtain the non-secret information (I may have said the same thing twice here) then the plaintext will need to be uniquely salted.

##### Salting plaintext
It should be possible to non-destructively salt a plaintext so that the salt can easily be removed from a decrypted message without the salt needing to be shared separately from the content key. Since we are using a secure hash the salt can be added as a unambiguously delimited block prefix to the message before it is encrypted. The content key can be shared as usual and the salt can be trimmed after decryption.


### Addressing
Blobs will be stored by encrypted content hash. We may assume a subset of the IPFS API (https://github.com/ipfs/interface-ipfs-core) in our underlying storage backend as a reasonable model. Though we should abstract over that to allow for different backends. In particular we may want to use S3 particularly for MVP.

Using the deterministically generated content key we are able to establish the encrypted content address as above. This is the ultimate address for a blob. There are a few other ways we might want to reference a blob:

- By a non-secret (not `h(p)` which is the content key!) digest of the plaintext (something we can push to other so they can check if they have blob without revealing to us whether they do)
- By canonical index numeber; since we have a blockchain at our core we can obtain a total ordering of events and we could used this (with appropriate [Smart contract integration](integration with smart contracts)) to create a total ordering of files. This may have some powerful applications in terms of asserting timing relationships or causality (in a way that is relevant to legal engineering?)
- By a references to copies (i.e. non-canonical storage) of a blob (such as T&Cs on a website if the blob were the canonical T&Cs)
- By associated smart contract address. If each blob has an associate smart contract Again see [Smart contract integration]

### Indexing
We may want a searchable index of blob metadata. We may also want to establish aliases such as human readable names

### Access grants
An 'access grant' is an asymmetrically encrypted (for some cipher `(A, A')`) copy of a blobs content key to some recipient `R`:
 
```
grant := A(R, h(p))
```
 
 The recipient then decrypt with:
 
```
p = E'(A'(R, grant), ciphertext) = E'(A'(R, A(R, h(p))), E(h(p), p))
```

We can generate an access grant and securely post it to all parties by storing it in a smart contract.

### Smart contract integration
The initial idea is just to provided a secure encrypted blob store that has transparent/canonical references to off-chain blobs and that these references be stored in smart contracts. However in the context of the PaaS system it might be interesting to explore stronger coupling between entities in our smart contract world (EVM account/address/contract) and our file store. There may be technical and conceptual benefits to this seeing as we want to provide integration between the blob store and smart contrcts, such as autonomously issuing [Access grants](access grants) from smart contracts or providing an clear audit log linking legal or smart contract events with document uploads.

One idea is to represent every blob in our store with a unique corresponding smart contract, a 'blob contract', in the blockchain state. We could use the blob storage service to coordinate creating the contract and uploading the file to the storage back end (upload first, then push contract). This 'smart contract pointer' has a few nice properties:

- Makes the blob a 'first class' object in the EVM with which other contracts can interact
- Provides an in-contract location for metadata, access grant posting, and potentially many other things relating to the content. Though we would want to be careful about how much logic we pile on here.
- Provides a location to store multiple references to file (such as global index reference discussed above)
- Naturally associates a secret key to the blob by the relationship of an EVM address to a key pair, which is that the EVM address is a certain hash of a public key. You can generate the address without knowing the public key but if you start from generating the key pair and then derive the address you will know the private key that corresponds (and controls) the address. This may be relevant for [contract-issued access grants].

I was considering the idea of deriving the blob-associated EVM address from the blob's storage key. This would have to be via a hash (possibly just truncation) since the two key spaces (EVM address and domain of `h`) are not the same size. This would allow you to lookup metadata, find the smart contract representation, and retrieve the blob itself all from the content. However it has the following issues:

- Since we have no way to formally reserved address space in Burrow and since our storage key space is likely to be larger than the EVM address space we will have to deal with collisions (like in a hash table, some form of probing would work)
- We would not be able to mount blob contracts at an address where we control the account's private key since the address would be determined from the content and we have no way to find a key pair that would hash to it (entire security of Ethereum is based on this of course)

For those reasons to achieve much the same benefit it probably makes more sense to maintain a canonical 'blob index' contract (or contracts - we may be able to reserve a prefix of account addresses to store index shards that list the blob contract addresses) that allow you to look up the blob contract location.

#### Contract-issued access grants
It is a design goal for the platform (from conversation in #monax-paas) for contracts themselves to be able to grant access to blobs/documents. We have discussed how it is possible to issue an access grants to blobs to do this. This is a proposal to allow contracts to do this autonomously. 

##### Oracle-based
Contract posts 'access request' to contract blob (indicating smart contracts think this is an okay thing to do) that belongs to blob store. Blob store posts access grant there. This is much simpler...

##### Self-signing contract idea
**There are currently major issues with the implication of this design**

It would require an extension ot Burrow that I will call 'self-signing contracts' (might be a better name). These would be contracts for which Burrow itself (that is all validators) would have access to the controlling key-pair of the contract. There are various ways this could be implemented that I mention later.

If blob contracts are generated as self-signing contracts then we would introduce the following snative:

```
reencrypt(ciphertext, pub_key(R)) := A(pub_key(R), A'(self, ciphertext))
```

That is when passed a ciphertext encrypted with the contract's own public key `reencrypt` would obtain the plaintext using the contract's own private key and re-encrypt it with the key of the recipient R. `reencrypt` would only work in the context of a self-signing contract.

This resulting re-encryption could then be posted to the blob contract as an access grant, but all of this could be controlled at the smart contract level.

##### Communication with Burrow
This could be a good place to experiment with communicating with a Burrow chain by joining the Tendermint network and broadcasting transactions to it directly through the Tendermint RPC. This is related to notions of Burrow worker, but since that concept is not clearly specified at this stage I will refer to this as 'Burrow Emissary'.

To communicate with the chain generally we need some kind of ABI-awareness that is being worked on for worker-client. But in our case and for proof-of-concept purpose we might get away with sending precompiled transactions. We could do this with nothing more than Tendermint as a dependency (though it probably makes sense to use Burrow to share definitions of genesis and so on). Firing off precompiled 'hook' transactions could be a placeholder for more fully featured Burrow worker.

###### Implementing self-signing contracts
**This section is thinking in progress**

Leaving this here so I remember where I was, but doesn't really work:

To do this properly purely on the chain, that is with the same security assumptions as the consensus network, would require a threshold cryptosystem. (parity appear to have implemented such a system: https://github.com/paritytech/parity/wiki/Secret-Store)

Implementing self-signing contracts would require that every validator can gain access the key associated with a particular blob contract.

It is worth noting that we could achieve the same affect with a smaller number of keys or just a single key, but there is some elegance to the separation. Similarly we do not need to have a separate contract for each blob, but it seems nice to make use of the primitives that the EVM gives us.

We could generate keys and gossip them around. This is problematic because of where we generate them. We could generate at the proposer but this would require closer integration with the consensus process. More importantly it would create a single point of malicious intent when generating keys.


## Prototype
Will need to integrate with some underlying secrets store/crypto as a service. Review these:

- https://www.vaultproject.io/

- https://aws.amazon.com/kms/

- https://lyft.github.io/confidant/

### Vault
Written by Hashicorp in Go, open source. 

Seems like decent client library support

Transit mode (like KMS)

#### Features we might use

### KMS
AWS proprietary, rich client library support.

### Confidant
Written by Lyft in python.

## Specifications
This section is to draft the specific structure for headers, storage semantics, cryptographic primitives, and interfaces.
