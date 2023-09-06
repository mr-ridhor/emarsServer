const handleSuccess=(data, res)=> {
    res.status(200).json({ success: true, data });
  }
  

const handleError=(error, res)=> {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  module.exports = {handleSuccess, handleError };
    