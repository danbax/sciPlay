
/**
 * init varaibles
 */
var catsFactsApiUrl = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=10";
var factsList = [];
var factsListHtml = "";
var expandedFactsIds = [];
var collapsedFactsIds = [];

/**
 * get facts from Api and set them to facts list
 */
$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: catsFactsApiUrl
    }).done(function( catFacts ) {
        factsList = catFacts;
        $.each( catFacts, function( index, fact ) {
            factsListHtml+=`<li data-id="`+fact._id+`" class="list-group-item facts-list-element">`+fact.text+`</li>`;
            collapsedFactsIds.push(fact._id);
        });
        $("#facts-list").html(factsListHtml);
    });
});

/**
 * Move item from fact list to details panel
 */
var factId,fact,element;
$( document ).on( "dblclick",".facts-list-element", function() {
    factId = $(this).data("id");

    $(this).hide('slow');

    collapsedFactsIds = jQuery.grep(collapsedFactsIds, function(value) {
        return value != factId;
    });

    expandedFactsIds.push(factId);

    $(this).remove();

    fact = factsList.find((o) => { return o["_id"] === factId });
    element =`<li data-id="`+fact._id+`" class="list-group-item details-panel-element">`+fact.text+`<hr>`+formatDate(fact.createdAt)+`</li>`;
    $("#details-panel").prepend(element);

    if(expandedFactsIds == 0){
        $("#save-json").attr("disabled","true");
    }else{
        $("#save-json").removeAttr("disabled");
    }

});

/**
 * Move item from details panel back to fact list
 */
$( document ).on( "dblclick",".details-panel-element", function() {
    factId = $(this).data("id");
    $(this).hide('slow');

    expandedFactsIds = jQuery.grep(expandedFactsIds, function(value) {
        return value != factId;
    });

    collapsedFactsIds.push(factId);
    $(this).remove();

    fact = factsList.find((o) => { return o["_id"] === factId });
    element =`<li data-id="`+fact._id+`" class="list-group-item facts-list-element">`+fact.text+`</li>`;
    $("#facts-list").prepend(element);

    if(expandedFactsIds == 0){
        $("#save-json").attr("disabled","true");
    }else{
        $("#save-json").removeAttr("disabled");
    }

});

/**
 * send expanded facts to the server
 */
var jsonFacts = [];
$( document ).on( "click","#save-json", function() {
    $("#save-message").text("Loading...");
    jsonFacts = [];
    $.each( factsList, function( index, fact ) {
        if( $.inArray(fact._id, expandedFactsIds) !== -1 ) {
            var formattedFact = {text:fact.text,createdAt:formatDate(fact.createdAt)}
            jsonFacts.push(formattedFact);
        }
    });

    $.ajax({
        method: "POST",
        url: "../../backend/php-vanila/ajaxApi.php",
        data:{
            action: "saveJson",
            json: JSON.stringify(jsonFacts)
        },
        dataType: "json"
    }).done(function( response ) {
        console.log(response);
        if(response.status == "OK"){
            $("#save-message").text("Saved succefully http://localhost/sciPlay/backend/php-vanila/facts.json");
        }else{
            $("#save-message").text(response.error);
        }
    });
    
});

/**
 * return date formatted as d/m/Y h:i
 * @param String date 
 */
function formatDate(date) {
date = new Date(date);
return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " +  ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + (date.getHours() < 12 ? ' AM' : ' PM');
}