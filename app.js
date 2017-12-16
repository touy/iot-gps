const async = require('async');
const express = require('express');
const app = express();
const uuidV4 = require('uuid/v4');
const nano = require('nano')('http://admin:admin@localhost:5984');
const LTCSERVICE = require('./ltctopup')();
//const nano = require('nano')('http://localhost:5984');
const cors = require('cors');
const base64 = require('file-base64');
const fs = require('fs');
var redis = require("redis");
var bluebird = require('bluebird');
const __browser = require('detect-browser');
var request = require('request');
r_client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var moment = require('moment-timezone');
var multer = require('multer');
var path = require('path');
var Client = require('node-rest-client').Client;
const _current_picture_path = __dirname+'/_doc_item_/';
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '_doc_item_')));
app.use('/temp', express.static(path.join(__dirname, 'temp')));




var passwordValidator = require('password-validator');
var passValidator = new passwordValidator();
var userValidator = new passwordValidator();
var phoneValidator = new passwordValidator();
phoneValidator
  .is().min(10) // Minimum length 8 
  .is().max(10) // Maximum length 100 
  .has().not().letters() // Must not have lowercase letters 
  .has().digits() // Must have digits 
  .has().not().symbols()
  .has().not().spaces() // Should not have spaces 
// start with 0205 , 0207, 0209 ,0202
userValidator
  .is().min(3) // Minimum length 8 
  .is().max(6) // Maximum length 100 
  //.has().uppercase()                              // Must have uppercase letters 
  .has().lowercase() // Must have lowercase letters 
  //.has().digits()                                 // Must have digits 
  .has().not().symbols()
  .has().not().spaces() // Should not have spaces 
//.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values 
passValidator
  .is().min(6) // Minimum length 8 
  .is().max(10) // Maximum length 100 
  //.has().uppercase()                              // Must have uppercase letters 
  //.has().lowercase()                              // Must have lowercase letters 
  //.has().digits()                                 // Must have digits 
  .has().not().spaces() // Should not have spaces 
//.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values 








//const Promise=require ('promise');
// var Promise = require('nano-promise');
const Q = require('q');
//var Promise = require('bluebird');
//Promise.promisifyAll(nano);
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
// app.use(logErrors)
// app.use(clientErrorHandler)
app.use(errorHandler)

function errorHandler(err, req, res, next) {
  console.log(err);
  var l = {
    log: err,
    logdate: convertTZ(new Date()),
    type: "error",
    gui: uuidV4()
  };
  errorLogging(l);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', {
    error: err
  });
}

var __design_refillnumbers = {
    "_id": "_design/objectList",
    "views": {
        "findAll": {
            "map": "function (doc) {\n  emit(null,doc);\n}"
        },
        "findCount": {
            "reduce": "_count",
            "map": "function (doc) {\n  emit(1);\n}"
        },
        "findCountBy": {
            "reduce": "_count",
            "map": "function (doc) { emit([0,doc.isrenew,doc.updatedtime],doc);"+
                "emit([1,doc.imei,doc.isrenew,doc.updatedtime],doc);"+
                "emit([2,doc.phone,doc.isrenew,doc.updatedtime],doc);"+
               " emit([3,doc.username,doc.isrenew,doc.updatedtime],doc);"+
               " emit([4,doc.expire],doc);"+
               " emit([5,doc.gui],doc);"+
              "}"
        },
        "findBy": {
            "map": "function (doc) { emit([0,doc.isrenew,doc.updatedtime],doc);"+
            "emit([1,doc.imei,doc.isrenew,doc.updatedtime],doc);"+
            "emit([2,doc.phone,doc.isrenew,doc.updatedtime],doc);"+
           " emit([3,doc.username,doc.isrenew,doc.updatedtime],doc);"+
           " emit([4,doc.expire],doc);"+
           " emit([5,doc.gui],doc);"+
          "}"
        },      
    },
    "language": "javascript"
};
function create_db(dbname) {
    var db;
    nano.db.create(dbname, function (err, body) {
      // specify the database we are going to use    
      if (!err) {
        console.log('database ' + dbname + ' created!');
      } else
        console.log(dbname + " could not be created!");
    });
    db = nano.use(dbname);
    return db;
  };
