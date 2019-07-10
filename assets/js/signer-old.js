$(document).ready(function() {
	// // get signature position 
	// $($('iframe')[0].contentWindow.document).mousemove(function(event){
	// var offset = $(event.target).offset();
	// console.log("pageX: " + parseInt(event.pageX - offset.left) + ", pageY: " + parseInt(event.pageY - offset.top));
	// })
	// get signature position 
	function signPositions(event) {
		var offset = $(".document-map").offset();
		var docLeft = parseInt(event.pageX - offset.left);
		var docTop = parseInt(event.pageY - offset.top);
		console.log("pageX: " + docLeft + ", pageY: " + docTop);
	}
	// put temporary signature  
	$(".document-map").click(function(event) {
		var map = leftPosition = topPosition = signature = "";
		if($("body").hasClass("sign")) {
		    if($("body").hasClass("bullet") || $("body").hasClass("check")){
		        var imagePath = "assets/images/";
		        if($("body").hasClass("public")){ imagePath = "../assets/images/"; }
		        if($("body").hasClass("bullet")){ image = "bullet.png", type = "bullet"; }else{ image = "check.png", type = "check"; }
		        
    			map = $(".document-map").offset();
    			leftPosition = parseInt(event.pageX);
    			topPosition = parseInt(event.pageY);
    			$(`<img src="` + imagePath+image + `"  class="temporary-signature draggable check-bullet" type="`+type+`" page="` + pageNum + `" style="left: ` + leftPosition + `px; top: ` + topPosition + `px;" data-left="` + parseInt(leftPosition - map.left) + `" data-top="` + parseInt(topPosition - map.top) + `">`).appendTo(".temporary-signatures-holder").draggable({
    				drag: function() {
    					var map = $(".document-map").offset();
    					var offset = $(this).offset();
    					var xPos = parseInt(offset.left - map.left);
    					var yPos = parseInt(offset.top - map.top);
    					$(this).attr("data-top", yPos);
    					$(this).attr("data-left", xPos);
    				}
    			});
    			
		    }else{
    			map = $(".document-map").offset();
    			leftPosition = parseInt(event.pageX - 101);
    			topPosition = parseInt(event.pageY - 4);
    			if($("body").hasClass("request")) {
    				signature = "assets/images/mark.png";
    			} else if($("body").hasClass("public")) {
    				signature = "../uploads/guest_signatures/" + $(".data-holder").attr("signature");
    			} else {
    				signature = "uploads/signatures/" + $(".data-holder").attr("signature");
    			}
    			$(`<img src="` + signature + `"  class="temporary-signature draggable" type="signature" page="` + pageNum + `" style="left: ` + leftPosition + `px; top: ` + topPosition + `px;" data-left="` + parseInt(leftPosition - map.left + 29) + `" data-top="` + parseInt(topPosition - map.top + 18) + `">`).appendTo(".temporary-signatures-holder").draggable({
    				drag: function() {
    					var map = $(".document-map").offset();
    					var offset = $(this).offset();
    					var xPos = parseInt(offset.left - map.left + 29);
    					var yPos = parseInt(offset.top - map.top + 18);
    					$(this).attr("data-top", yPos);
    					$(this).attr("data-left", xPos);
    				}
    			});
		    }
		} else if($("body").hasClass("write")) {
			map = $(".document-map").offset();
			leftPosition = parseInt(event.pageX + 8);
			topPosition = parseInt(event.pageY - 4);
			if($("body").hasClass("group-sign") || $("body").hasClass("extra-doc-action-mode")) {
			    
			    
			    if($("body").hasClass("extra-doc-action-mode")) { placeholder = $("body").attr("action-placeholder"); }
			    
			    
    			$(`<div class="writing-pad draggable" contenteditable="false"  spellcheck="false" type="extrafields"  page="` + pageNum + `" style="left: ` + leftPosition + `px; top: ` + topPosition + `px;" data-left="` + parseInt(leftPosition - map.left + 29) + `" data-top="` + parseInt(topPosition - map.top + 17) + `">`+placeholder+`</div>`).appendTo(".temporary-signatures-holder").draggable({
    				drag: function() {
    					var map = $(".document-map").offset();
    					var offset = $(this).offset();
    					var xPos = parseInt(offset.left - map.left + 29);
    					var yPos = parseInt(offset.top - map.top + 18);
    					$(this).attr("data-top", yPos);
    					$(this).attr("data-left", xPos);
    				}
    			});
			}else{
    			$(`<div class="writing-pad draggable" contenteditable="true"  spellcheck="false"  page="` + pageNum + `" style="left: ` + leftPosition + `px; top: ` + topPosition + `px;" data-left="` + parseInt(leftPosition - map.left + 29) + `" data-top="` + parseInt(topPosition - map.top + 17) + `"></div>`).appendTo(".temporary-text-holder").draggable({
    				drag: function() {
    					var map = $(".document-map").offset();
    					var offset = $(this).offset();
    					var xPos = parseInt(offset.left - map.left + 29);
    					var yPos = parseInt(offset.top - map.top + 18);
    					$(this).attr("data-top", yPos);
    					$(this).attr("data-left", xPos);
    				}
    			});
    			$('.temporary-text-holder').children().last().focus();
    			styleDocText();
			}
		}
	});
	// undo signing
	$(".undo-sign").click(function() {
		$('.temporary-signatures-holder').children().last().remove();
		$('.temporary-text-holder').children().last().remove();
	});
	var clipboard = new Clipboard('.copy-link');
	clipboard.on('success', function(e) {
		$('#share').modal('hide');
		toastr.success("Link copied to clipboard.", "Copied!");
	});
	clipboard.on('error', function(e) {
		toastr.error("Failed to copy, please try again.", "Oops!");
	});
	
});

