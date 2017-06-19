function buildSection4(){
	document.getElementById('table2').innerHTML = table2Section4;
	var compoundDisplayText = "<b>Section 4: Build the Molecule Structure for "+compoundName+"</b>";
        dataLayer.push({"event": "start", "event_id": "stage_4", "event_value": compoundName});

	document.getElementById('t4head').innerHTML = compoundDisplayText;
	document.getElementById('dropspace').innerHTML = "";
	buildArea(currentMolecule);
}
