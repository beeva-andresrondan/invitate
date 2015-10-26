/*global Ember */
App = Ember.Application.create();

App.Router.map(function() {
  this.route('test', { path: '/test' });
  this.route('invitate', { path: '/invitate' });
  this.route('estado', { path: '/estado' });
});


App.ApplicationController = Ember.Controller.extend({
  hideMenu: false,
  perfil: Ember.inject.service('perfil'),
  user: function() {
    console.log(this.get('perfil').get('name'));
    return {
      name: this.get('perfil').get('name'),
      surname1: this.get('perfil').get('surname1'),
      surname2: this.get('perfil').get('surname2'),
      points: this.get('perfil').get('points')
    };
  }.property('this.perfil.name'),
  init: function() {

  },
  showMenu: function() {
    return !this.get('hideMenu');
  },
  sectionTitle: 'foo'

});

/*
  TODO: Se usa reopen para caso práctico
  Reimplementar Ember.Route y extender de ahí para controlar las transiciones.
 */

App.Router.reopen({
  currentRoute: function() {
    return App.__container__.lookup('route:'+this.get('currentRouteName'));
  }.property('currentRouteName'),
  getAppInstance: function(){
    return App.__container__.lookup('controller:application');
  },
  setAppParameter: function(name, value) {
    this.getAppInstance().set(name,value);
  },
  changeTitleOnTransition: function() {

    var sectionTitle = this.get('currentRoute').get('sectionTitle') || '',
        hideMenu = this.get('currentRoute').get('hideMenu') || '';

    this.setAppParameter('sectionTitle', sectionTitle);
    this.setAppParameter('hideMenu', hideMenu);

  }.on('didTransition')
});


App.ApplicationRoute = Ember.Route.extend({
  perfil: Ember.inject.service('perfil'),
  model: function() {
    return this.get('perfil').fetch();
  }


});



App.RESTResource = Ember.Object.extend({
    contentType: 'application/json',
    port: 8882,
    endpont: '',
    type: 'GET',
    url: 'http://localhost',
    headers: {},
    promise: null,
    dataType: "json",
    success: function () {
      this.promise.success.apply(this,arguments);
    },
    error: function () {
      this.promise.error.apply(this,arguments);
    },
    composeAjaxParams: function() {
      return {
        data: this.get('data'),
        dataType: this.get('dataType'),
        contentType: this.get('contentType'),
        headers: this.get('headers'),
        url: this.get('url')+':'+this.get('port')+'/'+this.get('endpoint'),
        type: this.get('type')
      };
    },
    call: function() {

      this.promise = Ember.$.ajax(this.composeAjaxParams());
      return this.promise;
    },
    then: function() {
      
      this.promise.then.apply(this,arguments);
    }
});



App.RestFactory = Ember.Object.extend({
  getInstance: function(name) {
    //var name = this.get('constructor').toString().dasherize();
    //name = name.split('.')[1].split('-').shift()
    //alert(name);
    //App.__container__.lookup('factory:rest')
    //this.get('constructor').toString().dasherize()

    return App.__container__.lookup('resource:'+name);
  },
  GET: function(name, parameters) {
    var resource = this.getInstance(name, parameters);
    resource.set('type', 'GET');
    resource.set('data', parameters&&parameters.data?parameters.data:null);
    resource.call();
    return resource;
  },
  POST: function(name, parameters) {
    var resource = this.getInstance(name, parameters);
    resource.set('type', 'POST');
    resource.set('data', parameters&&parameters.data?parameters.data:null);
    resource.call();
    return resource;
  },
  PUT: function(name, parameters) {
    var resource = this.getInstance(name, parameters);
    resource.set('data', parameters&&parameters.data?parameters.data:null);
    resource.set('type', 'PUT');
    resource.call();
    return resource;
  },
  DELETE: function(name, parameters) {
    var resource = this.getInstance(name, parameters);
    resource.set('data', parameters&&parameters.data?parameters.data:null);
    resource.set('type', 'DELETE');
    resource.call();
    return resource;
  }

});
