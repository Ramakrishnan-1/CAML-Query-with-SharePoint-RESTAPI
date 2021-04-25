
getItems();

function getItems(){
	var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CAMLQuery')/items?";
	$.ajax({
		url: requestUri,
		type: "GET",
		headers: {
			"Accept": "application/json; odata=verbose"
		},
		async: false,
		success: function(data) {
			var items = data.d.results;
			var htmlVal ='';
			for(var i=0;i<items.length;i++){
				htmlVal += items[i].Title +"<br/><br/> :" + items[i].Description + ' <br/><br/><button type="button" onclick="getUsingCAML(\'' + items[i].ID + '\',\'' +items[i].Description+'\')">Click Me!</button> <br/><br/><h3 id="'+items[i].ID+'"></h3> ';
			}
			document.getElementById("Title").innerHTML = htmlVal;
		},
		error: function(error) {
			console.log("fnGetReviewerName :: " + error);
		}
	});
}

function getUsingCAML(ID,Description){	
    var caml = "<View><Query><Where><Eq><FieldRef Name='Description' />" + "<Value Type='Note'>"+Description+"</Value></Eq></Where></Query></View>";
	var endpoint = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CAMLQuery')/GetItems";
	var requestData = {
		"query": {
			"__metadata": {
				"type": "SP.CamlQuery"
			},
			"ViewXml": caml
		}
	};
	return jQuery.ajax({
		url: endpoint,
		method: "POST",
		data: JSON.stringify(requestData),
		headers: {
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			'content-type': 'application/json;odata=verbose',
			'accept': 'application/json;odata=verbose'
		},
		async: false,
		success: function(data) {
			var items = data.d.results[0];
			document.getElementById(ID).innerHTML = "Syntax: <br/>"+items.Syntax;
		},
		error: function(error) {
			console.log(JSON.stringify(error));
		}
	});
}    