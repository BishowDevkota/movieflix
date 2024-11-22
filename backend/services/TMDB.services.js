const axios = require('axios');




const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2Q2MGY1MGI4MDcxY2I5MDQ0ZmQzMzg2NjA1MzM2YiIsIm5iZiI6MTcyOTc4NTY4Ny4yNTUzNTksInN1YiI6IjY3MWE2ZTM5MWVhMzM5MjgyOTdkMDMzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oXUGjPAvM1bhoDFt8FTbF59zSnFoh7ndQAjTVSUCDXk'
    }
  };
  
  fetch('https://api.themoviedb.org/3/account/21589847/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2Q2MGY1MGI4MDcxY2I5MDQ0ZmQzMzg2NjA1MzM2YiIsIm5iZiI6MTcyOTc4NTY4Ny4yNTUzNTksInN1YiI6IjY3MWE2ZTM5MWVhMzM5MjgyOTdkMDMzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oXUGjPAvM1bhoDFt8FTbF59zSnFoh7ndQAjTVSUCDXk'
        }
      };
      const res= await axios.get(url, options);

      if(res.status !==200){
        throw new Error('Failed to fetch data'+res.statusText);
      }
      return res.data;
}

module.exports=fetchFromTMDB