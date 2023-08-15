import React, { Component } from 'react';
import css from '../App.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};


export default class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
    }
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
  }

  handleChange = evt => {
    const {name, value} = evt.target;
    this.setState( () => ({
      [name]: value,
    }));
  };

  handleReset = e => {
    this.setState({ ...INITIAL_STATE });
    e.target[0].value = '';
    e.target[1].value = '';
  };

  OnSubmit(evt) {
    evt.preventDefault();
    this.props.handleSubmit( this.state );
    this.handleReset(evt);
  }

  render() {
    return (
      <form className={css.contactsForm} onSubmit={this.OnSubmit} >
        <h3 className={css.contactsH3} >Phonebooks</h3>
        <label htmlFor="">
          <span>Name</span>
          <br />
          <input
            type="text"
            name="name"
            className="inputName"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleChange}
            required
          />
        </label>
        <label htmlFor="">
          <span>Number</span>
          <br />
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleChange}
            required
          />
        </label>
        <button className={css.contactsBtnSubmit} type='submit' >
          Add contact
        </button>
      </form>
    );
  }
}
