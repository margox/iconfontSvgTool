/*
 * author: margox
 * author_url: https://margox.cn
 */

'use strict';

var $ = document.querySelector.bind(document)

var observer = new MutationObserver(function(mutations) {

  mutations.forEach(function(mutation) {

    var downloadDialog = mutation.target.querySelector('.download-dialog')

    if (downloadDialog) {

      downloadDialog.addEventListener("DOMNodeInserted", function(e) {

        var JStage = downloadDialog.querySelector('.J_stage')

        if (JStage) {
          generateImg(JStage.getAttribute('p-id'))
          downloadDialog.querySelector('.block-color-manage').addEventListener('click', generateImg)
        }

      }, false)

    }

  })

})

observer.observe(document.querySelector('body'), {
  childList: true
})

var imageId = null
var countImg = null

function generateImg(imgId) {

  if (imageId === imgId) {
    return false
  }

  imageId = imgId

  var svgContent = $('.J_stage svg').outerHTML
  var svgTitle = $('.top-title').querySelector('span').innerHTML
  var imgElement = null

  if ($('#J-svg-img-output')) {
    imgElement = $('#J-svg-img-output')
  } else {
    imgElement = document.createElement('img')
    imgElement.className = 'svg-img-output'
    imgElement.id = 'J-svg-img-output'
  }

  var blob = new File([svgContent], svgTitle, {
    "type": "image/svg+xml;"
  })

  countImg = new Image()
  countImg.src = 'http://sjs.flkem.com/count?n=' + imageId + '&t=' + new Date().getTime()
  countImg.onload = function() {
    countImg = null
  }
  countImg.onerror = function() {
    countImg = null
  }

  imgElement.src = URL.createObjectURL(blob)//'data:image/svg+xml;utf8,' + svgContent

  var infoContainer = $('.info-tags-container')
  infoContainer.querySelector('.tag') && infoContainer.removeChild(infoContainer.querySelector('.tag'))
  infoContainer.querySelector('h3').innerHTML = '已生成可拖拽矢量图'
  infoContainer.appendChild(imgElement)

}