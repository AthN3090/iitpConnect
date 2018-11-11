document.addEventListener("DOMContentLoaded", () => {
  const username = document.getElementById('username');
  const userpassword = document.getElementById('userpassword');
  const tok = document.getElementById('token');
  const location = window.location.href;
  const baseUrl = location;

  if (document.getElementById('login')) {
    const login = document.getElementById('login');
    login.addEventListener("click", () => {
      console.log('aa');
      if(username.value == "" || userpassword.value == "") {
        // window.location.href = baseUrl + 'login';
        console.log('Required fields.');
        console.log('Login Aborting...');
        iitpConnect.renderMessage('Required fields', 'error',5000 );
      } else {
        loginApp();
      }
      
    });
  }

  const loginApp = () => {
    iitpConnect.startLoader();

    const xhttp = new XMLHttpRequest();
    const url = baseUrl + '/index.php';
    const params = 'submit=' + '&token=' + tok.value + '&username=' + username.value + '&userpassword=' + userpassword.value + '&task=LoginController.UserLogin';
    const method = 'POST';

    xhttp.open(method, url, true);

    //Send the proper header information along with the request
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('CSRFToken', tok.value);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText)
        const responseData = JSON.parse(xhttp.responseText);

        if(responseData.response == 'error')
        {
          // window.location.href = baseUrl + 'login';
          iitpConnect.renderMessage(responseData.text, responseData.response,5000 );
          iitpConnect.stopLoader();
        }
        else if(responseData.response == 'success') {
          iitpConnect.stopLoader();
          window.location.href = baseUrl;
        }
      }
      if(this.status == 400 || this.status == 500) {
        console.log('Server Error');
        iitpConnect.renderMessage('Server error try again.','warning',5000);
        iitpConnect.stopLoader();
      }
    };
    xhttp.send(params);
  };

});
