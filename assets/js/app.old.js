// Jquery start
$(document).ready(function() {
    // set a fixed chat height
    var screenHeight = $(window).height();
    $(".chat-wrapper").css("height", screenHeight+"px");
    
    // humbager
	$(".humbager").click(function() {
		var menu = $(".left-bar");
		// menu.css("background", "#273536");
		if (menu.hasClass("slide-menu")) {
			menu.removeClass("slide-menu");
		} else {
			menu.addClass("slide-menu");
		}
	});
	
	$("#editTeam, #editCustomer").on('click', '.password-trigger', function(event) {
	    event.preventDefault();
			var changePassword = $(".change-password");
			if (changePassword.hasClass("hidden")) {
				changePassword.removeClass("hidden");
				$("#newPassword").attr("data-parsley-required", "true");
				$("#confirmPassword").attr("data-parsley-required", "true");
			} else {
				changePassword.addClass("hidden");
				$("#newPassword").removeAttr("data-parsley-required");
				$("#confirmPassword").removeAttr("data-parsley-required");
			}
		})
		// Toastr options
	toastr.options = {
		"closeButton": true,
		"newestOnTop": true,
		"progressBar": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "swing",
		"showMethod": "slideDown",
		"hideMethod": "slideUp"
	};
	
    // allow users to upload docx
    $("input[name=allowdocx]").change(function(){
        if($(this).prop("checked")){
            $(".allowdocx").show();
        }else{
            $(".allowdocx").hide();
        }
     
    });
});


// make page busy
function showLoader(){
	$("body").addClass("loading");
}

// make page busy
function hideLoader(){
	$("body").removeClass("loading");
}
	
	
// Switch login cards
$(".login-card a").click(function() {
		var target = "." + $(this).attr("target");
		$(".sign-in, .forgot-password, .reset-password, .sign-up, .alert").hide();
		$(target).show();

		if (target === '.sign-in') {
			$(".sign-up-btn").show();
		}else{
			$(".sign-up-btn").hide();
		}
	});
	
// business vs personal account
$(".business-account").change(function(){
    if($(this).prop("checked")){
        $(".business-name").show();
        $("input[name=company]").attr("required", true);
    }else{
        $(".business-name").hide();
        $("input[name=company]").val("");
        $("input[name=company]").removeAttr("required");
    }
 
});
	// Tooltip
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
});
// Switchery
var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
elems.forEach(function(html) {
	var switchery = new Switchery(html, {
		size: 'small'
	});
});

// contect menu
$(function() {
	var $folderMenu = $("#folder-menu"),
		$fileMenu = $("#file-menu");
		$fileMenu2 = $("#file-menu-2");
	$("body").on("contextmenu", ".data-folder", function(e) {
		$fileMenu.hide();
		$folderMenu.attr("data-id", $(this).attr("data-id"));
		$folderMenu.attr("data-name", $(this).attr("data-name"));
		$folderMenu.css({
			display: "block",
			left: e.pageX,
			top: e.pageY
		});
		return false;
	});
	$("body").on("contextmenu", ".data-file", function(e) {
		$folderMenu.hide();
		if($(this).hasClass("to-sign") || $(this).hasClass("responded")){
    		$fileMenu2.attr("data-key", $(this).attr("data-key"));
    		$fileMenu2.attr("signing-key", $(this).attr("signing-key"));
    		$fileMenu2.attr("data-id", $(this).attr("data-id"));
    		$fileMenu2.attr("data-name", $(this).attr("data-original-title"));
    		$fileMenu2.find(".download-file").attr("href", $(this).attr("download-link"));
    		$fileMenu2.css({
    			display: "block",
    			left: e.pageX,
    			top: e.pageY
    		});
    		return false;
		}else{
    		$fileMenu.attr("data-key", $(this).attr("data-key"));
    		$fileMenu.attr("data-id", $(this).attr("data-id"));
    		$fileMenu.attr("data-name", $(this).attr("data-original-title"));
    		$fileMenu.find(".download-file").attr("href", $(this).attr("download-link"));
    		$fileMenu.attr("data-sharing-link", $(this).attr("data-sharing-link"));
    		$fileMenu.css({
    			display: "block",
    			left: e.pageX,
    			top: e.pageY
    		});
    		return false;
		}
	});
	$('html').click(function() {
		$folderMenu.hide();
		$fileMenu.hide();
		$fileMenu2.hide();
	});
});
//Add class name to the nav menu item, depending on the active page
$(function() {
	//Cycles through each of the links in the nav
	$('.left-bar a').each(function() {
		//Compares the href of the nav a element to the URL page
		if ($(this).attr('href') == window.location.href) {
			//If they match, add class name to the parent li element
			$(this).parent().addClass('active');
		}
	});
});
// save profile on settings
$(".profile-form").submit(function(event) {
	$(".saving").show();
	event.preventDefault();
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			$(".saving").hide();
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				toastr.success("Changes successfully saved.", "Successful!");
			} else if (responseText.status == 2) {
				toastr.error("Avatar upload failed, please try again.", "Oops!");
			} else if (responseText.status == 3) {
				toastr.error("Avatar must be square atleast 40x40px.", "Oops!");
			} else if (responseText.status == 4) {
				toastr.error("Only PNG and jpg logo allowed.", "Oops!");
			} else if (responseText.status == 5) {
				toastr.error("Email already exists.", "Oops!");
			} else {
				toastr.error("Failed to save, please try again.", "Oops!");
			}
		},
		error: function() {
			toastr.error("Failed to save, please try again.", "Oops!");
		}
	});
});

// save profile on settings
$(".sign-up-form").submit(function(event) {
	event.preventDefault();
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		var button = $(this).find("button");
		button.attr("disabled");
		button.html('<i class="ion-loading-c"></i> Please wait');
		$.ajax({
			url: "files/publicAjax.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				button.removeAttr("disabled");
				button.text('Create account');
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					toastr.success("Sign up successfull. Redirecting...", "Successful!");
					window.location.href = responseText.url;
				} else if (responseText.status == 2) {
					toastr.error("Email already exists.", "Oops!");
				} else {
					toastr.error("Failed to sign up, please try again.", "Oops!");
				}
			},
			error: function() {
				button.removeAttr("disabled");
				button.text('Create account');
				toastr.error("Failed to sign up, please try again.", "Oops!");
			}
		});
	}
});
// send password reset link
$(".forgot-form").submit(function(event) {
	event.preventDefault();
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		var button = $(this).find("button");
		button.attr("disabled");
		button.html('<i class="ion-loading-c"></i> Please wait');
		$.ajax({
			url: "files/publicAjax.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				button.removeAttr("disabled");
				button.text('Send Email');
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					toastr.success("Password reset link sent to your email", "Successful!", {timeOut: null, closeButton: true});
					$(".forgot-form")[0].reset();
				} else if (responseText.status == 2) {
					toastr.error("Email does not exists.", "Oops!", {timeOut: null, closeButton: true});
				} else {
					toastr.error("Failed to send reset link, please try again.", "Oops!", {timeOut: null, closeButton: true});
				}
			},
			error: function() {
				button.removeAttr("disabled");
				button.text('Send Email');
				toastr.error("Failed to send reset link, please try again.", "Oops!", {timeOut: null, closeButton: true});
			}
		});
	}
});

