// Authors:
//   ned

register({
  name: 'Drupal',

  matchPacket: function (packet) {
    for (var cookieName in packet.cookies) {
      if (cookieName.match(/^SESS.*$/)) {
        return true;
      }
    }
  },

  processPacket: function () {
    for (var cookieName in this.firstPacket.cookies) {
      if (cookieName.match(/^SESS.*$/)) {
        this.sessionId = this.firstPacket.cookies[cookieName];
        break;
      }
    }
  },

  identifyUser: function () {
    var resp = this.httpGet(this.siteUrl);
    this.userName = 'unknown user';
    this.siteName = 'Drupal (' + this.firstPacket.host + ')';
  }
});  