// doc actions
$(".action-check").click(function(){
    $("body").removeClass("bullet extra-doc-action write");
    $("body").addClass("sign check");
});

$(".action-bullet").click(function(){
    $("body").removeClass("check extra-doc-action write");
    $("body").addClass("sign bullet");
});

$(".action-sign").click(function(){
    $("body").removeClass("check bullet extra-doc-action write");
    $("body").addClass("sign");
});

// doc request actions
$(".extra-doc-action").click(function(){
    $("body").removeClass("sign");
    $("body").addClass("extra-doc-action-mode write");
    $("body").attr("data-type", $(this).attr("data-type"));
    $("body").attr("action-type", $(this).attr("action-type"));
    $("body").attr("action-placeholder", $(this).attr("action-placeholder"));
});

$(".action-pointer").click(function(){
    $("body").removeClass("extra-doc-action write");
    $("body").addClass("sign");
});

// doc text editor
$(".doc-text-bold").click(function(){
    $(this).toggleClass("btn-warning btn-primary");
    if($("body").hasClass("doc-bold")){
        $("body").removeClass("doc-bold");
    }else{
        $("body").addClass("doc-bold");
    }
    
    styleDocText();
});

// doc text editor
$(".doc-text-italic").click(function(){
    $(this).toggleClass("btn-warning btn-primary");
    if($("body").hasClass("doc-italic")){
        $("body").removeClass("doc-italic");
    }else{
        $("body").addClass("doc-italic");
    }
    
    styleDocText();
});

$(".doc-text-color").change(function(){ styleDocText(); });
$(".doc-text-font").change(function(){ styleDocText(); });
$(".doc-text-size").change(function(){ styleDocText(); });

function styleDocText(){
    if($("body").hasClass("doc-italic")){
        $(".writing-pad").css("font-style", "italic");
    }else{
        $(".writing-pad").css("font-style", "normal");
    }
    if($("body").hasClass("doc-bold")){
        $(".writing-pad").css("font-weight", "bold");
    }else{
        $(".writing-pad").css("font-weight", "normal");
    }
    
    $(".writing-pad").css("font-family", $(".doc-text-font").val());
    $(".writing-pad").css("color", $(".doc-text-color").val());
    $(".writing-pad").css("font-size", $(".doc-text-size").val()+"px");
}

