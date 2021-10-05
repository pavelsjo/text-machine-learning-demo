const collection = document.querySelector('.container .collection');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    
    e.preventDefault();
    
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ probe: form.inputs.value })
    })
    .then( res => res.json() )
    .then( data => {
        data.msg.forEach(job => {
            collection.innerHTML = '';
            htmlRender(job.text)
        });
    })
    .catch(err => console.log(err))
});

const dataHandle = async () => {
    
   const resp = await fetch('./data');
   const data = await resp.json();

   const jobs = data.msg.searchResults.hits.hits;
   jobs.forEach(job => {
       htmlRender(job["_source"]["JobInformation"]["Title"])
   });
};

const htmlRender = (data) => {
    const template = `<li class="collection-item">${data}</li>`
    collection.innerHTML += template;
};

dataHandle();