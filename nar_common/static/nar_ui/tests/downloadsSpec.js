var DOWNLOAD_TEST_DATA = {};
DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS = {
		"type":"FeatureCollection",
		"features":[
		            {
		            	"type":"Feature",
		            	"id":"JD_NFSN_sites0914.1",
		            	"geometry":{"type":"Point","coordinates":[-8089659.419657733,5266937.293367722]},
		            	"geometry_name":"the_geom",
		            	"properties":{
		            		"siteid":"0101010101",
		            		"staname":"Test Station",
		            		"state":"WI",
		            		"latitude":42.703417,
		            		"longitude":-72.670647,
		            		"sitetype":"Reference",
		            		"MSLoadSite":"",
		            		"MSSite":"",
		            		"bbox":[-8089659.419657733,5266937.293367722,-8089659.419657733,5266937.293367722]}},
            		{
		            	"type":"Feature",
		            	"id":"JD_NFSN_sites0914.2",
		            	"geometry":{"type":"Point","coordinates":[-8089659.419657733,5266937.293367722]},
		            	"geometry_name":"the_geom",
		            	"properties":{
		            		"siteid":"0101010101",
		            		"staname":"Duplicate of Station 1",
		            		"state":"WI",
		            		"latitude":42.703417,
		            		"longitude":-72.670647,
		            		"sitetype":"Reference",
		            		"MSLoadSite":"",
		            		"MSSite":"",
		            		"bbox":[-8089659.419657733,5266937.293367722,-8089659.419657733,5266937.293367722]}},
		            {
            			"type":"Feature",
            			"id":"JD_NFSN_sites0914.3",
            			"geometry":{"type":"Point","coordinates":[-8082392.483298749,5159080.08084164]},
            			"geometry_name":"the_geom",
            			"properties":{
            				"siteid":"020202020",
            				"staname":"Test Missippi Station",
		            		"state":"CA",
            				"latitude":41.987319,
            				"longitude":-72.605367,
            				"sitetype":"Coastal Rivers",
            				"MSLoadSite":"",
            				"MSSite":"MS",
            				"bbox":[-8082392.483298749,5159080.08084164,-8082392.483298749,5159080.08084164]}}
		            ],
        "crs":{"type":"EPSG","properties":{"code":"900913"}},
        "bbox":[-1.813204549443337E7,2983823.646199287,-8082392.483298749,8843435.97364051]
        };

describe('nar.downloads', function() {
	it('has an init function', function() {
		expect(nar.downloads.initDownloadPage).toBeDefined();
	});
});

describe('nar.downloads.getFilteredSiteTypeOptions', function() {
	var countKeys = function(json) {
		var num = 0;
		for(var k in json) {
			if(json.hasOwnProperty(k)) {
				num++;
			}
		}
		return num;
	};
	it("returns all unique site types, plus MRB, in correct format, when null state filter provided", function(){
		var siteTypes = nar.downloads.getFilteredSiteTypeOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, null);
		expect(countKeys(siteTypes)).toBe(3);
		expect(siteTypes['Coastal Rivers']).toBe('Coastal Rivers');
		expect(siteTypes['Reference']).toBe('Reference');
		expect(siteTypes['MRB']).toBe('MRB');
	});
	
	it("returns all unique site types, plus MRB, in correct format, when empty state filter provided", function(){
		var siteTypes = nar.downloads.getFilteredSiteTypeOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, []);
		expect(countKeys(siteTypes)).toBe(3);
		expect(siteTypes['Coastal Rivers']).toBe('Coastal Rivers');
		expect(siteTypes['Reference']).toBe('Reference');
		expect(siteTypes['MRB']).toBe('MRB');
	});
	
	it("returns all unique site types, plus MRB, in correct format, for WI/CA filter", function(){
		var siteTypes = nar.downloads.getFilteredSiteTypeOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, ['WI', 'CA']);
		expect(countKeys(siteTypes)).toBe(3);
		expect(siteTypes['Coastal Rivers']).toBe('Coastal Rivers');
		expect(siteTypes['Reference']).toBe('Reference');
		expect(siteTypes['MRB']).toBe('MRB');
	});
	
	it("returns correct unique site types, plus MRB, in correct format, for WI only filter", function(){
		var siteTypes = nar.downloads.getFilteredSiteTypeOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, ['WI']);
		expect(countKeys(siteTypes)).toBe(2);
		expect(siteTypes['Coastal Rivers']).toBeUndefined();
		expect(siteTypes['Reference']).toBe('Reference');
		expect(siteTypes['MRB']).toBe('MRB');
	});
	
	it("returns correct site types, plus MRB, in correct format, when state filter provided", function(){
		var siteTypes = nar.downloads.getFilteredSiteTypeOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, ['CA']);
		expect(countKeys(siteTypes)).toBe(2);
		expect(siteTypes['Coastal Rivers']).toBe('Coastal Rivers');
		expect(siteTypes['Reference']).toBeUndefined();
		expect(siteTypes['MRB']).toBe('MRB');
	});
});

