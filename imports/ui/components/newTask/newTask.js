import { Template } from 'meteor/templating';
import { Tasks } from '../../../api/api.js';

import './newTask.html';

Template.datepicker.rendered = function() {
  this.$('.datepicker').datepicker({
    autoclose: true,
  });
};

Template.newTask.rendered = function() {

    $(".duedate").popover({
        html: true,
        title: 'Choose Due Date',
        content: function() {
            return $("#duedate-content").html();
        }
    });
    $(".priority").popover({
        html: true,
        title: 'Choose Priority',
        content: function() {
            return $("#popover-content").html();
        }
    });
}

Template.choosePriority.helpers({
  taskCount: function() {
    //Change later
    return Tasks.find().count();
  },
});

Template.newTask.onCreated(function() {
  $('#duedate').datepicker();
});

Template.newTask.helpers({
  categories: function(){
    return ["Important-Urgent", "Not Important-Urgent", "Important-Nonurgent", "Backlog"]
  },

});

Template.newTask.events({
  'submit .new-task'(event) {
    console.log('attempting insert...');
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const category = target.selected;
    //const dueDate = target.duedate.value;
    const text = target.text.value;

    console.log('The Text is: ' + text);

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    console.log('Num tasks is now: ' + Tasks.find().count());

    // Clear form
    target.text.value = '';
  },
});
