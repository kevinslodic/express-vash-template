module.exports = (function() {
  if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
  }

  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
          position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
  }

  if (!String.prototype.dashToCamelCase) {
    String.prototype.dashToCamelCase = function() {
      return this.replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
      })
    }
  }

  if (!String.prototype.camelCaseToDash) {
    String.prototype.camelCaseToDash = function() {
      return this.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
  }
})();