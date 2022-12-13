#!/bin/sh

set -e

for plugin in $(cat .tool-versions | cut -d' ' -f1)
do
  (asdf plugin list | grep $plugin > /dev/null 2>&1) || \
  (echo "Installing and updating asdf plugin $plugin..." && asdf plugin add $plugin && asdf plugin update $plugin)
done

# Install versions of system packages in .tools-version
asdf install
