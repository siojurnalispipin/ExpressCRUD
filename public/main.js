/* globals fetch */
var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
  fetch('data', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Sio',
      'jk': 'Lk',
      'umur' : '22'
    })
  })
  .then(function (response) {
    window.location.reload()
  })
})

del.addEventListener('click', function () {
  fetch('data', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Sio'
    })
  }).then(function (response) {
    window.location.reload()
  })
})
