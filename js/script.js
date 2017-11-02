$().ready(function() {
	$('form').validate({
		debug: true,
		errorClass: 'has-error',
		errorContainer: '.error-container',
		invalidHandler: function(event, validator) {
		    var errors = validator.numberOfInvalids(),
				errorContainer = $(".error-container");
		    
		    if (errors) {
				errorContainer.removeClass('hidden');

		    	var message = errors === 1
					? ' Nav aizpidīts 1 nepieciešamais laukums!'
					: 'Nav aizpidīti ' + errors + ' nepieciešamie laukumi!';
				errorContainer.find('span').html(message);
				errorContainer.show();
		    } else {
				errorContainer.hide();
		    }
	  	},
		errorPlacement: function(error, element) {},
		highlight: function(element, errorClass, validClass) {
			$(element).parent().addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function(element, errorClass, validClass) {
		    $(element).parent().removeClass(errorClass).addClass(validClass);
		}
	});

	var ApplicationForm = {
		init: function(){
			this.selectedInputs = $("input[type=radio], input[type=checkbox]");
			this.initialState();
			this.bindEvents();
		},

		bindEvents: function() {
			this.selectedInputs.on('change', this.toggleFields);
		},

		initialState: function() {
			$('#form-calculator :input[type!=hidden]:first, #form-pieteikums :input[type!=hidden]:first, #form-ligums :input[type!=hidden]:first').focus();

			$('#pensijas-wrapper').css('display', 'none');  
			$('#galvinieku-wrapper').css('display', 'none');  
		},

		toggleFields: function(event) {
			var inputID = event.target.id,
				pensijasWrapper = $('#pensijas-wrapper'),
				darbvietaWrapper = $('#darbvieta-wrapper'),
				galviniekuWrapper = $('#galvinieku-wrapper');

			if (inputID === 'darbinieks') {
				pensijasWrapper.slideUp();   
				darbvietaWrapper.removeClass('hidden').slideDown();  
			}	

			if (inputID === 'pensionars') {
				pensijasWrapper.removeClass('hidden').slideDown();   
				darbvietaWrapper.slideUp();
			}

			if (inputID === 'galvinieks' && this.checked) {
	        	galviniekuWrapper.removeClass('hidden').slideDown().find(':input[type!=hidden]:first').focus();   
		    } else if (inputID === 'galvinieks' && !(this.checked)) { 
		       	galviniekuWrapper.slideUp();   
	        }
		}
	};

	ApplicationForm.init();
});