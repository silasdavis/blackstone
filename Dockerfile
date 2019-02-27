ARG SOLC_VERSION=0.4.25
ARG BURROW_VERSION=0.24.0
# This container provides the test environment from which the various test scripts
# can be run
# For solc binary
FROM ethereum/solc:$SOLC_VERSION as solc-builder
# Burrow version on which Blackstone is tested
#FROM hyperledger/burrow:$BURROW_VERSION as burrow-builder
FROM quay.io/monax/burrow:0.24.0-dev-2019-02-26-8b59aade as burrow-builder
# Testing image
FROM alpine:3.8

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
  tar \
  shadow

ARG INSTALL_BASE=/usr/local/bin

ARG UID=0
ARG GID=0

# Create user and group unless they already exist
COPY ./scripts/ensure_user.sh $INSTALL_BASE/
RUN ensure_user.sh $UID $GID /home/api
USER $UID:$GID
WORKDIR /home/api


COPY --from=burrow-builder /usr/local/bin/burrow $INSTALL_BASE/
COPY --from=solc-builder /usr/bin/solc $INSTALL_BASE/
