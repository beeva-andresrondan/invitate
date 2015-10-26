App.ImgUserStateHelper = Ember.Helper.helper( function(state) {

  var smileys = ['smiley_triste.png','smiley_normal.png','logo.png'],
    dirImages = '/dist/assets/images/';

  return new Ember.Handlebars.SafeString('<img src="'+dirImages+(smileys[state]||'logo.png')+'"/>');
});
