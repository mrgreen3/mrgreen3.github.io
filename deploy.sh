#!/bin/sh
set -e

rm -rf /tmp/zola-deploy
zola build --output-dir public --force
cp -r public/. /tmp/zola-deploy/

cd /tmp/zola-deploy
git init
git config user.email "deploy@mrgreen.blog"
git config user.name "Deploy"
git remote add origin git@codeberg.org:mrgreen/pages.git
git add --all
git commit -m "deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push origin HEAD:pages --force

cd -
rm -rf /tmp/zola-deploy
echo "Done: mrgreen.codeberg.page"
