var api = {}

api.ajax = function (url, method, form, callback) {
    var request = {
        url: url,
        type: method,
        data: form,
        success: function(response){
            callback(JSON.parse(response))
            console.log('json.parse(response)', JSON.parse(response).success)
        },
        error: function (error) {
            alert('error')
        }
    }
    $.ajax(request)
}

api.get = function (url, response) {
    api.ajax(url, 'get', {}, response)
}

api.post = function (url, form, response) {
    api.ajax(url, 'post', form, response)
}

api.add = function (form, response) {
    api.post('/todo/add', form, response)
}

api.delete = function (todo_id, response) {
    api.get('/todo/delete/'+todo_id, response)
}

api.edit = function (form, response) {
    api.post('/todo/edit', form, response)
}
