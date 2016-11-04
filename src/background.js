/*
 * author: margox
 * author_url: https://margox.cn
 */


chrome.tabs.onCreated.addListener(function (tab) {
  toggleBrowserAction()
})

chrome.tabs.onUpdated.addListener(function (tab) {
  toggleBrowserAction()
})

chrome.tabs.onActivated.addListener(function (tab) {
  toggleBrowserAction()
})

function toggleBrowserAction() {

  chrome.browserAction.disable()

  chrome.tabs.query({
    active: true
  }, function(tab) {

    if (tab[0] && tab[0].url && tab[0].url.indexOf('iconfont.cn') > -1) {
      chrome.browserAction.enable()
    } else {
      chrome.browserAction.disable()
    }

  })

}