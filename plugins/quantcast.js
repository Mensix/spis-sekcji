/* eslint-disable */
export default ({ app }) => {
  var elem = document.createElement('script')
  elem.src = 'https://quantcast.mgr.consensu.org/cmp.js'
  elem.async = true
  elem.type = 'text/javascript'
  var scpt = document.getElementsByTagName('script')[0]
  scpt.parentNode.insertBefore(elem, scpt)
  ;(function() {
    var gdprAppliesGlobally = false
    function addFrame() {
      if (!window.frames['__cmpLocator']) {
        if (document.body) {
          var body = document.body,
            iframe = document.createElement('iframe')
          iframe.style = 'display:none'
          iframe.name = '__cmpLocator'
          body.appendChild(iframe)
        } else {
          // In the case where this stub is located in the head,
          // this allows us to inject the iframe more quickly than
          // relying on DOMContentLoaded or other events.
          setTimeout(addFrame, 5)
        }
      }
    }
    addFrame()
    function cmpMsgHandler(event) {
      var msgIsString = typeof event.data === 'string'
      var json
      if (msgIsString) {
        json =
          event.data.indexOf('__cmpCall') != -1 ? JSON.parse(event.data) : {}
      } else {
        json = event.data
      }
      if (json.__cmpCall) {
        var i = json.__cmpCall
        window.__cmp(i.command, i.parameter, function(retValue, success) {
          var returnMsg = {
            __cmpReturn: {
              returnValue: retValue,
              success: success,
              callId: i.callId
            }
          }
          event.source.postMessage(
            msgIsString ? JSON.stringify(returnMsg) : returnMsg,
            '*'
          )
        })
      }
    }
    window.__cmp = function(c) {
      var b = arguments
      if (!b.length) {
        return __cmp.a
      } else if (b[0] === 'ping') {
        b[2](
          { gdprAppliesGlobally: gdprAppliesGlobally, cmpLoaded: false },
          true
        )
      } else if (c == '__cmp') return false
      else {
        if (typeof __cmp.a === 'undefined') {
          __cmp.a = []
        }
        __cmp.a.push([].slice.apply(b))
      }
    }
    window.__cmp('getGooglePersonalization', function(consent, isSuccess) {
      if (!isSuccess) return

      if (consent.googlePersonalizationData.consentValue) {
        ;(function(i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r
          ;(i[r] =
            i[r] ||
            function() {
              ;(i[r].q = i[r].q || []).push(arguments)
            }),
            (i[r].l = 1 * new Date())
          ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
          a.async = 1
          a.src = g
          m.parentNode.insertBefore(a, m)
        })(
          window,
          document,
          'script',
          'https://www.google-analytics.com/analytics.js',
          'ga'
        )

        ga('create', 'UA-140414002-1', 'auto')
        ga('send', 'pageview')

        app.router.afterEach((to, from) => {
          ga('set', 'page', to.fullPath)
          ga('send', 'pageview')
        })
      }
    })

    window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally
    window.__cmp.msgHandler = cmpMsgHandler
    if (window.addEventListener) {
      window.addEventListener('message', cmpMsgHandler, false)
    } else {
      window.attachEvent('onmessage', cmpMsgHandler)
    }
  })()
  window.__cmp('init', {
    Language: 'pl',
    'Initial Screen Title Text': 'Szanujemy Twoją prywatność',
    'Initial Screen Reject Button Text': 'Nie zgadzam się',
    'Initial Screen Accept Button Text': 'Zgadzam się',
    'Initial Screen Purpose Link Text': 'Pokaż cele',
    'Purpose Screen Title Text': 'Szanujemy Twoją prywatność',
    'Purpose Screen Body Text':
      'Na podstawie niżej wymienionych celów korzystania z danych możesz skonfigurować ustawienia dotyczące wyrażenia zgody i określić, w jaki sposób Twoje dane powinny być wykorzystywane. Możesz skonfigurować ustawienia dla nas niezależnie od ustawień względem stron trzecich. Każdy cel ma opis, aby użytkownik wiedział, w jaki sposób przetwarzamy jego dane.',
    'Purpose Screen Vendor Link Text': 'Zobacz pełną listę zaangażowanych firm',
    'Purpose Screen Cancel Button Text': 'Anuluj',
    'Purpose Screen Save and Exit Button Text': 'Zapisz i zamknij',
    'Vendor Screen Title Text': 'Szanujemy Twoją prywatność',
    'Vendor Screen Body Text':
      'Poniżej możesz skonfigurować odrębne ustawienia dotyczące zgody w odniesieniu do każdej firmy. Aby dowiedzieć się, w jakim celu określona firma korzysta z danych, wystarczy rozwinąć jej wpis na liście. W niektórych przypadkach firmy mogą zastrzegać, że korzystają z Twoich danych bez pytania o zgodę ze względu na uzasadniony interes. Możesz kliknąć łącze do dokumentu zawierającego zasady ochrony prywatności obowiązujące w danej firmie i wycofać zgodę.',
    'Vendor Screen Accept All Button Text': 'Zaakceptuj wszystko',
    'Vendor Screen Reject All Button Text': 'Odrzuć wszystko',
    'Vendor Screen Purposes Link Text': 'Powrót do celów',
    'Vendor Screen Cancel Button Text': 'Anuluj',
    'Vendor Screen Save and Exit Button Text': 'Zapisz i zamknij',
    'Initial Screen Body Text':
      'Na potrzeby naszej witryny korzystamy z plików cookie w celu personalizacji treści i reklam, udostępniania funkcji mediów społecznościowych oraz analizowania ruchu na stronie. Kliknij poniższy przycisk, aby wyrazić zgodę na korzystanie z tej technologii w Internecie. W każdej chwili możesz zmienić zdanie i wrócić na tę stronę, aby cofnąć zgodę.',
    'Initial Screen Body Text Option': 1,
    'Publisher Purpose IDs': [1, 5],
    'Publisher Name': 'Spis Sekcji',
    'Consent Scope': 'service',
    'Display Persistent Consent Link': false
  })
}