describe('nar.downloads.getFilteredStationIdsOptions', function() {
	var countKeys = function(json) {
		var num = 0;
		for(var k in json) {
			if(json.hasOwnProperty(k)) {
				num++;
			}
		}
		return num;
	};
	it("returns all unique stations in correct format, when null state/sitetype filters provided", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, null, null);
		expect(countKeys(siteTypes)).toBe(2);
		expect(siteTypes['0101010101']).toBe('Test Station'); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBe('Test Missippi Station');
	});
	
	it("returns all unique stations in correct format, when empty state/sitetype filter provided", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, [], []);
		expect(countKeys(siteTypes)).toBe(2);
		expect(siteTypes['0101010101']).toBe('Test Station'); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBe('Test Missippi Station');
	});
	
	it("returns all unique stations in correct format, for WI/CA filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, ['WI', 'CA'], []);
		expect(countKeys(siteTypes)).toBe(2);
		expect(siteTypes['0101010101']).toBe('Test Station'); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBe('Test Missippi Station');
	});
	
	it("returns correct station in correct format, for WI only filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, ['WI'], []);
		expect(countKeys(siteTypes)).toBe(1);
		expect(siteTypes['0101010101']).toBe('Test Station'); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBeUndefined();
	});
	
	it("returns correct station in correct format, for CA only filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, ['CA'], []);
		expect(countKeys(siteTypes)).toBe(1);
		expect(siteTypes['0101010101']).toBeUndefined(); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBe('Test Missippi Station');
	});
	
	it("returns all unique stations in correct format, for Reference/Coastal Rivers filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, [], ['Reference', 'Coastal Rivers']);
		expect(countKeys(siteTypes)).toBe(2);
		expect(siteTypes['0101010101']).toBe('Test Station'); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBe('Test Missippi Station');
	});
	
	it("returns correct station in correct format, for Reference only filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, [], ['Reference']);
		expect(countKeys(siteTypes)).toBe(1);
		expect(siteTypes['0101010101']).toBe('Test Station'); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBeUndefined();
	});
	
	it("returns correct station in correct format, for Coastal Rivers only filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, [], ['Coastal Rivers']);
		expect(countKeys(siteTypes)).toBe(1);
		expect(siteTypes['0101010101']).toBeUndefined(); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBe('Test Missippi Station');
	});
	
	it("returns no stations (all filtered out), for Reference/MRB only filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, [], ['Reference', 'MRB']);
		expect(countKeys(siteTypes)).toBe(0);
		expect(siteTypes['0101010101']).toBeUndefined(); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBeUndefined();
	});

	it("returns correct station in correct format, for MRB only filter", function(){
		var siteTypes = nar.downloads.getFilteredStationIdsOptions(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS, [], ['MRB']);
		expect(countKeys(siteTypes)).toBe(1);
		expect(siteTypes['0101010101']).toBeUndefined(); //note: this is first occurance of the station ID
		expect(siteTypes['020202020']).toBe('Test Missippi Station');
	});
});

describe("nar.downloads.updateSelect2Options", function(){
		var test_data = {
			'opt1' : 'opt1 display value',
			'opt2' : 'opt2 display value'
		};
	it("creates and updates select2 with the correct options from a json map", function(){
		var testSelect = $('<select>');
		testSelect.attr('id', 'testSelect');
		$('body').append(testSelect);
		
		//ensure default state
		expect($('#testSelect').length).toBe(1); 
		expect($('#testSelect').find('option').length).toBe(0);
		
		nar.downloads.updateSelect2Options(testSelect, test_data, "Placeholder", false); 
		expect($('#testSelect').length).toBe(1); 
		expect($('#testSelect').find('option').length).toBe(2);
		expect($('#testSelect').find('option').get(0).value).toBe('opt1');
		expect($('#testSelect').find('option').get(1).value).toBe('opt2');
		expect($('#testSelect').find('option').get(0).text).toBe('opt1 display value');
		expect($('#testSelect').find('option').get(1).text).toBe('opt2 display value');
		
		//select a value to show it is maintained on update
		$('#testSelect').val('opt2').trigger('change');
		
		nar.downloads.updateSelect2Options(testSelect, test_data, "Placeholder", true); 
		expect($('#testSelect').length).toBe(1); 
		expect($('#testSelect').find('option').length).toBe(2);
		expect($('#testSelect').find('option').get(0).value).toBe('opt1');
		expect($('#testSelect').find('option').get(1).value).toBe('opt2');
		expect($('#testSelect').find('option').get(0).text).toBe('opt1 - opt1 display value');
		expect($('#testSelect').find('option').get(1).text).toBe('opt2 - opt2 display value');
		expect($('#testSelect').val()).toBe('opt2'); //value 2 is maintained
		

		$('#testSelect').val('').trigger('change');
		testSelect.select2('destroy');
		testSelect.remove();
		expect($('#testSelect').length).toBe(0); 
	});
});

