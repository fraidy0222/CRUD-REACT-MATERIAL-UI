import React from 'react'
import './App.css'

/* function Helloworld (props){
  return (
    <div id="hello">
      <h3>{props.subtitle}</h3>
      {props.mytitle}
    </div>
  )
} */

class Helloworld extends React.Component {
  
  state = {
    show: true
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }
  render () {
    if(this.state.show) {
      return (
        <div id="hello">
        <h3>{this.props.subtitle}</h3>
        {this.props.mytitle}
        <button onClick = { this.toggleShow }> Toggle Show</button>
      </div>
      )
    }
    else {
      return <h1 id="else">
        There are not elements
        <button onClick={ this.toggleShow}>Toggle Show</button>
        </h1>
    }
  }
}

function App () {
    return (
      <div>
        This is my components:
        <Helloworld mytitle="Hello 1" subtitle="Hola 1"/>
        <Helloworld mytitle="Hello 2" subtitle="Hola 2"/>
        <Helloworld mytitle="Hello 3" subtitle="Hola 3"/>
      </div>
    )
  }
export default App