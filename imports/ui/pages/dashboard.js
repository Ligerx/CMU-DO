import { Template } from 'meteor/templating';
import { Tasks } from '../../api/api.js';

import './dashboard.html';
import '../components/taskList/taskList.js';
import '../components/newTaskModal/newTaskModal.js';

Template.dashboard.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

Template.dashboard.helpers({
  allTasks() {
    return Tasks.find();
  },
  
  filteredTasks(kw = { hash: {} }) {
    // Use this helper to find tasks that satisfy certain params
    // e.g. to find only important tasks, you could use {{ #each singleTask in (test is_important=true) }}
    // Default values are found on the line below.
    // You can read about what kw is here: http://blazejs.org/api/spacebars.html#Helper-Arguments
    console.log(kw);

    let { is_sorted = true, is_urgent = false, is_important = false } = kw.hash;
    console.log('Filtering tasks // sorted ' + is_sorted + ', urgent ' + is_urgent + ', important ' + is_important);

    let blah = {is_sorted, is_urgent, is_important};
    console.log(blah);

    return Tasks.find({
      completed_on: null,
      is_sorted,
      is_urgent,
      is_important,
    });
  },

  tasksAreSelected() {
    const numTasksSelected = Session.get('numTasksSelected') || 0;
    return numTasksSelected > 0 ? true : false;
  },

  editTasksButtonText() {
    const numTasksSelected = Session.get('numTasksSelected') || 0;

    if(numTasksSelected === 1) {
      return 'Edit Task';
    }
    else {
      return 'Edit ' + numTasksSelected + ' Tasks'
    }
  }

});

// This is just for testing purposes.
// Once we figure out what component to put this code in, remove it from here.
Template.dashboard.events({
  'click .temporary-edit-button'() {
    console.log('temporary-edit-button clicked');

    const selectedTasks = $('.task.selected');

    const selectedIDs = selectedTasks.map(function(index, element) {
      return $(element).data('id');
    }).toArray();

    const tasks = Tasks.find({"_id": { "$in": selectedIDs }}).fetch();

    tasks.forEach(function(task) {
      console.log(task);
    });
  },

});