// send password reset link
$(".reset-form").submit(function(event) {
	event.preventDefault();
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		var button = $(this).find("button");
		button.attr("disabled");
		button.html('<i class="ion-loading-c"></i> Please wait');
		$.ajax({
			url: "files/publicAjax.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				button.removeAttr("disabled");
				button.text('Reset password');
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					swal({
						title: "Password reset!",
						text: "Password successfully reset, please login.",
						type: "success",
						showCancelButton: false
					}, function() {
						window.location.href = "login";
					});
				} else if (responseText.status == 2) {
					toastr.error("Your token has expired, send a new link.", "Oops!", {timeOut: null, closeButton: true});
				} else {
					toastr.error("Failed to reset password, please try again.", "Oops!", {timeOut: null, closeButton: true});
				}
			},
			error: function() {
				button.removeAttr("disabled");
				button.text('Reset password');
				toastr.error("Failed to reset password, please try again.", "Oops!", {timeOut: null, closeButton: true});
			}
		});
	}
});

// send file
$(".send-file").submit(function(event) {
	event.preventDefault();
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		$("body").addClass("loading");
		
		if($("body").hasClass("group-send")){
		    $(".send-file-emails").empty();
		}else{
		    $(".group-send-list").empty();
		}
		
		$.ajax({
			url: "files/sendemails.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				$("body").removeClass("loading");
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					$("#send").modal('hide');
					$(".receiver-email, .receiver-note").val('');
					swal({
						title: "Document sent!",
						text: "Document was successfully sent.",
						type: "success",
						showCancelButton: false
					}, function() {
        				window.location.reload();
        			});
				} else {
					swal({
						title: "Oops!",
						text: "Failed to send file, please try again.",
						type: "error",
						showCancelButton: false
					});
				}
			},
			error: function() {
				$("body").removeClass("loading");
				swal({
					title: "Oops!",
					text: "Failed to send file, please try again.",
					type: "error",
					showCancelButton: false
				});
			}
		});
	}
});
// save company on settings
$(".company-form").submit(function(event) {
	$(".saving").show();
	event.preventDefault();
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
    		$(".saving").hide();
    		responseText = jQuery.parseJSON(data);
    		if (responseText.status == 1) {
    			toastr.success("Changes successfully saved.", "Successful!");
    		} else {
    			toastr.error("Failed to save, please try again.", "Oops!");
    		}
		},
		error: function() {
			toastr.error("Failed to save, please try again.", "Oops!");
		}
	});
});
// save password on settings
$(".password-form").submit(function(event) {
	var passwordFields = $(".password-current, .password-new, .password-confirm");
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		$(".saving").show();
		event.preventDefault();
		// Get some values from elements on the page:
		var $form = $(this),
			action = "password",
			currentPassword = $form.find(".password-current").val(),
			newPassword = $form.find(".password-new").val(),
			url = $form.attr("action");
		// Send the data using post
		var posting = $.post(url, {
			action: action,
			currentPassword: currentPassword,
			newPassword: newPassword
		});
		posting.done(function(data) {
			$(".saving").hide();
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				toastr.success("Password successfully updated.", "Successful!");
			} else if (responseText.status == 2) {
				toastr.error("Your current password is incorrect.", "Oops!");
			} else {
				toastr.error("Failed to update, please try again.", "Oops!");
			}
			passwordFields.val("");
		});
	}
});
// save system on settings
$(".system-form").submit(function(event) {
	$(".saving").show();
	event.preventDefault();
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			$(".saving").hide();
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				toastr.success("Changes successfully saved.", "Successful!");
			} else if (responseText.status == 2) {
				toastr.error("Image upload failed, please try again.", "Oops!");
			} else if (responseText.status == 3) {
				toastr.error("Logo dimensions allowed 541x152px.", "Oops!");
			} else if (responseText.status == 4) {
				toastr.error("Only PNG logo allowed.", "Oops!");
			} else if (responseText.status == 5) {
				toastr.error("Favicon dimensions allowed 152x152px.", "Oops!");
			} else {
				toastr.error("Failed to save, please try again.", "Oops!");
			}
		},
		error: function() {
			toastr.error("Failed to save, please try again.", "Oops!");
		}
	});
});

// import customers
$(".import-customer-form").submit(function(event) {
	event.preventDefault();
	// validate form
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		$("body").addClass("loading");
		$.ajax({
			url: "files/ajaxProcesses.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				$("body").removeClass("loading");
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					$('#importCustomer').modal('hide');
					swal({
						title: responseText.title,
						text: responseText.message,
						type: "success",
						showCancelButton: false
					}, function(){
					    window.location.reload();
					});
				} else {
					swal({
						title: responseText.title,
						text: responseText.message,
						type: "error",
						showCancelButton: false
					});
				}
			},
			error: function() {
				$("body").removeClass("loading");
				toastr.error("Failed to import, please try again.", "Oops!");
			}
		});
	}
});
// save system on settings
$(".add-team-form").submit(function(event) {
	event.preventDefault();
	// validate form
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		var saving = $(this).find(".saving");
		saving.show();
		$.ajax({
			url: "files/ajaxProcesses.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				saving.hide();
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					$('#addTeam').modal('hide');
					swal({
						title: "Successfully added!",
						text: "New account successfully created.",
						type: "success",
						showCancelButton: false
					}, function(){
					    window.location.reload();
					});
				} else if (responseText.status == 2) {
					toastr.error("Avatar upload failed, please try again.", "Oops!");
				} else if (responseText.status == 3) {
					toastr.error("Your have reached your team limit.", "Oops!");
				} else if (responseText.status == 4) {
					toastr.error("Only PNG and jpg logo allowed.", "Oops!");
				} else if (responseText.status == 5) {
					toastr.error("Email already exists.", "Oops!");
				} else {
					toastr.error("Failed to add, please try again.", "Oops!");
				}
			},
			error: function() {
				toastr.error("Failed to add, please try again.", "Oops!");
			}
		});
	}
});

