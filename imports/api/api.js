import { Tasks } from './tasks/tasks.js'
import './tasks/methods.js'

if (Meteor.isServer) {
  console.log("PUBLISHING TASKS!!!");
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });

  Meteor.publish('sort', function sort() {
    return Tasks.find({}, {sort: {is_urgent: 1, is_important: 1}})
  })
}

export { Tasks }
