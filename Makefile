BABEL = node_modules/.bin/babel
BROWSERIFY = node_modules/.bin/browserify
ESLINT = node_modules/.bin/eslint
MOCHA = node_modules/.bin/mocha
NPM = npm

SRC_FILES = $(shell find src -name *.js -o -name *.jsx)
BUILD_FILES = $(shell printf '%s\n' $(SRC_FILES) | \
									    sed 's:^src:build:g' | \
											sed 's:jsx$$:js:g')

dist/index.html: dist/index.js
	cp -f src/$(@F) $@

dist/index.js: $(BUILD_FILES)
	$(BROWSERIFY) -d -o $@ build/$(@F)

build/%.js: src/%.js
	$(BABEL) -s 'inline' -o $@ $<

build/%.js: src/%.jsx
	$(BABEL) -s 'inline' -o $@ $<

.PHONY: build_dirs
build_dirs:
	find src -type d | \
	sed 's:src:build:' | \
	xargs mkdir -p dist

.PHONY: build
build: build_dirs dist/index.html

.PHONY: clean
clean:
	rm -rf build dist

.PHONY: setup
setup:
	$(NPM) install

.PHONY: test
test:
	$(MOCHA) test

.PHONY: lint
lint:
	$(ESLINT) $(SRC_FILES)
