App.InvitateController = Ember.Controller.extend({

  actions: {
    point: function(member){

        Ember.set(member, 'checked', true);
        
    }
  }
});
