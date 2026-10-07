// backend/models/userModel.js

// Mock Data inicial basada en la especificación del proyecto
let users = [
  {
    id: 1,
    nombre: "Administrador Principal",
    email: "admin@universidad.edu.co",
    password: "admin123",
    rol: "admin",
    estado: "activo",
    fechaCreacion: "2026-01-15T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 2,
    nombre: "Juan Pérez Rodríguez",
    email: "juan.perez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-02-20T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 3,
    nombre: "María González López",
    email: "maria.gonzalez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-05T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 4,
    nombre: "Dylan Cespedes Castellanos",
    email: "dylan.cespedes@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-05T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 5,
    nombre: "Carlos Eduardo Mendoza",
    email: "carlos.mendoza@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-06T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 6,
    nombre: "Ana Lucía Torres",
    email: "ana.torres@universidad.edu.co",
    password: "usuario123",
    rol: "bibliotecario",
    estado: "activo",
    fechaCreacion: "2026-03-06T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 7,
    nombre: "Santiago Ramírez Castro",
    email: "santiago.ramirez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-07T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 8,
    nombre: "Valentina Ortiz Silva",
    email: "valentina.ortiz@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "inactivo",
    fechaCreacion: "2026-03-07T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 9,
    nombre: "Andrés Felipe Gómez",
    email: "andres.gomez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-08T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 10,
    nombre: "Camila Andrea Morales",
    email: "camila.morales@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-08T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 11,
    nombre: "Mateo Hernández Vargas",
    email: "mateo.hernandez@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-09T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 12,
    nombre: "Sofia Isabel Díaz",
    email: "sofia.diaz@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-09T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 13,
    nombre: "Diego Alejandro Rojas",
    email: "diego.rojas@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "suspendido",
    fechaCreacion: "2026-03-10T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 14,
    nombre: "Laura Sofia Martínez",
    email: "laura.martinez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-10T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 15,
    nombre: "Javier Eduardo Ríos",
    email: "javier.rios@universidad.edu.co",
    password: "usuario123",
    rol: "bibliotecario",
    estado: "activo",
    fechaCreacion: "2026-03-11T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 16,
    nombre: "Paula Daniela Romero",
    email: "paula.romero@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-11T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 17,
    nombre: "Daniel Esteban Suárez",
    email: "daniel.suarez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-12T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 18,
    nombre: "Mariana Restrepo Villa",
    email: "mariana.restrepo@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-12T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 19,
    nombre: "Gabriel Antonio Herrera",
    email: "gabriel.herrera@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-13T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 20,
    nombre: "Isabella Ospina Franco",
    email: "isabella.ospina@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "inactivo",
    fechaCreacion: "2026-03-13T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 21,
    nombre: "Nicolas David Cardona",
    email: "nicolas.cardona@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-14T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 22,
    nombre: "Natalia Carolina Gutierrez",
    email: "natalia.gutierrez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-14T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 23,
    nombre: "Samuel David Muñoz",
    email: "samuel.munoz@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-15T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 24,
    nombre: "Gabriela Fernanda Acosta",
    email: "gabriela.acosta@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-15T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 25,
    nombre: "Emanuel Jose Salazar",
    email: "emanuel.salazar@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-16T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 26,
    nombre: "Adriana Maria Cardenas",
    email: "adriana.cardenas@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-16T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 27,
    nombre: "Sebastian Camilo Parra",
    email: "sebastian.parra@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "suspendido",
    fechaCreacion: "2026-03-17T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    "id": 28,
    nombre: "Vanessa Alexandra Marin",
    email: "vanessa.marin@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-17T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 29,
    nombre: "Felipe Antonio Betancur",
    email: "felipe.betancur@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-18T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 30,
    nombre: "Juliana Andrea Londono",
    email: "juliana.londono@universidad.edu.co",
    password: "usuario123",
    rol: "bibliotecario",
    estado: "activo",
    fechaCreacion: "2026-03-18T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 31,
    nombre: "Tomas Enrique Quintero",
    email: "tomas.quintero@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-19T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 32,
    nombre: "Sara Victoria Trujillo",
    email: "sara.trujillo@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-19T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 33,
    nombre: "Lucas Manuel Mejia",
    email: "lucas.mejia@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-20T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 34,
    nombre: "Manuela Fernanda Agudelo",
    email: "manuela.agudelo@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "inactivo",
    fechaCreacion: "2026-03-20T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 35,
    nombre: "Joaquin Ignacio Bermudez",
    email: "joaquin.bermudez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-21T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 36,
    nombre: "Katerine Patricia Villegas",
    email: "katerine.villegas@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-21T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 37,
    nombre: "Emilio Jose Caicedo",
    email: "emilio.caicedo@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-22T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 38,
    nombre: "Verónica Lucia Palacios",
    email: "veronica.palacios@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-22T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 39,
    nombre: "Esteban Ricardo Hurtado",
    email: "esteban.hurtado@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-23T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 40,
    nombre: "Diana Marcela Murillo",
    email: "diana.murillo@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-23T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 41,
    nombre: "Oscar Eduardo Benitez",
    email: "oscar.benitez@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-24T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 42,
    nombre: "Angela Maria Guiza",
    email: "angela.guiza@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-24T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 43,
    nombre: "Edward Fabian Escobar",
    email: "edward.escobar@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-25T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 44,
    nombre: "Daniela Pinzon Amezquita",
    email: "daniela.pinzon@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-25T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 45,
    nombre: "Rodrigo Hernan Santos",
    email: "rodrigo.santos@universidad.edu.co",
    password: "usuario123",
    rol: "admin",
    estado: "activo",
    fechaCreacion: "2026-03-26T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 46,
    nombre: "Claudia Patricia Prieto",
    email: "claudia.prieto@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-26T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 47,
    nombre: "Guillermo Arturo Cabrera",
    email: "guillermo.cabrera@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "inactivo",
    fechaCreacion: "2026-03-27T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 48,
    nombre: "Alejandra Maria Rojas",
    email: "alejandra.rojas@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-27T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 49,
    nombre: "Stefany Paola Moreno",
    email: "stefany.moreno@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-28T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 50,
    nombre: "Karol Viviana Zamudio",
    email: "karol.zamudio@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-28T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 51,
    nombre: "Deisy Yuliana Cifuentes",
    email: "deisy.cifuentes@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-29T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 52,
    nombre: "Emily Tatiana Guzman",
    email: "emily.guzman@universidad.edu.co",
    password: "usuario123",
    rol: "usuario",
    estado: "activo",
    fechaCreacion: "2026-03-29T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 53,
    nombre: "Jose Hember Solorzano",
    email: "hember.solorzano@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-30T00:00:00.000Z",
    fechaModificacion: null
  },
  {
    id: 54,
    nombre: "Nohora Esperanza Trujillo",
    email: "nohora.trujillo@universidad.edu.co",
    password: "usuario123",
    rol: "docente",
    estado: "activo",
    fechaCreacion: "2026-03-30T00:00:00.000Z",
    fechaModificacion: null
  }
];

module.exports = users;