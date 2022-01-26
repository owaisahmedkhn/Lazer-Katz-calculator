$(document).ready(function(){	
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			
			var priceFieldHtml = '<div class="row input_field">' + 
					'<div class="col-md-6">' + 
						'<label>' + 
							'Description' + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<input type="text" id="" class="number_req form-control description" name ="" value=""/>' + 
						'</div>' + 
					'</div>' + 
					'<div class="col-md-5">' + 
						'<label>' + 
							'Price' + 
						'</label>' + 
						'<div class="input_field_n_dollar">' + 
							'<span class="dollar_sign"> $ </span>' + 
							'<input type="text" id="" class="number_req form-control list_price" name ="" value=""/>' + 
						'</div>' + 	
					'</div>' + 
					'<div class="col-md-1"> <label>&nbsp;</label> <button type="button" class="minus"> - </button></div>' + 
				'</div>';
			
			$("#priceCalcForm").validate({
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
			
			
			jQuery( ".plus" ).click(function( event ){
				event.preventDefault();
				 $(this).parent().parent().parent().append(priceFieldHtml);
				//console.log( $(this).parent().parent().parent().append(priceFieldHtml) );
			});
			/*
			jQuery( ".minus" ).click(function( event ){
				event.preventDefault();
				console.log("test");
				console.log($(this).parent().parent().attr("class"));
				$(this).parent().parent().remove();
				
			});
			*/
			jQuery("#priceCalcForm").on("click",".minus", function(){
				jQuery(this).parent().parent().remove();
			});
				
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				jQuery("#input_data_table").remove();
				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 
					
					
				
				let price = 0;
				let totalCost = 0;
				let clientPrice = 0;
				
				var priceInput_Array = [];
				
				let vendor = Number( $('#main_unit').val() );
				let upCharge = Number( $('#main_unit option:selected').attr('data-upcharge') )/100;
				
				let discount =  $('#discount').val() ? Number( $('#discount').val() )/100 : 0;
				
				let shipping =  $('#shipping').val() ? Number( $('#shipping').val() ) : 0;
				let surcharge =  $('#surcharge').val() ? Number( $('#surcharge').val() ) : 0;
				
				let print_input_data = '<table id="input_data_table"> <tr> <th class="thead-dark"> Description</th> <th class="thead-dark"> Price</th></tr>';
				
				$('.list_price').each(function () {
					price = round_2_digits ( Number( $(this).val() ) * Number(vendor) );
					totalCost += round_2_digits(price);
					clientPrice += round_2_digits( price + (price * upCharge) - (price * discount) );
					
					print_input_data += '<tr><td>' + $(this).parent().parent().parent().find('.description').val() + ' </td>';
					print_input_data += '<td> $ ' + numberWithCommas(price) + ' </td></tr>';
					//console.log($(this).parent().parent().parent().find('.description').val());
				});
				
				print_input_data += '<tr><td> Vendor </td>';
				print_input_data += '<td>' + $('#main_unit option:selected').text() + ' </td></tr>';
				
				print_input_data += '<tr><td> Shipping </td>';
				print_input_data += '<td> $ ' + numberWithCommas(shipping) + ' </td></tr>';
				
				print_input_data += '<tr><td> Surcharge </td>';
				print_input_data += '<td> $ ' + numberWithCommas(surcharge) + ' </td></tr>';
				
				print_input_data += '<tr><td> Discount </td>';
				print_input_data += '<td>' + discount * 100 + ' % </td></tr>';
				
				
				print_input_data += '</table>';
				
				totalCost = totalCost + Number(shipping) + Number(surcharge);
				clientPrice = clientPrice + Number(shipping) + Number(surcharge);
				
				let profit = round_2_digits(clientPrice - totalCost);
				
				$("#totalCost, #print_totalCost").text("Total Cost Price is : $ " + numberWithCommas(totalCost) );
				$("#clientPrice, #print_clientPrice").text("$ " + numberWithCommas(clientPrice));
				$("#serial_num").text("S # 0125" + round_zero_decimal_digits(profit) + "00");
				
				//$("#profit, #print_profit").text("$ " + profit);
				
				
				
				
				$("#resultsTable").show();
				
				$('html, body').animate({
					scrollTop: $("#resultsTable").offset().top
				}, 1000);
				
				$('#editor').append(print_input_data);
				
				
				/*
				$("#print_list_price_a").text("$ " + list_price_a);
				$("#print_list_price_b").text("$ " + list_price_b);
				$("#print_list_price_c").text("$ " + list_price_c);
				$("#print_vendor").text( $('#main_unit option:selected').text() );
				$("#print_discount").text( discount * 100 + " % " );
				*/
				/*
					
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
				
				$("#totalCost, #print_totalCost").text("$ " + totalCost);
				$("#clientPrice, #print_clientPrice").text("$ " + clientPrice);
				$("#profit, #print_profit").text("$ " + profit);
				
				
				
				$("#resultsTable").show();
				
				$('html, body').animate({
					scrollTop: $("#resultsTable").offset().top
				}, 1000);
				
				$("#print_list_price_a").text("$ " + list_price_a);
				$("#print_list_price_b").text("$ " + list_price_b);
				$("#print_list_price_c").text("$ " + list_price_c);
				$("#print_vendor").text( $('#main_unit option:selected').text() );
				$("#print_discount").text( discount * 100 + " % " );
				
				*/
				
			});	
			
});
