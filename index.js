//boas práticas API-REST: verbo http adequado (get, post, put, delete), nomenclatura adequada e status code certo.

//CRIANDO UM SERVIDOR PARA A API
import express, { request, response } from 'express' //framework
import { StatusCodes } from 'http-status-codes'

const app = express()
const PORT = process.env.PORT || 3000 //porta dinâmica no HEROKU (plataforma para disponibilizar a api) || porta fixa

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
//fim criação do server

let users = [
  { id: 1, name: 'Julia Kuboyama', age: 26 },
  { id: 2, name: 'Gabriel Rodrigues', age: 27 }
]

app.use(express.json()) //definindo o formato do objeto que será inserido na api (usado no POST)

//usando GET
app.get('/', (request, response) => {
  return response.send('<h1>Trabalhando com servidor express!</h1>')
})

//retornando lista de usuários
app.get('/users', (request, response) => {
  return response.send(users)
})

//retornando um user
app.get('/users/:userId', (request, response) => {
  const userId = request.params.userId
  const user = users.find(user => {
    return user.id === Number(userId)
  })
  return response.send(user)
})

//utilizando o verbo POST (criando novo user)
app.post('/users', (request, response) => {
  const newUser = request.body

  users.push(newUser)

  return response.status(StatusCodes.CREATED).send(newUser) //boas práticas: importar os statuscodes e colocar aí, ao invés de escrever o código
})
//Usa-se o thunder client para fazer a request e visualizar

//utilizando PUT (atualização ed propriedades)
app.put('/users/:userId', (request, response) => {
  const userId = request.params.userId
  const updatedUser = request.body

  users = users.map(user => {
    if (Number(userId) === user.id) {
      return updatedUser
    }

    return user
  })

  return response.send(updatedUser)
})

//usando o DELETE

app.delete('/users/:userId', (request, response) => {
  const userId = request.params.userId

  users = users.filter(user => user.id !== Number(userId))

  return response.status(StatusCodes.NO_CONTENT).send()
})
