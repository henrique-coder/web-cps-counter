default:
    @just --list

lint:
    npx prettier --check "src" "public"
    npx eslint "src"

format:
    npx prettier --write "src" "public"
    npx eslint --fix "src"

install:
    npm install --upgrade
