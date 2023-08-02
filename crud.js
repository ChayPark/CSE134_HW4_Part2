let selectedProjectIndex = null;

document.addEventListener('DOMContentLoaded', loadProjects);
document.querySelector('#project-form').addEventListener('submit', addProject);

function loadProjects() {
  let projects = JSON.parse(localStorage.getItem('projects'));
  if (!projects) {
    localStorage.setItem('projects', JSON.stringify([]));
    return;
  }
  let projectList = document.querySelector('#project-list');
  projectList.innerHTML = '';
  projects.forEach((project, index) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `${project.name} <button data-index="${index}" class="edit-button">Edit</button> <button data-index="${index}" class="delete-button">Delete</button>`;
    projectList.appendChild(listItem);
  });
  
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', editProject);
  });
  
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', deleteProject);
  });
}

function addProject(e) {
  e.preventDefault();
  let name = document.querySelector('#name').value;
  let image = document.querySelector('#image').value;
  let description = document.querySelector('#description').value;
  let link = document.querySelector('#link').value;
  let projects = JSON.parse(localStorage.getItem('projects'));
  projects.push({name, image, description, link});
  localStorage.setItem('projects', JSON.stringify(projects));
  document.querySelector('#project-form').reset();
  loadProjects();
}

function editProject(e) {
  let index = e.target.getAttribute('data-index');
  selectedProjectIndex = index;
  let projects = JSON.parse(localStorage.getItem('projects'));
  let project = projects[index];
  document.querySelector('#name').value = project.name;
  document.querySelector('#image').value = project.image;
  document.querySelector('#description').value = project.description;
  document.querySelector('#link').value = project.link;
  document.querySelector('#add-button').hidden = true;
  document.querySelector('#update-button').hidden = false;
  document.querySelector('#update-button').addEventListener('click', updateProject);
}

function updateProject(e) {
  e.preventDefault();
  let name = document.querySelector('#name').value;
  let image = document.querySelector('#image').value;
  let description = document.querySelector('#description').value;
  let link = document.querySelector('#link').value;
  let projects = JSON.parse(localStorage.getItem('projects'));
  projects[selectedProjectIndex] = {name, image, description, link};
  localStorage.setItem('projects', JSON.stringify(projects));
  document.querySelector('#project-form').reset();
  document.querySelector('#add-button').hidden = false;
  document.querySelector('#update-button').hidden = true;
  loadProjects();
}

function deleteProject(e) {
  let index = e.target.getAttribute('data-index');
  let projects = JSON.parse(localStorage.getItem('projects'));
  projects.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  loadProjects();
}