// Delete customer
$(".delete-customer").click(function(e) {
        e.preventDefault();
		var url = "files/ajaxProcesses.php",
			action = "deleteCustomer",
			customer = $(this).closest("tr"),
			customerId = customer.attr("data-id");
		swal({
			title: "Are you sure?",
			text: "This Customer's account will be deleted and will not recovered.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ff1a1a",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		}, function() {
		    customer.hide();
			var posting = $.post(url, {
				action: action,
				customerId: customerId
			});
			posting.done(function(data) {
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					customer.remove();
					toastr.success(itemName + "'s account has been deleted.", "Successful!");
				} else {
				    customer.show();
					toastr.error("Failed to delete, please try again.", "Oops!");
				}
			});
		});
	});
	
	
// Delete team Member
$(".delete-team").click(function() {
		var itemName = $(this).attr("delete-item"),
			url = "files/ajaxProcesses.php",
			action = "deleteTeam",
			teamMember = $(this).parent().parent().parent().parent().parent().parent(),
			itemId = $(this).attr("id");
		swal({
			title: "Are you sure?",
			text: itemName + "'s account will be deleted and will not recovered.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ff1a1a",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		}, function() {
			var posting = $.post(url, {
				action: action,
				userId: itemId
			});
			posting.done(function(data) {
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					teamMember.remove();
					toastr.success(itemName + "'s account has been deleted.", "Successful!");
				} else {
					toastr.error("Failed to delete, please try again.", "Oops!");
				}
			});
		});
	})


// Delete file from signing page
$(".delete-document").click(function() {
		var itemName = $(this).attr("delete-item"),
			url = "files/ajaxProcesses.php",
			action = "deleteFile",
			fileId = $(this).parent().parent().attr("data-id");
		swal({
			title: "Are you sure?",
			text:  "This file will be deleted and will not recovered.",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ff1a1a",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		}, function() {
			var posting = $.post(url, {
				action: action,
				fileId: fileId
			});
			posting.done(function(data) {
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					window.location.href = "documents";
				} else {
					toastr.error("Failed to delete, please try again.", "Oops!");
				}
			});
		});
	})
	// Delete file from documents page
$(".delete-file").click(function() {
		var fileId = $(this).parent().parent().parent().attr("data-id"),
			url = "files/ajaxProcesses.php",
			action = "deleteFile";
		var posting = $.post(url, {
			action: action,
			fileId: fileId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to delete, please try again.", "Oops!");
			}
		});
	});
	// Delete template from documents page
$(".delete-template").click(function() {
		var fileId = $(this).parent().parent().parent().attr("data-id"),
			url = "files/ajaxProcesses.php",
			action = "deleteFile";
		var posting = $.post(url, {
			action: action,
			fileId: fileId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getTemplates();
			} else {
				toastr.error("Failed to delete, please try again.", "Oops!");
			}
		});
	});
	// Delete file from documents page
$(".delete-file-2").click(function() {
		var fileId = $(this).parent().parent().parent().attr("signing-key"),
			url = "files/ajaxProcesses.php",
			action = "hideFile";
		var posting = $.post(url, {
			action: action,
			fileId: fileId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to delete, please try again.", "Oops!");
			}
		});
	});
	
// save google drive file
function saveGoogleDriveFile(fileid, fileName) {
    $("body").addClass("loading");
	var url = "files/ajaxProcesses.php",
		action = "driveimport";
	var posting = $.post(url, {
		action: action,
		template: template,
		fileName: fileName,
		fileId: fileid
	});
	posting.done(function(data) {
	    $("body").removeClass("loading");
		responseText = jQuery.parseJSON(data);
		if (responseText.status == 1) {
		    $("#google-drive").modal('hide');
		    if(template == 1){
		        getTemplates();
		    }else{
		        getContent();
		    }
		} else if(responseText.status == 2) {
			toastr.error(responseText.error, "Oops!");
		} else {
			toastr.error("Failed to import, please try again.", "Oops!");
		}
	});
}
	
// save dropbox file
function saveDropboxFile(file, template) {
    $("body").addClass("loading");
	var url = "files/ajaxProcesses.php",
		action = "dropboximport";
	var posting = $.post(url, {
		action: action,
		template: template,
		fileName: file.name,
		fileLink: file.link
	});
	posting.done(function(data) {
	    $("body").removeClass("loading");
		responseText = jQuery.parseJSON(data);
		if (responseText.status == 1) {
		    $("#dropbox").modal('hide');
		    if(template == 1){
		        getTemplates();
		    }else{
		        getContent();
		    }
			
		} else {
			toastr.error("Failed to import, please try again.", "Oops!");
		}
	});
}

// Edit team Member
$(".edit-team").click(function() {
	$(".edit-fields").empty();
	$("#editTeam").find(".center-notify").show();
	var teamId = $(this).attr("member-id"), action = "editTeam", url = "files/htmlContent.php";
	var posting = $.post(url, {
			action: action,
			teamId: teamId
		});
		posting.done(function(data) {
			$("#editTeam").find(".center-notify").hide();
			$("#editTeam").find(".modal-footer").show();
			$(".edit-fields").html(data);
			$('.dropify').dropify({
                tpl: {
                    clearButton:     '<button type="button" class="dropify-clear">Upload New</button>'
                },error: {
                    'minWidth': 'Profile picture width should be atleast 200px.',
                    'maxWidth': 'Profile picture width should be atleast 200px.',
                    'minHeight': 'Profile picture height should be atleast 200px.',
                    'maxHeight': 'Profile picture height should be atleast 200px.'
                }
			});
			var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch-dynamic'));
			elems.forEach(function(html) {
				var switchery = new Switchery(html, {
					size: 'small'
				});
			});
		});
});

// Edit customer
$(".edit-customer").click(function(e) {
    e.preventDefault();
	$(".edit-fields").empty();
	$("#editCustomer").find(".center-notify").show();
	$("#editCustomer").modal('show');
	var customerId = $(this).closest("tr").attr("data-id"), action = "editCustomer", url = "files/htmlContent.php";
	var posting = $.post(url, {
			action: action,
			customerId: customerId
		});
		posting.done(function(data) {
			$("#editCustomer").find(".center-notify").hide();
			$("#editCustomer").find(".modal-footer").show();
			$(".edit-fields").html(data);
			$('.dropify').dropify({
                tpl: {
                    clearButton:     '<button type="button" class="dropify-clear">Upload New</button>'
                },error: {
                    'minWidth': 'Profile picture width should be atleast 200px.',
                    'maxWidth': 'Profile picture width should be atleast 200px.',
                    'minHeight': 'Profile picture height should be atleast 200px.',
                    'maxHeight': 'Profile picture height should be atleast 200px.'
                }
			});
		});
});


