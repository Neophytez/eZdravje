
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";


/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
 
function generirajPodatke(stPacienta) {
	sessionId = getSessionId();
	var ehrId = "";
	
	if(stPacienta == 1) {
		var ime = "Bojan";
		var priimek = "Kralj";
		var spol = "MALE";
		var krvnaSkupina = "A+"; 
		var datumRojstva = "1975-02-14T02:23";
		
	  	$.ajaxSetup({
			headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
			url: baseUrl + "/ehr",
			type: 'POST',
			async: false,
			success: function (data) {
				ehrId = data.ehrId;
				console.log(ehrId);
				var partyData = {
					firstNames: ime,
					lastNames: priimek,
					gender: spol,
					dateOfBirth: datumRojstva,
			        partyAdditionalInfo: [{key: "ehrId", value: ehrId}, {key: "bloodType", value: krvnaSkupina}]
			    };
			    $.ajax({
			        url: baseUrl + "/demographics/party",
			        type: 'POST',
			        async: false,
			        contentType: 'application/json',
			        data: JSON.stringify(partyData),
			        success: function (party) {
			            if (party.action == 'CREATE') {
			            	document.getElementById("info1").className = "alert alert-success";
			            	$("#info1").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>EHR '" + ehrId + "' uspešno kreiran.");
							for(var x=0; x<5; x++) {
								var datumInUra = "2016"  + "-0" + (Math.floor(Math.random() * 5) + 1) + "-" + "01" + "T" + (Math.floor(Math.random() * 14) + 10) + ":" + (Math.floor(Math.random() * 41) + 10);
								var telesnaVisina = 175 + (2*x);
								var telesnaTeza = 75 + x;
								var telesnaTemperatura = (Math.floor(Math.random() * 2) + 35) + 0.5 + x/10;
								var krvniTlakVisok = Math.floor(Math.random() * 31) + 110;
								var krvniTlakNizek = Math.floor(Math.random() * 31) + 60;
								var srcniUtrip = Math.floor(Math.random() * 41) + 60;
								
								var data = {
								    "ctx/language": "en",
								    "ctx/territory": "SI",
								    "ctx/time": datumInUra,
								    "vital_signs/height_length/any_event/body_height_length": parseFloat(telesnaVisina),
								    "vital_signs/height_length/any_event/body_height_length|unit": "cm",
								    "vital_signs/body_weight/any_event/body_weight": parseFloat(telesnaTeza),
								    "vital_signs/body_weight/any_event/body_weight|unit": "kg",
								   	"vital_signs/body_temperature/any_event/temperature|magnitude": parseFloat(telesnaTemperatura),
								    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
								    "vital_signs/pulse/any_event/rate|magnitude": parseInt(srcniUtrip),
								    "vital_signs/pulse/any_event/rate|unit": "/min",
								    "vital_signs/blood_pressure/any_event/systolic": krvniTlakVisok,
								    "vital_signs/blood_pressure/any_event/systolic|unit": "mm[Hg]",
								    "vital_signs/blood_pressure/any_event/diastolic": krvniTlakNizek,
								    "vital_signs/blood_pressure/any_event/diastolic|unit": "mm[Hg]"
								};
								var parametriZahteve = {
								    ehrId: ehrId,
								    templateId: 'Vital Signs',
								    format: 'FLAT'
								};
								$.ajax({
								    url: baseUrl + "/composition?" + $.param(parametriZahteve),
								    type: 'POST',
								    async: false,
								    contentType: 'application/json',
								    data: JSON.stringify(data),
								    success: function (res) {
			            				$("#info1").append("<br /><small>" + res.meta.href + "</small>");
								    },
								    error: function(err) {
			            				document.getElementById("info1").className = "alert alert-warning";
			            				$("#info1").append("<br />Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
								    }
								});
							}
			            }
			        },
			        error: function(err) {
			        	document.getElementById("info1").className = "alert alert-warning";
			            $("#info1").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
			        }
			    });
			}
		});
	} else if(stPacienta == 2) {
		var ime = "Tina";
		var priimek = "Hlev";
		var spol = "FEMALE";
		var krvnaSkupina = "AB-"; 
		var datumRojstva = "1995-10-08T20:53";
		
	  	$.ajaxSetup({
			headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
			url: baseUrl + "/ehr",
			type: 'POST',
			async: false,
			success: function (data) {
				ehrId = data.ehrId;
				console.log(ehrId);
				var partyData = {
					firstNames: ime,
					lastNames: priimek,
					gender: spol,
					dateOfBirth: datumRojstva,
			        partyAdditionalInfo: [{key: "ehrId", value: ehrId}, {key: "bloodType", value: krvnaSkupina}]
			    };
			    $.ajax({
			        url: baseUrl + "/demographics/party",
			        type: 'POST',
			        async: false,
			        contentType: 'application/json',
			        data: JSON.stringify(partyData),
			        success: function (party) {
			            if (party.action == 'CREATE') {
			            	document.getElementById("info2").className = "alert alert-success";
			            	$("#info2").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>EHR '" + ehrId + "' uspešno kreiran.");
							for(var x=0; x<5; x++) {
								var datumInUra = "2016"  + "-0" + (Math.floor(Math.random() * 5) + 1) + "-" + "01" + "T" + (Math.floor(Math.random() * 14) + 10) + ":" + (Math.floor(Math.random() * 41) + 10);
								var telesnaVisina = 165 + (2*x);
								var telesnaTeza = 55 + x;
								var telesnaTemperatura = (Math.floor(Math.random() * 6) + 35) + 0.5 + x/10;
								var krvniTlakVisok = Math.floor(Math.random() * 61) + 100;
								var krvniTlakNizek = Math.floor(Math.random() * 61) + 50;
								var srcniUtrip = Math.floor(Math.random() * 61) + 60;
								
								var data = {
								    "ctx/language": "en",
								    "ctx/territory": "SI",
								    "ctx/time": datumInUra,
								    "vital_signs/height_length/any_event/body_height_length": parseFloat(telesnaVisina),
								    "vital_signs/height_length/any_event/body_height_length|unit": "cm",
								    "vital_signs/body_weight/any_event/body_weight": parseFloat(telesnaTeza),
								    "vital_signs/body_weight/any_event/body_weight|unit": "kg",
								   	"vital_signs/body_temperature/any_event/temperature|magnitude": parseFloat(telesnaTemperatura),
								    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
								    "vital_signs/pulse/any_event/rate|magnitude": parseInt(srcniUtrip),
								    "vital_signs/pulse/any_event/rate|unit": "/min",
								    "vital_signs/blood_pressure/any_event/systolic": krvniTlakVisok,
								    "vital_signs/blood_pressure/any_event/systolic|unit": "mm[Hg]",
								    "vital_signs/blood_pressure/any_event/diastolic": krvniTlakNizek,
								    "vital_signs/blood_pressure/any_event/diastolic|unit": "mm[Hg]"
								};
								var parametriZahteve = {
								    ehrId: ehrId,
								    templateId: 'Vital Signs',
								    format: 'FLAT'
								};
								$.ajax({
								    url: baseUrl + "/composition?" + $.param(parametriZahteve),
								    type: 'POST',
								    async: false,
								    contentType: 'application/json',
								    data: JSON.stringify(data),
								    success: function (res) {
			            				$("#info2").append("<br /><small>" + res.meta.href + "</small>");
								    },
								    error: function(err) {
			            				document.getElementById("info2").className = "alert alert-warning";
			            				$("#info2").append("<br />Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
								    }
								});
							}
			            }
			        },
			        error: function(err) {
			        	document.getElementById("info2").className = "alert alert-warning";
			            $("#info2").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
			        }
			    });
			}
		});
	} else if(stPacienta == 3) {
		var ime = "Miha";
		var priimek = "Jerman";
		var spol = "MALE";
		var krvnaSkupina = "A+"; 
		var datumRojstva = "1990-08-02T14:48";
		
	  	$.ajaxSetup({
			headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
			url: baseUrl + "/ehr",
			type: 'POST',
			async: false,
			success: function (data) {
				ehrId = data.ehrId;
				console.log(ehrId);
				var partyData = {
					firstNames: ime,
					lastNames: priimek,
					gender: spol,
					dateOfBirth: datumRojstva,
			        partyAdditionalInfo: [{key: "ehrId", value: ehrId}, {key: "bloodType", value: krvnaSkupina}]
			    };
			    $.ajax({
			        url: baseUrl + "/demographics/party",
			        type: 'POST',
			        async: false,
			        contentType: 'application/json',
			        data: JSON.stringify(partyData),
			        success: function (party) {
			            if (party.action == 'CREATE') {
			            	document.getElementById("info3").className = "alert alert-success";
			            	$("#info3").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>EHR '" + ehrId + "' uspešno kreiran.");
							for(var x=0; x<5; x++) {
								var datumInUra = "2016"  + "-0" + (Math.floor(Math.random() * 5) + 1) + "-" + "01" + "T" + (Math.floor(Math.random() * 14) + 10) + ":" + (Math.floor(Math.random() * 41) + 10);
								var telesnaVisina = 180 + (2*x);
								var telesnaTeza = 90 + x;
								var telesnaTemperatura = (Math.floor(Math.random() * 5) + 34) + 0.5 + x/10;
								var krvniTlakVisok = Math.floor(Math.random() * 51) + 90;
								var krvniTlakNizek = Math.floor(Math.random() * 51) + 50;
								var srcniUtrip = Math.floor(Math.random() * 61) + 50;
								
								var data = {
								    "ctx/language": "en",
								    "ctx/territory": "SI",
								    "ctx/time": datumInUra,
								    "vital_signs/height_length/any_event/body_height_length": parseFloat(telesnaVisina),
								    "vital_signs/height_length/any_event/body_height_length|unit": "cm",
								    "vital_signs/body_weight/any_event/body_weight": parseFloat(telesnaTeza),
								    "vital_signs/body_weight/any_event/body_weight|unit": "kg",
								   	"vital_signs/body_temperature/any_event/temperature|magnitude": parseFloat(telesnaTemperatura),
								    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
								    "vital_signs/pulse/any_event/rate|magnitude": parseInt(srcniUtrip),
								    "vital_signs/pulse/any_event/rate|unit": "/min",
								    "vital_signs/blood_pressure/any_event/systolic": krvniTlakVisok,
								    "vital_signs/blood_pressure/any_event/systolic|unit": "mm[Hg]",
								    "vital_signs/blood_pressure/any_event/diastolic": krvniTlakNizek,
								    "vital_signs/blood_pressure/any_event/diastolic|unit": "mm[Hg]"
								};
								var parametriZahteve = {
								    ehrId: ehrId,
								    templateId: 'Vital Signs',
								    format: 'FLAT'
								};
								$.ajax({
								    url: baseUrl + "/composition?" + $.param(parametriZahteve),
								    type: 'POST',
								    async: false,
								    contentType: 'application/json',
								    data: JSON.stringify(data),
								    success: function (res) {
			            				$("#info3").append("<br /><small>" + res.meta.href + "</small>");
								    },
								    error: function(err) {
			            				document.getElementById("info3").className = "alert alert-warning";
			            				$("#info3").append("<br />Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
								    }
								});
							}
			            }
			        },
			        error: function(err) {
			        	document.getElementById("info3").className = "alert alert-warning";
			            $("#info3").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
			        }
			    });
			}
		});
	}
	return ehrId;
}

String.prototype.velikaZacetnica = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function kreirajEHR() {
	sessionId = getSessionId();

	var ime = $("#kreirajIme").val().velikaZacetnica();
	var priimek = $("#kreirajPriimek").val().velikaZacetnica();
	var spol = $("input:checked").val();
	var krvnaSkupina = $("#kreirajKrvnaSkupina").find("option:selected").val();
	var datumRojstva = $("#kreirajDatumRojstva").val();

	if (!ime || !priimek || !spol || !krvnaSkupina || !datumRojstva || ime.trim().length == 0 || priimek.trim().length == 0 || datumRojstva.trim().length == 0 || krvnaSkupina.trim().length == 0) {
	    $("#kreirajSporocilo").html("<span class='label label-warning'>Zahtevani podatki niso vpisani!</span>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            gender: spol,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}, {key: "bloodType", value: krvnaSkupina}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    $("#kreirajSporocilo").html("<span class='label label-success'>EHR '" + ehrId + "' uspešno kreiran.</span>");
		                    $("#preberiEHRid").val(ehrId);
		                }
		            },
		            error: function(err) {
		            	$("#kreirajSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
		            }
		        });
		    }
		});
	}
}

