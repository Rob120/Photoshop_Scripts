//------------------------------------------------------------------------------

////////////////// INFOS //////////////////

// name : PSDS_TO_ARTBOARDS.jsx
// description : Take all of the psd's from a folder, and create a single one, on different artboard
// author : Robin Poitevin 
// version : V 0.3
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

function createArtboard() {
  // Set
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('Al  '));
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  // Make
  function step2(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Lyr '));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), "screenBG");
    desc1.putObject(cTID('Usng'), cTID('Lyr '), desc2);
    desc1.putInteger(cTID('LyrI'), 9270);
    executeAction(cTID('Mk  '), desc1, dialogMode);
  };

  // Fill
  function step3(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 345);
    desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 446);
    desc1.putObject(cTID('From'), cTID('Pnt '), desc2);
    desc1.putInteger(cTID('Tlrn'), 200);
    desc1.putBoolean(cTID('AntA'), true);
    desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('FrgC'));
    executeAction(cTID('Fl  '), desc1, dialogMode);
  };

  // Make
  function step4(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(sTID("artboardSection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('From'), ref2);
    desc1.putInteger(sTID("layerSectionStart"), 9271);
    desc1.putInteger(sTID("layerSectionEnd"), 9272);
    desc1.putString(cTID('Nm  '), "Artboard 1");
    executeAction(cTID('Mk  '), desc1, dialogMode);
  };

  // Select
  function step5(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), "screenBG");
    desc1.putReference(cTID('null'), ref1);
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(9270);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  // Delete
  function step6(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    executeAction(cTID('Dlt '), undefined, dialogMode);
  };

  // Select
  function step7(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), "Artboard 1");
    desc1.putReference(cTID('null'), ref1);
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(3);
    desc1.putList(cTID('LyrI'), list1);
    executeAction(cTID('slct'), desc1, dialogMode);
  };

  step1();      // Set
  step2();      // Make
  step3();      // Fill
  step4();      // Make
  step5();      // Select
  step6();      // Delete
  step7();      // Select
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
                        var artname = app.activeDocument.name;
                        var artlength = artname.length;
                        app.activeDocument.activeLayer.name = artname.substr(0,artlength - 4 );


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
  	var psdFile = new File(output + "/" + "export_test");
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