// save edited team info
$(".edit-team-form").submit(function(event) {
	event.preventDefault();
	// validate form
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		var saving = $(this).find(".saving");
		saving.show();
		$.ajax({
			url: "files/ajaxProcesses.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				saving.hide();
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					$('#editTeam').modal('hide');
					swal({
						title: "Successfully saved!",
						text: "Changes successfully saved.",
						type: "success",
						showCancelButton: false
					}, function(){
					    window.location.reload();
					});
				} else if (responseText.status == 2) {
					toastr.error("Avatar upload failed, please try again.", "Oops!");
				} else if (responseText.status == 3) {
					toastr.error("Avatar must be square atleast 40x40px.", "Oops!");
				} else if (responseText.status == 4) {
					toastr.error("Only PNG and jpg logo allowed.", "Oops!");
				} else if (responseText.status == 5) {
					toastr.error("Email already exists.", "Oops!");
				} else {
					toastr.error("Failed to save, please try again.", "Oops!");
				}
			},
			error: function() {
				toastr.error("Failed to save, please try again.", "Oops!");
			}
		});
	}
});

// save edited team info
$(".edit-customer-form").submit(function(event) {
	event.preventDefault();
	// validate form
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		var saving = $(this).find(".saving");
		saving.show();
		$.ajax({
			url: "files/ajaxProcesses.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				saving.hide();
				responseText = jQuery.parseJSON(data);
				if (responseText.status == 1) {
					$('#editCustomer').modal('hide');
					swal({
						title: "Successfully saved!",
						text: "Changes successfully saved.",
						type: "success",
						showCancelButton: false
					}, function(){
					    window.location.reload();
					});
				} else if (responseText.status == 2) {
					toastr.error("Avatar upload failed, please try again.", "Oops!");
				} else if (responseText.status == 3) {
					toastr.error("Avatar must be square atleast 40x40px.", "Oops!");
				} else if (responseText.status == 4) {
					toastr.error("Only PNG and jpg logo allowed.", "Oops!");
				} else if (responseText.status == 5) {
					toastr.error("Email already exists.", "Oops!");
				} else {
					toastr.error("Failed to save, please try again.", "Oops!");
				}
			},
			error: function() {
				toastr.error("Failed to save, please try again.", "Oops!");
			}
		});
	}
});

// get files and folders
function getContent() {
	$(".content-list").empty();
	var fetching = $(".fetching");
	fetching.show();
	$.ajax({
		url: "files/content.php",
		type: "POST",
		contentType: false,
		processData: false,
		success: function(data) {
			fetching.hide();
			$(".content-list").html(data);
			$('[data-toggle="tooltip"]').tooltip();
		},
		error: function() {
			swal({
				title: "Oops!",
				text: "Failed to load files and folders, please try reloading.",
				type: "error",
				showCancelButton: false
			});
		}
	});
	foldersDepth();
}

// get templates
function getTemplates() {
	$(".content-list").empty();
	var fetching = $(".fetching");
	fetching.show();
	var url = "files/htmlContent.php",
		action = "getTemplates";
	var posting = $.post(url, {
		action: action
	});
	posting.done(function(data) {
		fetching.hide();
		$(".content-list").html(data);
		$('[data-toggle="tooltip"]').tooltip();
	});
}

// create folder
$(".create-folder").submit(function(event) {
	event.preventDefault();
	// validate form
    $(this).parsley().validate();
    if(($(this).parsley().isValid())){
	var saving = $(this).find(".saving");
	saving.show();
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			saving.hide();
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				$('#createFolder').modal('hide');
				$('.folder-name').val("");
				getContent();
			} else if (responseText.status == 2) {
				toastr.error("Folder name already exists.", "Oops!");
			} else {
				toastr.error("Failed to create, please try again.", "Oops!");
			}
		},
		error: function() {
			toastr.error("Failed to create, please try again.", "Oops!");
		}
	});
}
});
// rename folder
$(".rename-folder-form").submit(function(event) {
	event.preventDefault();
	// validate form
    $(this).parsley().validate();
    if(($(this).parsley().isValid())){
	$("body").addClass("loading");
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			$("body").addClass("loading");
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				$('#renamefolder').modal('hide');
				$("body").removeClass("loading");
				$('.folder-name').val("");
				getContent();
			} else if (responseText.status == 2) {
				toastr.error("Folder name already exists.", "Oops!");
			} else {
				toastr.error("Failed to rename, please try again.", "Oops!");
			}
		},
		error: function() {
			$("body").removeClass("loading");
			toastr.error("Failed to rename, please try again.", "Oops!");
		}
	});
}
});
// rename file
$(".rename-file-form").submit(function(event) {
	event.preventDefault();
	// validate form
    $(this).parsley().validate();
    if(($(this).parsley().isValid())){
	$("body").addClass("loading");
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			$("body").addClass("loading");
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
			    $("body").removeClass("loading");
				$('#renamefile').modal('hide');
				getContent();
			} else {
				toastr.error("Failed to rename, please try again.", "Oops!");
			}
		},
		error: function() {
			$("body").removeClass("loading");
			toastr.error("Failed to rename, please try again.", "Oops!");
		}
	});
}
});
// rename template
$(".rename-template-form").submit(function(event) {
	event.preventDefault();
	// validate form
    $(this).parsley().validate();
    if(($(this).parsley().isValid())){
	$("body").addClass("loading");
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			$("body").addClass("loading");
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
			    $("body").removeClass("loading");
				$('#renamefile').modal('hide');
				getTemplates();
			} else {
				toastr.error("Failed to rename, please try again.", "Oops!");
			}
		},
		error: function() {
			$("body").removeClass("loading");
			toastr.error("Failed to rename, please try again.", "Oops!");
		}
	});
}
});
// Delete folder
$(".delete-folder").click(function() {
		var folderId = $(this).parent().parent().parent().attr("data-id"),
			url = "files/ajaxProcesses.php",
			action = "deleteFolder";
		var posting = $.post(url, {
			action: action,
			folderId: folderId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to delete, please try again.", "Oops!");
			}
		});
	})
	
	// Upload file
$(".upload-file").submit(function(event) {
	event.preventDefault();
	// validate form
    $(this).parsley().validate();
    if(($(this).parsley().isValid())){
	var saving = $(this).find(".saving");
	saving.show();
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			saving.hide();
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				$('#uploadFile').modal('hide');
				if(responseText.template == 1){
				    getTemplates();
				}else{
				    getContent();
				}
			} else if (responseText.status == 3) {
				toastr.error("Only PDF allowed.", "Oops!");
			} else if (responseText.status == 3) {
				toastr.error("Failed to upload file, please try again.", "Oops!");
			} else {
				toastr.error("Failed to upload, please try again.", "Oops!");
			}
		},
		error: function() {
			toastr.error("Failed to upload3, please try again.", "Oops!");
		}
	});
}
});

	// Upload file
