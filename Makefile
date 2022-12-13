GIT_COMMIT = $(shell git rev-parse HEAD)

define is_installed
if ! command -v $(1) &> /dev/null; \
then \
	echo "$(1) not installed, please see $(shell pwd)/README.md - # Dev Prerequisites"; \
	exit; \
fi;
endef

asdf-is-installed:
	@$(call is_installed,asdf)

skaffold-is-installed:
	@$(call is_installed,skaffold)

kind-is-installed:
	@$(call is_installed,kind)

aws-cli-is-installed:
	@$(call is_installed,aws)

helm-is-installed:
	@$(call is_installed,helm)

docker-is-installed:
	@$(call is_installed,docker)

init:
	@bin/setup.sh
	@yarn prisma:client
	@yarn prisma:migrate

dev: init docker-is-installed
	@bin/run.sh

ensure-kind-cluster: kind-is-installed
	@./bin/ensure-kind-cluster dora-app

init-platform: init
	@bin/setup-platform-dev.sh
