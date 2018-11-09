import React, { Component } from 'react';
import database from './firebase/firebase';
// import database from './firebase/firebase'

class App extends Component {
  state = {
    users: [],
    notes: [],
    note: {
      title:'',
      body:''
    }
  }

  // componentDidMount(){
  //   const note = {
  //     title: 'This is a note',
  //     body: 'Here is some body text inside of my note'
  //   }
  //   this.setState({
  //     notes: [...this.state.notes, note]
  //   })

  //   database.ref('/notes').push(note).then(() => {
  //     console.log('The note was written')
  //   }).catch((err) => {
  //     console.log(err)
  //   })


  //   const user = {
  //     name: 'Blake Harris',
  //     age: 22
  //   }

  //   this.setState({
  //     users: [...this.state.users, user]
  //   })

  //   database.ref('/users').push(user).then(() => {
  //     console.log('Data Successfully Written')
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  handleFormUpdate = (e) => {
    this.setState({
      note: {
        ...this.state.note, [e.currentTarget.name]: e.currentTarget.value
      }
    })
  }
  handleFormSubmission = (e) => {
    e.preventDefault()
    const currentNote = this.state.note
    database.ref('/notes').push(currentNote).then(() => {
      alert('NOTE ADDED')
      this.setState({
        note: {
          title: '',
          body: ''
        }
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount(){
    const notesRef = database.ref('notes')
    notesRef.on('value', (snapshot) =>{
      const allNotes = snapshot.val()
      for(let i in allNotes){
        let note = {
          id: i,
          title: allNotes[i].title,
          body: allNotes[i].body
        }
        this.setState({
          notes: [...this.state.notes, note]
        })
      }
    })
  }

  render() {
    console.log(this.state.notes)
    return (
      <div style={{textAlign: 'center', marginTop: '150px'}}>
        <h1 style ={{textAlign: 'center'}}>Notes App</h1>
         <NoteForm 
         handleFormSubmission={this.handleFormSubmission}
         handleFormUpdate={this.handleFormUpdate} 
         note={this.state.note}/>
         {
          this.state.notes.map((note) => (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </div>
          ))
        } 
      </div>
      
    );
  }
}

const NoteForm = (props) => (
  <form onSubmit={props.handleFormSubmission}>
    <input type='text' name= 'title' value={props.note.title} onChange={props.handleFormUpdate}/>
    <input type='text' name= 'body' value = {props.note.body} onChange={props.handleFormUpdate}/>
    <button type= 'submit'>Submit</button>
  </form>
)




export default App;
