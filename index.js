import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


//Form 
searchForm.addEventListener('submit', e => {
    //takes in 'search term'
    const searchTerm = searchInput.value;

    //takes in 'Sort'
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    

    //takes in limit
    const searchLimit = document.getElementById('limit').value;
   
    
    //making the search field required
    if(searchTerm === ''){
        errorMessage('Please enter a valid search term', 'alert alert-danger');
    }

    //clear search input
    searchInput.value = '';
    
    //searching reddit
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {

        let output = '<div class="card-columns">';
        //looping through posts
        results.forEach(post =>  {

            //image checking
           const image = post.preview ? post.preview.images[0].source.url : 'https://robertkatai.com/wp-content/uploads/2018/09/wsi-imageoptim-reddit-marketing-.jpg';


            output += `
            <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${shortText(post.selftext, 100)}</p>
            <a href="${post.url}" target="_blank" class="btn btn-primary">Read</a>
            <hr>
            <a href="${post.url}" target="_blank" class="badge badge-dark">Subreddit: ${post.subreddit}</a>
            <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
            </div>`;
        });

        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
});

   


// errorMessage Testing
function errorMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const searchContainer = document.getElementById('search-container');
    // Get form
    const search = document.getElementById('search')
    //add error message to top of screen
    searchContainer.insertBefore(div, search);
    //remove message after a certain amount of time
    setTimeout(() => document.querySelector('.alert').remove(), 5000);

};

function shortText(text, limit) {
    const short = text.indexOf(' ', limit);

    if(short === -1) 
    return text;
    return text.substring(0, short);
}