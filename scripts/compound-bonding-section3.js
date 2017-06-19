function buildSection3(){

	molStructureIMGCurrent = 1;
	molStructureIMGCorrect = molStructureIDX[currentMolecule - 1];
	molImgGrp = molStructureGRP[currentMolecule - 1];
	molStructureIMG = "images/structures/s"+molImgGrp.substring(0,1)+".png";
	var correctGroup = correctFGName;
	if(correctFGName === "No functional group"){correctGroup = "None"};
	
	
	document.getElementById('table2').innerHTML = table2Section3;
	var compoundDisplayText = "<td colspan='12'>Molecule: <b>"+compoundName+"</b>, Homologous Series: <b>"+correctHSName+"</b>, Functional Group: <b>"+correctGroup+"</b></td>"
	dataLayer.push({"event": "start", "event_id": "stage_3", "event_value": compoundName});

	document.getElementById('moleculeselection').innerHTML = compoundDisplayText;
	document.getElementById('dropspace').innerHTML = section3Table;
	document.getElementById('messagespace').innerHTML = "";
	document.getElementById('structIMG').src = molStructureIMG;	
	
}

function swapStructIMG(ind){
	molStructureIMGCurrent = ind;
	molStructureIMG = "images/structures/s"+molImgGrp.substring(ind-1,ind)+".png";
	document.getElementById('structIMG').src = molStructureIMG;	
	dataLayer.push({"event": "change.mol_structure", "event_id": compoundName, "event_value": molImgGrp.substring(ind-1,ind) });

}

function checkStructIMG(){
	var userMesage = "";
	if(molStructureIMGCurrent == molStructureIMGCorrect){
		userMesage = "Well done. You have selected the correct structure for "+compoundName+".";
		dataLayer.push({"event": "select.mol_structure", "event_id": compoundName, "event_value": true });

	}else{
		userMesage = "Unfortunately you did not select the correct structure.<br>The correct structure for "+compoundName+" is shown below.";
		molStructureIMG = "images/structures/s"+molImgGrp.substring(molStructureIMGCorrect-1,molStructureIMGCorrect)+".png";
		dataLayer.push({"event": "select.mol_structure", "event_id": compoundName, "event_value": false });

	}
	var t3top = "<td colspan='9' id='usermessagedisplay'></td> <td border='0' colspan='3' id='nextsectionbutton'><button onclick='buildSection4()'>Next Section</button></td></tr></table>";
	document.getElementById('table3toprow').innerHTML = t3top;
	document.getElementById('usermessagedisplay').innerHTML = userMesage;
	document.getElementById('structIMG').src = molStructureIMG;	
	

}






Steffi, ich 