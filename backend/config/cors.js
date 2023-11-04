

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST',          // Allow these HTTP methods
    allowedHeaders: 'Content-Type', // Allow this header
  }; 
  
  module.exports =corsOptions