// group sign
$(".group-sign").click(function(event){
    event.preventDefault();
    $(".emails, .add-email").hide();
    $(".group-sign-list, .email-invite-sign, .duplicatedocument").show();
    $("body").addClass("group-sign");
    $(".emails").find("input").attr("required", false);
    $(".group-sign-list").find("select").attr("required", true);
    duplicateDocOption();
});

// emails invite
$(".email-invite-sign").click(function(event){
    event.preventDefault();
    $(".emails, .add-email").show();
    $(".emails").find("input").attr("required", true);
    $(".group-sign-list").find("select").attr("required", false);
    $(".group-sign-list, .email-invite-sign").hide();
    $("body").removeClass("group-sign");
    duplicateDocOption();
});

// send file via email iput
$(".email-file-send").click(function(event){
    event.preventDefault();
    $(".send-file-emails, .add-send-email").show();
    $(".send-file-emails").find("input").attr("required", true);
    $(".group-send-list").find("select").attr("required", false);
    $(".group-send-list, .email-file-send").hide();
    $("body").removeClass("group-send");
});

// send files to group 
$(".group-send").click(function(event){
    event.preventDefault();
    $(".send-file-emails, .add-send-email").hide();
    $(".group-send-list, .email-file-send").show();
    $("body").addClass("group-send");
    $(".send-file-emails").find("input").attr("required", false);
    $(".group-send-list").find("select").attr("required", true);
});

// request sign launch
$(".launch-request-sign").click(function(event){
    event.preventDefault();
    if($(this).hasClass("docx")){
		swal({
			title: "Heads Up!",
			text: "This file will be converted to PDF.",
			showCancelButton: true,
			type: "warning",
			confirmButtonText: "Proceed",
			closeOnConfirm: true
		}, function() {
			convertToPdf("openRequestSign");
		});
    }else{
        $("#request-sign").modal("show");
    }
})

function showWhereToSign() {
	if(signingStatus === 0) {
		if($("body").hasClass("public")) {
			imagePath = '../assets/images/pointer.png';
		} else {
			imagePath = 'assets/images/pointer.png';
		}
		$(".signing-pointers").empty();
		var signingCanvas = $("#the-canvas").offset();
		var whereToSign = jQuery.parseJSON(signingPoints);
		$.each(whereToSign, function(index, value) {
			$(".signing-pointers").append('<img src="' + imagePath + '" class="sign-pointer" style="left:' + parseInt(parseInt(value.xPosition) + parseInt(signingCanvas.left) + 14) + 'px; top:' + parseInt(parseInt(value.yPosition) + parseInt(signingCanvas.top) - 50) + 'px;"  page="' + value.pageNumber + '">');
		});
	}
}
// when sign now is clicked
$(".sign").click(function() {
    $("body").removeClass("request");
	if($(this).is(".docx.public")) {
		swal({
			title: "Heads Up!",
			text: "This file will be converted to PDF.",
			showCancelButton: true,
			type: "warning",
			confirmButtonText: "Proceed",
			closeOnConfirm: true
		}, function() {
			convertToPdf();
		});
	} else if($(this).hasClass("public")) {
		if(Cookies.get('signature') === undefined) {
			$('#updateSignature').modal('show');
		} else {
			$(".data-holder").attr("signature", Cookies.get('signature'));
			$("body").addClass("sign");
		}
	} else if($(this).hasClass("docx")) {
		swal({
			title: "Heads Up!",
			text: "This file will be converted to PDF.",
			showCancelButton: true,
			type: "warning",
			confirmButtonText: "Proceed",
			closeOnConfirm: true
		}, function() {
			convertToPdf();
		});
	} else {
		$("body").addClass("sign");
	}
});
// when sign now is clicked
$(".write").click(function() {
	if($(this).hasClass("docx")) {
		swal({
			title: "Heads Up!",
			text: "This file will be converted to PDF.",
			showCancelButton: true,
			type: "warning",
			confirmButtonText: "Proceed",
			closeOnConfirm: true
		}, function() {
			convertToPdf();
		});
	} else {
        $("body").removeClass("check bullet extra-doc-action-mode sign group-sign");
		$("body").addClass("write");
	}
});
// when request sign is clicked
$(".request-send-file").submit(function(event) {
		event.preventDefault();
		var restricted = $(".restricted"),
			form = $(this);
		$(this).parsley().validate();
		if(($(this).parsley().isValid())) {
			if(restricted.is(':checked')) {
				$("#request-sign").modal('hide');
				swal({
					title: "Signing points",
					text: "Click on points where the receiver will sign. The dotted signing point box will not appear on the document, it is for guidance only.",
					showCancelButton: true,
					confirmButtonText: "Start Selecting",
					closeOnConfirm: true
				}, function() {
                    $("body").removeClass("check");
                    $("body").removeClass("bullet");
					$("body").addClass("sign request");
				});
			} else {
				// send a signing request and allow signing anywhere
				sendNonRestrictedSigningRequest();
			}
		}
	})
	// close sign mode
