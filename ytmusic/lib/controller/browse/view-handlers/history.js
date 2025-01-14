'use strict';

const ytmusic = require(ytmusicPluginLibRoot + '/ytmusic');
const Auth = require(ytmusicPluginLibRoot + '/utils/auth');
const FeedViewHandler = require(__dirname + '/feed');

class HistoryViewHandler extends FeedViewHandler {

  browse() {
    if (Auth.getAuthStatus().status !== Auth.SIGNED_IN) {
      ytmusic.toast('error', ytmusic.getI18n('YTMUSIC_ERR_REQUIRE_SIGN_IN'));
      throw new Error(ytmusic.getI18n('YTMUSIC_ERR_REQUIRE_SIGN_IN'));
    }

    return super.browse();
  }

  async getContents() {
    const model = this.getModel('history');
    return model.getHistory();
  }
}

module.exports = HistoryViewHandler;
