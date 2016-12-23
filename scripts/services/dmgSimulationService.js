lolDmgApp.factory('currentChampion', function() {
  var currentChampion = 0;
  return {
    getCurrentChampion: function() {
      return currentChampion;
    },
    setCurrentChampion: function(champion_id) {
      currentChampion = champion_id;
    }
  };
});

lolDmgApp.factory('RiotApi', function ($http) {
  return {
    getChampionList: function() {
     return $http.get('/championList');
    },

    getItemList: function() {
      return $http.get('/itemList');
    }
  };
});