function init_db(dbname, design) {
    // create a new database
    var db;
    async.eachSeries([
      db = create_db(dbname),
      db = nano.use(dbname),
      db.insert(design, function (err, res) {
        if (err) {
          db.get('_design/objectList', function (err, res) {
            if (err) console.log('could not find design ' + err.message);
            else {
              if (res) {
                var d = res;
                //console.log("d:"+JSON.stringify(d));
                db.destroy('_design/objectList', d._rev, function (err, res) {
                  if (err) console.log(err);
                  else {
                    //console.log(res);
                    db.insert(design, "_design/objectList", function (err, res) {
                      if (err) console.log('err insert new design ' + dbname);
                      else {
                        console.log('insert completed ' + dbname);
                      }
                    });
                  }
                });
              } else {
                console.log("could not find design");
              }
            }
          });
        } else
          console.log('created design ' + dbname);
      })
    ], function (err) {
      console.log('exist ' + dbname);
    });
    //db = nano.use(dbname);
    //return db;
  }
init_db('refillnumbers', __design_refillnumbers);
init_db('successlist', __design_list);
init_db('failedlist', __design_list);
init_db('retrylist', __design_list);

const requestIp = require('request-ip');

var __login_kw = 'Authen';
var __design_view = "objectList";
var __client_ip = "";
app.use(requestIp.mw());
var __master_user = {};
var __cur_client = {};
function convertTZ(fromTZ) {
  return moment.tz(fromTZ, "Asia/Vientiane").format();
}
var ltc = require("./ltctopup")('ea9uZEit0E7sXPeYoCJZDZWZVT+o10ZthvuldL8cJtQ=', 'ITCENTER');
//var ltc = require("./ltcservice")('kP0SwtIzUA1pLBwsnZz3VA==', 'THEFRIEND',5000);

app.all('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.all('/git_pull',(req,res)=>{
    var exec = require('child_process').exec;
    var child = exec('git pull origin master',
      function (error, stdout, stderr){
        var newlines=/[\r\n]+/;
        var lines=stdout.split(newlines)
        //console.log(lines[2]);
        if(error !== null){
          console.log("Error -> "+error);
            res.send(error);
        }
        else
            res.send(lines);
        //ltcDecrypt(lines[2]);
    });
});