$(".close-overlay").click(function() {
		$("body").removeClass("sign");
		$("body").removeClass("write");
		$('.temporary-signatures-holder').empty();
		$('.temporary-text-holder').empty();
	})
	// draggable elements
$(".draggable").draggable();
$(".save-file").click(function() {
		if($("body").hasClass("request")) {
			if($(".temporary-signature").length == 0) {
				swal({
					title: "No Signing points!",
					text: "You have not selected any signing points, click continue to allow receiver to sign anywhere or cancel to select signing points",
					type: "warning",
					showCancelButton: false,
					confirmButtonText: "continue",
					closeOnConfirm: true
				}, function() {
					sendNonRestrictedSigningRequest();
				});
			} else {
				sendRestrictedSigningRequest();
			}
		}else if($("body").hasClass("write") && !$("body").hasClass("extra-doc-action-mode")) {
			if($(".writing-pad").length == 0) {
				swal({
					title: "Please write Something!",
					text: "Please write Something before saving.",
					type: "error",
					showCancelButton: false,
					confirmButtonText: "Okay",
					closeOnConfirm: true
				});
			} else {
				var myArr = [];
				$('.temporary-text-holder').find(".writing-pad").each(function(index, value) {
					myArr.push({
						text: $(this).text(),
						pageNumber: $(this).attr('page'),
						xPosition: $(this).attr('data-left'),
						yPosition: $(this).attr('data-top')
					});
				});
				myJson = JSON.stringify(myArr);
				signDocument(myJson);
			}
		} else {
			if($(".temporary-signature").length == 0) {
				swal({
					title: "Please sign!",
					text: "Please sign before saving.",
					type: "error",
					showCancelButton: false,
					confirmButtonText: "Okay",
					closeOnConfirm: true
				});
			} else {
				var myArr = [];
				$('.temporary-signatures-holder').find(".temporary-signature, .writing-pad").each(function(index, value) {
					myArr.push({
						type: $(this).attr('type'),
						text: $(this).text(),
						pageNumber: $(this).attr('page'),
						xPosition: $(this).attr('data-left'),
						yPosition: $(this).attr('data-top')
					});
				});
				myJson = JSON.stringify(myArr);
				signDocument(myJson);
			}
		}
	})
	// send signing request and allow sign of specific points
