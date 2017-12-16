
var imei1={
    imei:"",
    name:"",
    photo:"",
    icon:"",
    timezone:0,
    password:"",
    validDate:"",
    expireDate:"",
    renewalNumber:"",
    renewalValue:"",
    telecomValue:"",
    replaceIMEI:[imei1,imei2],
    gui:''
}
var imei2={
    imei:"",
    name:"",
    photo:"",
    icon:"",
    timezone:0,
    password:"",
    validDate:"",
    expireDate:"",
    renewalNumber:"",
    renewalValue:"",
    telecomValue:"",
    replaceIMEI:[imei1,imei2],
    gui:''
}

var permission={view:0,edit:0,delete:0,changepassword:0,creator:0,gui:''};
var coordinator1={lat:0,lon:0,altitude:0,gui:''};

var gpsOwner={
    user:"",
    password:"",
    email:"",
    phone:"",
    country:"",
    address:"",
    photo:"",
    parent:"",
    imeis:[imei1,imei2],
    permission:permission,
    validDate:"",
    currentLocation:coordinator1,
    gui:''
};


var gpsO={
    startMessage:"",
    protocol:"",
    packetLength:"",
    imei:"",
    gpsTime:"",
    serverTime:"",
    serialNumber:"",
    lat:"",
    Lon:"",
    validGPS:0,
    satMode:"",
    gsmStrangth:0,
    speed:0,
    headingDegree:0,
    hdop:"",
    altitude:"",
    odometer:"",
    runtime:"",
    baseid:[],//[MCC,MNC,LAC,CI],
    iostate:[],
    ad:[],
    rfid:"",
    picture:"",
    fence:"",
    distanceComphensation:0,
    headingChangeComphensation:0,
    mileageUnit:"",
    speedAlarmOn:"",
    geofenceAlarmOn:"",
    speedAlarmOff:"",
    geofenceAlarmOff:"",
    version:"",
    internalBattery:0,
    externalBattery:0,
    relay:0,
    driverid:'',
    idtype:'',
    gui:''
}
var gpsEvent={
    imei:"",
    gpsTime:"",
    serverTime:"",
    lat:0,
    lon:0,
    altitude:0,
    engineOn:0,
    engineOff:0,
    lowBattery:0,
    lowExternalBattery:0,
    noExternalBattery:0,
    onExternalBattery:0,
    towing:0,
    noGps:0,
    getGps:0,
    enterSleep:0,
    exitSleep:0,
    gpsAntennaCut:0,
    reboot:0,
    start:0,
    sosOn:0,
    sosOff:0,
    vibrating:0,
    inGeofence:0,
    outGeofence:0,
    speed:0,
    idling:0,
    heartbeat:0,
    headingChanged:0,
    distanceChanged:0,
    nowReport:0,
    timeIntervalReport:0,
    rfid:0,
    photo:0,
    callin:0,
    sms:0,
    button1pressed:0,
    button2pressed:0,
    button3pressed:0,
    button4pressed:0,
    button5pressed:0,
    rejectCall:0,
    locationReportAfterCalling:0,
    autoAnswerCall:0,
    listenIn:0,
    relay:0    ,
    gui:''
}
var creditrecord={
    owner:"",
    charged:0,
    chargedtime:""    ,
    gui:''
}
var ownercredit={
    owner:"",
    balance:0,
    diffbalance:0,
    previousbalance:0,
    updatetime:"",
    reason:"",
    imei:"",
    value:0,
    phone:"",
    gui:''
}


var serverGeofence1={name:"",location:[coordinator1,coordinator1],limit:0,shapetype:0,owner:""};
var serverGeofence2={name:"",localtion:[coordinator1,coordinator1],limit:0,shapetype:0,owner:""};

var POI1={name:"",lat:0,coordinator1,limit:0,owner:""};
var POI2={name:"",lat:0,coordinator,limit:0,owner:""};

var gpsConfig={
    imei:"",
    createddate:"",
    speeding:0,
    geofence:[serverGeofence1,serverGeofence2],
    pois=[POI1,POI2],
    gui:''
}
var userConfig={
    POIs:[POI1,POI2],
    geofence:[serverGeofence1,serverGeofence2],
    gui:''
}
var serverConfig={
    gui:''
}
var serverEvent={
    speeding:120,
    offlineTime:"",
    mileageUnit:"K",
    gui:''
}
var serverPOI=[POI1,POI2]
var schedule={startTime:"",endTime:"",loopTime:""},
var serverSchedule={};

function bin2string(input){

}
function String2bin(input){

}



function processMVT380(input){

}
function processT322(input){

}
function processTSV6(input){

}
function processTSV1(input){

}
function processT8803(input){

}
function processT8803Pro(input){

}
function processT8803P(input){

}