function preberiEHR() {
	sessionId = getSessionId();

	var ehrId = $("#preberiEHRid").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiSporocilo").html("<span class='label label-warning'>Zahtevani podatek ni vpisan!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$("#preberiIme").attr('placeholder', party.firstNames);
				$("#preberiPriimek").attr('placeholder', party.lastNames);
				if(party.gender == "MALE")
					$("#preberiSpol").attr('placeholder', "moški");
				if(party.gender == "FEMALE")
					$("#preberiSpol").attr('placeholder', "ženski");
				for(var k in party.partyAdditionalInfo) {
	                if (party.partyAdditionalInfo[k].key === 'bloodType') {
	                	$("#preberiKrvnaSkupina").attr('placeholder', party.partyAdditionalInfo[k].value);
	                    break;
	                }
	            }
				$("#preberiDatumRojstva").attr('placeholder', party.dateOfBirth);
				$("#preberiSporocilo").html("<span class='label label-success'>EHR '" + ehrId + "' uspešno prebran.</span>");
			},
			error: function(err) {
				$("#preberiSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
			}
		});
	}
}

function dodajMeritveVitalnihZnakov() {
	sessionId = getSessionId();

	var ehrId = $("#dodajVitalnoEHR").val();
	var datumInUra = $("#dodajVitalnoDatumInUra").val();
	var telesnaVisina = $("#dodajVitalnoTelesnaVisina").val();
	var telesnaTeza = $("#dodajVitalnoTelesnaTeza").val();
	var telesnaTemperatura = $("#dodajVitalnoTelesnaTemperatura").val();
	var krvniTlak = $("#dodajVitalnoKrvniTlak").val().split("/");
	var krvniTlakVisok = krvniTlak[0];
	var krvniTlakNizek = krvniTlak[1];
	var srcniUtrip = $("#dodajVitalnoSrcniUtrip").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='label label-warning'>Zahtevani podatki niso vpisani!");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		var data = {
		    "ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": datumInUra,
		    "vital_signs/height_length/any_event/body_height_length": parseFloat(telesnaVisina),
		    "vital_signs/height_length/any_event/body_height_length|unit": "cm",
		    "vital_signs/body_weight/any_event/body_weight": parseFloat(telesnaTeza),
		    "vital_signs/body_weight/any_event/body_weight|unit": "kg",
		   	"vital_signs/body_temperature/any_event/temperature|magnitude": parseFloat(telesnaTemperatura),
		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
		    "vital_signs/pulse/any_event/rate|magnitude": parseInt(srcniUtrip),
		    "vital_signs/pulse/any_event/rate|unit": "/min",
		    "vital_signs/blood_pressure/any_event/systolic": krvniTlakVisok,
		    "vital_signs/blood_pressure/any_event/systolic|unit": "mm[Hg]",
		    "vital_signs/blood_pressure/any_event/diastolic": krvniTlakNizek,
		    "vital_signs/blood_pressure/any_event/diastolic|unit": "mm[Hg]"
		};
		var parametriZahteve = {
		    ehrId: ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT'
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(data),
		    success: function (res) {
		        $("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='label label-success'>" + res.meta.href + ".</span>");
		    },
		    error: function(err) {
		    	$("#dodajMeritveVitalnihZnakovSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
		    }
		});
	}
}

