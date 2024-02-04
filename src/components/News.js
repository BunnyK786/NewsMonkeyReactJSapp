import React, {useEffect, useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
//   static defaultProps = {
//     country :'in ',
//     pageSize : 6,
//     category: 'general'
//   }

//   static propTypes = {
//     country : PropTypes.string,
//     pageSize : PropTypes.number,
//     category: PropTypes.string
    
//   }
const News = (props)=>{

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstLetter = (string) =>
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // constructor(props) {
  //   super(props);
  //   // // console.log("Hello I am constructor from news Component");
  //   //  = {
  //   //   articles: [],
  //   //   loading: true,
  //   //   page: 1,
  //   //   totalResults : 0,
  //   // };
  //   // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    
  // }

  // async updateNews(){

  const updateNews = async ()=> {

    props.setProgress(10);
    const url =
    `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
   
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
  let parseData = await data.json();
  props.setProgress(70);
  // console.log(parseData);
  setarticles(parseData.articles)
  settotalResults(parseData.totalResults)
  setloading(false)
  
    props.setProgress(100);
  }

useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      updateNews();
    },[])
 
const  handlePreviousClick = async () => {

    setPage(page-1)
    updateNews();
  };


const  handleNextClick = async () => {
  
  setPage(page+1)
  updateNews();

};

 const fetchMoreData = async() => {
   const url =
   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   
   setPage(page+1)
    let data = await fetch(url);
  let parseData = await data.json();
  // console.log(parseData);
  setarticles(articles.concat(parseData.articles))
  settotalResults(parseData.totalResults)

};




    // console.log("render");
    return (
      <>
        <h1 className="text-center" style={{margin: '40px 0px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} HeadLines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
         
        <div className="row">
          {articles.map((element) => {
            
            return  <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                  />
              </div>
              
           
            })}
        </div>
           </div>
        </InfiniteScroll>
        </>
          )
          }
          

News.defaultProps = {
  country :'in ',
                pageSize : 6,
  category: 'general'
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category: PropTypes.string
                
}
            

export default News;
