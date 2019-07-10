/*
Project: Signer | Create Digital signatures and Sign PDF documents online
Author: Simcy Creative
File: Files js
*/
! function($) {

    // when folder is right clicked
    var $folderMenu = $("#folder-menu"),
        $fileMenu = $("#file-menu");
    $("body").on("contextmenu", ".data-folder", function(e) {
        $fileMenu.hide();
        $folderMenu.css({
            display: "block",
            left: e.pageX,
            top: e.pageY
        });
        return false;
    });

    // when file is right clicked
    $("body").on("contextmenu", ".data-file", function(e) {
        $folderMenu.hide();
        $fileMenu.css({
            display: "block",
            left: e.pageX,
            top: e.pageY
        });
        return false;
    });

    // close right click menu
    $('html').click(function() {
        $folderMenu.hide();
        $fileMenu.hide();
    });


}(window.jQuery);


$(".content-list div").click(function(event) {
    if (!$(this).hasClass("ui-selected")) {
    	if (event.metaKey) {
    		$(this).addClass("ui-selected");
    	}else{
    		$(this).addClass("ui-selected").siblings().removeClass("ui-selected");
    	}
    }else{
    	$(this).removeClass("ui-selected");
    }
    docListTools();
})

// drag and drop feature
function dragAction() {
    $(".content-list").selectable({
        selected: function(event, ui) {
            docListTools();
        },
        unselecting: function(event, ui) {
            docListTools();
        }
    });

    $(".content-list").find(".folder").draggable({
        revert: 'false',
        helper: function(event) {
            var $group = $("<div>", {
                class: "content-list"
            });
            if ($(".folder.ui-selected").length) {
                var theClone = $(".folder.ui-selected").clone();
                theClone = $group.html(theClone);
            } else {
                theClone = $group.html($(this).clone());
            }
            return theClone;
        }
    });
    $(".content-list").find(".data-folder").droppable({
        tolerance: 'pointer',
        drop: function(event, ui) {
            var dragId = ui.draggable.attr("data-id");
            var dragType = ui.draggable.attr("data-type");
            var dropId = $(this).attr("data-id");
            // relocate(dragId, dragType, dropId);
            if ($(".folder.ui-selected").length) {
                $(".folder.ui-selected").remove();
            } else {
                ui.draggable.remove();
            }

            $(this).removeClass("over-now");
        },
        over: function(event, ui) {
            $(this).addClass("over-now");
        },
        out: function(event, ui) {
            $(this).removeClass("over-now");
        }
    });
}

// show or hide doc tools on listing page
function docListTools() {
    if ($(".folder.ui-selected").length > 0) {
        $(".select-option").addClass("show");
    } else {
        $(".select-option").removeClass("show");
    }
}

// initialize drag and drop
dragAction();