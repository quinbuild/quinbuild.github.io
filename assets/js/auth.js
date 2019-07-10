// 	drobbox and google drive
	
	
// 	drop box
	options = {
        success: function(files) {
          files.forEach(function(file) {
            saveDropboxFile(file);
          });
        },
        cancel: function() {
          //optional
        },
        linkType: "direct", 
        multiselect: false, 
        extensions: ['.docx', '.pdf'],
    };
    
    var button = Dropbox.createChooseButton(options);
    document.getElementById("dropbox-container").appendChild(button);
    
    // google drive
          // The Browser API key obtained from the Google API Console.
      var developerKey = 'AIzaSyBMyCEo3vtxj8IKXIH04PRd0Y-QnzacZas';

      // The Client ID obtained from the Google API Console. Replace with your own Client ID.
      var clientId = '546295285393-ssc9hd0brje0tcd1moq36t6fbv1lb8dl.apps.googleusercontent.com';

      // Scope to use to access user's photos.
      var scope = 'https://www.googleapis.com/auth/drive.readonly';

      var pickerApiLoaded = false;
      var oauthToken;

      // Use the API Loader script to load google.picker and gapi.auth.
      function onApiLoad() {
        gapi.load('auth2', onAuthApiLoad);
        gapi.load('picker', onPickerApiLoad);
      }

      function onAuthApiLoad() {
        var authBtn = document.getElementById('auth');
        authBtn.disabled = false;
        authBtn.addEventListener('click', function() {
          gapi.auth2.authorize({
            client_id: clientId,
            scope: scope
          }, handleAuthResult);
        });
      }

      function onPickerApiLoad() {
        pickerApiLoaded = true;
        createPicker();
      }

      function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
          oauthToken = authResult.access_token;
          createPicker();
        }
      }

      // Create and render a Picker object for picking user Photos.
      function createPicker() {
        if (pickerApiLoaded && oauthToken) {
          var picker = new google.picker.PickerBuilder().
              addView(google.picker.ViewId.DOCUMENTS).
              setOAuthToken(oauthToken).
              setDeveloperKey(developerKey).
              setCallback(pickerCallback).
              build();
          picker.setVisible(true);
        }
      }

      // A simple callback implementation.
      function pickerCallback(data) {
        var url = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
          var doc = data[google.picker.Response.DOCUMENTS][0];
          url = doc[google.picker.Document.URL];
          fileName = doc[google.picker.Document.NAME];
          fileid = doc[google.picker.Document.ID];
          theRes = doc[google.picker.Document];
        }
        var message = 'You picked: '+fileid+ fileName + url;
        console.log(theRes);
        document.getElementById('result').innerHTML = message;
        
      }