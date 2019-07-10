

/*
 * Start jQuery
 */
$(document).ready(function() {
	/*
	 * Set a fixed height
	 */
    var screenHeight = $(window).height();
    $(".chat-wrapper").css("height", screenHeight + "px");

	/*
	 * humbager
	 */
    $(".humbager").click(function() {
        var menu = $(".left-bar");
        if (menu.hasClass("slide-menu")) {
            menu.removeClass("slide-menu");
        } else {
            menu.addClass("slide-menu");
        }
    });

  // sidebar - scroll container
    $('.slimscroll-menu').slimscroll({
        height: 'auto',
        position: 'right',
        size: "3px",
        color: '#9ea5ab',
        wheelStep: 5,
        touchScrollStep: 50
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

	/*
	 * Toastr options
	 */
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

	/*
	 * allow users to upload docx
	 */
    $("input[name=allowdocx]").change(function() {
        if ($(this).prop("checked")) {
            $(".allowdocx").show();
        } else {
            $(".allowdocx").hide();
        }

    });

});


// Switch login cards
$(".login-card a").click(function() {
    var target = "." + $(this).attr("target");
    $(".sign-in, .forgot-password, .reset-password, .sign-up, .alert").hide();
    $(target).show();

    if (target === '.sign-in') {
        $(".sign-up-btn").show();
    } else {
        $(".sign-up-btn").hide();
    }
});

// business vs personal account
$(".business-account").change(function() {
    if ($(this).prop("checked")) {
        $(".business-name").show();
        $("input[name=company]").attr("required", true);
    } else {
        $(".business-name").hide();
        $("input[name=company]").val("");
        $("input[name=company]").removeAttr("required");
    }

});

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
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


/*
 * add reminder
 */
$(".add-reminder").click(function(){
    $('.collapse').collapse('hide');
    var reminderKey = random(),
          reminderNumber = parseInt($(".reminders-holder").find('.panel').length) + 1;
    $(".reminders-holder").append(`<div class="panel panel-default">
            <div class="panel-heading">
                <span class="delete-reminder" data-toggle="tooltip" title="Remove reminder"><i class="ion-ios-trash"></i></span>
                <h4 class="panel-title"><a data-parent="#accordion" data-toggle="collapse" href="#collapse-`+reminderKey+`">Reminder #<span class="count">`+reminderNumber+`</span></a></h4>
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
        reminderIndexing();
})

/*
 * delete reminder
 */
$(".reminders-holder").on("click",".delete-reminder",function(){
    $(this).closest(".panel").remove();
    reminderIndexing();
});

/*
 * Number reminder cards
 */
 function reminderIndexing(){
       $(".reminders-holder").find("span.count").each(function(index) { 
        $(this).text(index + 1);
    });
 }

/*
 * reminders toggle
 */
 $("input[name=reminders]").change(function(){
    if ($(this).prop("checked")) {
        $(".reminders-holder, .add-reminder").show();
    }else{
        $(".reminders-holder, .add-reminder").hide();
    }
 });

/*
 * cloud convert toggle
 */
 $("input[name=USE_CLOUD_CONVERT]").change(function(){
    if ($(this).prop("checked")) {
        $(".cloud-convert-holder").show();
    }else{
        $(".cloud-convert-holder").hide();
    }
 });


