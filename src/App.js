import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      show:false,
      data:'',
      image:[]
    }
  }
  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
  //  console.log(dataUri);
    this.state.image.push(dataUri);
    this.setState({data:dataUri,show:true})
    console.log(this.state.image)
  }

  render () {
    let data=this.state.data;
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        />
        {this.state.show? this.state.image.map((data)=>(
          <img style={{width:100,height:100}} alt="" src={`${data}`}/>
        )):null}
       
      </div>
    );
  }
}

export default App;