BABEL = node_modules/.bin/babel
BROWSERIFY = node_modules/.bin/browserify
ESLINT = node_modules/.bin/eslint
LOG = printf '%-12s  %s\n'
MOCHA = node_modules/.bin/mocha
NODE_SASS = node_modules/.bin/node-sass -i --source-map true
NPM = npm

BABEL_OPTS = -s 'inline'
BROWSERIFY_OPTS = -d

JS_FILES    = $(shell find src -name *.js)
JSX_FILES   = $(shell find src -name *.jsx)
SRC_FILES   = $(JS_FILES) $(JSX_FILES)
BUILD_FILES = $(shell sed -e 's:src/:build/:g' \
													-e 's:\.jsx:\.js:g' <<< "$(SRC_FILES)")
SASS_FILES  = $(shell sed -e 's:src/:build/:g' \
													-e 's:\.jsx:\.sass:g' <<< "$(JSX_FILES)")

VENDOR_PACKAGES = $(shell node --print 'Object.keys(require("./package.json").dependencies).join("\n")')
VENDOR_EXCLUDES = $(patsubst %,-x %,$(VENDOR_PACKAGES))
VENDOR_INCLUDES = $(patsubst %,-r %,$(VENDOR_PACKAGES))

.PHONY: all
all: dist/index.html dist/bundle.js dist/vendor.js dist/styles.css

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
	@$(LOG) 'Babel (JS)' "$< -> $@"
	@$(BABEL) $(BABEL_OPTS) --presets 'es2015,react' $< > $@

build/%.js: build/%.nostyle.jsx
	@mkdir -p $(@D)
	@$(LOG) 'Babel (JSX)' "$< -> $@"
	@$(BABEL) $(BABEL_OPTS) --presets 'es2015,react' $< > $@

build/%.nostyle.jsx: src/%.jsx
	@mkdir -p $(@D)
	@$(LOG) 'Strip Styles' "$< -> $@"
	@awk '/<style>/{isStyle=1} /<\/style>/{isStyle=0;next} isStyle==0' < $< > $@

build/%.sass: src/%.sass
	@mkdir -p $(@D)
	@

build/%.sass: src/%.jsx
	@mkdir -p $(@D)
	@$(LOG) 'Extract SASS' "$< -> $@"
	@awk '/<style>/{isStyle=1;next} /<\/style>/{isStyle=0} isStyle' < $< > $@

build/styles.sass: src/index.sass $(SASS_FILES)
	@mkdir -p $(@D)
	@$(LOG) 'Concat SASS' "build/*.sass -> $@"
	@cat $< $(SASS_FILES) > $@

dist/index.html: src/index.html
	@mkdir -p $(@D)
	@$(LOG) 'Copy' "$< -> $@"
	@cp -f $< $@

dist/bundle.js: build/index.js $(BUILD_FILES)
	@mkdir -p $(@D)
	@$(LOG) 'Browserify' "$< -> $@"
	@$(BROWSERIFY) $(BROWSERIFY_OPTS) $(VENDOR_EXCLUDES) $< > $@

dist/vendor.js: $(VENDOR_PACKAGES:%=node_modules/%)
	@mkdir -p $(@D)
	@$(LOG) 'Browserify' "$< -> $@"
	@$(BROWSERIFY) $(VENDOR_INCLUDES) > $@

dist/styles.css: build/styles.sass
	@mkdir -p $(@D)
	@$(LOG) 'Compile SASS' "$< -> $@"
	@$(NODE_SASS) < $< > $@
