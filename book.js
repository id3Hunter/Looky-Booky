var URL="http://openlibrary.org/search.json?q=";


function getBookTitle(){
  
    var title = $("#bookSearchBar").val();
    title = title.replace(" ","+");

   console.log(typeof(title));
    console.log(title);
    console.log(URL+title);
    
    
$.ajax({
		url: URL+title,
		method: "GET",
	}).done(function(data) {
		
    console.log(data);
		//clear out old data
		$("#book_list").html("");

        var isbn;
        var len = data.docs.length;
		for (i=0;i<len;i++) {
            isbn = 0;
            if( data.docs[i].isbn){
                isbn = data.docs[i].isbn[0];
            }
            
			$("#book_list").append("<li class='list-group-item getCover' isbn='" + isbn + "'>" + data.docs[i].title + "</li>");
		} 
    
         $("li.getCover").click(function(){
             console.log("clicked!");
            $("#cover_image").html("");
            $("#cover_image").show();
                
             if($(this).attr('isbn') !== '0'){
                    $("#cover_image").append("<h2>" + $(this).text() + "</h2>");
                     $("#cover_image").append("<img src='http://covers.openlibrary.org/b/isbn/" + $(this).attr('isbn') + "-M.jpg'" + "//>");
                }else{
                    $("#cover_image").append("<h2>" + $(this).text() + "</h2>");
                    $("#cover_image").append("<h3>No cover image</h3>");
                }
           
             
          });

	}).fail(function(error) {
		console.log("FAILED");
	});
     
}

$(document).ready(function(){
        $("#cover_image").hide();
    });
