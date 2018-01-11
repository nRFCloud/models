.PHONY: clean

build/client.js: assets/test/client.ts dist node_modules/iris-web-api/index.bundle.js
	@mkdir -p $(dir $@)
	./node_modules/.bin/browserify $< -p [ tsify --noImplicitAny ] > $@

dist/schema: dist/model/schema
	@mkdir -p $@
	node scripts/generate-base-models-from-schema.js src/model/schema $@

dist/model/schema: src/model/schema/*.json
	@mkdir -p $@
	cp src/model/schema/*.json $@

dist: src/*.ts dist/schema
	@mkdir -p $@
	./node_modules/.bin/tsc

test-prepare: dist

release: dist

clean:
	rm -rf dist