function dateTime(string) {
	var now = new Date(string);
	var y = now.getFullYear();
	var m = (now.getMonth()+1); 
	var d = now.getDate();
	var h = now.getHours();
	var n = now.getMinutes();
	if(m.toString().length == 1) {
        m = '0' + m;
    }
    if(d.toString().length == 1) {
        d = '0' + d;
    }   
    if(h.toString().length == 1) {
        h = '0' + h;
    }
    if(n.toString().length == 1) {
        n = '0' + n;
    }
    return d + '.' + m + '.' + y + ' ' + h + ':' + n;   
}

function preberiMeritveVitalnihZnakov() {
	sessionId = getSessionId();

	var ehrId = $("#meritveVitalnihZnakovEHRid").val();
	var id = $("#preberiTipZaVitalneZnake").val();

	if (!ehrId || ehrId.trim().length == 0 || !id || id.trim().length == 0) {
		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-warning'>Zahtevan podatek ni vpisan!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
		        var party = data.party;
				var results = "";
				$("#rezultatMeritveVitalnihZnakov").html("<br/><br/>");
				
				if (id == "telesnaVisina") {
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "height",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	results = "<table class='table table-striped' style='margin: 0; padding: 0;'><tr><th>Datum in ura</th><th class='text-right'>Telesna višina</th></tr></table><div style='overflow:auto; height: 320px;'><table class='table table-striped table-hover'>";
						        for (i in res) {
						            results += "<tr><td width='50%'>" + dateTime(res[i].time) + "</td><td class='text-right'>" + res[i].height + " " + res[i].unit + "</td>";
						        }
						        results += "</table></div>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-warning'>" + "Ni podatkov za telesno višino!</span>");
					    	}
					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
					    }
					});
				} else if (id == "telesnaTeza") {
					$.ajax({
					    url: baseUrl + "/view/" + ehrId + "/" + "weight",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	results = "<table class='table table-striped' style='margin: 0; padding: 0;'><tr><th>Datum in ura</th><th class='text-right'>Telesna teža</th></tr></table><div style='overflow:auto; height: 320px;'><table class='table table-striped table-hover'>";
						        for (var i in res) {
						            results += "<tr><td width='50%'>" + dateTime(res[i].time) + "</td><td class='text-right'>" + res[i].weight + " " 	+ res[i].unit + "</td>";
						        }
						        results += "</table></div>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-warning'>" + "Ni podatkov za telesno težo!</span>");
					    	}
					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
					    }
					});
				} else if (id == "telesnaTemperatura") {
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "body_temperature",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	results = "<table class='table table-striped' style='margin: 0; padding: 0;'><tr><th>Datum in ura</th><th class='text-right'>Telesna temperatura</th></tr></table><div style='overflow:auto; height: 320px;'><table class='table table-striped table-hover'>";
						        for (var i in res) {
						            results += "<tr><td width='50%'>" + dateTime(res[i].time) + "</td><td class='text-right'>" + res[i].temperature + " " + res[i].unit + "</td>";
						        }
						        results += "</table></div>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-warning'>" + "Ni podatkov za telesno temperaturo!</span>");
					    	}
					    	var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
					        res.forEach(function(el, i, arr) {
					            var date = new Date(el.time);
					            el.date = date.getDate() + '-' + monthNames[date.getMonth()];
					        });
					        new Morris.Bar({
					            element: 'body-temperature',
					            data: res.reverse(),
					            xkey: 'date',
					            ykeys: ['temperature'],
					            labels: ['Body Temperature'],
					            hideHover: true,
					            barColors: ['#FFCE54'],
					            xLabelMargin: 5,
					            resize: true
					        });
					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
					    }
					});
				} else if (id == "krvniTlak") {
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "blood_pressure",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	results = "<table class='table table-striped' style='margin: 0; padding: 0;'><tr><th>Datum in ura</th><th class='text-right'>Krvni tlak</th></tr></table><div style='overflow:auto; height: 320px;'><table class='table table-striped table-hover'>";
						        for (var i in res) {
						            results += "<tr><td width='50%'>" + dateTime(res[i].time) + "</td><td class='text-right'>" + res[i].systolic + "/" + res[i].diastolic + " " + res[i].unit + "</td>";
						        }
						        results += "</table></div>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-warning'>" + "Ni podatkov za krvni tlak!</span>");
					    	}
					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
					    }
					});
				} else if (id == "srcniUtrip") {
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "pulse",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	results = "<table class='table table-striped' style='margin: 0; padding: 0;'><tr><th>Datum in ura</th><th class='text-right'>Srčni utrip</th></tr></table><div style='overflow:auto; height: 320px;'><table class='table table-striped table-hover'>";
						        for (var i in res) {
						            results += "<tr><td width='50%'>" + dateTime(res[i].time) + "</td><td class='text-right'>" + res[i].pulse + " " + res[i].unit + "</td>";
						        }
						        results += "</table></div>";
						        $("#rezultatMeritveVitalnihZnakov").append(results);
					    	} else {
					    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-warning'>" + "Ni podatkov za krvni tlak!</span>");
					    	}
					    },
					    error: function() {
					    	$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='label label-danger'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
					    }
					});
				}
	    	},
	    	error: function(err) {
	    		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
	    	}
		});
	}
}

