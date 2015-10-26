Ember.Application.initializer({
  name: 'Rest',

  initialize: function(container, application) {

    application.register('service:rest', App.RestFactory, { instantiate: true });
    application.inject('route', 'Rest', 'service:rest');
    application.inject('controller', 'Rest', 'service:rest');
    application.inject('service:perfil', 'Rest', 'service:rest');

  }
});
