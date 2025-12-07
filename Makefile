FIRST_TARGET := $(firstword $(MAKECMDGOALS))
ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

.PHONY: lint format install help %
.DEFAULT_GOAL := help

lint:
	npx prettier --check "**/*.{html,css,js,md,json,yaml}"

format:
	npx prettier --write "**/*.{html,css,js,md,json,yaml}"

install:
	npm install --upgrade

help:
	@echo "Available commands:"
	@echo "  lint       - Lint code"
	@echo "  format     - Format code"
	@echo "  install    - Install and upgrade dependencies"
	@echo "  help       - Show this help message"

%:
	@if [ "$(FIRST_TARGET)" = "install" ]; then \
		:; \
	else \
		@echo "make: *** Unknown target '$@'. Use 'make help' for available targets." >&2; \
		exit 1; \
	fi
