var express = require('express')
var app = express()

//Show List of Items
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM items ORDER BY id DESC',function(err, rows, fields) {
            if (err) {
                console.log(err);
                req.flash('error', err)
                res.render('items/list', {
                    title: 'Items List',
                    data: ''
                })
            } else {
                res.render('items/list', {
                    title: 'Items List',
                    data: rows
                })
            }
        })
    })
})

//Add Item
app.get('/add', function(req, res, next){
    res.render('items/add', {
        name: 'New Item',
        quantity: '',
        amount: '',
        title: ''
    })
})

app.post('/add', function(req, res, next){
    console.log(req.body);
    req.assert('name', 'Name is required').notEmpty()
    req.assert('quantity', 'quantity is required').notEmpty()
    req.assert('amount', 'A valid amount is required').notEmpty()

    var errors = req.validationErrors()

    console.log('errors', errors);

    if( !errors ) {
        var Item = {
            name: req.sanitize('name').escape().trim(),
            qty: req.sanitize('quantity').escape().trim(),
            amount: req.sanitize('amount').escape().trim()
        }

        console.log(Item);

        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO items SET ?', Item, function(err, result) {
                if (err) {
                    req.flash('error', err)

                    res.render('items/add', {
                        title: 'Add New Item',
                        name: Item.name,
                        quantity: Item.qty,
                        amount: Item.amount
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    res.render('items/add', {
                        title: 'Add New Item',
                        name: '',
                        quantity: '',
                        amount: ''
                    })
                }
            })
        })
    }
    else {
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)


        res.render('items/add', {
            title: 'Add New Item',
            name: req.body.name,
            quantity: req.body.quantity,
            amount: req.body.amount
        })
    }
})

app.get('/edit/(:id)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM items WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err

            if (rows.length <= 0) {
                req.flash('error', 'Item not found with id = ' + req.params.id)
                res.redirect('/items')
            }
            else {
                res.render('items/edit', {
                    title: 'Edit Item',
                    id: rows[0].id,
                    name: rows[0].name,
                    quantity: rows[0].quantity,
                    amount: rows[0].amount
                })
            }
        })
    })
})

app.post('/edit/(:id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()
    req.assert('quantity', 'quantity is required').notEmpty()
    req.assert('amount', 'A valid amount is required').notEmpty()

    var errors = req.validationErrors()

    if( !errors ) {
        var Item = {
            name: req.sanitize('name').escape().trim(),
            qty: req.sanitize('quantity').escape().trim(),
            amount: req.sanitize('amount').escape().trim()
        }

        req.getConnection(function(error, conn) {
            conn.query('UPDATE items SET ? WHERE id = ' + req.params.id, Item, function(err, result) {
                if (err) {
                    console.log('error', error)
                    req.flash('error', error)

                    res.render('items/edit', {
                        title: 'Edit Item',
                        id: req.params.id,
                        name: req.body.name,
                        quantity: req.body.quantity,
                        amount: req.body.amount
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    res.render('items/edit', {
                        title: 'Edit Item',
                        id: req.params.id,
                        name: req.body.name,
                        quantity: req.body.quantity,
                        amount: req.body.amount
                    })
                }
            })
        })
    }
    else {
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        res.render('items/edit', {
            title: 'Edit Item',
            id: req.params.id,
            name: req.body.name,
            quantity: req.body.quantity,
            amount: req.body.amount
        })
    }
})

app.delete('/delete/(:id)', function(req, res, next) {
    var Item = { id: req.params.id }

    req.getConnection(function(error, conn) {
        conn.query('DELETE FROM items WHERE id = ' + req.params.id, Item, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.redirect('/items')
            } else {
                req.flash('success', 'Item deleted successfully! id = ' + req.params.id)
                res.redirect('/items')
            }
        })
    })
})


module.exports = app