app.all('/show_refill_numbers',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    showRefillNumbers(js);
});
function showRefillNumbers(js){
    var by=js.client.data.by;
    var isrenew=client.data.isrenew;
    var startime=client.data.startime;
    var endtime=client.data.endtime;
    var page=client.data.page;
    var maxpage=client.data.maxpage;
    getRefillNumbers(by,isrenew,starttime,endtime,true,page,maxpage).then(res=>{
        var count=res;
            getRefillNumbers(by,isrenew,starttime,endtime,false,page,maxpage).then(res=>{
                js.client.data.message="OK";
                js.client.data.refillnumbers={arr:res,count:count};
                js.resp.send(js.client);
            }).catch(err=>{
                throw err;
            });
                     
    }).catch(err=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
}
function queryFieldsRefillNumbers(type,by,isrenew,starttim,endtime,iscount,page,maxpage){
    var deferred=Q.defer();
    var db=create_db('refillnumbers');
    var viewname='findCountBy';
    if(!iscount){
        viewname='findBy';
    }
    if(type==4){
        if(iscount)
        db.view(__design_view,viewname,{startkey:[type,"\u9999"],endkey:[type,""],descending:true},(err,res)=>{
            if(err)deferred.reject(err);
            else{
                var arr=[];
                var array=res.rows;
                if(res.rows.length){
                    for (let index = 0; index < array.length; index++) {
                        const element = array[index].value;
                        arr.push(element);
                    }
                }
                if(iscount)
                    deferred.resolve(arr[0]);
                else deferred.resolve(arr);
            }
        });   
        else
        db.view(__design_view,viewname,{startkey:[type,"\u9999"],endkey:[type,""],descending:true,skip:page,limit:maxpage},(err,res)=>{
            if(err)deferred.reject(err);
            else{
                var arr=[];
                var array=res.rows;
                if(res.rows.length){
                    for (let index = 0; index < array.length; index++) {
                        const element = array[index].value;
                        arr.push(element);
                    }
                }
                if(iscount)
                    deferred.resolve(arr[0]);
                else deferred.resolve(arr);
            }
        });
    }
    else if(type==0){
        if(iscount)
        db.view(__design_view,viewname,{startkey:[type,isrenew,starttime],endkey:[type,isrenew,endtime]},(err,res)=>{
            if(err)deferred.reject(err);
            else{
                var arr=[];
                var array=res.rows;
                if(res.rows.length){
                    for (let index = 0; index < array.length; index++) {
                        const element = array[index].value;
                        arr.push(element);
                    }
                }
                if(iscount)
                deferred.resolve(arr[0]);
                else deferred.resolve(arr);
            }
        });
        else
        db.view(__design_view,viewname,{startkey:[type,isrenew,starttime],endkey:[type,isrenew,endtime],skip:page,limit:maxpage},(err,res)=>{
            if(err)deferred.reject(err);
            else{
                var arr=[];
                var array=res.rows;
                if(res.rows.length){
                    for (let index = 0; index < array.length; index++) {
                        const element = array[index].value;
                        arr.push(element);
                    }
                }
                if(iscount)
                deferred.resolve(arr[0]);
                else deferred.resolve(arr);
            }
        });
    }
    else {
        if(iscount)
        db.view(__design_view,viewname,{startkey:[type,by,isrenew,starttime],endkey:[type,by,isrenew,endtime]},(err,res)=>{
            if(err)deferred.reject(err);
            else{
                var arr=[];
                var array=res.rows;
                if(res.rows.length){
                    for (let index = 0; index < array.length; index++) {
                        const element = array[index].value;
                        arr.push(element);
                    }
                }
                if(iscount)
                deferred.resolve(arr[0]);
                else deferred.resolve(arr);
                
            }
        });
        else
        db.view(__design_view,viewname,{startkey:[type,by,isrenew,starttime],endkey:[type,by,isrenew,endtime],skip:page,limit:maxpage},(err,res)=>{
            if(err)deferred.reject(err);
            else{
                var arr=[];
                var array=res.rows;
                if(res.rows.length){
                    for (let index = 0; index < array.length; index++) {
                        const element = array[index].value;
                        arr.push(element);
                    }
                }
                if(iscount)
                deferred.resolve(arr[0]);
                else deferred.resolve(arr);
                
            }
        });
    }
    return deferred.promise;
}
function getRefillNumbers(by,isrenew,starttime,endtime,iscount,page,maxpage){
    var deferred=Q.defer();
    var db=create_db('refillnumbers');
    var type=0;
    //process by
    var arr=by.split(/(?:,;-| )+/);
    var imei='';var phone='';var username='';
    if(!by||by==undefined||!by.length){
        type=0;
        if(isrenew=='')
            type=4          
    }    
    else{
        if(arr.length){// arr should be 1
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];  
                if(!isNaN(element)){
                    if(element.length>10){
                        type=1
                        by=element;//emei
                    }                
                    else{
                        type=3
                        by=element;//phone
                    }
                }   
                else{
                    type=2
                    by=element;//username
                }        
            }
        }      
    }
    switch (type) {
        case 0:
            queryFieldsRefillNumbers(type,by,isrenew,starttime,endtime,iscount,page,maxpage).then((res)=>{
                deferred.resolve(res);
            }).catch(err=>{
                deferred.reject(err);
            });
            break;
        case 1://by=[IMEI]
            queryFieldsRefillNumbers(type, by, isrenew, starttime, endtime, iscount,page,maxpage).then((res)=>{
                deferred.resolve(res);
            }).catch(err=>{
                deferred.reject(err);
            });;
            break;
        case 2://by=[username]
            queryFieldsRefillNumbers(type, by, isrenew, starttime, endtime, iscount,page,maxpage).then((res)=>{
                deferred.resolve(res);
            }).catch(err=>{
                deferred.reject(err);
            });;
            break;
        case 3://by=phone , type =3 
            queryFieldsRefillNumbers(type, by, isrenew, starttime, endtime, iscount,page,maxpage).then((res)=>{
                deferred.resolve(res);
            }).catch(err=>{
                deferred.reject(err);
            });;
            break;
        case 4://isrenew='' , type=4 , by='', startime ='', endtime=''
            queryFieldsRefillNumbers(type, by, isrenew, starttime, endtime, iscount,page,maxpage).then((res)=>{
                deferred.resolve(res);
            }).catch(err=>{
                deferred.reject(err);
            });
            break;        
    }
    return deferred.promise;
}
app.all('/display_refill_numbers',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    displayRefillNumbers(js);
});
function displayRefillNumbers(js){
    //var by=js.client.data.by;
    //var isrenew=client.data.isrenew;
    // var startime=client.data.startime;
    // var endtime=client.data.endtime;
    var page=client.data.page;
    var maxpage=client.data.maxpage;
    getRefillNumbers('','','','',true,page,maxpage).then(res=>{
        var count=res;
            getRefillNumbers('','','','',false,page,maxpage).then(res=>{
                js.client.data.message="OK";
                js.client.data.refillnumbers={arr:res,count:count};
                js.resp.send(js.client);
            }).catch(err=>{
                throw err;
            });           
    }).catch(err=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
}
app.all('/search_refill_numbers',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    searchRefillNumbers(js);
});

