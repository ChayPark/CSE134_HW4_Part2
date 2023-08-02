class ProjectCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <h2></h2>
      <img>
      <p></p>
      <a href="#" target="_blank">Read More</a>
    `;

    shadow.appendChild(wrapper);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('h2').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('image');
    this.shadowRoot.querySelector('p').innerText = this.getAttribute('description');
    this.shadowRoot.querySelector('a').href = this.getAttribute('link');
  }
}

window.customElements.define('project-card', ProjectCard);

let projectData = [
  {
    "name": "Project 1: Virtual Reality Lab Re-Furnishing",
    "image": "images/project1.png",
    "description": "Created a 3D VR application, replicating a VR lab at a 1:1 scale. The app enabled user modifications and navigation of the virtual environment using limited control inputs.",
    "link": "https://www.youtube.com/embed/the1eTqLrpc",
  },
  {
    "name": "Project 2: UCSD Aerial Gesture-Controlled Racing Game",
    "image": "images/project2.png",
    "description": "Constructed a VR air racing game using Oculus Quest, featuring a 3D UCSD campus model and hand gesture control.",
    "link": "https://www.youtube.com/embed/7XmQbN8Oj9Q"
  },
  {
    "name": "Project 3: AR Bowling Game",
    "image": "images/project3.png",
    "description": "Developed an AR bowling simulation game for the Lenovo A3 headset. Features included a virtual keyboard for game parameter adjustments, game mode selection, and 2:1 scale design for optimal use in a computer lab.",
    "link": "https://www.youtube.com/embed/MM9TcBXy2HE",
  }
];

localStorage.setItem('projects', JSON.stringify(projectData));

function createProjectCardsLocal(data, container) {
  for (let project of data) {
    let card = document.createElement('project-card');
    card.setAttribute('name', project.name);
    card.setAttribute('image', project.image);
    card.setAttribute('description', project.description);
    card.setAttribute('link', project.link);
    container.appendChild(card);
  }
}

document.querySelector('#load-local').addEventListener('click', function loadLocal() {
  let data = JSON.parse(localStorage.getItem('projects'));
  let container = document.querySelector('.project-cards');
  container.innerHTML = '';
  createProjectCardsLocal(data, container);
});

function createProjectCardsRemote(data, container) {
  for (let project of data) {
    let card = document.createElement('project-card');
    card.setAttribute('name', `Project ${project.id}: ${project.title}`);
    card.setAttribute('image', `images/project${project.id}.png`);
    card.setAttribute('description', `This is a description for ${project.title}`);
    card.setAttribute('link', `https://example.com/project${project.id}`);
    container.appendChild(card);
  }
}

document.querySelector('#load-remote').addEventListener('click', function loadRemote() {
  let container = document.querySelector('.project-cards');
  container.innerHTML = '';
  fetch('https://my-json-server.typicode.com/typicode/demo/posts')
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      createProjectCardsRemote(data, container);
    })
    .catch(error => console.error('Error:', error));
});