describe("nar.downloads.initDownloadPage", function(){
	var server, formEl;
	var addElement = function(el, tag, id, name, opts) {
		var newEl = $('<' + tag + '>')
		newEl.attr('id', id);
		newEl.attr('name', name || id);
		if(opts) {
			for(var k in opts) {
				if(opts.hasOwnProperty(k)) {
					newEl.attr(k, opts[k]);
				}
			}
		}
		el.append(newEl);
	};
	var click = function (el){
	    var ev = document.createEvent("MouseEvent");
	    ev.initMouseEvent(
	        "click",
	        true /* bubble */, true /* cancelable */,
	        window, null,
	        0, 0, 0, 0, /* coordinates */
	        false, false, false, false, /* modifier keys */
	        0 /*left*/, null
	    );
	    el.get(0).dispatchEvent(ev);
	};
	
	beforeEach(function() {
		server = sinon.fakeServer.create();//created needed dom
		server.respondWith([
		    				200,
		    				{"Content-Type": "application/json"},
		    				JSON.stringify(DOWNLOAD_TEST_DATA.MOCK_SITE_DATA_FROM_OWS)
		    			]);
		
		
		formEl = $('<form>');
		formEl.attr('id', 'downloadForm');
		$('body').append(formEl);
		addElement(formEl, "input", "startDateTime");
		addElement(formEl, "input", "endDateTime");
		addElement(formEl, "select", "state");
		addElement(formEl, "select", "siteType");
		addElement(formEl, "select", "stationId");
		addElement(formEl, "input", "siteInformation", "dataType", { value: "siteInformation", type: "checkbox"});
		addElement(formEl, "input", "waterQuality", "dataType", { value: "waterQuality", type: "checkbox"});
		addElement(formEl, "input", "streamFlow", "dataType", { value: "streamFlow", type: "checkbox"});
		addElement(formEl, "select", "constituent");
		addElement(formEl, "select", "qwDataType");
		addElement(formEl, "select", "streamFlowType");
		addElement(formEl, "input", "r1", "mimeType", { value: "text/csv", type: "radio"});
		addElement(formEl, "input", "r2", "mimeType", { value: "text/tab-separated-values", type: "radio"});
		addElement(formEl, "input", "r3", "mimeType", { value: "application/vnd.ms-excel", type: "radio"});
		
		nar.downloads.initDownloadPage();
		server.respond();
	});
	
	afterEach(function() {
		server.restore();
		formEl.remove();
	});
	
	it("loaded state, site type, and station drop downs with correct filtering behavior between the fields", function(){
		expect($("#state").find('option').length).toBe(59); //TODO expect the state list to change
		expect($("#siteType").find('option').length).toBe(3); 
		expect($("#stationId").find('option').length).toBe(2); 
		
		//TODO make sure all filters/select2s get updated with correct filtered options
	});
	
	it("constituent, water quality, and stream flow drop downs disabled until respective checkboxes checked", function(){
		expect($("#constituent").attr("disabled")).toBe("disabled");
		expect($("#qwDataType").attr("disabled")).toBe("disabled");
		expect($("#streamFlowType").attr("disabled")).toBe("disabled");
		
		//click all checkboxes
		click($('#siteInformation'));
		click($('#waterQuality'));
		click($('#streamFlow'));

		//no longer disabled
		expect($("#constituent").attr("disabled")).toBeUndefined();
		expect($("#qwDataType").attr("disabled")).toBeUndefined();
		expect($("#streamFlowType").attr("disabled")).toBeUndefined();
	});
});