

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST,PUT',          // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization, userRole   ' // Allow this header
  }; 
  
  module.exports =corsOptions