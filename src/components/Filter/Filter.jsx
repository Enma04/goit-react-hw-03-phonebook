import React, { Component } from 'react';
import css from '../App.module.css';

export default class Filter extends Component {
  changeFilter(e) {this.props.handleFilter(e.target.value);}
  
  render() {
    return (
      <>
        <h3 className={css.contactsH3}>Contacts</h3>
        <span className={css.filterText}>Find contacts by name</span>
        <input
          type="text"
          name="filter"
          className={css.inputFilter}
          onChange={this.changeFilter}
        />
        <ul className={css.contactList}>
          {this.props.contactsFiltered.length !== 0
            ? this.props.contactsFiltered.map((person, index) => (
                <li key={person.id} className={css.contactItem}>
                  {person.name}: {person.number}
									<button onClick={this.props.handleDelete} >Delete</button>
                </li>
              ))
            : this.props.contacts.map(contact => (
                <li key={contact.id} className={css.contactItem}>
                  {contact.name}: {contact.number} 
									<button onClick={this.props.handleDelete} >Delete</button>
                </li>
              ))}
        </ul>
      </>
    );
  }
}
