IMAGE=jojomi/hugo
CONTAINER="hugo-container"
PORT?=1313
URL?=0.0.0.0
HUGO_BASE_URL?=$(shell docker-ip)
COMMAND?=docker run --rm --name $(CONTAINER) -P -p $(PORT):$(PORT) -e HUGO_BASE_URL=http://$(HUGO_BASE_URL):$(PORT) -v ${PWD}/site:/src -it $(IMAGE)

.PHONY: clean serve build-site dev post

default: serve

post:
	$(COMMAND) hugo new blog/new-post.md

dev:
	$(COMMAND) sh

build:
	$(COMMAND) hugo

serve:
	$(COMMAND) hugo server -b ${HUGO_BASE_URL} --bind=$(URL) --watch --buildDrafts --disableFastRender
