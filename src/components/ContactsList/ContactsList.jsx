import React from "react";
import css from '../App.module.css';

export default class ContactsList extends React.Component {
  render() {
    return(
      <ul className={css.contactList}>
        {this.props.contacts.length !== 0 &&
          this.props.contacts.map(contact => (
            <li key={contact.id} className={css.contactItem}>
              {contact.name}: {contact.number} 
              <button onClick={this.props.handleDelete} >Delete</button>
            </li>
          ))}
      </ul>
    );
  }
}