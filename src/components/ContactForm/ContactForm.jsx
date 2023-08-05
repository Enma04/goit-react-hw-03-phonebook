import React, { Component } from 'react';
import css from '../App.module.css';

export default class ContactForm extends Component {
  render() {
    return (
      <form className={css.contactsForm} onSubmit={this.props.handleSubmit}>
        <h3 className={css.contactsH3}>Phonebooks</h3>
        <label htmlFor="">
          <span>Name</span>
          <br />
          <input
            type="text"
            name="name"
            className="inputName"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.props.handleChange}
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
            onChange={this.props.handleChange}
            required
          />
        </label>
        <button className={css.contactsBtnSubmit} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
