const jobsContainer = document.querySelector(".jobs-list-container .jobs");
const jobSearch = document.querySelector(".jobs-list-container .job-search");

let searchTerm = "";


const createJobListingCards = async () => {
  jobsContainer.innerHTML = "";



  fetch("https://jsonfakery.com/jobs")
    .then(response => response.json())
    .then(j => {


      return j.slice(0, 10)

    }).then(jobs => filterAndDisplayJobs(jobs))
    .catch(error => console.error('Error:', error));

};

function filterAndDisplayJobs(jobs) {
  jobs.forEach((job) => {
    if (shouldDisplayJob(job)) {
      createJobCard(job);
    }
  });
}

function shouldDisplayJob(job) {
  return job.title.toLowerCase().includes(searchTerm.toLowerCase());
}

function createJobCard(job) {
  let jobCard = document.createElement("div");
  jobCard.classList.add("job");

  let title = document.createElement("h1");
  title.innerHTML = job.title;
  title.classList.add("job-title");

  let details = document.createElement("div");
  details.innerHTML = job.description;
  details.classList.add("details");

  let detailsBtn = document.createElement("a");
  detailsBtn.href = "#";

  detailsBtn.innerHTML = "Apply";
  detailsBtn.classList.add("details-btn");

  jobCard.appendChild(title);
  jobCard.appendChild(details);
  jobCard.appendChild(detailsBtn);
  jobsContainer.appendChild(jobCard);
}

(async function () {
  await createJobListingCards();



  jobSearch.addEventListener("input", (e) => {
    searchTerm = e.target.value;

    createJobListingCards();
  });
})()