function searchRefillNumbers(js){
    var options = {
        'content-type': 'application/json',
        url: 'http://localhost:5984/refillnumbers/_find',
        body:'',
      };
    var kw=js.client.data.kw;
    var skw ='username';
    if(kw){
        if(!isNaN(kw)){
            if(kw.length>10)
                skw='imei';
            else
                skw="phone";
        }
    }
    options.body={"selector": {
        skw: {"$regex": kw}
                            }
    };
    request(options, (error, response, body)=> {
        if (!error && response.statusCode == 200) {
          js.client.data.refillnumbers=body
          js.client.data.message='OK';
          js.resp.send(js.client);
        }
        else{
            js.client.data.message=error;
            js.resp.send(js.client);
        }
      });
}

app.all('/import_refill_numbers',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    importRefillNumbers(js);
});
function importRefillNumbers(js){
    importRefillNumbersJson(js.client.data.refillnumbers).then((res)=>{
        js.client.data.message=res;
        js.resp.send(js.client);
    }).catch((err)=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
}
function importRefillNumbersJson(objs){
    var deferred=Q.defer();
    var db=create_db('refillnumbers');
    for (let index = 0; index < objs.length; index++) {
        objs[index].updatedtime=convertTZ(new Date());
        objs[index].isrenew=true;
        objs[index].gui=uuidV4();
        objs[index]._id=objs[index].gui;
    }
    db.bulk({docs:objs},(err,res)=>{
        if(err)deferred.reject(err);
        else{
            deferred.resolve('OK');
        }
    })
    return deferred.promise;
}
app.all('/view_refill_numbers_details',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    viewRefillNumber(js);
});
function viewRefillNumber(js){
    var gui=js.client.data.gui;
    viewRefillNumberDetails(gui).then(res=>{
        js.client.data.message='OK';
        js.client.data.refillnumbers=res;
        js.resp.send(js.client);
    }).catch(err=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
}
function viewRefillNumberDetails(gui){
    var deferred=Q.defer();
    var db=create_db('refillnumbers');
    db.view(__design_view,'findBy',{key:[5,gui]},function(err,res){
        if(err)deferred.reject(err);
        else{
            var arr=[];
            if(res.rows.length){
                arr.push(res.rows[0].value);
            }
            deferred.resolve(arr);
        }
    });
    return deferred.promise;
}

app.all('/update_refill_numbers',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    updateRefillNumbers(js);
});
var refillObj={
    user:'',
    imei:'',
    phone:'',
    device:'',
    model:'',
    expire:'',
    startdate:'',
    updatedtime:'',
    usertel:'',
    isrenew:true,
    remark:'',
    gui:''
};
function editRefillNumbers(o){
    var deferred=Q.defer();
    var db=create_db('refillnumbers');
    if(o._rev){
        if(o._delete!=undefined) delete o._delete;
        o.updatedtime=convertTZ(new Date());
        db.insert(o,o._id,(err,res)=>{
            if(err)deferred.reject(err);
            else{
                deferred.resolve('OK');
            }
        });    
    }
    else{
        o.gui=uuidV4();
        o.updatedtime=convertTZ(new Date());
        db.insert(o,o.gui,(err,res)=>{
            if(err)deferred.reject(err);
            else{
                deferred.resolve('OK');
            }
        });
    } 
    return deferred.promise;
}
function updateRefillNumbers(js){
    editRefillNumbers(js.client.data.refillnumbers).then((res)=>{
        js.client.data.message=res;
        js.resp.send(js.client)
    }).catch((err)=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
}



app.all('/display_success_list',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    displaySuccessList(js);
});
function displaySuccessList(js){
    var by=js.client.data.by;
    var type='phone';
    var startime=convert(new Date(js.client.data.startime));
    var endtime=convert(new Date(js.client.data.endtime));
    var page=js.client.data.page;
    var maxpage=js.client.data.maxpage;
    if(by){
        if(!isNaN(by)){
            if(by.length>10){
                type='target';
            }
            else{
                type='phone'
            }
        }else{
            type='owner';
        }
        ltc.viewSuccessList(by,type, starttime, endtime, page, maxpage).then((res)=>{
            js.client.data.message='OK';
            js.client.data.retrylist=res;
            js.resp.send(js.client);
        }).catch((err)=>{
            js.client.data.message=err;
            js.resp.send(js.client);
        });
    }
}
app.all('/display_retry_list',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    displayRetryList(js);
});
function displayRetryList(js){
    var by=js.client.data.by;
    var type='phone';
    var startime=convert(new Date(js.client.data.startime));
    var endtime=convert(new Date(js.client.data.endtime));
    var page=js.client.data.page;
    var maxpage=js.client.data.maxpage;
    if(by){
        if(!isNaN(by)){
            if(by.length>10){
                type='target';
            }
            else{
                type='phone'
            }
        }else{
            type='owner';
        }
        ltc.viewRetryList(by,type, starttime, endtime, page, maxpage).then((res)=>{
            js.client.data.message='OK';
            js.client.data.retrylist=res;
            js.resp.send(js.client);
        }).catch((err)=>{
            js.client.data.message=err;
            js.resp.send(js.client);
        });
    }
}
app.all('/display_failed_list',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    displayFailedList();
});
function displayFailedList(js){
    var by=js.client.data.by;
    var type='phone';
    var startime=convert(new Date(js.client.data.startime));
    var endtime=convert(new Date(js.client.data.endtime));
    var page=js.client.data.page;
    var maxpage=js.client.data.maxpage;
    if(by){
        if(!isNaN(by)){
            if(by.length>10){
                type='target';
            }
            else{
                type='phone'
            }
        }else{
            type='owner';
        }
        ltc.viewFailedList(by,type, starttime, endtime, page, maxpage).then((res)=>{
            js.client.data.message='OK';
            js.client.data.failedlist;
            js.resp.send(js.client);
        }).catch((err)=>{
            js.client.data.message=err;
            js.resp.send(js.client);
        });
    }
}











