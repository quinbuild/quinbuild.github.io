
// The workerSrc property shall be specified.

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.1,
    password = '';
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {

  $(".temporary-signature").hide();
  $(".document-load").show();
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;
        $(".document-map").css("height", viewport.height);
        $(".document-map").css("width", viewport.width);
        // $("canvas").css("width", $(".document-pagination").width());
    // Render PDF page into canvas context
    console.log(viewport);
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
    $(".document-load").hide();
    $("[page="+pageNum+"]").show();
  if(pageNum == pdfDoc.numPages){
    $("#next").addClass("disabled");
  }else{
    $("#next").removeClass("disabled");
  }

  if(pageNum == 1){
    $("#prev").addClass("disabled");
  }else{
    $("#prev").removeClass("disabled");
  }

      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = pageNum;
  
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

/**
 * Asynchronously downloads PDF.
 */
openDocument(url, password);

function openDocument(url, password){
    
    PDFJS.getDocument({ url: url, password: password }).then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      document.getElementById('page_count').textContent = pdfDoc.numPages;
    
      // Initial/first page rendering
      renderPage(pageNum);
    
      if(pdfDoc.numPages == 1){
        $("#next, #prev").addClass("disabled");
      }
      
      $("#docPassword").modal("hide");
      $(".document-password-error").hide();
    }).catch(function(error) { console.log(error)
    	
    	if(error.name == 'PasswordException') {
    	    $("input[name=docpassword]").val('');
    	    $("#docPassword").modal({show: true, backdrop: 'static', keyboard: false});
    	    if(error.code == 2){
    	        $(".document-password-error").show();
    	        $(".password-error").text(error.message);
    	    }
    	    
    	}
    	else {
    	    toastr.error(error.message, "Oops!");
    	}
    });
    
}

$(".document-password").submit(function(){
    event.preventDefault();
	$(this).parsley().validate();
	if (($(this).parsley().isValid())) {
	    openDocument(url, $("input[name=docpassword]").val())
	}
})