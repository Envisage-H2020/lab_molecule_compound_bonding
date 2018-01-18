function buildSection4(){
	document.getElementById('table2').innerHTML = table2Section4;
    window.dataLayerer.push({"event": "start", "event_id": "stage_4", "event_value": compoundName});
	var compoundDisplayText = "<b>Section 4: Build the Molecule Structure for "+compoundName+"</b>";
	document.getElementById('t4head').innerHTML = compoundDisplayText;
	document.getElementById('dropspace').innerHTML = "";
	buildArea(currentMolecule);
}
