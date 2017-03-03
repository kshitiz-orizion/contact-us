var http = require('http');
var fs = require('fs');
var util=require('util');
var formidable=require('formidable');
var server = http.createServer(function (req, res) {
	if(req.method.toLowerCase()=='get'){
    displayForm(res);
	}
	else if(req.method.toLowerCase()=='post'){
		processAllFieldsOfTheForm(req,res);
	}
});

function displayForm(res) {
    fs.readFile('contact.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}
function processAllFieldsOfTheForm(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		res.writeHead(200,{'content-type':'text/plain'
	});
	res.write('received the data:\n\n');
	res.end(util.inspect({
		fields:fields,
		files:files

	}));
});
}

server.listen(3000);
console.log("server listening on 3000");