var x = document.getElementById("demo");
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}
function showPosition(position) {
	var latlon = position.coords.latitude + "," + position.coords.longitude;
	var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false" + "&markers=color:red%7C" + latlon;
	document.getElementById("mapholder").innerHTML = "<img width='100%' height='auto' src='" + img_url + "'>";
}
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			x.innerHTML = "User denied the request for Geolocation."
			break;
		case error.POSITION_UNAVAILABLE:
			x.innerHTML = "Location information is unavailable."
			break;
		case error.TIMEOUT:
			x.innerHTML = "The request to get user location timed out."
			break;
		case error.UNKNOWN_ERROR:
			x.innerHTML = "An unknown error occurred."
			break;
	}
}
getLocation();
$(document).ready(function() {

	$('#preberiPredlogoUporabnika').change(function() {
		$("#kreirajSporocilo").html("");
		var podatki = $(this).val().split(",");
		$("#kreirajIme").val(podatki[0]);
		$("#kreirajPriimek").val(podatki[1]);
		if(podatki[2] == "MALE") {
			$("#rMale").attr('checked', true);
		}
		if(podatki[2] == "FEMALE") {
			$("#rFemale").attr('checked', true);
		}
		if(podatki[2] == undefined) {
			$("#rMale").attr('checked', false);
			$("#rFemale").attr('checked', false);
		}
		$("#kreirajKrvnaSkupina").val(podatki[3]);
		$("#kreirajDatumRojstva").val(podatki[4]);
	});

	$('#preberiObstojeciEHR').change(function() {
		$("#preberiSporocilo").html("");
		$("#preberiEHRid").val($(this).val());
	});

	$('#preberiObstojeciVitalniZnak').change(function() {
		$("#dodajMeritveVitalnihZnakovSporocilo").html("");
		var podatki = $(this).val().split("|");
		$("#dodajVitalnoEHR").val(podatki[0]);
		$("#dodajVitalnoDatumInUra").val(podatki[1]);
		$("#dodajVitalnoTelesnaVisina").val(podatki[2]);
		$("#dodajVitalnoTelesnaTeza").val(podatki[3]);
		$("#dodajVitalnoTelesnaTemperatura").val(podatki[4]);
		$("#dodajVitalnoKrvniTlak").val(podatki[5]);
		$("#dodajVitalnoSrcniUtrip").val(podatki[6]);
	});
	
	$('#preberiEhrIdZaVitalneZnake').change(function() {
		$("#preberiMeritveVitalnihZnakovSporocilo").html("");
		$("#rezultatMeritveVitalnihZnakov").html("");
		$("#meritveVitalnihZnakovEHRid").val($(this).val());
	});

});