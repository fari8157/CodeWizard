

const corsOptions = {
    origin: 'https://codewizard777.netlify.app', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',          // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization,userRole', // Allow this header
    credentials: true,
  }; 
  
  module.exports =corsOptions