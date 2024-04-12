document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

function fetchData() {
  fetch('https://arbeitnow.com/api/job-board-api')
    .then(response => response.json())
    .then(data => {
      displayData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayData(data) {
  const jobDataContainer = document.getElementById('jobData');
  jobDataContainer.innerHTML = ''; // Clear previous data

  if (data && data.data) {
    data.data.forEach(job => {
      const jobElement = document.createElement('div');
      jobElement.classList.add('jobItem');
      jobElement.innerHTML = `
        <h2>${job.title}</h2>
        <p>${job.company_name}</p>
        <p>${job.description}</p>
        <a href="${job.url}" target="_blank">View Job</a>
      `;
      jobDataContainer.appendChild(jobElement);
    });
  } else {
    jobDataContainer.textContent = 'No jobs found';
  }
}
