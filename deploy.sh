#!/bin/sh
set -e

zola build --output-dir public

mkdir -p /tmp/zola-deploy
cp -r public/. /tmp/zola-deploy/

cd /tmp/zola-deploy
git init
git config user.email "deploy@mrgreen.blog"
git config user.name "Deploy"
git remote add origin git@codeberg.org:mrgreen/mrgreen.codeberg.page.git
git add --all
git commit -m "deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push origin HEAD:pages --force

cd -
rm -rf /tmp/zola-deploy
echo "Done: mrgreen.codeberg.page"
