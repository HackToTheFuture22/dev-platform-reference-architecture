#!/bin/sh
helm repo add traefik https://traefik.github.io/charts
helm repo add crossplane-stable https://charts.crossplane.io/stable

## Apple intel chip setup
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Installing Apple Intel dependencies"
    (curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.27.0/pack-v0.27.0-macos.tgz" | sudo tar -C /usr/local/bin/ --no-same-owner -xzv pack)
else 
    echo "Installing Linux x86_64 dependencies"
    (curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.27.0/pack-v0.27.0-linux.tgz" | sudo tar -C /usr/local/bin/ --no-same-owner -xzv pack)
fi