$(".replace-file").submit(function(event) {
	event.preventDefault();
	// validate form
    $(this).parsley().validate();
    if(($(this).parsley().isValid())){
	$('body').addClass('loading');
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
			$('body').removeClass('loading');
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				$('#replaceFile').modal('hide');
					swal({
						title: "Successfully replaced!",
						text: "New file successfully uploaded.",
						type: "success",
						showCancelButton: false
					}, function(){
					    window.location.reload();
					});
			} else if (responseText.status == 2) {
				toastr.error("Failed to upload file, please try again.", "Oops!");
			} else {
				toastr.error("Failed to upload, please try again.", "Oops!");
			}
		},
		error: function() {
			toastr.error("Failed to upload3, please try again.", "Oops!");
		}
	});
}
});

// share file from documents page
$(".share-file").click(function(event) {
	event.preventDefault();
	var sharingLink = $(this).parent().parent().parent().attr("data-sharing-link");
	$(".shareFile").find("input").val(sharingLink);
});
// share file from signing page
$(".share-doc").click(function(event) {
	event.preventDefault();
	var sharingLink = $(this).parent().parent().attr("data-sharing-link");
	$("#share").find("input").val(sharingLink);
});
// when folder or file is clicked
$(".documents-grid").on('click', '.folder', function() {
		$(".folder").removeClass("selected");
		$(this).addClass("selected");
	})
	// when folder is double clicked
$(".documents-grid").on('dblclick', '.data-folder', function() {
		var folderId = $(this).attr("data-id"),
			url = "files/content.php";
		var posting = $.post(url, {
			folderId: folderId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to open, please try again.", "Oops!");
			}
		});
	})
	// when folder is open clicked
$(".open-folder").click(function() {
		var folderId = $(this).parent().parent().parent().attr("data-id"),
			url = "files/content.php";
		var posting = $.post(url, {
			folderId: folderId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to open, please try again.", "Oops!");
			}
		});
	})
	// when rename folder is open clicked
$(".rename-folder").click(function() {
		var folderId = $(this).parent().parent().parent().attr("data-id"), folderTitle = $(this).parent().parent().parent().attr("data-name");
		$("#renamefolder").find(".folder-id").val(folderId);
		$("#renamefolder").find(".folder-name").val(folderTitle);
		$("#renamefolder").modal('show');
	})
	// when rename folder is open clicked
$(".rename-file").click(function() {
		var fileId = $(this).parent().parent().parent().attr("data-id"), fileTitle = $(this).parent().parent().parent().attr("data-name");
		$("#renamefile").find(".file-id").val(fileId);
		$("#renamefile").find(".file-name").val(fileTitle);
		$("#renamefile").modal('show');
	})
	
// use a template
$(".use-file").click(function() {
        $('body').addClass('loading');
		var fileId = $(this).parent().parent().parent().attr("data-id"), url = "files/ajaxProcesses.php", action = "usetemplate";
		
		var posting = $.post(url, {
			action: action,
			fileId: fileId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				window.location.href = responseText.link;
			} else {
		        $('body').removeClass('loading');
				toastr.error("Something went wrong, please try again.", "Oops!");
			}
		});
	});
	
// use a template
$(".use-template").click(function() {
        $('body').addClass('loading');
		var fileId = $(this).closest("ul").attr("data-id"), url = "files/ajaxProcesses.php", action = "usetemplate";
		
		var posting = $.post(url, {
			action: action,
			fileId: fileId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				window.location.href = responseText.link;
			} else {
		        $('body').removeClass('loading');
				toastr.error("Something went wrong, please try again.", "Oops!");
			}
		});
	});
	
// duplicate a file
$(".duplicate-file").click(function() {
        $('body').addClass('loading');
		var fileId = $(this).parent().parent().parent().attr("data-id"), url = "files/ajaxProcesses.php", action = "duplicatefile";
		
		var posting = $.post(url, {
			action: action,
			fileId: fileId
		});
		posting.done(function(data) {
		    $('body').removeClass('loading');
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to duplicate, please try again.", "Oops!");
			}
		});
	})
	// when open file clicked
$(".open-file").click(function() {
		var fileKey = $(this).parent().parent().parent().attr("data-key");
		window.location.href = "sign?key=" + fileKey;
	})
	// when open file clicked
$(".sign-file").click(function() {
		var fileKey = $(this).parent().parent().parent().attr("data-key");
		window.location.href = "sign?key=" + fileKey+"&action=sign";
	})
	// when open file clicked
$(".open-file-2").click(function() {
		var fileKey = $(this).parent().parent().parent().attr("data-key");
		var signingKey = $(this).parent().parent().parent().attr("signing-key");
		window.location.href = "sign?key=" + fileKey+"&signingkey=" + signingKey;
	})
	// when open file clicked
$(".sign-file-2").click(function() {
		var fileKey = $(this).parent().parent().parent().attr("data-key");
		var signingKey = $(this).parent().parent().parent().attr("signing-key");
		window.location.href = "sign?key=" + fileKey+"&signingkey=" + signingKey+"&action=sign";
	})
	// when file is open clicked
$("body").on('dblclick', '.data-file', function() {
		var fileKey = $(this).attr("data-key");
		if($(this).hasClass("to-sign") || $(this).hasClass("responded")){
    		var signingKey = $(this).attr("signing-key");
    		window.location.href = "sign?key=" + fileKey+"&signingkey=" + signingKey;
		}else{
		    window.location.href = "sign?key=" + fileKey;
		}
	})
	// filtering
$("input[name=status], input[name=time], input[name=type]").on('change', function() {
		var filterStatus = $("input[name=status]:checked").val(),
			filterTime = $("input[name=time]:checked").val(),
			filterType = $("input[name=type]:checked").val(),
			url = "files/content.php";
		var posting = $.post(url, {
			filterStatus: filterStatus,
			filterTime: filterTime,
			filterType: filterType
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to open, please try again.", "Oops!");
			}
		});
	})

// go back on folders 
$(".go-back").click(function(){
		var url = "files/content.php", action = "parentfolder";
		var posting = $.post(url, {
			action: action
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to fetch documents, please try again.", "Oops!");
			}
		});
})

// search
function searchDocuments(q) {
		 var url = "files/content.php";
		var posting = $.post(url, {
			search: q
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				getContent();
			} else {
				toastr.error("Failed to fetch documents, please try again.", "Oops!");
			}
		});
}
// check active folder
function foldersDepth() {
		 var url = "files/content.php", action = "currentfolder";
		var posting = $.post(url, {
			action: action
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.folder == 1) {
				$(".go-back").hide();
			} else {
				$(".go-back").show();
			}
		});
}
	// on signature type 
$(".signature-input").keyup(function() {
		textSignature = $(this).val();
		if (textSignature == "") {
			textSignature = "Your Name";
		}
		$(".text-signature").text(textSignature);
	})
	// change signature style
