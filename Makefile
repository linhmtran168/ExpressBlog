MODELS = test/models/*.js

test:
	./node_modules/.bin/mocha

test-model:
	./node_modules/.bin/mocha \
		$(MODELS)

.PHONY: test test-model
