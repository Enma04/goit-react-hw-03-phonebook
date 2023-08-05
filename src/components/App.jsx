import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-9', name: 'Rosie Carmen', number: '459-12-56' },
        { id: 'id-7', name: 'rosie Fernando', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      contactsFiltered: [],
      name: '',
      number: '',
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    //this.handleValidate = this.handleValidate.bind(this);
  }

  handleDelete(e) {
    console.log("event: ", e);
    const { contacts } = this.state;
    const name = e.target.parentNode.firstChild.data;
    if (contacts.map(item => item.name).includes(name)) {
      const position = contacts.findIndex( contact => contact.name === name );
      contacts.splice(position, 1);
      this.setState({ contacts });
    }
  }

  handleReset = e => {
    this.setState({ ...INITIAL_STATE });
    e.target[0].value = '';
    e.target[1].value = '';
  };

  handleChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    if (name === 'name') this.setState({ name: value });
    if (name === 'number') this.setState({ number: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number, contacts } = this.state;
    if (contacts.map(item => item.name).includes(name)) {
      alert('El contacto ya existe');
    } else {
      const id = nanoid();
      contacts.push({ name, number, id });
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
