function randChangeGIF(ind){
	var gifTable = ['benzene','EthanoicAcid','Butane','Propanone','4-methyl-2-pentanone','2-butynoicacid','methylamine','Ethene'];
	var gifIDX = Math.floor(Math.random() * 7)
	var gifSRC = 'images/gifs/'+gifTable[gifIDX]+'.gif'
	if(ind==1){
		document.getElementById('intGif1').src = gifSRC;
	}else{
		document.getElementById('intGif2').src = gifSRC;
	}
}