function sendRestrictedSigningRequest() {
	$("body").addClass("loading");
	var myArr = [];
	$('.temporary-signatures-holder').find(".temporary-signature").each(function(index, value) {
		myArr.push({
			type: $(this).attr('type'),
			pageNumber: $(this).attr('page'),
			xPosition: $(this).attr('data-left'),
			yPosition: $(this).attr('data-top')
		});
	});
	myJson = JSON.stringify(myArr);
	var myNewTextArr = [];
	$('.temporary-signatures-holder').find(".writing-pad").each(function(index, value) {
		myNewTextArr.push({
			type: $(this).attr('type'),
			pageNumber: $(this).attr('page'),
			xPosition: $(this).attr('data-left'),
			yPosition: $(this).attr('data-top')
		});
	});
	myTextJson = JSON.stringify(myNewTextArr);
	var action = "signrequest",
		positions = myJson,
		textPositions = myTextJson,
		form = $(".request-send-file"),
		note = form.find(".receiver-note").val(),
		restricted = 1,
		url = "files/sendemails.php";
		
		
	if($("input[name=duplicatedocument]").prop("checked")){
	    signType = "group";
	}else{
	    signType = "normal";
	}
	
	if($("body").hasClass("group-sign")){
	    var myNewArr = [];
    	$(".group-sign-emails option:selected" ).each(function(index, value) {
    		myNewArr.push($(this).attr("value"));
    	});
	    email = JSON.stringify(myNewArr);
	    
	}else{
	    var myNewArr = [];
    	form.find(".receiver-email").each(function(index, value) {
    		myNewArr.push($(this).val());
    	});
	    email = JSON.stringify(myNewArr);
	}
	// Send the data using post
	var posting = $.post(url, {
		action: action,
		positions: positions,
		textPositions: textPositions,
		sharingKey: sharingKey,
		email: email,
		note: note,
		signType: signType,
		restricted: restricted
	});
	posting.done(function(data) {
		$("body").removeClass("loading");
		responseText = jQuery.parseJSON(data);
		if(responseText.status == 1) {
			restrictedReset()
			$(".request-send-file")[0].reset();
			$("body").removeClass("sign request");
			$('.temporary-signatures-holder').empty();
			swal({
				title: "Request sent!",
				text: "Document signing request was successfully sent.",
				type: "success",
				showCancelButton: false
			}, function() {
				window.location.href = 'sign?key='+sharingKey;
			});
		} else {
			swal({
				title: "Oops!",
				text: "Failed to send request, please try again.",
				type: "error",
				showCancelButton: false
			});
		}
	});
}
// send signing request and allow sign anywhere
function sendNonRestrictedSigningRequest() {
	$("body").addClass("loading");
	
	
	var action = "signrequest",
		form = $(".request-send-file"),
		note = form.find(".receiver-note").val(),
		restricted = 0,
		positions = "",
		url = "files/sendemails.php";
		
	
	if($("input[name=duplicatedocument]").prop("checked")){
	    signType = "group";
	}else{
	    signType = "normal";
	}
	if($("body").hasClass("group-sign")){
	    var myNewArr = [];
    	$(".group-sign-emails option:selected" ).each(function(index, value) {
    		myNewArr.push($(this).attr("value"));
    	});
	    email = JSON.stringify(myNewArr);
	}else{
	    var myNewArr = [];
    	form.find(".receiver-email").each(function(index, value) {
    		myNewArr.push($(this).val());
    	});
	    email = JSON.stringify(myNewArr);
	}

	// Send the data using post
	var posting = $.post(url, {
		action: action,
		positions: positions,
		sharingKey: sharingKey,
		email: email,
		note: note,
		signType: signType,
		restricted: restricted
	});
	
	
	
	posting.done(function(data) {
		$("body").removeClass("loading");
		responseText = jQuery.parseJSON(data);
		if(responseText.status == 1) {
			$("#request-sign").modal('hide');
			restrictedReset()
			$(".request-send-file")[0].reset();
			$("body").removeClass("sign request");
			swal({
				title: "Request sent!",
				text: "Document signing request was successfully sent.",
				type: "success",
				showCancelButton: false
			}, function() {
				window.location.href = 'sign?key='+sharingKey;
			});
		} else {
			swal({
				title: "Oops!",
				text: "Failed to send request, please try again.",
				type: "error",
				showCancelButton: false
			});
		}
	})
}

