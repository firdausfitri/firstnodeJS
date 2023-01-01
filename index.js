const http = require('http');
const rupiah = require('rupiah-format')
const kitacuba = require('currency-formatter')
const fs = require('fs')
const os = require('os')
const host = 'localhost'
const port = 3002

//request = data masuk dari luar
//response = data keluar dari sistem


const server = http.createServer(function (request, response) {
    const nama = "Firdaus Fitri";
    let wang = 5000;
    let jajan = 1500;
    let sisa = wang-jajan;


    wang = kitacuba.format(wang,{code: 'MYR'})
    jajan = rupiah.convert(jajan)
    sisa = rupiah.convert(sisa)


    fs.appendFile('sisawang.txt',sisa, () =>{
        console.log('berjaya disimpan')
    })

    const freeMem = os.freemem();

    const hasil = `
    <head>
    <title>${nama}</title>
    </head>
    <body>
    <h1 style='background:red;color:white;padding:20px;text-align:center'> NodeJS Wang Jajan</h1>
    <p> saya ${nama} jajan sebanyak ${jajan}, uang saya tadinya ${wang} sekarang menjadi ${sisa}...</p>
    <h4>freee memoryy: ${freeMem}</h4>
    </body>`

    
    response.statusCode = 200;
    response.end(hasil);

});

server.listen(port, host, function () {
    console.log(`server menyala di ${host}:${port}`);
})