$(".signature-style").change(function() {
		var signatureStyle = $(this).val();
		$(".text-signature").css("font-style", signatureStyle);
	})
	// change signature color
$(".signature-color").change(function() {
		var signatureColor = $(this).val();
		$(".text-signature").css("color", signatureColor);
	})
	// change signature weight
$(".signature-weight").change(function() {
		var signatureWeight = $(this).val();
		$(".text-signature").css("font-weight", signatureWeight);
	})
	// change signature font
$(".signature-font").change(function() {
		var signatureFont = $(this).val();
		$(".text-signature").css("font-family", signatureFont);
	})
	// save text signature 
$("#updateSignature").on('click', '.save-signature-text', function() {
    if($(this).hasClass("public")){
        savePublicCaptureSignature('text-signature');
    }else{
        saveCaptureSignature('text-signature');
    }
});
	// save text signature 
$("#updateSignature").on('click', '.save-signature-draw', function() {
    if($(this).hasClass("public")){
        savePublicCaptureSignature('dd_canvas');
    }else{
        saveCaptureSignature('dd_canvas');
    }
});
	
function savePublicCaptureSignature(capture){
    	$("body").addClass("loading");
		$('#dd_canvas').css('border', 'none');
		html2canvas([document.getElementById(capture)], {
			onrendered: function(canvas) {
				var imagedata = canvas.toDataURL('image/png');
				var imgdata = imagedata.replace(/^data:image\/(png|jpg);base64,/, "");
				var action = "saveTextSignature";
				//ajax call to save image inside folder
				$.ajax({
					url: '../files/publicAjax.php',
					data: {
						imgdata: imgdata,
						action: action
					},
					type: 'post',
					success: function(response) {
    						$("body").removeClass("loading");
    						$('#dd_canvas').css('border', '1px solid rgb(192, 192, 192)'); 
            			responseText = jQuery.parseJSON(response);
            			if (responseText.status == 1) {
            			    Cookies.set('signature', responseText.signature, { expires: 7 });
    						$('#updateSignature').modal('hide');
                			swal({
                				title: "Alright!",
                				text: "Signature created, you can now sign.",
                				type: "success",
                				showCancelButton: false,
                				confirmButtonText: "Great",
                				closeOnConfirm: true
                			});
            			}else{
            			    toastr.error("Failed to create signature, please try again.", "Oops!");
            			}
					}
				});
			}
		})
}
	
function saveCaptureSignature(capture){
    	$("body").addClass("loading");
		$('#dd_canvas').css('border', 'none');
		html2canvas([document.getElementById(capture)], {
			onrendered: function(canvas) {
				var imagedata = canvas.toDataURL('image/png');
				var imgdata = imagedata.replace(/^data:image\/(png|jpg);base64,/, "");
				var action = "saveTextSignature";
				//ajax call to save image inside folder
				$.ajax({
					url: 'files/ajaxProcesses.php',
					data: {
						imgdata: imgdata,
						action: action
					},
					type: 'post',
					success: function(response) {
						$("body").removeClass("loading");
						$(".signature-holder").html(response);
						$('#updateSignature').modal('hide');
						$('#dd_canvas').css('border', '1px solid rgb(192, 192, 192)');
					}
				});
			}
		})
}


	// save image signature 
$("#updateSignature").on('click', '.save-signature-upload', function() {
		$(".image-signature-form").parsley().validate();
		if (($(".image-signature-form").parsley().isValid())) {
			$(".image-signature-form").submit();
		}
	})
	// save image signature 
$(".image-signature-form").submit(function(event) {
		event.preventDefault();
		$("body").addClass("loading");
		if($("body").hasClass("public")){
    		$.ajax({
    			url: '../files/publicAjax.php',
    			type: 'post',
    			data: new FormData(this),
    			contentType: false,
    			processData: false,
    			success: function(response) {
    				$("body").removeClass("loading");
        			responseText = jQuery.parseJSON(response);
        			if (responseText.status == 1) {
        			    Cookies.set('signature', responseText.signature, { expires: 7 });
    					$('#updateSignature').modal('hide');
            			swal({
            				title: "Alright!",
            				text: "Signature created, you can now sign.",
            				type: "success",
            				showCancelButton: false,
            				confirmButtonText: "Great",
            				closeOnConfirm: true
            			});
        			}else{
        			    toastr.error("Failed to create signature, please try again.", "Oops!");
        			}
    			}
    		});
		}else{
    		$.ajax({
    			url: 'files/ajaxProcesses.php',
    			type: 'post',
    			data: new FormData(this),
    			contentType: false,
    			processData: false,
    			success: function(response) {
    				$("body").removeClass("loading");
    				$(".signature-holder").html(response);
    				$('#updateSignature').modal('hide');
    			}
    		});
		}
	})
	// navigating signature modal tabs
$("#updateSignature a").click(function() {
		var newClass = "save-signature-" + $(this).attr("href").replace('#', '');
		$("#updateSignature").find(".btn-primary").removeClass("save-signature-text save-signature-upload save-signature-draw");
		$("#updateSignature").find(".btn-primary").addClass(newClass);
	})

$(".right-bar-toggle").click(function(event){
	event.preventDefault();
	$(".chat-wrapper").scrollTop($(".chat-list")[0].scrollHeight);
	$(".right-bar").toggleClass("open");
	$(".right-bar-toggle").find("span").hide();
})

// document chat submit
$(".new-message").keypress(function (e) {
    if(e.which == 13) {
        $(".empty-chat").remove();
		var url = "files/ajaxProcesses.php", action = "sendchat", message = $(this).val();
    	if ($('.chat-list').children().last().hasClass('chat-message-sender')) {
    		$('.chat-list').children().last().find('.chat-message-content').append(`<p>`+message+`</p>`);
    	}else{
	    	$(".chat-list").append(`
	    	<div class='chat-message chat-message-sender'>
	        <img class='chat-image chat-image-default' src='`+avatar+`' />

	        <div class='chat-message-wrapper'>
	          <div class='chat-message-content'>
	            <p>`+message+`</p>
	          </div>

	          <div class='chat-details'>
	            <span class='chat-message-localization font-size-small'>Sept 29, 2017 09:59AM</span>
	          </div>

	        </div>
	      </div>`);
    	}
    	$(".chat-wrapper").scrollTop($(".chat-list")[0].scrollHeight);
    	$(this).val("");
    	$('.chat-list').children().last().find('.chat-message-localization').text("Sending....");
    	e.preventDefault();

		var posting = $.post(url, {
			action: action,
			message: message,
			sharingKey: sharingKey
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				$('.chat-list').children().last().find('.chat-message-localization').text(responseText.time);
				$('.chat-list').children().last().attr("id", responseText.id);
			} else {
    			$('.chat-list').children().last().find('.chat-message-localization').html('<span class="text-danger">Failed!</span>');
			}
		});
    }
});

