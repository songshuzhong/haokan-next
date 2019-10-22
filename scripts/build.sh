!#/bin/sh
APP_NAME="haokan-next"
OUTPUT_DIR="build"
TOOLS_DIR="build-tools"
baseVersion="1.0.0"
nodeVersion=`node --version|tr -cd "[0-9.]"`
wpVersion=`webpack -v|tr -cd "[0-9.]"`

rm -rf $OUTPUT_DIR
mkdir -p $OUTPUT_DIR

echo "\033[47;30;5m ======= base版本为: V$baseVersion , 当前nodejs版本为: V$nodeVersion, webpack版本为: V$wpVersion ========== \033[0m \n"

if [ $? -eq 0];then
    if expr $baseVersion \> $nodeVersion;then
        echo "\033[43;35m 开始安装 Node v$baseVersion ...\033[0n \n"
        mkdir -p $TOOLS_DIR
        #编译工具
        cd $TOOLS_DIR
        wget -r -nH --level=0 --cut-dirs=7 getprod@product.scm.baidu.com:/data/prod-64/baidu/third-party/nodejs/nodejs_6-2-2-1_PD_BL/  --user getprod --password getprod --preserve-permissions
        ls -l
        cd output/
        ls -l
        tar zxf nodejs.tar.gz
        export PATH=`pwd`/bin:$PATH
        cd ../../
        #安装依赖
        echo 'decompress node modules'
        npm install --production --registry=http://registry.npm.baidu-int.com
        newNodeVersion=`node --version|tr -cd "[0-9.]"`
        newWebpackVersion=`webpack -v|tr -cd "[0-9.]"`
        echo "\033[47;30;5m ======= 当前nodejs版本为: V$newNodeVersion, webpack版本为: V$newWebpackVersion ========== \033[0m \n"
    else
        echo "nodejs v$nodeVersion already started!"
    fi

fi