app.all('/show_center_balance',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    ltc.checkCenterBalance().then(res=>{
        ltc.viewCenterBalance(js.client.data.starttime,js.client.data.endtime,js.client.data.page,js.client.data.maxpage).then((res)=>{
            js.client.data.centerbalance=res;
            js.client.data.message='OK';
            js.resp.send(js.client);
        }).catch((err)=>{
            throw err;
        });
    }).catch(err=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
    
});
app.all('/show_phone_balance',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    ltc.checkPhoneBalance(js.client.data.phone,js.client.data.imei,js.client.data.user).then((res)=>{
        js.client.data.phonebalance=res;
        js.client.data.message='OK';
        js.resp.send(js.client);
    }).catch((err)=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
});
app.all('/direct_topup',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    ltc.directTopup(js.client.data.phone,js.client.data.topupvalue).then((res)=>{
        js.client.data.topup=res;
        js.client.data.message='OK';
        js.resp.send(js.client);
    }).catch((err)=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
});
app.all('/topup_target',(req,res)=>{
    var js={};
    js.client=req.body;
    js.resp=res;
    ltc.topupTarget(js.client.data.phone, js.client.data.topupvalue, js.client.data.imei, js.client.data.owner).then((res)=>{
        js.client.data.topup=res;
        js.client.data.message='OK';
        js.resp.send(js.client);
    }).catch((err)=>{
        js.client.data.message=err;
        js.resp.send(js.client);
    });
});


app.listen(8000, "0.0.0.0", function () {
    console.log('Example app listening on port 8000!')
  });