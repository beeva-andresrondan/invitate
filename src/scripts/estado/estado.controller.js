App.EstadoController = Ember.Controller.extend({
  estado: null,
  perfil: Ember.inject.service('perfil'),
  itemsStateDisabled: null,
  smiley0Disabled: false,
  smiley1Disabled: false,
  smiley2Disabled: false,
  init: function() {

    this.set('itemsStateDisabled', [false, false, false]);
    this.set('estado', this.get('perfil').get('state'));
    this.Rest.GET('points',{data: {id: 1}}).then(function(data){
      this.set('points', data);
    }.bind(this));

  },
  actions: {
    modificarEstado: function(estado) {

      if(!this.get('estado')) {
        if(estado!==-1) {
          this.set('estado', estado>=0);
          this.setProperties({
            'smiley0Disabled': true,
            'smiley1Disabled': true,
            'smiley2Disabled': true
          });
        }

        //llamara a post
      }
      else {
        this.setProperties({
          'smiley0Disabled': false,
          'smiley1Disabled': false,
          'smiley2Disabled': false
        });
        this.set('estado', null);
      }

      /*switch(estado) {
        case 0:
          this.setProperties({
            'smiley1Disabled': true,
            'smiley2Disabled': true,
          });
        break;
        case 1:
          this.setProperties({
            'smiley0Disabled': true,
            'smiley2Disabled': true
          });
        break;
        case 2:
          this.setProperties({
            'smiley1Disabled': true,
            'smiley0Disabled': true
          });
        break;
      }*/
    }
  }
});
