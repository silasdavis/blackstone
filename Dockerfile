# For solc binary
FROM ethereum/solc:0.4.25 as solc-builder
# For burrow deploy - may need to synchronise with version used for chain service in docker-compose
FROM hyperledger/burrow:0.23.1-dev-2018-11-14-f23fae1e as burrow-builder
# Testing image
FROM alpine:latest
RUN apk --update --no-cache add \
  bash \
  coreutils \
  curl \
  git \
  g++ \
  jq \
  libc6-compat \
  make \
  nodejs \
  nodejs-npm \
  openssh-client \
  parallel \
  python \
  py-crcmod \
  tar

ARG INSTALL_BASE=/usr/local/bin
ARG USER=blackstone
ARG UID=2000
ARG GID=2001

COPY --from=burrow-builder /usr/local/bin/burrow $INSTALL_BASE/
COPY --from=solc-builder /usr/bin/solc $INSTALL_BASE/

# Run as unprivileged user
RUN echo aa addgroup -g $GID -S $USER adduser -S -D -u $UID $USER $USER
RUN addgroup -g $GID -S $USER && adduser -S -D -u $UID $USER $USER
USER $USER:$USER
