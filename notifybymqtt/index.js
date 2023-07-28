'use strict';



var libQ = require('kew');
var fs=require('fs-extra');
var config = new (require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');


module.exports = notifybymqtt;
function notifybymqtt(context) {
	var self = this;

	this.context = context;
	this.commandRouter = this.context.coreCommand;
	this.logger = this.context.logger;
	this.configManager = this.context.configManager;

}



notifybymqtt.prototype.submitMyMessage = function (data) {
        var self = this;
        self.logger.info("notifyuser function called");
        self.commandRouter.pushToastMessage('success', "Yes", data);
return libQ.resolve();
};

notifybymqtt.prototype.onStart = function() {
    var self = this;
        var defer=libQ.defer();
        self.commandRouter.pushToastMessage('success', "Yes", "plugin started");
        defer.resolve();
    return defer.promise;
};




notifybymqtt.prototype.onVolumioStart = function()
{
	var self = this;
	var configFile=this.commandRouter.pluginManager.getConfigurationFile(this.context,'config.json');
	this.config = new (require('v-conf'))();
	this.config.loadFile(configFile);

    return libQ.resolve();
}



notifybymqtt.prototype.onStop = function() {
    var self = this;
    var defer=libQ.defer();

    // Once the Plugin has successfull stopped resolve the promise
    defer.resolve();

    return libQ.resolve();
};

notifybymqtt.prototype.onRestart = function() {
    var self = this;
    // Optional, use if you need it
};


// Configuration Methods -----------------------------------------------------------------------------

notifybymqtt.prototype.getUIConfig = function() {
    var defer = libQ.defer();
    var self = this;

    var lang_code = this.commandRouter.sharedVars.get('language_code');

    self.commandRouter.i18nJson(__dirname+'/i18n/strings_'+lang_code+'.json',
        __dirname+'/i18n/strings_en.json',
        __dirname + '/UIConfig.json')
        .then(function(uiconf)
        {


            defer.resolve(uiconf);
        })
        .fail(function()
        {
            defer.reject(new Error());
        });

    return defer.promise;
};

notifybymqtt.prototype.getConfigurationFiles = function() {
	return ['config.json'];
}

notifybymqtt.prototype.setUIConfig = function(data) {
	var self = this;
	//Perform your installation tasks here
};

notifybymqtt.prototype.getConf = function(varName) {
	var self = this;
	//Perform your installation tasks here
};

notifybymqtt.prototype.setConf = function(varName, varValue) {
	var self = this;
	//Perform your installation tasks here
};

