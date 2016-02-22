BABEL = node_modules/.bin/babel -s 'inline'
BROWSERIFY = node_modules/.bin/browserify -d
ESLINT = node_modules/.bin/eslint
LOG = printf '%-12s  %s\n'
MOCHA = node_modules/.bin/mocha
NODE_SASS = node_modules/.bin/node-sass -i --source-map true
NPM = npm

JS_FILES    = $(shell find src -name *.js)
JSX_FILES   = $(shell find src -name *.jsx)
SRC_FILES   = $(JS_FILES) $(JSX_FILES)
BUILD_FILES = $(shell sed -e 's:src/:build/:g' \
													-e 's:\.jsx:\.js:g' <<< "$(SRC_FILES)")
SASS_FILES  = $(shell sed -e 's:src/:build/:g' \
												  -e 's:\.jsx:\.sass:g' <<< "$(JSX_FILES)")


.PHONY: all
all: dist/index.html dist/index.js dist/styles.css

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
	@$(LOG) 'Babel (JS)' "$< -> $@"

build/%.js: build/%.nostyle.jsx
	@mkdir -p $(@D)
	@$(BABEL) --presets 'es2015,react' $< > $@
	@$(LOG) 'Babel (JSX)' "$< -> $@"

build/%.nostyle.jsx: src/%.jsx
	@mkdir -p $(@D)
	@awk '/<style>/{isStyle=1} /<\/style>/{isStyle=0;next} isStyle==0' < $< > $@
	@$(LOG) 'Strip Styles' "$< -> $@"

build/%.sass: src/%.jsx
	@mkdir -p $(@D)
	@awk '/<style>/{isStyle=1;next} /<\/style>/{isStyle=0} isStyle' < $< > $@
	@$(LOG) 'Extract SASS' "$< -> $@"

build/styles.sass: $(SASS_FILES)
	@mkdir -p $(@D)
	@cat $(SASS_FILES) > $@
	@$(LOG) 'Concat SASS' "build/*.sass -> $@"

dist/index.html: src/index.html
	@mkdir -p $(@D)
	@cp -f $< $@
	@$(LOG) 'Copy' "$< -> $@"

dist/index.js: build/index.js $(BUILD_FILES)
	@mkdir -p $(@D)
	@$(BROWSERIFY) $< > $@
	@$(LOG) 'Browserify' "$< -> $@"

dist/styles.css: build/styles.sass
	@mkdir -p $(@D)
	@$(NODE_SASS) < $< > $@
	@$(LOG) 'Compile SASS' "$< -> $@"
