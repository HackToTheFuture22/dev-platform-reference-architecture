#!/bin/sh
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Installing Apple Intel dependencies"
    (curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.27.0/pack-v0.27.0-macos.tgz" | sudo tar -C /usr/local/bin/ --no-same-owner -xzv pack)
else 
    echo "Installing Linux x86_64 dependencies";
    if command -v pack &> /dev/null; then \
        echo "'pack' already installed"
    else
        (curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.27.0/pack-v0.27.0-linux.tgz" | sudo tar -C /usr/local/bin/ --no-same-owner -xzv pack)
    	exit; \
    fi;
fi

