import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './task.html';

Template.task.helpers({
  date: function() {
    console.log('blah');
    console.log(this);
    console.log(this.task);
    const due_on = this.task.due_on;
    const curr_date = due_on.getDate();
    const curr_month = due_on.getMonth() + 1; //Months are zero based
    const curr_year = due_on.getFullYear();
    return curr_month + "/" + curr_date + "/" + curr_year;
  },

  log: function () {
    console.log(this);
  },
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
});
