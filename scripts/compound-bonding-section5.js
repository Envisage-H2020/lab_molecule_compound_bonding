/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */							
"use strict";				

// redips initialization
redipsInit = function () {	
	//messageText = "Methane";
	//document.getElementById('messageline').innerHTML = messageText;
		
	// initialization
	rd.init();
	// set hover color
	rd.hover.colorTd = '#9BB3DA';
	// this function (event handler) is called after element is dropped
	rd.event.dropped = function () {
		document.getElementById('usermessage3').innerHTML = "";
		dataLayer.push({"event": "drop.mol_structure", "event_id": compoundName, "event_value": true});

	};

	rd.event.clicked = function () {
		var itemID = rd.obj.id;
		// alert(itemID);
	};
};

if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}

function buildArea(ind){
	areaBuilt = 1;
	currentMolecule = ind;
	createDropArea();
	document.getElementById('dropspace').innerHTML = buildAreaText;
	rd.init();
}

function createDropArea(){
	var molArrayPointer = 0;
	buildAreaText = molStrTableStart;
	buildAreaText = buildAreaText + molStrColGroup;
	for(var r=1; r<=7; r++){
		buildAreaText = buildAreaText + molStrTRStart;
		for(var h=1; h<=17;h++){
			if(molArrayPointer == 0){
				buildAreaText = buildAreaText + molStrTrash;
			}else{
				var cellInd = molArray[currentMolecule*100][molArrayPointer];
				if(cellInd.substring(0,1) === "-"){
					buildAreaText = buildAreaText + molStrEmpty;
				}else if((cellInd.substring(0,1) === "X")||(cellInd.substring(0,1) === "Y")||(cellInd.substring(0,1) === "Z")){
				// }else if((cellInd === "X")||(cellInd === "Y")||(cellInd === "Z")){
					buildAreaText = buildAreaText + molStrBond;
				}else{
					buildAreaText = buildAreaText + molStrAtom;				
				}
			}
			molArrayPointer++;	
		}
		buildAreaText = buildAreaText + molStrTREnd;
	}
	buildAreaText = buildAreaText + molStrTableEnd;
}

function resetBuildArea(){
	if(areaBuilt === 1){
		numTotal = 0;
		createDropArea();
		document.getElementById('dropspace').innerHTML = buildAreaText;
		rd.init();
		GetCellValues();
		document.getElementById('messagespace').innerHTML = "";
	}
}

function checkResult(){

	GetCellValues();
	if(numIncorrect > 0){
		var messageText = "You placed "+numCorrect+" items correctly, but there are "+numIncorrect+" items either not yet placed or placed incorrectly.";
	}else{
		//var messageText = "You have correctly placed all elements of the compund . a 3D animation of the compound<br>Select 'Another Compound' to go back to the start. <button onclick='startAgain()'>Another Compound</button>";
		var messageText = ""
		buildAreaText = resultTable[currentMolecule][0];
		document.getElementById('dropspace').innerHTML = buildAreaText;
	}
	document.getElementById('usermessage3').innerHTML = messageText;	

	
	// usermessagedisplay2
}

function GetCellValues() {
	
	var table = document.getElementById('table3');
	var molArrayPointer = 0;
	var numOldIncorrect = 999;
	var numOldCorrect = 999;
	var loopSize = molIndex[currentMolecule][0];
	var startLine = molIndex[currentMolecule][1];

	/* 
	alert(startLine);
	var tmpVal = molArray[startLine][20];
	alert(tmpVal);
	*/
	
	var loopPointer = 0
	
	while (loopPointer < loopSize){
		molArrayPointer = 0;
		numIncorrect = 0;
		numCorrect = 0;
		for (var r = 0, n = table.rows.length; r < n; r++) {
			for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
				if(molArrayPointer > 0){
					var cellContents = table.rows[r].cells[c].innerHTML
					var sourceContent = molArray[startLine][molArrayPointer];						
					if(sourceContent != '-'){
						var getPos = cellContents.indexOf("id=");
						var checkItem = cellContents.substring(getPos+5,getPos+6);
						if(checkItem == sourceContent){
							numCorrect++;
						}else{
							numIncorrect++;
						}
					}
				}
				molArrayPointer++;
			}
		}
		if(numIncorrect === 0){
			loopPointer = 999;
		}else{
			loopPointer++;	
			if(numIncorrect < numOldIncorrect){
				numOldIncorrect = numIncorrect;
				numOldCorrect = numCorrect;
			}else{
				numIncorrect = numOldIncorrect; 
				numCorrect = numOldCorrect; 
			}
		}
		startLine++;
	}
}

function updateMessageLine(updateText){
	document.getElementById('messageline').innerHTML = updateText;	
}

function startAgain(){
	dataLayer.push({"event": "restart"});
	numTotal = 0;
	currentMolecule = 0;
	comHomLinkAtttemps = 3;
	homGroupLinkAtttemps = 3; 
	invokeButtons = 1;
	showNextSectionButton = 0;
	document.getElementById('table2').innerHTML = "";
	document.getElementById('dropspace').innerHTML = "";
	document.getElementById('messagespace').innerHTML = "";
	stageOne(0);

}
