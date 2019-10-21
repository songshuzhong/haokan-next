#!/usr/bin/env bash

export PATH=/home/scmtools/buildkit/node/node_8.10.0/bin:$PATH

node -v

cd $(readlink -f $(dirname $0))

rm -rf output
mkdir output

npx yarn

# compile
npx yarn build

# 清理开发环境的node依赖
rm -rf node_modules
rm -rf node_modules.tgz

mkdir -p output/bin
mkdir -p output/conf

cp -r `ls -a | grep -E "^(static|dist|next.config.js|pm2.json|startup.sh)$"` output/bin
cp deploy/start.sh output/bin
cp deploy/stop.sh output/bin
cp deploy/deployToBos.js output/bin
cp deploy/bcedeploywhitelist.txt output

# 将生产环境依赖包放入output
npx yarn --production --ignore-scripts
mv node_modules output/bin/

# 生成version.txt文件
version=$(sed -n '1p' BCLOUD  |  awk -F '"' '{print $2}')
branch=$(git rev-parse --short HEAD)
echo $version.$branch > output/bin/version.txt

cd output/bin/
tar zcf node_modules.tgz node_modules
rm -rf node_modules
tar zcf dist.tgz dist
rm -rf dist
tar zcf static.tgz static
rm -rf static
cd ../../
