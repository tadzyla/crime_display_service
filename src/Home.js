import useFetch from './useFetch';

const Home = () => {
   const {data, isPending, error } = useFetch('https://data.police.uk/api/crimes-at-location?date=2021-02&lat=52.629729&lng=-1.131592')
   

    return ( 
      <>
       <h1 className="title">This is home page for the crimes</h1>

        <div>
            {error && <div>{ error }</div>}
            {isPending && <div className="title" >Getting information from Police data, please be patient...</div> }
            {data &&  data.map(item=> 
            <div>
                  <h1>{item.category}</h1>
                  <p>{item.location.street.name}</p>
                  </div>
                )}
        </div>
        </>
     );
}
 
export default Home;