function restrictedReset() {
	var restricted = $(".restricted");
	if(restricted.is(':checked')) {
		$(".restricted").click();
	}
}
// decline signing invitation
$(".decline").click(function() {
    
    	if($("body").hasClass("public")) {
    		var url = siteUrl+"/files/publicAjax.php";
    	}else{
    		var url = siteUrl+"/files/sendemails.php";
    	}
    
		swal({
			title: "Are you sure!",
			text: "Are you sure you want to deline the signing invitation.",
			type: "error",
			showCancelButton: true,
			confirmButtonColor: "#ff1a1a",
			confirmButtonText: "Yes decline",
			closeOnConfirm: true
		}, function() {
			$("body").addClass("loading");
			var action = "decline";
			// Send the data using post
			var posting = $.post(url, {
				action: action,
				signingKey: signingKey,
				sharingKey: sharingKey
			});
			posting.done(function(data) {
				$("body").removeClass("loading");
				responseText = jQuery.parseJSON(data);
				if(responseText.status == 1) {
					swal({
						title: "Request declined!",
						text: "You have successfully declined the signing invitation.",
						type: "success",
						showCancelButton: false,
						confirmButtonText: "Okay",
						closeOnConfirm: false
					}, function() {
						window.location.reload();
					})
				} else {
					swal({
						title: "Oops!",
						text: "Failed to complete request, please try again.",
						type: "error",
						showCancelButton: false
					});
				}
			})
		});
	})
	// accept signing invitation
$(".accept").click(function() {
	if($("body").hasClass("public")) {
		if(Cookies.get('signature') === undefined) {
			$('#updateSignature').modal('show');
		} else if(signRestricted == 1) {
    		swal({
    			title: "One click sign!",
    			text: "The sender wants specific points signed, click sign now and we will sign for you.",
    			type: "info",
    			showCancelButton: true,
    			confirmButtonText: "Sign now",
    			closeOnConfirm: true
    		}, function() {
    			signDocument(signingPoints);
    		})
    	} else {
			$(".data-holder").attr("signature", Cookies.get('signature'));
			$("body").addClass("sign");
		}
	} else if(signRestricted == 1) {
		swal({
			title: "One click sign!",
			text: "The sender wants specific points signed, click sign now and we will sign for you.",
			type: "info",
			showCancelButton: true,
			confirmButtonText: "Sign now",
			closeOnConfirm: true
		}, function() {
			signDocument(signingPoints);
		})
	} else if(signRestricted == 0) {
		$("body").addClass("sign");
	}
})

function signDocument(positions) {
	$("body").addClass("loading");
    bold = italic = ''
    if($("body").hasClass("doc-bold")){ bold = 'B'; }
    if($("body").hasClass("doc-italic")){ italic = 'I'; }
	var action = "sign",
		title = "Document signed!",
		styling = JSON.stringify({
    		    bold : bold,
    		    italic : italic,
    		    size : $(".doc-text-size").val(),
    		    color : $(".doc-text-color").val(),
    		    font : $(".doc-text-font").val()
    		}),
		activity = "signed";
		
	url = "files/ajaxProcesses.php";
	if($("body").hasClass("write") && !$("body").hasClass("extra-doc-action-mode")) {
    
		action = "write",
		title = "Document updated!",
		activity = "written",
		styling = JSON.stringify({
    		    bold : bold,
    		    italic : italic,
    		    size : $(".doc-text-size").val(),
    		    color : $(".doc-text-color").val(),
    		    font : $(".doc-text-font").val()
    		});
	}
	if($("body").hasClass("public")) {
		url = "../files/publicAjax.php";
	}
	var posting = $.post(url, {
		action: action,
		documentKey: sharingKey,
		signingKey: signingKey,
		positions: positions,
		styling: styling,
		signingMode: signingMode
	});
	posting.done(function(data) {
		$("body").removeClass("loading");
		responseText = jQuery.parseJSON(data);
		if(responseText.status == 1) {
			$("body").removeClass("sign");
			swal({
				title: title,
				text: "Your document has been successfully " + activity,
				type: "success",
				showCancelButton: false,
				confirmButtonText: "View " + activity + " document",
				closeOnConfirm: true
			}, function() {
				$("body").addClass("loading");
				window.location.reload();
			});
		} else {
			swal({
				title: "Oops!",
				text: "Document signing failed, please try again.",
				type: "error",
				showCancelButton: false,
				confirmButtonText: "Try again",
				closeOnConfirm: true
			});
		}
	});
	posting.fail(function(event) {
	    hideLoader();
		swal({
			title: "Oops!",
			text: "Document signing failed. Password protected documents or documents with permission restrictions can not be modified.",
			type: "error",
			showCancelButton: false,
			confirmButtonText: "Okay",
			closeOnConfirm: true
		});
	});
}

