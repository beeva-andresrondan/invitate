App.EstadoController = Ember.Controller.extend({
  estado: null,
  perfil: Ember.inject.service('perfil'),
  init: function() {


    this.set('estado', this.get('perfil').get('state'));

    this.Rest.GET('points',{data: {id: 1}}).then(function(data){
      this.set('points', data);
    }.bind(this));
  },
  actions: {
    modificarEstado: function(estado) {

    }
  }
});
