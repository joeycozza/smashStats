var os = require('os');
var inTestMode = process.mainModule.id !== module.parent.id;

//console.log('PROCESS.MAINMODULE', process.mainModule);
//console.log('\n\n\nMODULE.PARENT', module.parent);

console.log('ENVIRONMENT: ', getEnvironment());

exports.isInTestMode = function () {
	return inTestMode;
};

function getEnvironment() {
	return inTestMode ? "testing" : "development";
}

exports.getEnvironment = getEnvironment;
