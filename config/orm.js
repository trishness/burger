var connection = require("../config/connection.js");

function printQuestionMarks(number) {
    var array = [];

    for (var i=0; i<number; i++) {
        array.push("?");
    }
    return array.toString();
}

function objectToSql(object) {
    var array = [];

    for (var key in object) {
        var value=object[key];

        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof value === "string" && value.indexOf(" ")>=0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result)
        });
    },
    insertOne: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    updateOne: function(table,objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objectToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
    // delete: function(table, condition, cb){
    //     var queryString = "DELETE FROM " + table;

    //     queryString += " WHERE ";
    //     queryString += condition;

    //     connection.query(queryString, function(err, result){
    //         if (err) {
    //             throw err;
    //         }
    //         cb(result);
    //     });
    // }
};

module.exports = orm;