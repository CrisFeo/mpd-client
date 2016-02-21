BABEL = node_modules/.bin/babel -s 'inline'
BROWSERIFY = node_modules/.bin/browserify -d
ESLINT = node_modules/.bin/eslint
MOCHA = node_modules/.bin/mocha
NPM = npm

SRC_FILES = $(shell find src -name *.js -o -name *.jsx)
BUILD_FILES = $(shell printf '%s\n' $(SRC_FILES) | \
									    sed 's:^src:build:g' | \
											sed 's:jsx$$:js:g')

.PHONY: all
all: $(BUILD_FILES)
	@mkdir -p dist
	@$(BROWSERIFY) build/index.js > dist/index.js
	@echo 'Browserify: build/index.js -> dist/index.js'
	cp -f src/index.html dist/index.html

.PHONY: clean
clean:
	rm -rf build dist

.PHONY: lint
lint:
	@$(ESLINT) $(SRC_FILES)

.PHONY: setup
setup:
	@$(NPM) install

.PHONY: test
test:
	@$(MOCHA) test

build/%.js: src/%.js
	@mkdir -p $(@D)
	@$(BABEL) --presets 'es2015' $< > $@
	@echo "Babel (JS): $< -> $@"

build/%.js: src/%.jsx
	@mkdir -p $(@D)
	@$(BABEL) --presets 'es2015,react' $< > $@
	@echo "Babel (JSX): $< -> $@"
