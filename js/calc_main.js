$(document).ready(function(){	
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			
			$("#glassCalcForm").validate({
			  rules: {
				// simple rule, converted to {required:true}
				list_price_a: {
					required: true,
					number: true,
					min: 1,
					max: 9999999
				},
				main_unit: {
					required: true,
				},
				
			  }
			});
			
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 
					
				var priceInput_Array = [];
					
				let list_price_a = Number(document.getElementById("list_price_a").value);
				let list_price_b = Number(document.getElementById("list_price_b").value);
				let list_price_c = Number(document.getElementById("list_price_c").value);
				priceInput_Array = [list_price_a , list_price_b , list_price_c];
				
				let vendor = Number( $('#main_unit').val() );
				let upCharge = Number( $('#main_unit option:selected').attr('data-upcharge') )/100;
				console.log(upCharge);
				let discount =  $('#discount').val() ? Number( $('#discount').val() )/100 : 0;
				
				let price = 0;
				let totalCost = 0;
				let clientPrice = 0;
				
				for( let i=0; i < priceInput_Array.length ; i++){
						if( priceInput_Array[i] !=0 && priceInput_Array[i] != undefined && priceInput_Array[i] != null && priceInput_Array[i] > 0 )
						{
							price = round_2_digits ( Number(priceInput_Array[i]) * Number(vendor) );
							totalCost += round_2_digits(price);
							clientPrice += round_2_digits( price + (price * upCharge) - (price * discount) );
						}
				}
				
				let profit = round_2_digits(clientPrice - totalCost);
				
				$("#totalCost, #print_totalCost").text(totalCost);
				$("#clientPrice, #print_clientPrice").text(clientPrice);
				$("#profit, #print_profit").text(profit);
				
				$("#resultsTable").show();
				
				$('html, body').animate({
					scrollTop: $("#resultsTable").offset().top
				}, 1000);
				
				$("#print_list_price_a").text(list_price_a);
				$("#print_list_price_b").text(list_price_b);
				$("#print_list_price_c").text(list_price_c);
				$("#print_vendor").text( $('#main_unit option:selected').text() );
				$("#print_discount").text( discount * 100 + " % " );
				
			});	
			
});
