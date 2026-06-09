
// Ajax JS

$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-message');
	var contactToast = $('#contactToast');
	var toastBody = contactToast.find('.toast-body');

	function showToast(message, type) {
		var isSuccess = type === 'success';

		$(formMessages).text('');
		contactToast.removeClass('text-bg-success text-bg-danger');
		contactToast.addClass(isSuccess ? 'text-bg-success' : 'text-bg-danger');
		toastBody.text(message);

		if (window.bootstrap && contactToast.length) {
			bootstrap.Toast.getOrCreateInstance(contactToast[0], { delay: 4000 }).show();
		} else {
			$(formMessages).removeClass('success error').addClass(type).text(message);
		}
	}

	function clearContactForm() {
		form[0].reset();

		var serviceSelect = $(form).find('select[name="service"]');
		serviceSelect.prop('selectedIndex', 0).trigger('change');

		var niceSelect = serviceSelect.next('.nice-select');
		var firstOption = niceSelect.find('.option').first();
		niceSelect.find('.current').text(firstOption.text());
		niceSelect.find('.option').removeClass('selected focus');
		firstOption.addClass('selected focus');
	}

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			showToast(response, 'success');
			clearContactForm();
		})
		.fail(function(data) {
			var message = data.responseText || 'Could not send your request right now.';
			$(formMessages).removeClass('success').addClass('error').text(message);
		});
	});

});
