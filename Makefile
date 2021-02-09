IMAGE=jojomi/hugo:latest
CONTAINER="hugo-container"
PORT?=1313
URL?=0.0.0.0
HUGO_BASE_URL?=$(shell docker-ip)
DATE?=$(shell date '+%Y-%m-%d')
COMMAND?=docker run --rm --name $(CONTAINER) -P -p $(PORT):$(PORT) -e HUGO_BASE_URL=http://$(HUGO_BASE_URL):$(PORT) -v ${PWD}/site:/src -it $(IMAGE)

.PHONY: serve build-site dev post help

default: serve

post: ## Creates a new post. First argument is location {either management or engineering} and the second the name of the file
	$(COMMAND) hugo new blog/$(TYPE)/$(DATE)-$(FILENAME).md

dev: ## Boots up the docker image with Hugo installed and ./site mounted at the default folder location and runs an interactive shell
	$(COMMAND) sh

build: ## Builds the website and outputs the generate html into site/public
	$(COMMAND) hugo

serve: ## Serves the website from memory on HUGO_BASE_URL and port 1313
	$(COMMAND) hugo server -b ${HUGO_BASE_URL} --bind=$(URL) --watch --buildDrafts --disableFastRender

help: ## Displays this help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'