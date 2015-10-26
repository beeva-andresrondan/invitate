App.InvitateRoute = Ember.Route.extend({

  sectionTitle: 'Págate una',

  model: function() {
    return this.Rest.GET('teamMembers',{data:{id: 1}});
  },

  setupController: function(controller, model) {
    controller.set('members',model);
  }

});
