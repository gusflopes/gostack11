const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repo)
  
  return response.status(201).json(repo).send()
});

app.put("/repositories/:id", async (request, response) => {
  const {title, url, techs} = request.body
  const {id} = request.params;

  const repoIndex = repositories.findIndex(element => {
    return element.id === id
  })
  if (repoIndex < 0) {
    return response.status(400).send()
  }

  const updatedObject = {...repositories[repoIndex], title, url, techs}
  // const updatedObject = {
  //   id,
  //   title,
  //   url,
  //   techs,
  //   likes: repositories[repoIndex].likes,
  // }
  repositories[repoIndex] = updatedObject

  return response.json(updatedObject)
});

app.delete("/repositories/:id", async (request, response) => {
  const {id} = request.params
  const repoIndex = repositories.findIndex(element => {
    return element.id === id
  })
  if (repoIndex < 0) {
    return response.status(400).send()
  }

  repositories.splice(repoIndex, 1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", async (request, response) => {
  const {id} = request.params
  const repoIndex = repositories.findIndex(element => {
    return element.id === id
  })
  if (repoIndex < 0) {
    return response.status(400).send()
  }
  repositories[repoIndex].likes = repositories[repoIndex].likes + 1

  return response.status(201).json(repositories[repoIndex]).send()
});

module.exports = app;
