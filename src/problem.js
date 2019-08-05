import React from 'react'
import axios from 'axios'
import { Row, Col } from 'antd';
export default class AddCrops extends React.Component{
    constructor(props){
        super(props)
        this.state={
         Crop:[],
         page:1,
         next_url:'/api/crops_with_croptypes?page=1',
         has_next:true,
         indexes: [],  
        }
    }

    onclick(index) {
        console.log(index)
        let indexes = this.state.indexes.slice(0);
        console.log(indexes.indexOf(index))
        if(indexes.indexOf(index) === -1)
           indexes.push(index);
        else{
           let id = indexes.indexOf(index);
           indexes.splice(id, 1)
        }
        this.setState({indexes});
        console.log(this.state.indexes)
      }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
      }
      
      componentDidMount() {
      this.load()
        document.addEventListener('scroll', this.trackScrolling);
      }

      load(){
        axios.get(`https://thekrishi.com/v2${this.state.next_url}`)
        .then((data)=>{
            console.log(data)
            this.setState({
               Crop:[
                   ...this.state.Crop,
                   ...data.data.data
               ],
               next_url:data.data.next_url,
               has_next:data.data.has_next
            })
        })
      }
      
      componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
      }
      
      trackScrolling = () => {
        //  console.log("i")
        const wrappedElement = document.getElementById('header');
        if (this.isBottom(wrappedElement)) {
           if(this.state.has_next){
            this.load()
          console.log('header bottom reached');}
        //  document.removeEventListener('scroll', this.trackScrolling);
        }
      };
   

    render(){
        let data=this.state.Crop
        return(
            <div id="header">
                <div style={{position:'fixed',height:50,width:'100%',backgroundColor:'green',zIndex:1,marginBottom:150}}>
                    <h1>Crops</h1>
                </div>
                {data.map((data,indexs)=>(
                  <div key={indexs} style={{textAlign:'center'}}>
                  <h1>{data.name}</h1>
                    <Row>
                        {data.crops.map((item,index)=>(
                            <Col
                             key={index} span={8} style={{alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                            <div style={{color: this.state.indexes.indexOf(index) !== -1 ? 'red': 'black'}} onClick={this.onclick.bind(this, index)}>
                              <img alt="" style={{border:'2px solid green',width:100,height:100,objectFit:'cover',borderRadius:this.state.indexes.indexOf(index) !== -1 ? 10 : 80}}  src={item.image}/>
                              <p style={{alignSelf:'center',color:'black',}}>{item.name}</p>
                              </div>
                            </Col>
                        ))}
                    </Row>
                    </div>
                ))}
            </div>
        )
    }
} 
