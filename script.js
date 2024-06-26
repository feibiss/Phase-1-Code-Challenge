const jobsContainer = document.querySelector(".jobs-list-container .jobs");
const jobSearch = document.querySelector(".job-search");
const searchButton = document.querySelector(".search-btn");
const jobFormInputs = document.querySelectorAll(".job-form-input");
const jobForm = document.querySelector(".job-form");

let searchTerm = "";

const createJobListingCards = async () => {
  jobsContainer.innerHTML = "";

  fetch("https://jsonfakery.com/jobs")
    .then(response => response.json())
    .then(j => {
      return j.slice(0, 10);
    })
    .then(jobs => filterAndDisplayJobs(jobs))
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

  let applyBtn = document.createElement("a");
  applyBtn.href = "#";
  applyBtn.innerHTML = "Apply";
  applyBtn.classList.add("apply-btn");

  jobCard.appendChild(title);
  jobCard.appendChild(details);
  jobCard.appendChild(applyBtn);
  jobsContainer.appendChild(jobCard);
}

(async function () {
  await createJobListingCards();
})();

searchButton.addEventListener("click", () => {
  searchTerm = jobSearch.value;
  createJobListingCards();
});


async function submitJob() {
  jobFormInputs.forEach((input) => (input.value = ""));
  alert("The job has been successfully submitted!");
}

jobForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitJob();
});