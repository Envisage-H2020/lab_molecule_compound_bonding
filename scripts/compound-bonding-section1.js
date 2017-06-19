
function stageOne(ind){
	currentMolecule = ind;
	document.getElementById('table1').style.display = 'none';
	document.getElementById('dropspace').innerHTML = section1Table;
	document.getElementById('table2').innerHTML = table2Section1;	
	document.getElementById('messagespace').innerHTML = userMessageTable;
	dataLayer.push({"event": "start", "event_id": "stage_2", "event_value": compoundName});

}

function selectSeries(){
	var atomObj = document.getElementById("moleculeSelect2"); 
	var atomToSelect = parseInt(atomObj.options[atomObj.selectedIndex].value);
	currentMolecule = atomToSelect;
	compoundName = compoundNames[currentMolecule - 1];
	var compoundDisplayText = "<td colspan='12'><b>Selected molecule: "+compoundName+"</b></td>"
	dataLayer.push({"event": "choose.molecule", "event_id": compoundName});
	document.getElementById('moleculeselection').innerHTML = compoundDisplayText;
	
}

function checkNameSelection(ind){
	if(invokeButtons === 1){
		if(currentMolecule === 0){
			var userMesage = "Please select a molecule from the list";
			document.getElementById('usermessagedisplay').innerHTML = userMesage;
		    dataLayer.push({"event": "select.molecule", "event_id": "none"});

		}else{
			if(comHomLinkAtttemps > 0){
				compoundName = compoundNames[currentMolecule - 1]
				homSeriesName = homSeriesNames[ind - 1]
				var compHomLink = compoundHomLink[currentMolecule - 1];
				currentHomSeries = compHomLink;
				correctHSName = homSeriesNames[compHomLink - 1]
				correctHSPluralName = homSeriesPluralNames[compHomLink - 1]
				if(ind === compHomLink){
					invokeButtons = 0;
					showNextSectionButton = 1;
					dataLayer.push({"event": "select.compound", "event_id": compoundName, "event_value": true});

					var userMesage = "Correct. <b>"+compoundName+"</b> belongs to the <b>"+homSeriesName+"</b> homologous series.";
				}else{
					comHomLinkAtttemps -= 1;
						if(comHomLinkAtttemps > 0){
						var userMesage = "Unfortunately the molecule <b>"+compoundName+"</b> does not belong to the <b>"+homSeriesName+"</b> homologous series.";
						var attemptsImgString = '<img src="images/hs/HSAR'+comHomLinkAtttemps+'.png" width="100%">';
						document.getElementById('attempts').innerHTML = attemptsImgString;
						dataLayer.push({"event": "select.compound", "event_id": compoundName, "event_value": false});
					}else{
						invokeButtons = 0;
						showNextSectionButton = 1;
						var userMesage = "Unfortunately the molecule <b>"+compoundName+"</b> does not belong to the <b>"+homSeriesName+"</b> homologous series. The correct homologous series is <b>"+correctHSName+"</b>";
						var attemptsImgString = '<img src="images/hs/HSAR'+comHomLinkAtttemps+'.png" width="100%">';
						document.getElementById('attempts').innerHTML = attemptsImgString;
						var hsKey = "HS"+compHomLink;
						document.getElementById(hsKey).innerHTML = '<img src="images/hs/HS'+compHomLink+'x.png" width="100%">';
						dataLayer.push({"event": "select.compound", "event_id": compoundName, "event_value": false});
					}
				}
				document.getElementById('messagespace').innerHTML = userMessageTable;
				document.getElementById('usermessagedisplay').innerHTML = userMesage;
				if(showNextSectionButton == 1){document.getElementById('nextsectionbutton').innerHTML = nextSection1;}
			}
		}
		currentHomSeries = compHomLink;	
	}
	
}