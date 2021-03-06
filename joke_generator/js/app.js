document.querySelector('.get-jokes').addEventListener('click', getJokes);


function getJokes(e) {
  e.preventDefault();
  const number = document.querySelector('#number').value;

  if (number > 0) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function() {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);
        let output = '';

        if (response.type === 'success') {
          response.value.forEach((joke) => {
            output += `<li>${joke.joke}</li>`;
          });
        } else {
          output += '<li>Something wen\'t wrong. Please try again later.</li>';
        }

        document.querySelector('.jokes').innerHTML = output;
      
      }
    }

    xhr.send();
  } else {
    document.querySelector('.jokes').innerHTML = '';
  }
}