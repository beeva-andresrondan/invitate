App.NotificationService = Ember.Object.extend({
  points: null,
  isServiceFactory: true,
  fetch: function(){

    return this.Rest.GET('notifications', {data: {id: 1}}).then(function(data) {

      this.setProperties({
        points: data.points
      });
    });



  }
});
