App.ToolBarComponent = Ember.Component.extend({

  perfil: Ember.inject.service('perfil'),

  classNames: ['toolbar'],
  user: {
    name: 'Pepito',
    surname1: 'Pulgarcito',
    surname2: 'Gromenawer',
    points: 20,
    state: 2
  }
});
