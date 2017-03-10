function initPressTableSlider(){
					totalItems = $('.press-list li').length;
					if(totalItems > itemsPerPage){
						$('#inbox-press-nav').show();
					}
			
					$('.press-list li').each(function(index) {
						if(index < itemsPerPage){
							$(this).show()
						}
						
					})
				}

function slidePressTable(dir){
			
			maxpages = totalItems/itemsPerPage;
			
			tableIndex += dir;
			if(tableIndex >= maxpages){
				tableIndex = 0;
			}
			if(tableIndex == -1){
				tableIndex = maxpages-1;
			}
			count = 0;
			from = tableIndex*itemsPerPage;
			to = (tableIndex+1)*itemsPerPage;
			
			$('.press-list li').each(function() {										
				if(count >= from && count < to ){
					$(this).show();						
				 }
				 else{
					$(this).hide();	
				 }
				 count++;
			});
			//$('#agent_featured_press h1').html(tableIndex+' '+from+' '+to+' '+maxpages);
}