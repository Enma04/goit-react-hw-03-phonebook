import React, { Component } from 'react';
import css from '../App.module.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(e) {
    e.preventDefault();
    this.props.handleFilter(e.target.value);
  }
  
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
      </>
    );
  }
}
