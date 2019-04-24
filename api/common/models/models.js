'use strict';

module.exports = function(Models) {


        Models.getModels = function (cb) {

            var ds = Models.dataSource;

            var sql = 'SELECT models.id, models.manufacturer_id, manufacturers.manufacturer_name, models.model_name, models.color, models.manufacturing_year, models.registration_number, models.note, models.first_image, models.second_image, models.model_count, models.created_at, models.updated_at FROM models, manufacturers where models.manufacturer_id = manufacturers.id AND models.model_count != 0 ORDER BY id';
    
            ds.connector.query(sql, null, function (err, models) {
    
                if (err) console.error(err);
    
                cb(err, models);
    
            });
    
        };
	
	
    Models.sold = function (id, cb) {

        var ds = Models.dataSource;

        var sql = `UPDATE models SET model_count = GREATEST(0, model_count - 1) WHERE id = ${id}`;

        console.log(sql)

        ds.connector.query(sql, null, function (err, data) {

            if (err) console.error(err);
            cb(null, data)
        })
    }


    Models.remoteMethod('getModels', {
        returns: { arg: 'getModels', type: 'object', root: true },
        http: { path: '/getModels', verb: 'get' }
    });
	
    Models.remoteMethod('sold', {
        accepts: { arg: 'id', type: 'string' },
        returns: { arg: 'sold', type: 'object', root: true },
        http: { path: '/sold', verb: 'get' }
    });

};
