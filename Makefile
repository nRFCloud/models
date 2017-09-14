.PHONY: clean

build/client.js: assets/test/client.ts dist node_modules/iris-web-api/index.bundle.js
	@mkdir -p $(dir $@)
	./node_modules/.bin/browserify $< -p [ tsify --noImplicitAny ] > $@

dist/generated: src/model/*.schema.json
	@mkdir -p $@
	node scripts/generate-base-models-from-schema.js src/model $@
	mkdir -p dist/model
	cp src/model/*.schema.json dist/model

dist: src/*.ts dist/generated
	@mkdir -p $@
	./node_modules/.bin/tsc

test-prepare: dist

clean:
	rm -rf dist
