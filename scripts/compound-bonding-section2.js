function buildSection2(){
	//alert(currentMolecule);
	invokeButtons = 1;
	showNextSectionButton = 0;
	window.dataLayerer.push({"event": "start", "event_id": "stage_2", "event_value": compoundName});
	document.getElementById('table2').innerHTML = table2Section2;
	var compoundDisplayText = "<td colspan='12'>Molecule: <b>"+compoundName+"</b>, Homologous Series: <b>"+correctHSName+"</b></td>"
	document.getElementById('moleculeselection').innerHTML = compoundDisplayText;
	document.getElementById('dropspace').innerHTML = section2Table;
	document.getElementById('messagespace').innerHTML = userMessageTable;
	document.getElementById('usermessagedisplay').innerHTML = "";
}

function checkHomoFunctiongroupLink(ind){

	if(invokeButtons === 1){
		if(homGroupLinkAtttemps > 0){
			// if we have not run out of attempts...
			funcGroupName = funcGroupNames[ind - 1];
			correctLink = homSeriesLink[currentHomSeries - 1];
			correctFGName = funcGroupNames[correctLink - 1];
			//alert(correctLink);
			if(correctLink === ind){
				// We have made the correct selection
				invokeButtons = 0;
				showNextSectionButton = 1;
				if(ind === 1){
					//window.dataLayerer.push({"event": "select.HSPluralName", "event_id": correctHSPluralName, , "event_value": true });

					var userMesage = "Correct. <b>"+correctHSPluralName+"</b> do not have an associated functional group.";
				}else{
					//window.dataLayerer.push({"event": "select.functional_group", "event_id": funcGroupName, , "event_value": true });

					var userMesage = "Correct. <b>"+funcGroupName+"</b> is the functional group of <b>"+correctHSName+"</b>.";
				}
				document.getElementById('messagespace').innerHTML = userMesage;
			}else{
				// we have not made the correct selection, so decrement the number of attempts
				homGroupLinkAtttemps -=1;
				var attemptsImgString = '<img src="images/hs/HSAR'+homGroupLinkAtttemps+'.png" width="100%">';
				document.getElementById('attempts').innerHTML = attemptsImgString;
				if(homGroupLinkAtttemps > 0){
					if(ind === 1){
						window.dataLayerer.push({"event": "select.functional_group", "event_id": correctHSPluralName, "event_value": false });
						var userMesage = "That is not correct. <b>"+correctHSPluralName+"</b> have a functional group";
					}else{
						window.dataLayerer.push({"event": "select.functional_group", "event_id": funcGroupName, "event_value": false });
						var userMesage = "Unfortunately <b>"+funcGroupName+"</b> is not the functional group for <b>"+correctHSPluralName+"</b>";
					}
					document.getElementById('messagespace').innerHTML = userMesage;
				}else{
					invokeButtons = 0;
					showNextSectionButton = 1;
					if(ind === 1){
						window.dataLayerer.push({"event": "select.functional_group", "event_id": correctHSPluralName, "event_value": false });
						var userMesage = "That is not correct. <b>"+correctHSPluralName+"</b> are associated with the <b> "+correctFGName+" </b> functional group.";
					}else{
						if(correctLink === 1){
							// Its no FG
							window.dataLayerer.push({"event": "select.functional_group", "event_id": correctHSPluralName, "event_value": false });
							var userMesage = "That is not correct. <b>"+correctHSPluralName+"</b> do not have an associated functional group.";
							
						}else{
							// It is an FG and we say which one
							window.dataLayerer.push({"event": "select.functional_group", "event_id": correctHSPluralName, "event_value": false });
							var userMesage = "That is not correct. <b>"+correctHSPluralName+"</b> are  associated with the <b> "+correctFGName+" </b> functional group.";
						}
					}
					document.getElementById('messagespace').innerHTML = userMesage;
					var fgKey = "FGB"+correctLink;
					document.getElementById(fgKey).innerHTML = '<img src="images/hs/FG'+correctLink+'x.png" width="100%">';
				}
			}
			document.getElementById('messagespace').innerHTML = userMessageTable;
			document.getElementById('usermessagedisplay').innerHTML = userMesage;
			if(showNextSectionButton == 1){document.getElementById('nextsectionbutton').innerHTML = nextSection2;}
		}
	
	}
	
}
/*
function showCorrectFunctionalGroup(){
	//"<br>correctLink: "+correctLink+"ind: "+ind
	//var userMesage = "The correct functional group for <b>"+correctHSName+"</b> is <b>"+correctFGName+"</b>.<br>Press button for next section <button onclick='buildSection3()'>Next section</button>";
	var userMesage = "The correct functional group for <b>"+correctHSName+"</b> is <b>"+correctFGName+"</b>.<br>Press button for next section <button onclick='buildSection3()'>Next section</button><br>correctLink: "+correctLink+" - currentHomSeries: "+currentHomSeries+" - currentMolecule: "+currentMolecule;
	document.getElementById('messagespace').innerHTML = userMesage;
}
*/
