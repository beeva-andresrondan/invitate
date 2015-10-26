App.EstadoRoute = Ember.Route.extend({
  perfil: Ember.inject.service('perfil'),
  sectionTitle: 'Estado',
  model: function() {
    
  },
  setupController: function(controller, model) {


    var points = {
      today: 7,
      month: 20
    };
  }

});