// convert work to PDF
function convertToPdf(returnField = 'none'){
    $("body").addClass("loading");
    window.location.href = siteUrl+"/convert?key="+sharingKey+"&return="+returnField+"&environment="+environment;
}

// set doc password
$("input[name=passwordswitch]").change(function(){
    if($(this).prop("checked")){
        $("input[name=ownerpassword]").attr("required", true);
        $(".owner-password").show();
        $("input[name=userpassword]").attr("required", true);
        $(".user-password").show();
    }else{
        $("input[name=ownerpassword]").attr("required", false);
        $(".owner-password").hide();
        $("input[name=userpassword]").attr("required", false);
        $(".user-password").hide();
    }
});

// convert word document to pdf before applying protection 
$(".protection-convert-doc").click(function(){
	swal({
		title: "Heads Up!",
		text: "This file will be converted to PDF before applying protection.",
		showCancelButton: true,
		type: "warning",
		confirmButtonText: "Proceed",
		closeOnConfirm: true
	}, function() {
		convertToPdf("openProtection");
	});
});

// protected file notifcation
$(".protected").click(function(){
	swal({
		title: "Hello!",
		text: "This document is already protected.",
		showCancelButton: false,
		type: "info",
		confirmButtonText: "Okay",
		closeOnConfirm: true
	});
});

// dublicate document on request
function duplicateDocOption(){
    if($("input[name=duplicatedocument]").prop("checked") && !$("body").hasClass("group-sign")){
        if($(".emails").find(".form-group").length < 2){
            $("input[name=duplicatedocument]").click();
            $(".duplicatedocument").hide();
        }else{
            $(".duplicatedocument").show();
        }
    }else if(!$("body").hasClass("group-sign")){
        if($(".emails").find(".form-group").length < 2){
            if($("input[name=duplicatedocument]").prop("checked")){
                $("input[name=duplicatedocument]").click();
            }
            $(".duplicatedocument").hide();
        }else{
            $(".duplicatedocument").show();
        }
    }
    
    restrictedRequestValidation();

}

$(".group-sign-emails").change(function(){
    restrictedRequestValidation();
});

// wether to allow restricted signing or not
function restrictedRequestValidation(){
    if($("input[name=duplicatedocument]").prop("checked") && $("body").hasClass("group-sign")){
        $(".restricted-holder").show();
    }else if($("body").hasClass("group-sign") && $(".group-sign-emails option:selected").length == 1){
        $(".restricted-holder").show();
    }else if(!$("input[name=duplicatedocument]").prop("checked") && $("body").hasClass("group-sign")){
        if($("input[name=restricted]").prop("checked")){
            $("input[name=restricted]").click();
            $(".restricted-holder").hide();
        }else{
            $(".restricted-holder").hide();
        }
    }else if(!$("body").hasClass("group-sign")){
        if($(".emails").find(".form-group").length > 1 && $("input[name=duplicatedocument]").prop("checked")){
            $(".restricted-holder").show();
        }else if($(".emails").find(".form-group").length > 1 && !$("input[name=duplicatedocument]").prop("checked")){
            if($("input[name=restricted]").prop("checked")){
                $("input[name=restricted]").click();
                $(".restricted-holder").hide();
            }else{
                $(".restricted-holder").hide();
            }
        }else if($(".emails").find(".form-group").length == 1){
            $(".restricted-holder").show();
        }
    }
}

$("input[name=duplicatedocument]").change(function(){
    restrictedRequestValidation();
});
