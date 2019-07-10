/*!
 * Signer
 * Version 1.0 - built Sat, Oct 6th 2018, 01:12 pm
 * https://simcycreative.com
 * Simcy Creative - <hello@simcycreative.com>
 * Private License
 */

 /*
  * close editor overlay
  */
  $(".close-editor-overlay").click(function(){
  	closeEditor();
  });

 /*
  * function to close editor overlay
  */
  function closeEditor(){
  	$(".signer-document").appendTo(".document");
  	$("body").removeClass("editor");
  };

 /*
  * launch editor overlay
  */
  $(".launch-editor").click(function(){
  	launchEditor();
  });

 /*
  * function to launch editor overlay
  */
  function launchEditor(){
  	$(".signer-document").appendTo(".signer-overlay-previewer");
  	$("body").addClass("editor");
  };

