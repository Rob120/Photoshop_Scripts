//------------------------------------------------------------------------------

////////////////// INFOS //////////////////

// name : PSDS_TO_ARTBOARDS.jsx
// description : Select a folder of PSD'S, and this script will create one big document with each PSD as artboard
// author : Robin Poitevin 
// version : V 0.1
// credits : open all files and extensions check based on functions of Jeffrey Tranberry 
//------------------------------------------------------------------------------

////////////////// VARIABLES //////////////////

#target photoshop
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

var extens = "psd"; // You can change the kind of files you want to open
var inputFolder = Folder.selectDialog("Select your folder of PSD");
var outputFolder = Folder.selectDialog("Select a folder for the output");


////////////////// FUNCTIONS //////////////////

function createArtboard() {  // Convert files to artboard
    var debug = "debug";
    var dialogMode = (DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(sTID("artboardSection"));
    desc1.putReference(cTID('null'), ref1);
        desc1.putString(cTID('Nm  '), debug);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('From'), ref2);
    desc1.putInteger(sTID("layerSectionStart"), 3);
    desc1.putInteger(sTID("layerSectionEnd"), 4);
    executeAction(cTID('Mk  '), desc1, dialogMode);
  
  };


  function createPsd() {

    var dialogMode = (DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(sTID("artboard"), false);
    desc2.putClass(cTID('Md  '), sTID("RGBColorMode"));
    desc2.putUnitDouble(cTID('Wdth'), cTID('#Rlt'), 2000);
    desc2.putUnitDouble(cTID('Hght'), cTID('#Rlt'), 2000);
    desc2.putUnitDouble(cTID('Rslt'), cTID('#Rsl'), 72);
    desc2.putDouble(sTID("pixelScaleFactor"), 1);
    desc2.putEnumerated(cTID('Fl  '), cTID('Fl  '), cTID('Wht '));
    desc2.putInteger(cTID('Dpth'), 8);
    desc2.putString(sTID("profile"), "Display");
    desc1.putObject(cTID('Nw  '), cTID('Dcmn'), desc2);
    desc1.putInteger(cTID('DocI'), 1739);
    executeAction(cTID('Mk  '), desc1, dialogMode);
};


function OpenFolder() { // list all files
        var filesOpened = 0;
        var fileList = inputFolder.getFiles();
        for ( var i = 0; i < fileList.length; i++ ) {
                if ( fileList[i] instanceof File && ! fileList[i].hidden && ! IsFileOneOfThese( fileList[i], extens )) {
                        //alert(fileList[i]);
                        openFile(fileList,i);
                        createArtboard();
                        duplicateArtboard();
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                        filesOpened++;
                }
        }
        return filesOpened;
};


function IsFileOneOfThese( inFileName, inArrayOfFileExtensions ) { // check etentions
	var lastDot = inFileName.toString().lastIndexOf( "." );
		if ( lastDot == -1 ) {
			return false;
		}
	var strLength = inFileName.toString().length;
	var extension = inFileName.toString().substr( lastDot + 1, strLength - lastDot );
	extension = extension.toLowerCase();
		if ( extension != inArrayOfFileExtensions ) {
			return true;
		}
	return false;
};


function openFile(filelisting,numb) {
	var fileRef = new File(filelisting[numb]);
	app.open(fileRef);

};

function savePSD(output){
  	var psdFile = new File(output + "/" + "combined_PSDS");
  	psdSaveOptions = new PhotoshopSaveOptions();
  	psdSaveOptions.embedColorProfile = true;
  	psdSaveOptions.alphaChannels = true;  
 	 activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
};


function duplicateArtboard() {
    var dialogMode = (DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putName(cTID('Dcmn'), "export_test.psd");
    desc1.putReference(cTID('T   '), ref2);
    desc1.putInteger(cTID('Vrsn'), 5);
    var list1 = new ActionList();
    list1.putInteger(2);
    list1.putInteger(3);
    list1.putInteger(4);
    desc1.putList(cTID('Idnt'), list1);
    executeAction(cTID('Dplc'), desc1, dialogMode);
  };


////////////////// MAIN //////////////////

createPsd();
savePSD(outputFolder);
app.refresh();  
OpenFolder();
