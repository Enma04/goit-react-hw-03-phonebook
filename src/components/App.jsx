import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import Swal from 'sweetalert2';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: "",
      contactsFiltered: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.setContacts = this.setContacts.bind(this);
  }


  //------------------------------------------------------------------------
  //------------------- METODOS DE LA CLASE COMPONENT
  componentDidMount() {
    if(JSON.parse( localStorage.getItem("contacts")) !== null) {
      const localeContacts = JSON.parse( localStorage.getItem("contacts") );
      this.setState(() => ({
        contacts: [...localeContacts],
      }));
    }
  }

  componentDidUpdate( prevProps, prevState ) {
    const { contacts } = this.state;
    if(prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify( contacts ));
    }
    if(prevState.filter !== "") {
      this.setContacts();
    }
  }


  //------------------------------------------------------------------------
  //------------------- METODOS
  handleDelete(e) {
    const name = e.target.parentNode.firstChild.data;
    this.setState( (prevState) => (
      {
        contacts: [...prevState.contacts.filter( item => item.name !== name )],
        contactsFiltered: [...prevState.contactsFiltered.filter( item => item.name !== name )]
      }
    ));
    Swal.fire(`${name} eliminado!`);
  }

  handleSubmit = ({ number, name }) => {
    const { contacts } = this.state;

    if (contacts.map(item => item.name).includes(name)) {
      Swal.fire('El contacto ya existe!');
      return
    }
    else if (contacts.map(item => item.number).includes(number)) {
      Swal.fire('Este numero ya esta agregado!');
      return
    }

    const id = "id-" + contacts.length + "-" + nanoid(2);
    this.setState( prevState => ({
      contacts: [...prevState.contacts, {id, name, number}],
    }));
    
  };

  handleFilter(filter) {
    this.setState({ filter });
    /* const { contacts } = this.state;
    const aux = contacts.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ contactsFiltered: aux }); */
  }

  setContacts(){
    console.log('Cambios en el filtro');
  }

  //------------------------------------------------------------------------
  //------------------- METODO RENDER
  render() {
    return (
      <div className={css.container}>
        <ContactForm
          handleSubmit={this.handleSubmit}
        />
        <Filter
          {...this.state}
          handleFilter={this.handleFilter}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
