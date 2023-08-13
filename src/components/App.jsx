import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import Swal from 'sweetalert2';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contactsFiltered: [],
      name: '',
      number: '',
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }


  //------------------------------------------------------------------------
  //------------------- METODOS DE LA CLASE COMPONENT
  componentDidMount() {
    //console.log( JSON.parse( localStorage.getItem("contacts")).length );
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
      //const miStorage = JSON.parse(localStorage.getItem( `contacts` ));
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

  handleReset = e => {
    this.setState({ ...INITIAL_STATE });
    e.target[0].value = '';
    e.target[1].value = '';
  };

  handleChange = evt => {
    const {name, value} = evt.target;
    this.setState( () => ({
      [name]: value,
    }));
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number, contacts } = this.state;

    if (contacts.map(item => item.name).includes(name)) {
      Swal.fire('El contacto ya existe!');
    }
    else if (contacts.map(item => item.number).includes(number)) {
      Swal.fire('Este numero ya esta agregado!');
    }
    else {
      const id = "id-" + contacts.length + "-" + nanoid(2);
      this.setState( prevState => ({
        contacts: [...prevState.contacts, {id, name, number}],
      }));
    }
    this.handleReset(evt);
  };

  handleFilter(evt) {
    const value = evt.target.value;
    const { contacts } = this.state;
    const aux = contacts.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ contactsFiltered: aux });
  }


  //------------------------------------------------------------------------
  //------------------- METODO RENDER
  render() {
    return (
      <div className={css.container}>
        <ContactForm
          handleReset={this.handleReset}
          handleChange={this.handleChange}
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
