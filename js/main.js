(function(){

	function topGit(){
		// calling init function for initializing events
		this.init();
	}

	topGit.prototype={
		totalCount:$(".total-count"),
		languageName:$(".language-name"),
		
		templateResult:$("#template-result-list").html(),


		init: function() {
			var self = this;
			var check;
			
			var starVal=$(".parent-checkbox").find('input:checked').val();
			
	
			// console.log(c)
			self.showRepositories(500,"none",1);

			$(".load-more a").click(function(event){
				event.preventDefault();

				$(".result").empty();
				var pageVal = $(this).data("url");
				console.log(pageVal)
				var languageVal = $("input.search").val();
				// console.log(languageVal);

				languageVal= languageVal.trim();
				if(languageVal==""){
					// $(".initial-subject").fadeIn();
					// alert("true")
			
					$(".initial-subject").fadeIn();
					var starVal=$(".parent-checkbox").find('input:checked').val();
					self.showRepositories(starVal,"none");
				}else{
				
					$(".initial-subject").hide();
					self.getLanguageName(languageVal);
				}
				var starVal=$(".parent-checkbox").find('input:checked').val();

				self.showRepositories(starVal, languageVal, pageVal);
			})



			$(".search-button").click(function(){
				$(".result").empty();
				var languageVal = $("input.search").val();
				// console.log(languageVal);

				languageVal= languageVal.trim();
				if(languageVal==""){
					
					
					$(".initial-subject").fadeIn();
					var starVal=$(".parent-checkbox").find('input:checked').val();
					self.showRepositories(startVal,"none");
				}else{
					
					$(".initial-subject").hide();
					self.getLanguageName(languageVal);
				}
				
				
			})

			$('input[type="checkbox"]').click(function() { 

    if ($(this).is(':checked')) {
        //$(this).prop('checked',false);
 $(this).siblings().attr('checked',false)
        var starsVal = $(this).val();
    

        $(".result").empty();
				var languageVal = $("input.search").val();
				// console.log(languageVal);

				languageVal= languageVal.trim();
				if(languageVal==""){
					// $(".initial-subject").fadeIn();
					// alert("true")
					check="none";
					$(".initial-subject").fadeIn();
					self.showRepositories(starsVal,"none");
				}else{
					check="languageVal";
					$(".initial-subject").hide();
					self.getLanguageName(languageVal);
				}
			 } 
})


			
		},
		showRepositories: function(starsVal,languageVal, pageVal) {

			self=this;
			
			// $(".result ul").empty();
			$(".found-heading,.initial-subject").hide();

			 $.getJSON("https://api.github.com/search/repositories?q=stars:>="+starsVal+" language:"+languageVal+"&page="+pageVal+"")
                .done(function(json) {
                	

                	$(".load-more a").data("url",pageVal+1)
                	self.totalCount.html(json.total_count);
                
                	if(languageVal!="none"){
                		$(".found-heading").fadeIn();
                		$(".initial-subject").hide();
                		
                		self.languageName.html(languageVal);
                	}
                	else{
                		$(".found-heading").hide();
                		$(".initial-subject").fadeIn();
                	}
                	for(i in json.items){
                		console.log(json.items[i].description)
                		if(json.items[i].description.length>80){
                		
                			json.items[i].description=json.items[i].description.slice(0,70).concat("...");
                		}
                	
                	}
                	 var html = Mustache.to_html(self.templateResult, json);
                	 $(".result").append(html);
                	
                });
		},
		getLanguageName: function(languageVal) {

			self=this;

			 $.getJSON("https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json")
                .done(function(json) {
                	
                	for (i in json){
                		json[i]=json[i].toLowerCase();
                		if(json[i]===languageVal){
                			var starVal=$(".parent-checkbox").find('input:checked').val();
                			self.showRepositories(starVal, languageVal);
                			break;
                		}
                		else{
                			$(".result ul").empty();
                			self.totalCount.html("0");
                			$(".found-heading").fadeIn();
                			self.languageName.html(languageVal);
                		}

                	}

                });
		}
	}

// invoking the constructor
var topGit = new topGit();
})();