// get new chats
function getChats(lastChat, sharingKey) {
		var action = "getChats", url = "files/htmlContent.php";
		var posting = $.post(url, {
			action: action,
			lastChat: lastChat,
			sharingKey: sharingKey
		});
		posting.done(function(data) {
			if (data != 'empty') {
				$(".chat-list").append(data);
				$(".chat-wrapper").scrollTop($(".chat-list")[0].scrollHeight);
				$(".empty-chat").remove();
				$('[data-toggle="tooltip"]').tooltip();
				if(!$(".right-bar").hasClass("open")){
				    $(".right-bar-toggle").find("span").show();
				}
			}
		});
}


function countNotifications() {
		var action = "countnotifications", url = "files/ajaxProcesses.php";
		var posting = $.post(url, {
			action: action
		});
		posting.done(function(data) {
		responseText = jQuery.parseJSON(data);
    		if (responseText.count > 0) {
    		    $("body").find(".bubble").remove();
    		    $(".notification-holder").append('<span class="label label-danger btn-round bubble">'+responseText.count+'</span>');
    		}
		});
}

setInterval(function() {
  // method to be executed;
  if($(".unauthorized").length == 0){
    countNotifications();
  }
  if ($(".right-bar").hasClass("open") || $(".right-bar").length > 0) {
  	lastChat = $('.chat-list').children().last().attr("id");
  	getChats(lastChat, sharingKey);
  }
}, 5000);

// delete notification
$(".notifications-holder").on('click', '.delete-notification', function() {
	var notification = $(this).parent().parent(),
	  url = "files/ajaxProcesses.php",
	  action = "deletenotification",
	  notificationId = notification.attr("data-id");

	notification.hide();

	var posting = $.post(url, {
		action: action,
		notificationId: notificationId
	});
	posting.done(function(data) {
		responseText = jQuery.parseJSON(data);
		if (responseText.status == 1) {
			notification.remove();
		} else {
			notification.show();
			toastr.error("Failed to delete notification, please try again.", "Oops!");
		}
	});
})


$(".companies-list").on('click', '.delete-company', function(e) {
	e.preventDefault();
		var company = $(this).parent().parent().parent().parent().parent(),
		  url = "files/ajaxProcesses.php",
		  action = "deletecompany",
		  companyId = company.attr("data-id");
	swal({
		title: "Are you sure?",
		text:  "This company, it's team and all it's data will be deleted.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#ff1a1a",
		confirmButtonText: "Yes, delete it",
		closeOnConfirm: true
	}, function() {

		company.hide();

		var posting = $.post(url, {
			action: action,
			companyId: companyId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				company.remove();
			} else {
				company.show();
				toastr.error("Failed to delete company, please try again.", "Oops!");
			}
		});
	});

})

$(".companies-list").on('click', '.staff-limit', function(e) {
	e.preventDefault();
	var company = $(this).closest("tr");
	$(".company-name").text(company.attr("company"));
	$("input[name=limit]").val(company.attr("staff-limit"));
	$("input[name=companyId]").val(company.attr("data-id"));
	$("#stafflimit").modal('show');
})


// delete signing request
$(".delete-request").click(function(e) {
	e.preventDefault();
		var request = $(this).closest('tr'),
		  url = "files/ajaxProcesses.php",
		  action = "deleterequest",
		  requestId = request.attr("data-id");
	swal({
		title: "Are you sure?",
		text:  "This request will be deleted.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#ff1a1a",
		confirmButtonText: "Yes, delete it",
		closeOnConfirm: true
	}, function() {

		request.hide();

		var posting = $.post(url, {
			action: action,
			requestId: requestId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
				request.remove();
			} else {
				request.show();
				toastr.error("Failed to delete request, please try again.", "Oops!");
			}
		});
	});

})

// cancel signing request
$(".cancel-request").click(function(e) {
	e.preventDefault();
		var request = $(this).closest('tr'),
		  url = "files/ajaxProcesses.php",
		  action = "cancelrequest",
		  status = request.find(".status"),
		  toHide = request.find(".hide-on-cancel"),
		  requestId = request.attr("data-id");
	swal({
		title: "Are you sure?",
		text:  "This request will be canceled and the process can't be reversed.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#ff1a1a",
		confirmButtonText: "Yes, cancel",
		closeOnConfirm: true
	}, function() {

		status.html('<span class="label label-info"><i class="ion-loading-c"></i> Cancelling..</span>');
        
		var posting = $.post(url, {
			action: action,
			requestId: requestId
		});
		posting.done(function(data) {
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
		        status.html('<span class="label label-warning">Cancelled</span>');
		        toHide.remove();
			} else {
		        status.html('<span class="label label-info">Pending</span>');
				toastr.error("Failed to cancel request, please try again.", "Oops!");
			}
		});
	});

})

// sending a signing request reminder
$(".remind-request").click(function(e) {
	e.preventDefault();
		var request = $(this).closest('tr'),
		    requestId = request.attr("data-id");
		    
	$("input[name=requestId]").val(requestId);
	$("#remind").modal("show");

})

// update staff limit
$(".stafflimit-form").submit(function(e) {
	e.preventDefault();
	$(this).parsley().validate();
    if(($(this).parsley().isValid())){
	$("body").addClass('loading');
	$.ajax({
		url: "files/ajaxProcesses.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
		    $("body").removeClass('loading');
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
					$('#stafflimit').modal('hide');
					swal({
						title: "Changes saved!",
						text: "Team limit successfully updated.",
						type: "success",
						showCancelButton: false
					}, function(){
					    window.location.reload();
					});
			} else {
				toastr.error(responseText.error, "Oops!");
			}
		},
		error: function() {
		    $("body").removeClass('loading');
			toastr.error("Something went wrong, please try again.", "Oops!");
		}
	});
}
})

// sending a signing request reminder
$(".remind-form").submit(function(e) {
	e.preventDefault();
	$(this).parsley().validate();
    if(($(this).parsley().isValid())){
	$("body").addClass('loading');
	$.ajax({
		url: "files/sendemails.php",
		type: "POST",
		data: new FormData(this),
		contentType: false,
		processData: false,
		success: function(data) {
		    $("body").removeClass('loading');
			responseText = jQuery.parseJSON(data);
			if (responseText.status == 1) {
			    toastr.success("Signing reminder sent.", "Sent!");
			    $("#remind").modal("hide");
			} else {
				toastr.error("Failed to send reminder, please try again.", "Oops!");
			}
		},
		error: function() {
		    $("body").removeClass('loading');
			toastr.error("Failed to send reminder, please try again.", "Oops!");
		}
	});
}
})



