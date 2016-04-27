var http= require('http');
var fs = require('fs');
var qs = require('querystring');
var request = require('request');
var archiver = require('archiver');

//var zlib = require('zlib'); //单个文件压缩
//var qs = require('qs');
//var iconv = require('iconv-lite');

var helper = {
    initial: function () {
        this.createDirectory(path.join(dirPath, 'logs'));
        //var ftpPath = path.join(config.ftpPath);
        //this.createDirectory(config.ftpPath);
        //this.createDirectory(config.downloadPath);
        logger.info('initial node server');
    },

    deleteFile: function (path) {
        if (fs.existsSync(path)) {
            try {
                fs.unlinkSync(path)
            } catch (e) {
                logger.info("删除文件报错:"+e);
            }
            logger.info("删除文件:"+path);
        } else {
            logger.info(path+" 不存在");
        }
    },

    createDirectory: function (path) {
        console.log(path);
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    },

    removeDirectory: function (p) {
        var arr = [];
        if(this.isExist(p)) {
            arr = fs.readdirSync(p);
        }
        for(var index in arr) {
            var nPath = path.join(p, arr[index]);
            if (fs.statSync(nPath).isDirectory()) {
                this.removeDirectory(nPath)
            } else {
                this.deleteFile(nPath);
            }
        }
        if(this.isExist(p)) {
            try {
                fs.rmdirSync(p);
            }catch(e){
                console.log(e);
            }
        }
    },

    isExist: function (path) {
        return fs.existsSync(path);
    },

    getIndexName: function (index) {
        if (index.length < 8) {
            index = '0' + index;
            return this.getIndexName(index);
        } else {
            return index;
        }
    },

    writeFile: function (data) {
        console.log(util.format("persist data: %s", JSON.stringify(data)));
        fs.writeFileSync(this.persistPath(), JSON.stringify(data));
    },

    readFile: function () {
        return fs.readFileSync(this.persistPath(), {encoding: 'utf-8'});
    },

    uploadFile: function(filePath,mid,callback){
        var formData = {
            file: fs.createReadStream(filePath)
        };
        var url = "http://"+config.fileServer+":"+config.filePort+"/file/"+mid;
        request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
            callback(err,httpResponse,body);
        });
    },

    rename: function(oldpath,newpath) {
        var t = this;
        if (this.isExist(oldpath)) {
            fs.renameSync(oldpath, newpath);
            logger.info("重命名成功");
        }else {
            setTimeout(function () {
                t.rename(oldpath, newpath);
            }, 3000)
        }
    },

    persistPath: function () {
        return path.join(dirPath, "persist.json");
    },

    readDirectory : function(path){
        if(this.isExist(path)) {
            return fs.readdirSync(path);
        }
    },

    //文件名按规则+1
    checkFileName: function (name, arr, i) {
        var result = name;
        if (arr.indexOf(name)>-1) {
            var n = name.substr(0, name.lastIndexOf('.'));
            var s = name.substr(name.lastIndexOf('.'));
            var str = util.format("-(%d)",i-1);
            if (n.indexOf(str) > 0) {
                n = n.substr(0, n.lastIndexOf('-'));
            }
            result = util.format("%s-(%d)%s", n, i, s);
            return this.checkFileName(result, arr, ++i);
        }
        else {
            console.log(result);
            return result;
        }
    },

    //文件转换
    fileConvert: function (path, mid, cb) {
        var bodyData = qs.stringify({filepath: path, mid: mid.toString()});
        //bodyData = qs.stringify filepath: path
        console.log(bodyData, bodyData.length);
        var options = {
            method: 'POST',
            hostname: '127.0.0.1',
            port: 10286,
            path: "/Action/Start",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': bodyData.length
            }
        };

        var httpRequest = http.request(options, function (response) {
            logger.info(util.format("http post to FileConvert statusCode: %s"),response.statusCode);
            if (response.statusCode == 200) {
                return cb(null);
            }
            httpRequest.on('error', function (err) {
                if (err.code === 'ECONNREFUSED') {
                    logger.error('http post to FileConvert CONNECT REFUSED');
                    return cb(err);
                }
                httpRequest.write(iconv.encode(bodyData, 'GBK'));
                httpRequest.end();
            });
        });
    },
    compressDirectory:function(p,saveName,cb) {
        var archive = archiver('zip');
        var compressPath = path.join(dirPath, config.ftpPath, saveName + ".zip");
        output = fs.createWriteStream(compressPath);
        output.on('close', function () {
            logger.info("文件打包完成，压缩包大小 "+ archive.pointer()+" Bytes");
            return cb(null, compressPath);
        });
        output.on('error', function (err) {
            logger.info("打包文件报错 "+err);
            return cb(err);
        });
        archive.pipe(output);

        readDirectory = function (p) {
            var files = fs.readdirSync(p);
            for (var f in files) {
                var filePath = path.join(p, files[f]);
                if (fs.lstatSync(filePath).isFile()) {
                    //if(files[f].length>13) {  //只压缩批注文件
                    //console.log(filePath, '===');
                    archive.append(fs.createReadStream(filePath), {name: files[f]});
                    //}
                }
                else {
                    readDirectory(filePath);
                }
            }
        };
        readDirectory(p);
        archive.finalize();
    },
    httpRequestFiles:function(url,savePath,name){
        var f = request.get(url);
        f.on('response', function(response) {
            //console.log(savePath);
            //console.log(response.statusCode); // 200
            //console.log(response.headers['content-type']); // 'image/png'
            if(response.statusCode==200) {
                logger.info("下载资料成功：statusCode" + response.statusCode + " name:" + name);
            }
        });
        f.on('error', function(err) {
            logger.error("下载资料报错："+err);
        });
        if(this.isExist(savePath)) {
            f.pipe(fs.createWriteStream(path.join(savePath,name)));
        }
    }
};

exports = module.exports = helper;
