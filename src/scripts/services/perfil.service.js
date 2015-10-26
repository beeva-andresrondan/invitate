App.PerfilService = Ember.Object.extend({
  name: null,
  surname1: null,
  surname2: null,
  state: null,
  isServiceFactory: true,
  getFullName: function() {
    return name+" "+surname1+" "+surname2;
  }.property('name','surname1','surname2'),
  fetch: function(){
    var email = 'andres@email.com';
    var password = 'foo';
    return this.Rest.POST('session', {data: {email: email,password: password}}).then(function(data) {

      
      this.setProperties({
        name: data.name,
        surname1: data.surname1,
        surname2: data.surname2,
        state: data.state
      });

    }.bind(this));
  }
});