// add reminder
$(".add-reminder").click(function(){
    $('.collapse').collapse('hide');
    
    // generate ref key
    function randomCode() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
          for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
          return text;
    }
    var reminderKey = randomCode(),
        reminderNumber = parseInt($(".reminders-holder").find('.panel').length) + 1;
        
        
    $(".reminders-holder").append(`<div class="panel panel-default">
			<div class="panel-heading">
			    <span class="delete-reminder" data-toggle="tooltip" title="Remove reminder"><i class="ion-ios-trash"></i></span>
				<h4 class="panel-title"><a data-parent="#accordion" data-toggle="collapse" href="#collapse-`+reminderKey+`">Reminder #<span>`+reminderNumber+`</span></a></h4>
			</div>
			<div class="panel-collapse collapse in" id="collapse-`+reminderKey+`">
				<div class="panel-body">
					<div class="remider-item">
						<div class="form-group">
							<div class="col-md-12 p-lr-o">
							    <input type="hidden" name="count[]" value="1">
								<label>Email subject</label> <input class="form-control" name="subject[]" placeholder="Email subject" required="" type="text" value="Signing invitation reminder">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12 p-lr-o">
								<label>Days after request is sent</label> <input class="form-control" name="days[]" min="1" placeholder="Days after request is sent" required="" type="number" value="7">
							</div>
						</div>
						<div class="form-group">
							<div class="col-md-12 p-lr-o">
								<label>Message</label> 
								<textarea class="form-control" name="message[]" required="" rows="9">Hello there,

I hope you are doing well.
I am writing to remind you about the signing request I had sent earlier.

Cheers!
`+fullName+`
</textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`);
		$('[data-toggle="tooltip"]').tooltip();
})

// delete reminder
$(".reminders-holder").on("click",".delete-reminder",function(){
    var reminder = $(this).closest(".panel");
    reminder.remove();
})

$(".reminders-form").submit(function(e){
    e.preventDefault();
	$(this).parsley().validate();
    if(($(this).parsley().isValid())){
    	$("body").addClass('loading');
    	$.ajax({
    		url: "files/ajaxProcesses.php",
    		type: "POST",
    		data: new FormData(this),
    		contentType: false,
    		processData: false,
    		success: function(data) {
    		    $("body").removeClass('loading');
    			responseText = jQuery.parseJSON(data);
    			if (responseText.status == 1) {
    			    toastr.success("Changes successfully saved.", "Changes saved!");
    			} else {
    				toastr.error("Failed to save changes, please try again.", "Oops!");
    			}
    		},
    		error: function() {
    		    $("body").removeClass('loading');
    			toastr.error("Failed to save changes, please try again.", "Oops!");
    		}
    	});
    }else{
        $('.collapse').collapse('show');
        toastr.error("Check that all fields are filled correctly and try again.", "All fields are required!");
    }
});

// add emails to invite
$(".add-email").click(function(e){
    e.preventDefault();
    $(".emails").append(`<div class="form-group">
	  <div class="col-md-12 p-lr-o">
	      <button class="btn btn-danger remove-email"><i class="ion-ios-minus"></i></button>
	    <label>Email address</label>
	    <input type="text" class="form-control receiver-email" name="email[]" placeholder="Email address" required>
	  </div>
	  </div>`);
    duplicateDocOption();
});

// remove emails to invite
$(".emails").on('click', '.remove-email', function(e){
   $(this).closest(".form-group").remove(); 
   duplicateDocOption();
});

// add email to send doc
$(".add-send-email").click(function(e){
    e.preventDefault();
    $(".send-file-emails").append(`<div class="form-group">
	  <div class="col-md-12 p-lr-o">
	      <button class="btn btn-danger remove-send-email"><i class="ion-ios-minus"></i></button>
	    <label>Email address</label>
	    <input type="text" class="form-control receiver-email" name="email[]" placeholder="Email address" required>
	  </div>
	  </div>`);
});

// remove email to send doc
$(".send-file-emails").on('click', '.remove-send-email', function(e){
   $(this).closest(".form-group").remove(); 
});

// all forms
$(".standard-form").submit(function(event) {
	event.preventDefault();
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		showLoader();
		$.ajax({
			url: "files/ajaxProcesses.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				hideLoader();
				responseText = jQuery.parseJSON(data);
				if (responseText.status === 'successreload') {
					swal({
						title: "Alright!",
						text: responseText.message,
						type: "success",
						showCancelButton: false
					}, function() {
						window.location.reload();
					});
				}else if (responseText.status === 'successredirect') {
					swal({
						title: "Alright!",
						text: responseText.message,
						type: "success",
						showCancelButton: false
					}, function() {
						window.location.href = responseText.redirect;
					});
				}else if (responseText.status === 'redirect') {
				    showLoader();
					window.location.href = responseText.redirect;
				} else if (responseText.status === 'success') {
					swal({
						title: "Alright!",
						text: responseText.message,
						type: "success",
						showCancelButton: false
					});
				} else if (responseText.status === 'error') {
					swal({
						title: "Oops!",
						text: responseText.message,
						type: "error",
						showCancelButton: false
					});
				} else {
					swal({
						title: "Oops!",
						text: 'Something went wrong, please try again.',
						type: "error",
						showCancelButton: false
					});
				}
			},
			error: function() {
				hideLoader();
				toastr.error("Something went wrong, please try again.", "Oops!");
			}
		});
	}
});

// protection forms
$(".protection-form").submit(function(event) {
	event.preventDefault();
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
		showLoader();
		$.ajax({
			url: "files/ajaxProcesses.php",
			type: "POST",
			data: new FormData(this),
			contentType: false,
			processData: false,
			success: function(data) {
				hideLoader();
				responseText = jQuery.parseJSON(data);
				if (responseText.status === 'successreload') {
					swal({
						title: "Alright!",
						text: responseText.message,
						type: "success",
						showCancelButton: false
					}, function() {
						window.location.reload();
					});
				} else {
					swal({
						title: "Oops!",
						text: 'Something went wrong, please try again.',
						type: "error",
						showCancelButton: false
					});
				}
			},
			error: function() {
				hideLoader();
        		swal({
        			title: "Oops!",
        			text: "Password protected documents or documents with permission restrictions can not be modified.",
        			type: "error",
        			showCancelButton: false,
        			confirmButtonText: "Okay",
        			closeOnConfirm: true
        		});
			}
		});
	}
});



$(".signer-warning").click(function(){
	swal({
		title: $(this).attr("warning-title"),
		text: $(this).attr("message"),
		type: "warning",
		showCancelButton: false,
		confirmButtonText: "Okay",
		closeOnConfirm: true
	});
});

