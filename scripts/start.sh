#!/bin/sh

export PATH=`pwd`/bin:$PATH

# 输出环境变量的调试的信息
env

if [ -f "node_modules.tgz" ]; then
    tar zxf node_modules.tgz
    rm -f node_modules.tgz
fi

if [ -f "dist.tgz" ]; then
    rm -rf dist
    tar zxf dist.tgz
    rm -f dist.tgz
fi

if [ -f "static.tgz" ]; then
    rm -rf static
    tar zxf static.tgz
    rm -f static.tgz
fi

# NODE_CONFIG_DIR=../conf node deployToBos.js
pm2 start pm2.json

